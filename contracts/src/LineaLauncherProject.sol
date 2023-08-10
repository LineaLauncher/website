// SPDX-License-Identifier: AGPL-3.0-only
pragma solidity 0.8.19;

import "solmate/utils/MerkleProofLib.sol";
import "solmate/utils/SafeTransferLib.sol";

/// @title LineaLauncherProject
/// @author LineaLauncher
/// @notice This contract, deployed by the factory, manages a token sale with two rounds of purchase.
/// @dev The contract includes functionality for setting the sale parameters, purchasing tokens, withdrawing tokens, and refunding
contract LineaLauncherProject {
    // Array sizes won't exceed the block gas limit.
    // Both array sizes are guaranteed to be the same,
    // checked manually.
    uint256[] vestingTimestamps;
    uint256[] vestingReleasePercentages;

    bytes32 private roundOneMerkleRoot;
    bytes32 private roundTwoMerkleRoot;

    address public owner;

    uint256 public immutable raiseTarget;
    uint256 public immutable tokensPerPaymentToken;
    ERC20 public immutable saleToken;
    ERC20 public immutable paymentToken;

    bool public immutable allowPublicRoundOne;
    bool public immutable allowPublicRoundTwo;

    uint256 public publicRoundOneCap;
    uint256 public publicRoundTwoCap;

    // roundTwoStartTime is equal to roundOneEndTime
    // meaning, round two start time marks the end of round one.
    uint256 public roundOneStartTime;
    uint256 public roundTwoStartTime;
    uint256 public saleEndTime;

    uint256 public maximumRefundTime;

    uint256 public totalRaised;

    mapping(address => uint256) public amountInvestedInRoundOne;
    mapping(address => uint256) public amountInvestedInRoundTwo;
    mapping(address => uint256) public amountWithdrawn;

    /// @notice Event for refunding tokens
    event Refund(address indexed _investor, uint256 _amount);
    /// @notice Event for purchasing tokens
    event Purchase(address indexed _investor, uint256 _amountPaymentTokenSent, bool _public);
    /// @notice Event for withdrawing tokens
    event Withdrawal(address indexed _investor, uint256 _amount);
    /// @notice Event for transferring ownership
    event OwnershipTransferred(address indexed _previousOwner, address indexed _newOwner);

    modifier onlyOwner() {
        require(msg.sender == owner, "!owner");
        _;
    }

    /// @dev Ensure the lengths of _vestingTimestamps and _vestingReleasePercentages are equal,
    /// and that the percentages add up to 100. Timestamps must be in ascending order.
    /// @param _owner Address of the contract owner.
    /// @param _paymentToken ERC20 token used for payments.
    /// @param _saleToken ERC20 token sold in this contract.
    /// @param _tokensPerPaymentToken The exchange rate between payment tokens and sale tokens.
    /// @param _roundOneStartTime The start time of the first round.
    /// @param _roundTwoStartTime The start time of the second round.
    /// @param _saleEndTime The end time of the sale.
    /// @param _maximumRefundTime The maximum time for refunds.
    /// @param _raiseTarget The target amount of payment tokens to be raised.
    /// @param _allowPublicRoundOne Whether or not the first round is public.
    /// @param _allowPublicRoundTwo Whether or not the second round is public.
    /// @param _publicRoundOneCap The maximum amount of tokens that can be purchased in the first round per address.
    /// @param _publicRoundTwoCap The maximum amount of tokens that can be purchased in the second round per address.
    /// @param _vestingTimestamps Array of timestamps for token vesting schedule.
    /// @param _vestingReleasePercentages Array of percentages for token vesting schedule.
    /// Percentages must be expressed out of 1000 (100% = 1000, 10% = 100, 1% = 10, 0.5% = 5).
    constructor(
        address _owner,
        ERC20 _paymentToken,
        ERC20 _saleToken,
        uint256 _tokensPerPaymentToken,
        uint256 _roundOneStartTime,
        uint256 _roundTwoStartTime,
        uint256 _saleEndTime,
        uint256 _maximumRefundTime,
        uint256 _raiseTarget,
        bool _allowPublicRoundOne,
        bool _allowPublicRoundTwo,
        uint256 _publicRoundOneCap,
        uint256 _publicRoundTwoCap,
        uint256[] memory _vestingTimestamps,
        uint256[] memory _vestingReleasePercentages
    ) {
        require(_vestingTimestamps.length == _vestingReleasePercentages.length, "!vesting");

        uint256 totalPercentage = 0;
        for (uint256 i = 0; i < _vestingReleasePercentages.length; i++) {
            totalPercentage += _vestingReleasePercentages[i];
            if (i != 0) {
                require(_vestingTimestamps[i] > _vestingTimestamps[i - 1], "!ascending");
            }
        }

        require(totalPercentage == 1000, "!totalPercentage");
        require(_tokensPerPaymentToken > 0, "!zeroPrice");

        owner = _owner;
        paymentToken = _paymentToken;
        saleToken = _saleToken;
        tokensPerPaymentToken = _tokensPerPaymentToken;
        vestingTimestamps = _vestingTimestamps;
        vestingReleasePercentages = _vestingReleasePercentages;

        roundOneStartTime = _roundOneStartTime;
        roundTwoStartTime = _roundTwoStartTime;
        saleEndTime = _saleEndTime;

        maximumRefundTime = _maximumRefundTime;

        raiseTarget = _raiseTarget;

        allowPublicRoundOne = _allowPublicRoundOne;
        allowPublicRoundTwo = _allowPublicRoundTwo;

        publicRoundOneCap = _publicRoundOneCap;
        publicRoundTwoCap = _publicRoundTwoCap;
    }

    /// @notice Purchase tokens during the sale period
    /// @dev Uses Merkle proofs to verify the purchase. If the sale is public, a user may still choose
    /// to purchase via their Merkle proof, if they have one. This functionality allows higher caps
    /// to be specified for certain users.
    /// @param _proof Array of bytes32 values that represents a Merkle proof.
    /// @param _maxAmount The maximum amount of tokens that can be purchased.
    /// @param _amountPaymentTokensSent The amount of payment tokens being invested.
    function purchaseWithMerkleProof(
        bytes32[] calldata _proof,
        uint256 _maxAmount,
        uint256 _amountPaymentTokensSent
    ) external {
        require(_amountPaymentTokensSent != 0, "!zero");
        // Calculation of the leaf for the Merkle proof
        bytes32 leaf = keccak256(bytes.concat(keccak256(abi.encode(msg.sender, _maxAmount))));

        uint256 amountToTransfer;
        uint256 amountLeftToTarget = raiseTarget - totalRaised;
        // Check the time and the round for the sale
        if (block.timestamp >= roundOneStartTime && block.timestamp <= roundTwoStartTime) {
            // Round 1
            require(MerkleProofLib.verify(_proof, roundOneMerkleRoot, leaf), "!proof");
            uint256 allocationLeft = _maxAmount - amountInvestedInRoundOne[msg.sender];
            require(_amountPaymentTokensSent <= allocationLeft, "!maxAmount");

            // This logic ensures that the user's transaction goes through,
            // even if the amount of tokens they are trying to purchase is greater than
            // the amount left to target. For example, if the user is trying to pay
            // 100 USDC, but there is only 50 USDC total allocation left to target,
            // then the transaction won't be rejected, and only 50 USDC will be transferred
            // to this contract.
            //
            // In Round 1, unless there's an issue with the allocations, amountToTransfer
            // should always be equal to _amountPaymentTokenSent. This is not the case with
            // Round 2, as it is in a first come first serve basis.
            if (_amountPaymentTokensSent > amountLeftToTarget) {
                amountToTransfer = amountLeftToTarget;
            } else {
                amountToTransfer = _amountPaymentTokensSent;
            }

            // Update the amount invested
            amountInvestedInRoundOne[msg.sender] += amountToTransfer;
        } else if (block.timestamp > roundTwoStartTime && block.timestamp <= saleEndTime) {
            // Round 2
            require(MerkleProofLib.verify(_proof, roundTwoMerkleRoot, leaf), "!proof");
            uint256 allocationLeft = _maxAmount - amountInvestedInRoundTwo[msg.sender];
            require(_amountPaymentTokensSent <= allocationLeft, "!maxAmount");

            // See line 157 for an explanation as to why this is required.
            if (_amountPaymentTokensSent > amountLeftToTarget) {
                amountToTransfer = amountLeftToTarget;
            } else {
                amountToTransfer = _amountPaymentTokensSent;
            }

            // Update the amount invested
            amountInvestedInRoundTwo[msg.sender] += amountToTransfer;
        } else {
            // Sale finished or not started
            revert("!sale");
        }

        // Update the total raised
        totalRaised += amountToTransfer;

        // Transfer the payment tokens to this contract, ensuring state changes happen before calling
        // the external (ERC20) contract.
        SafeTransferLib.safeTransferFrom(paymentToken, msg.sender, address(this), amountToTransfer);

        emit Purchase(msg.sender, amountToTransfer, false);
    }

    /// @notice Purchase tokens during the sale period if the sale is public
    /// @dev This function is only available if the sale is public
    /// @param _amountPaymentTokensSent The amount of payment tokens being invested.
    function purchasePublic(uint256 _amountPaymentTokensSent) external {
        uint256 amountToTransfer;
        uint256 amountLeftToTarget = raiseTarget - totalRaised;
        // Check the time and the round for the sale
        if (block.timestamp >= roundOneStartTime && block.timestamp <= roundTwoStartTime) {
            // Round 1
            require(allowPublicRoundOne, "!public");
            uint256 allocationLeft = publicRoundOneCap - amountInvestedInRoundOne[msg.sender];
            require(_amountPaymentTokensSent <= allocationLeft, "!maxAmount");

            // See line 157 for an explanation as to why this is required.
            if (_amountPaymentTokensSent > amountLeftToTarget) {
                amountToTransfer = amountLeftToTarget;
            } else {
                amountToTransfer = _amountPaymentTokensSent;
            }

            // Update the amount invested
            amountInvestedInRoundOne[msg.sender] += amountToTransfer;
        } else if (block.timestamp > roundTwoStartTime && block.timestamp <= saleEndTime) {
            // Round 2
            require(allowPublicRoundTwo, "!public");
            uint256 allocationLeft = publicRoundTwoCap - amountInvestedInRoundTwo[msg.sender];
            require(_amountPaymentTokensSent <= allocationLeft, "!maxAmount");

            // See line 157 for an explanation as to why this is required.
            if (_amountPaymentTokensSent > amountLeftToTarget) {
                amountToTransfer = amountLeftToTarget;
            } else {
                amountToTransfer = _amountPaymentTokensSent;
            }

            // Update the amount invested
            amountInvestedInRoundTwo[msg.sender] += amountToTransfer;
        } else {
            // Sale finished or not started
            revert("!sale");
        }

        // Update the total raised
        totalRaised += amountToTransfer;

        // Transfer the payment tokens to this contract, ensuring state changes happen before calling
        // the external (ERC20) contract.
        SafeTransferLib.safeTransferFrom(paymentToken, msg.sender, address(this), amountToTransfer);

        emit Purchase(msg.sender, amountToTransfer, true);
    }

    /// @notice Allows the owner to withdraw any contributions to the contract
    /// @dev This function handles both ETH and ERC20 token transfers
    /// @param _token Address of the token to withdraw. Use the zero address for ETH.
    function withdrawContributions(address _token) external onlyOwner {
        if (_token == address(0)) {
            // This is likely not required, however this provides an
            // escape for any ETH that may be sent to the contract
            // forcefully via selfdestruct.
            SafeTransferLib.safeTransferETH(owner, address(this).balance);
        } else {
            SafeTransferLib.safeTransfer(
                ERC20(_token),
                owner,
                ERC20(_token).balanceOf(address(this))
            );
        }
    }

    /// @notice Allows an investor to get a refund of their invested tokens
    /// @dev Refunds are only available if no withdrawal has been made, and the current
    /// timestamp is before the maximum refund time. A refund is optional, and a project
    /// may choose not to enable this function. To disable refunds, the maximumRefundTime
    /// is set to "1690848000", 2023-08-01T00:00:00+00:00, by convention. If the maximumRefundTime
    /// is set to this value, then refunds are never available since the time is in the past.
    function refund() external {
        uint256 totalInvested = calculateTotalAmountInvested(msg.sender);
        require(totalInvested > 0, "!invested");
        require(amountWithdrawn[msg.sender] == 0, "!withdrawn");
        require(
            block.timestamp >= saleEndTime && block.timestamp < maximumRefundTime,
            "!refundTime"
        );

        amountInvestedInRoundOne[msg.sender] = 0;
        amountInvestedInRoundTwo[msg.sender] = 0;

        totalRaised -= totalInvested;

        // Transfer the payment tokens to the investor, ensuring state changes happen before calling
        // the external (ERC20) contract.
        SafeTransferLib.safeTransfer(paymentToken, msg.sender, totalInvested);

        emit Refund(msg.sender, totalInvested);
    }

    /// @notice Allows an investor to withdraw their vested tokens
    function withdrawVestedTokens() external {
        uint256 currentlyWithdrawableAmount = currentlyWithdrawable(msg.sender);
        require(currentlyWithdrawableAmount > 0, "!availableForWithdrawal");

        amountWithdrawn[msg.sender] += currentlyWithdrawableAmount;

        // Transfer the sale tokens to the investor, ensuring state changes happen before calling
        // the external (ERC20) contract.
        SafeTransferLib.safeTransfer(saleToken, msg.sender, currentlyWithdrawableAmount);

        emit Withdrawal(msg.sender, currentlyWithdrawableAmount);
    }

    // ==========================
    // ======== Setters =========
    // ==========================

    /// @notice Sets the Merkle roots for the first and second rounds
    /// @dev Only callable by the owner of the contract
    /// @param _roundOneMerkleRoot The Merkle root of the first round
    /// @param _roundTwoMerkleRoot The Merkle root of the second round
    function setMerkleRoots(
        bytes32 _roundOneMerkleRoot,
        bytes32 _roundTwoMerkleRoot
    ) external onlyOwner {
        roundOneMerkleRoot = _roundOneMerkleRoot;
        roundTwoMerkleRoot = _roundTwoMerkleRoot;
    }

    /// @notice Sets the start times for the first, second rounds, the end time for the sale
    /// and the maximum refund time
    /// @dev Only callable by the owner of the contract
    /// @param _roundOneStartTime The start time of the first round
    /// @param _roundTwoStartTime The start time of the second round
    /// @param _saleEndTime The end time of the sale
    /// @param _maximumRefundTime The maximum time for refunds to be available
    function setTimes(
        uint256 _roundOneStartTime,
        uint256 _roundTwoStartTime,
        uint256 _saleEndTime,
        uint256 _maximumRefundTime
    ) external onlyOwner {
        roundOneStartTime = _roundOneStartTime;
        roundTwoStartTime = _roundTwoStartTime;
        saleEndTime = _saleEndTime;
        maximumRefundTime = _maximumRefundTime;
    }

    /// @notice Transfers the ownership of the contract to another address
    /// @dev Only callable by the current owner of the contract
    /// @param _owner The new owner's address
    function transferOwnership(address _owner) external onlyOwner {
        owner = _owner;

        emit OwnershipTransferred(msg.sender, _owner);
    }

    /// @notice Sets the public round 1 and round 2 cap per address
    /// @dev Only callable by the owner of the contract
    /// @param _publicRoundOneCap The public round 1 cap per address
    /// @param _publicRoundTwoCap The public round 2 cap per address
    function setPublicRoundOneAndTwoCapPerAddress(
        uint256 _publicRoundOneCap,
        uint256 _publicRoundTwoCap
    ) external onlyOwner {
        publicRoundOneCap = _publicRoundOneCap;
        publicRoundTwoCap = _publicRoundTwoCap;
    }

    // =======================
    // ======== View =========
    // =======================

    /// @notice Calculates and returns the total amount invested by an investor
    /// @param _investor The address of the investor
    /// @return The total amount invested by the investor
    function calculateTotalAmountInvested(address _investor) public view returns (uint256) {
        return amountInvestedInRoundOne[_investor] + amountInvestedInRoundTwo[_investor];
    }

    /// @notice Calculates and returns the total tokens owed to an investor
    /// @param _investor The address of the investor
    /// @return The total number of tokens the investor should receive
    function getTotalTokensOwed(address _investor) public view returns (uint256) {
        return calculateTotalAmountInvested(_investor) * tokensPerPaymentToken;
    }

    /// @notice Calculates and returns the total amount withdrawable by an investor. This
    /// accounts for the vesting schedule, but does not consider the previously
    /// withdrawn amounts. To calculate the currently withdrawable amount, use
    /// the currentlyWithdrawable function.
    /// @param _investor The address of the investor
    /// @return The current total amount withdrawable by the investor
    function totalTokensWithdrawableIncludingAlreadyWithdrawn(
        address _investor
    ) public view returns (uint256) {
        uint256 totalTokensOwed = getTotalTokensOwed(_investor);

        uint256 availableForWithdrawal = 0;
        for (uint256 i = 0; i < vestingTimestamps.length; i++) {
            if (vestingTimestamps[i] <= block.timestamp) {
                uint256 vestingAmount = (totalTokensOwed * vestingReleasePercentages[i]) / 1000;
                availableForWithdrawal += vestingAmount;
            } else {
                break;
            }
        }

        return availableForWithdrawal;
    }

    /// @notice Calculates and returns the total amount withdrawable by an investor
    /// @param _investor The address of the investor
    /// @return The current amount withdrawable by the investor
    function currentlyWithdrawable(address _investor) public view returns (uint256) {
        uint256 availableForWithdrawal = totalTokensWithdrawableIncludingAlreadyWithdrawn(
            _investor
        );

        return availableForWithdrawal - amountWithdrawn[_investor];
    }
}

import { useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"

import localizeNumber from "@/utils/localizeNumber"
import useConversion from "./useConversion"

const ALLOWANCE_ABI = [
    {
        constant: true,
        inputs: [
            {
                name: "_owner",
                type: "address",
            },
            {
                name: "_spender",
                type: "address",
            },
        ],
        name: "allowance",
        outputs: [
            {
                name: "",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
]

const BALANCE_ABI = [
    {
        constant: true,
        inputs: [
            {
                name: "_owner",
                type: "address",
            },
        ],
        name: "balanceOf",
        outputs: [
            {
                name: "balance",
                type: "uint256",
            },
        ],
        payable: false,
        stateMutability: "view",
        type: "function",
    },
]

export default function useWatcher(
    paymentTokenAddress: string,
    contractAddress: string,
    inputRef: React.RefObject<HTMLInputElement>,
    currentInvestmentAmount: number,
    requiredMoreApproval: number | undefined,
    setCurrentInvestmentAmount: (amount: number) => void
) {
    const [userAllowance, setUserAllowance] = useState<undefined | bigint>(undefined)
    const [userPaymentTokenBalance, setUserPaymentTokenBalance] = useState<undefined | bigint>(undefined)

    const { address } = useAccount()

    const allowanceWatcher = useContractRead({
        address: paymentTokenAddress as `0x${string}`,
        abi: ALLOWANCE_ABI,
        functionName: "allowance",
        args: [address, contractAddress],
        watch: true,
    })
    const balanceWatcher = useContractRead({
        address: paymentTokenAddress as `0x${string}`,
        abi: BALANCE_ABI,
        functionName: "balanceOf",
        args: [address],
        watch: true,
    })

    const { paymentTokenToNum } = useConversion()

    useEffect(() => {
        if (allowanceWatcher.data !== undefined && allowanceWatcher.data !== null) {
            setUserAllowance((allowanceWatcher.data as BigInt).valueOf())
        }
    }, [allowanceWatcher.data])

    useEffect(() => {
        if (balanceWatcher.data !== undefined && balanceWatcher.data !== null) {
            const balanceBigInt = (balanceWatcher.data as BigInt).valueOf()
            const balance = paymentTokenToNum(balanceBigInt)
            if (balance < currentInvestmentAmount) {
                setCurrentInvestmentAmount(balance)
                if (inputRef.current) inputRef.current.value = balance.toString()
            }
            setUserPaymentTokenBalance(balanceBigInt)
        }
    }, [balanceWatcher.data, currentInvestmentAmount, inputRef, paymentTokenToNum, setCurrentInvestmentAmount])

    const formattedAllowance =
        userAllowance !== undefined
            ? userAllowance > 10 ** 12
                ? "∞"
                : localizeNumber(paymentTokenToNum(userAllowance))
            : "..."

    const approveText = `Approve ${
        userAllowance !== undefined
            ? requiredMoreApproval !== undefined
                ? localizeNumber(requiredMoreApproval)
                : "0"
            : "..."
    } USDC`

    return { userAllowance, formattedAllowance, approveText, userPaymentTokenBalance }
}

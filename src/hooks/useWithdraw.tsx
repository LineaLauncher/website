import { useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"

const TOTAL_CLAIMED_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "amountWithdrawn",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]

const CURRENTLY_WITHDRAWABLE_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_investor",
                type: "address",
            },
        ],
        name: "currentlyWithdrawable",
        outputs: [
            {
                internalType: "uint256",
                name: "",
                type: "uint256",
            },
        ],
        stateMutability: "view",
        type: "function",
    },
]

export default function useWithdraw(contractAddress: string) {
    const [totalClaimed, setAmountWithdrawn] = useState<bigint | undefined>()
    const [currentlyWithdrawable, setCurrentlyWithdrawable] = useState<bigint | undefined>()

    const { address } = useAccount()

    const totalClaimedWatcher = useContractRead({
        address: contractAddress as `0x${string}`,
        abi: TOTAL_CLAIMED_ABI,
        functionName: "amountWithdrawn",
        args: [address],
        watch: true,
    })
    const currentlyWithdrawableWatcher = useContractRead({
        address: contractAddress as `0x${string}`,
        abi: CURRENTLY_WITHDRAWABLE_ABI,
        functionName: "currentlyWithdrawable",
        args: [address],
        watch: true,
    })

    useEffect(() => {
        if (totalClaimedWatcher.data !== undefined && totalClaimedWatcher.data !== null) {
            setAmountWithdrawn((totalClaimedWatcher.data as BigInt).valueOf())
        }
    }, [totalClaimedWatcher.data])

    useEffect(() => {
        if (currentlyWithdrawableWatcher.data !== undefined && currentlyWithdrawableWatcher.data !== null) {
            setCurrentlyWithdrawable((currentlyWithdrawableWatcher.data as BigInt).valueOf())
        }
    }, [currentlyWithdrawableWatcher.data])

    return { totalClaimed, currentlyWithdrawable }
}

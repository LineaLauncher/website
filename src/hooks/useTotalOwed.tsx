import { useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"

const TOTAL_OWED_ABI = [
    {
        inputs: [
            {
                internalType: "address",
                name: "_investor",
                type: "address",
            },
        ],
        name: "getTotalTokensOwed",
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

export default function useTotalOwed(contractAddress: string) {
    const [totalOwed, setTotalOwed] = useState<bigint | undefined>()

    const { address } = useAccount()

    const { data } = useContractRead({
        address: contractAddress as `0x${string}`,
        abi: TOTAL_OWED_ABI,
        functionName: "getTotalTokensOwed",
        args: [address],
    }) as { data: BigInt | undefined | null }

    useEffect(() => {
        if (data !== undefined && data !== null) {
            setTotalOwed(data.valueOf())
        }
    }, [data])

    return totalOwed
}

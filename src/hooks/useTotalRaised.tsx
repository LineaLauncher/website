import { useEffect, useState } from "react"
import { useContractRead } from "wagmi"

export default function useTotalRaised(address: string) {
    const [totalRaised, setTotalRaised] = useState<bigint | undefined>()

    const { data } = useContractRead({
        address: address as `0x${string}`,
        abi: [
            {
                inputs: [],
                name: "totalRaised",
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
        ],
        functionName: "totalRaised",
        args: [],
        watch: true,
    }) as { data: BigInt | undefined | null }

    useEffect(() => {
        if (data !== undefined && data !== null) {
            setTotalRaised(data.valueOf())
        }
    }, [data])

    return totalRaised
}

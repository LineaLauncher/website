import { InvestmentContext } from "@/providers/InvestmentProvider"
import { useContext, useEffect, useState } from "react"
import { useAccount, useContractRead } from "wagmi"
import type { Project } from "@/types/project"

const abi = [
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "amountInvestedInRoundOne",
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
    {
        inputs: [
            {
                internalType: "address",
                name: "",
                type: "address",
            },
        ],
        name: "amountInvestedInRoundTwo",
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

function useUserInvestmentHelper(contractAddress: string, address: `0x${string}` | undefined) {
    const context = useContext(InvestmentContext)

    const [totalInvestedInRoundOne, setTotalInvestedInRoundOne] = useState<bigint | undefined>()
    const [totalInvestedInRoundTwo, setTotalInvestedInRoundTwo] = useState<bigint | undefined>()

    const roundOneInvestedWatcher = useContractRead({
        address: contractAddress as `0x${string}`,
        abi: abi,
        functionName: "amountInvestedInRoundOne",
        args: [address],
        watch: true,
    })

    const roundTwoInvestedWatcher = useContractRead({
        address: contractAddress as `0x${string}`,
        abi: abi,
        functionName: "amountInvestedInRoundTwo",
        args: [address],
        watch: true,
    })

    useEffect(() => {
        if (
            address !== undefined &&
            roundOneInvestedWatcher.data !== undefined &&
            roundTwoInvestedWatcher.data !== undefined
        ) {
            setTotalInvestedInRoundOne((roundOneInvestedWatcher.data as BigInt).valueOf())
            setTotalInvestedInRoundTwo((roundTwoInvestedWatcher.data as BigInt).valueOf())
        }
    }, [roundOneInvestedWatcher.data, roundTwoInvestedWatcher.data, address])

    return { perProjectInvestments: context, totalInvestedInRoundOne, totalInvestedInRoundTwo }
}

export default function useUserInvestment(
    project: Project,
    numToPaymentToken: (n: number) => bigint,
    paymentTokenToNum: (n: bigint | BigInt) => number
) {
    const [totalUserInvestment, setTotalUserInvestment] = useState<TotalUserInvestment | undefined>()

    const { address } = useAccount()

    const { perProjectInvestments, totalInvestedInRoundOne, totalInvestedInRoundTwo } = useUserInvestmentHelper(
        project.contractAddress,
        address
    )

    useEffect(() => {
        if (
            perProjectInvestments !== null &&
            perProjectInvestments[project.id] &&
            totalInvestedInRoundOne !== undefined &&
            totalInvestedInRoundTwo !== undefined
        ) {
            const publicRoundOne = project.publicRoundOneCap || 0
            // Don't remove BigInt()
            const merkleRoundOne = paymentTokenToNum(BigInt(perProjectInvestments[project.id].round1.maximum))

            const roundOneMax = project.publicRoundOne ? Math.max(publicRoundOne, merkleRoundOne) : merkleRoundOne
            const roundOneAlloType = roundOneMax === merkleRoundOne ? "merkle" : "public"

            const publicRoundTwo = project.publicRoundTwoCap || 0
            // Don't remove BigInt()
            const merkleRoundTwo = paymentTokenToNum(BigInt(perProjectInvestments[project.id].round2.maximum))

            const roundTwoMax = project.publicRoundTwo ? Math.max(publicRoundTwo, merkleRoundTwo) : merkleRoundTwo
            const roundTwoAlloType = roundTwoMax === merkleRoundTwo ? "merkle" : "public"

            setTotalUserInvestment({
                round1: {
                    maximum: {
                        number: roundOneMax,
                        bigint: numToPaymentToken(roundOneMax),
                    },
                    amount: {
                        bigint: totalInvestedInRoundOne,
                        number: paymentTokenToNum(totalInvestedInRoundOne),
                    },
                    alloType: roundOneAlloType,
                },
                round2: {
                    maximum: {
                        number: roundTwoMax,
                        bigint: numToPaymentToken(roundTwoMax),
                    },
                    amount: {
                        bigint: totalInvestedInRoundTwo,
                        number: paymentTokenToNum(totalInvestedInRoundTwo),
                    },
                    alloType: roundTwoAlloType,
                },
            })
        }
    }, [
        numToPaymentToken,
        paymentTokenToNum,
        perProjectInvestments,
        project.id,
        project.publicRoundOne,
        project.publicRoundOneCap,
        project.publicRoundTwo,
        project.publicRoundTwoCap,
        totalInvestedInRoundOne,
        totalInvestedInRoundTwo,
    ])

    return { totalUserInvestment, perProjectInvestments, totalInvestedInRoundOne, totalInvestedInRoundTwo }
}

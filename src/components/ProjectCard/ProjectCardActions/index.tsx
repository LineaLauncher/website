"use client"

import useConversion from "@/hooks/useConversion"
import useUserInvestment from "@/hooks/useUserInvestment"

import type { Project } from "@/types/project"
import { useEffect, useMemo, useState } from "react"
import { useAccount } from "wagmi"

type ProjectCardActionsProps = {
    project: Project
}

export default function ProjectCardActions({ project }: ProjectCardActionsProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [investmentText, setInvestmentText] = useState("Connect to view")
    const [allocationText, setAllocationText] = useState("Connect to view")

    const { numToPaymentToken, paymentTokenToNum } = useConversion()

    const { totalUserInvestment, totalInvestedInRoundOne, totalInvestedInRoundTwo } = useUserInvestment(
        project,
        numToPaymentToken,
        paymentTokenToNum
    )

    const { address } = useAccount()
    const isConnected = address !== undefined

    useEffect(() => {
        setIsMounted(true)
    }, [])

    const formattedInvestment = useMemo(() => {
        if (!totalUserInvestment) {
            return "..."
        }

        return `${totalUserInvestment.round1.amount.number + totalUserInvestment.round2.amount.number}/${
            totalUserInvestment.round1.maximum.number + totalUserInvestment.round2.maximum.number
        } USDC`
    }, [totalUserInvestment])

    useEffect(() => {
        if (isConnected) {
            if (totalUserInvestment) {
                setInvestmentText(formattedInvestment)
            } else {
                setInvestmentText("loading...")
            }
        }
    }, [isConnected, totalUserInvestment, formattedInvestment])

    useEffect(() => {
        if (isConnected) {
            if (totalUserInvestment) {
                setAllocationText(
                    `${totalUserInvestment.round1.maximum.number} & ${totalUserInvestment.round2.maximum.number}`
                )
            } else {
                setAllocationText("loading...")
            }
        }
    }, [isConnected, totalUserInvestment])

    return (
        <>
            <p>
                Your investment:{" "}
                <span className="font-bold">
                    {isMounted ? (!isConnected ? "Connect to view" : investmentText) : "Connect to view"}
                </span>
            </p>
            <p>
                Your allocation:{" "}
                <span className="font-bold">
                    {isMounted ? (!isConnected ? "Connect to view" : allocationText) : "Connect to view"}
                </span>
            </p>
            <p>Vesting: {project.vesting}</p>
        </>
    )

    // return (
    //     <>
    //         <p>
    //             Your investment:{" "}
    //             <span className="font-bold">{!isConnected ? "Connect to view" : formattedInvestment}</span>
    //         </p>
    // <p>
    //     Your allocation:{" "}
    //     <span className="font-bold">
    //         {totalUserInvestment
    //             ? `${numberFormatFunction(
    //                   totalUserInvestment?.round1.maximum,
    //                   project.paymentTokenDecimals
    //               )}/${numberFormatFunction(totalUserInvestment?.round2.maximum, project.paymentTokenDecimals)}`
    //             : "Connect to view"}
    //     </span>
    // </p>
    //         {isConnected ? (
    //             renderInvestmentInput
    //         ) : (
    //             <div className="flex justify-center items-center rounded-md m-auto">
    //                 <ConnectButton />
    //             </div>
    //         )}
    //     </>
    // )
}

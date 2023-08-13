"use client"

import type { Project } from "@/types/project"
import { ConnectButton } from "@rainbow-me/rainbowkit"
import { useEffect, useMemo, useState } from "react"
import { useAccount } from "wagmi"

import useConversion from "@/hooks/useConversion"
import useTimer from "@/hooks/useTimer"
import useUserInvestment from "@/hooks/useUserInvestment"
import InvestmentInput from "./InvestmentInput"
import SaleEndedBox from "./InvestmentInput/SaleEndedBox"

type ProjectCardActionsProps = {
    project: Project
}

export default function ProjectCardActions({ project }: ProjectCardActionsProps) {
    const [isMounted, setIsMounted] = useState(false)
    const [investmentText, setInvestmentText] = useState("Connect to view")
    const [allocationText, setAllocationText] = useState("Connect to view")

    const { numToPaymentToken, paymentTokenToNum } = useConversion()

    const { status } = useTimer(project.roundOneStartDate, project.roundTwoStartDate, project.saleEndDate)

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

    const renderInvestmentInput = useMemo(() => {
        if (totalUserInvestment === undefined) {
            return (
                <div className="flex items-center space-x-2">
                    <div className="flex items-center border-2 border-gray-800 rounded-md p-2 w-full bg-black">
                        <span>Loading...</span>
                    </div>
                    <button
                        className="rounded-md px-4 py-2 border-2 border-r-4 border-transparent transition-all duration-100 ease-in-out hover:border-white hover:border-r-4 hover:-translate-x-1 hover:translate-y-1"
                        disabled={true}
                    >
                        Invest
                    </button>
                </div>
            )
        }

        if (status === "saleNotStarted" || status === "roundOneSaleStarted") {
            if (totalUserInvestment.round1.maximum.number.toString() === "0") {
                return (
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center m-auto justify-center border-2 border-gray-800 rounded-md p-2 w-full bg-black">
                            <span className="text-sm text-center">You have no allocation for this round</span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <InvestmentInput project={project} saleStatus={status} totalUserInvestment={totalUserInvestment} />
                )
            }
        }

        if (status === "roundTwoSaleStarted") {
            if (totalUserInvestment.round2.maximum.number.toString() === "0") {
                return (
                    <div className="flex items-center space-x-2">
                        <div className="flex items-center m-auto justify-center border-2 border-gray-800 rounded-md p-2 w-full bg-black">
                            <span className="text-sm text-center">You have no allocation for this round</span>
                        </div>
                    </div>
                )
            } else {
                return (
                    <InvestmentInput project={project} saleStatus={status} totalUserInvestment={totalUserInvestment} />
                )
            }
        }

        return <SaleEndedBox project={project} />
    }, [project, status, totalUserInvestment])

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
            {isConnected ? (
                renderInvestmentInput
            ) : (
                <div className="flex justify-center items-center rounded-md m-auto">
                    <ConnectButton />
                </div>
            )}
        </>
    )
}

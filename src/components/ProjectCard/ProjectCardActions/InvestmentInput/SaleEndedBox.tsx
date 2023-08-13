"use client"

import { useCallback, useMemo, useState } from "react"
import { writeContract } from "wagmi/actions"
import { Project } from "@/types/project"

import localizeNumber from "@/utils/localizeNumber"
import useWithdraw from "@/hooks/useWithdraw"
import useTotalOwed from "@/hooks/useTotalOwed"
import useSingleTimer from "@/hooks/useSingleTimer"
import useConversion from "@/hooks/useConversion"
import useTransactionBox from "@/hooks/useTransactionBox"

const WITHDRAW_VESTED_TOKENS_ABI = [
    {
        inputs: [],
        name: "withdrawVestedTokens",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

const REFUND_ABI = [
    {
        inputs: [],
        name: "refund",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

const fixedRemoveZeros = (num: number) => {
    const fixed = num.toFixed(1)
    if (fixed.endsWith(".0")) {
        return fixed.slice(0, fixed.length - 2)
    }
    return fixed
}

type SaleEndedBoxProps = {
    project: Project
}

const SaleEndedBox = ({ project }: SaleEndedBoxProps) => {
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipStyle, setTooltipStyle] = useState({})
    const [tooltipText, setTooltipText] = useState("")

    const { currentlyWithdrawable: currentlyWithdrawableBigInt, totalClaimed: totalClaimedBigInt } = useWithdraw(
        project.contractAddress
    )

    const { projectTokenToNum } = useConversion()
    const { appendTransaction } = useTransactionBox()

    const totalOwedBigInt = useTotalOwed(project.contractAddress)

    const nextTimestampIndex = project.vestingTimestamps.findIndex(timestamp => timestamp.getTime() > Date.now())
    const nextTimestamp = project.vestingTimestamps[nextTimestampIndex]
    const nextReleasePercentage = project.vestingReleasePercentages[nextTimestampIndex]

    const withdrawTimeLeftString = useSingleTimer(nextTimestamp)

    const handleWithdraw = useCallback(() => {
        writeContract({
            address: project.contractAddress as `0x${string}`,
            abi: WITHDRAW_VESTED_TOKENS_ABI,
            functionName: "withdrawVestedTokens",
            args: [],
        }).then(hash => appendTransaction({ hash: hash.hash, message: "Sent withdrawal transaction" }))
    }, [project.contractAddress, appendTransaction])

    const handleRefund = useCallback(() => {
        writeContract({
            address: project.contractAddress as `0x${string}`,
            abi: REFUND_ABI,
            functionName: "refund",
            args: [],
        }).then(hash => appendTransaction({ hash: hash.hash, message: "Sent refund transaction" }))
    }, [project.contractAddress, appendTransaction])

    const renderWithdraw = useMemo(() => {
        if (currentlyWithdrawableBigInt === undefined || totalOwedBigInt === undefined) {
            return (
                <div className="flex items-center space-x-2">
                    <div className="flex items-center m-auto justify-center border-2 border-gray-800 rounded-md p-2 w-full bg-black">
                        <span className="text-sm text-center">Loading...</span>
                    </div>
                </div>
            )
        } else if (projectTokenToNum(totalOwedBigInt) === 0) {
            return (
                <div className="flex items-center space-x-2">
                    <div className="flex items-center m-auto justify-center border-2 border-gray-800 rounded-md p-2 w-full bg-black">
                        <span className="text-sm text-center">You have not invested in this project</span>
                    </div>
                </div>
            )
        } else if (projectTokenToNum(currentlyWithdrawableBigInt) === 0) {
            return (
                <button className="text-sm font-bold w-full rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black">
                    Withdraw {fixedRemoveZeros(nextReleasePercentage / 10)}% in {withdrawTimeLeftString}
                </button>
            )
        } else {
            return (
                <button
                    className="font-bold w-1/2 rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black"
                    onClick={handleWithdraw}
                >
                    Withdraw {localizeNumber(projectTokenToNum(currentlyWithdrawableBigInt))} ${project.ticker}
                </button>
            )
        }
    }, [
        currentlyWithdrawableBigInt,
        totalOwedBigInt,
        projectTokenToNum,
        nextReleasePercentage,
        withdrawTimeLeftString,
        handleWithdraw,
        project.ticker,
    ])

    const maximumRefundTimeString = useSingleTimer(project.maximumRefundTime)

    const renderRefund = useMemo(() => {
        const now = new Date()
        if (totalClaimedBigInt === undefined) {
            return (
                <div className="flex items-center space-x-2">
                    <div className="flex items-center m-auto justify-center border-2 border-gray-800 rounded-md p-2 w-full bg-black">
                        <span className="text-sm text-center">Loading...</span>
                    </div>
                </div>
            )
        } else if (!project.allowsRefund) {
            setTooltipText("Refunds are not available for this project")
            return (
                <button
                    className="text-sm w-full rounded-md px-4 py-2 border-2 border-gray-800 transition-all ease-in-out cursor-not-allowed"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onMouseMove={e =>
                        setTooltipStyle({
                            left: `${e.pageX + 10}px`,
                            top: `${e.pageY + 10}px`,
                        })
                    }
                >
                    Refund Unavailable
                </button>
            )
        } else if (now > project.maximumRefundTime) {
            setTooltipText("Refund deadline has passed")
            return (
                <button
                    className="text-sm w-full rounded-md px-4 py-2 border-2 border-gray-800 transition-all ease-in-out cursor-not-allowed"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onMouseMove={e =>
                        setTooltipStyle({
                            left: `${e.pageX + 10}px`,
                            top: `${e.pageY + 10}px`,
                        })
                    }
                >
                    Refund Unavailable
                </button>
            )
        } else if (projectTokenToNum(totalClaimedBigInt) > 0) {
            setTooltipText("Previous claims disable refunds")
            return (
                <button
                    className="text-sm w-full rounded-md px-4 py-2 border-2 border-gray-800 transition-all ease-in-out cursor-not-allowed"
                    onMouseEnter={() => setShowTooltip(true)}
                    onMouseLeave={() => setShowTooltip(false)}
                    onMouseMove={e =>
                        setTooltipStyle({
                            left: `${e.pageX + 10}px`,
                            top: `${e.pageY + 10}px`,
                        })
                    }
                >
                    Refund Unavailable
                </button>
            )
        } else {
            return (
                <button
                    className="text-sm font-bold w-full rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black"
                    onClick={handleRefund}
                >
                    Refund deadline passes in {maximumRefundTimeString}
                </button>
            )
        }
    }, [
        totalClaimedBigInt,
        project.allowsRefund,
        project.maximumRefundTime,
        projectTokenToNum,
        handleRefund,
        maximumRefundTimeString,
    ])

    return (
        <div className="flex flex-col space-y-4">
            <p>
                Total:{" "}
                {totalClaimedBigInt !== undefined ? localizeNumber(projectTokenToNum(totalClaimedBigInt)) : "..."}/
                {totalOwedBigInt !== undefined ? localizeNumber(projectTokenToNum(totalOwedBigInt)) : "..."} $
                {project.ticker}
            </p>
            <div className="flex flex-col items-center space-y-2 m-auto justify-center w-full px-4">
                {renderWithdraw}
                {!(currentlyWithdrawableBigInt === undefined || totalOwedBigInt === undefined) &&
                    projectTokenToNum(totalOwedBigInt) !== 0 &&
                    renderRefund}
                {showTooltip && (
                    <div
                        style={tooltipStyle}
                        className="absolute bg-gray-950 text-white p-1 rounded flex flex-row gap-x-1"
                    >
                        {tooltipText}
                    </div>
                )}
            </div>
        </div>
    )
}

export default SaleEndedBox

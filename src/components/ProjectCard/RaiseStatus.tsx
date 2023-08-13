"use client"

import { Project } from "@/types/project"

import useTotalRaised from "@/hooks/useTotalRaised"
import localizeNumber from "@/utils/localizeNumber"
import useConversion from "@/hooks/useConversion"

type RaiseStatusProps = {
    project: Project
}

export default function RaiseStatus({ project }: RaiseStatusProps) {
    const totalRaised = useTotalRaised(project.contractAddress)

    const { paymentTokenToNum } = useConversion()

    const raiseProgress =
        totalRaised !== undefined ? ((paymentTokenToNum(totalRaised) / project.totalRaising) * 100).toFixed(2) : "0"

    return (
        <>
            <div className="border-2 border-gray-800 rounded-lg p-1">
                <div
                    className="bg-green-400 rounded-lg h-1"
                    style={{ width: `${parseFloat(raiseProgress) > 100 ? "100" : raiseProgress}%` }}
                ></div>
            </div>
            <p>
                Raised: {`${totalRaised !== undefined ? localizeNumber(paymentTokenToNum(totalRaised)) : "..."}`} /{" "}
                {localizeNumber(project.totalRaising)} USDC
            </p>
        </>
    )
}

"use client"

import useTimer from "@/hooks/useTimer"
import { useEffect, useState } from "react"

type SaleStatusProps = {
    roundOneStartDate: Date
    roundTwoStartDate: Date
    saleEndDate: Date
}

const saleStatusText = (status: string) => {
    switch (status) {
        case "saleNotStarted":
            return "Upcoming"
        case "roundOneSaleStarted":
            return "Round 1 - Whitelist"
        case "roundTwoSaleStarted":
            return "Round 2 - FCFS"
        default:
            return "Completed"
    }
}

export default function SaleStatus({ roundOneStartDate, roundTwoStartDate, saleEndDate }: SaleStatusProps) {
    const { status, timeString } = useTimer(roundOneStartDate, roundTwoStartDate, saleEndDate)

    const [hasMounted, setHasMounted] = useState(false)

    useEffect(() => {
        setHasMounted(true)
    }, [])

    return (
        <>
            <p className="text-sm text-gray-500">Sale Status: {saleStatusText(status)}</p>
            <p className="text-sm text-gray-500">
                {status === "saleEnded" ? "Ended " : "Time left: "}
                <span className="text-gray-400 font-semibold">{hasMounted ? timeString : "0d 0h 0m 0s"}</span>
                {status === "saleEnded" && " ago"}
            </p>
        </>
    )
}

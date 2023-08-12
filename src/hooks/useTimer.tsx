import { useState, useEffect } from "react"

import SaleStatus from "@/types/salestatus"

const getSaleStatusAndTime = (
    roundOneStartDate: Date,
    roundTwoStartDate: Date,
    saleEndDate: Date
): { status: SaleStatus; time: number } => {
    const now = new Date().getTime()

    if (now < roundOneStartDate.getTime()) {
        return {
            status: "saleNotStarted",
            time: roundOneStartDate.getTime() - now,
        }
    } else if (now >= roundOneStartDate.getTime() && now < roundTwoStartDate.getTime()) {
        return {
            status: "roundOneSaleStarted",
            time: roundTwoStartDate.getTime() - now,
        }
    } else if (now >= roundTwoStartDate.getTime() && now < saleEndDate.getTime()) {
        return {
            status: "roundTwoSaleStarted",
            time: saleEndDate.getTime() - now,
        }
    } else {
        return {
            status: "saleEnded",
            time: now - saleEndDate.getTime(),
        }
    }
}

export default function useTimer(roundOneStartDate: Date, roundTwoStartDate: Date, saleEndDate: Date) {
    const calculateTimeLeft = (timeDifference: number) => {
        const days = Math.floor(timeDifference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((timeDifference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((timeDifference / (1000 * 60)) % 60)
        const seconds = Math.floor((timeDifference / 1000) % 60)

        return { days, hours, minutes, seconds }
    }

    const [timeLeft, setTimeLeft] = useState(getSaleStatusAndTime(roundOneStartDate, roundTwoStartDate, saleEndDate))

    useEffect(() => {
        const timer = setInterval(() => {
            setTimeLeft(getSaleStatusAndTime(roundOneStartDate, roundTwoStartDate, saleEndDate))
        }, 1000)

        return () => clearInterval(timer)
    }, [roundOneStartDate, roundTwoStartDate, saleEndDate])

    const timeComponents = calculateTimeLeft(timeLeft.time)
    const timeString = `${timeComponents.days}d ${timeComponents.hours}h ${timeComponents.minutes}m ${timeComponents.seconds}s`

    return { status: timeLeft.status, timeString }
}

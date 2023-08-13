import { useEffect, useState } from "react"

export default function useSingleTimer(endDate: Date) {
    const [timeLeft, setTimeLeft] = useState(endDate.getTime() - Date.now())

    useEffect(() => {
        if (timeLeft <= 0) {
            return
        }

        const timerId = setInterval(() => {
            setTimeLeft(endDate.getTime() - Date.now())
        }, 1000)

        return () => clearInterval(timerId)
    }, [endDate, timeLeft])

    const seconds = Math.floor((timeLeft / 1000) % 60) || 0
    const minutes = Math.floor((timeLeft / 1000 / 60) % 60) || 0
    const hours = Math.floor((timeLeft / (1000 * 60 * 60)) % 24) || 0
    const days = Math.floor(timeLeft / (1000 * 60 * 60 * 24)) || 0

    return `${days}d ${hours}h ${minutes}m ${seconds}s`
}

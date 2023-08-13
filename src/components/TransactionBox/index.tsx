"use client"

import { useEffect, useState } from "react"
import { useWaitForTransaction } from "wagmi"

const capitalizeFirstChar = (str: string) => str.charAt(0).toUpperCase() + str.slice(1)

interface TransactionBoxProps {
    message: string
    hash: string
    onRemove: () => void
}

export default function TransactionBox({ message, hash, onRemove }: TransactionBoxProps) {
    const [txStatus, setTxStatus] = useState<"pending" | "confirmed" | "failed">("pending")
    const [fadeOut, setFadeOut] = useState(false)
    const { data, isError, isLoading } = useWaitForTransaction({ hash: hash as `0x${string}` })

    let colorClass = "bg-gray-600"
    let icon: JSX.Element | undefined
    switch (txStatus) {
        case "pending":
            colorClass = "bg-gray-600"
            icon = <div className="spinner mr-2" />
            break
        case "confirmed":
            colorClass = "bg-green-600"
            break
        case "failed":
            colorClass = "bg-red-600"
            break
        default:
            break
    }

    useEffect(() => {
        if (isLoading) {
            setTxStatus("pending")
        } else if (isError) {
            setTxStatus("failed")
        } else if (data) {
            setTxStatus("confirmed")
            setTimeout(() => {
                setFadeOut(true)
            }, 2500)
        }
    }, [data, isError, isLoading])

    useEffect(() => {
        if (fadeOut) {
            setTimeout(onRemove, 1000)
        }
    }, [fadeOut, onRemove])

    return (
        <div
            className={`flex flex-col space-y-2 p-4 border-2 border-gray-800 rounded-lg ${colorClass} text-white ${
                fadeOut ? "fade-out" : ""
            }`}
            style={{ opacity: fadeOut ? 0 : 0.65 }}
        >
            <div className="flex flex-row space-x-2 m-auto items-center">
                {" "}
                {icon}
                <p className="text-md">{message}</p>
            </div>
            <p className="text-md">
                Status: {capitalizeFirstChar(txStatus)}
                {txStatus === "confirmed" && "!"}{" "}
            </p>{" "}
        </div>
    )
}

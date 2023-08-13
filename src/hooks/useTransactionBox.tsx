import { TransactionBoxContext } from "@/providers/TransactionBoxProvider"
import { useContext } from "react"

export default function useTransactionBox() {
    const context = useContext(TransactionBoxContext)

    if (context === undefined || context === null) {
        throw new Error("useTransactionBox must be used within a TransactionBoxProvider")
    }

    return context
}

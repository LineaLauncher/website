"use client"

import { Transaction } from "@/types/transaction"
import { createContext } from "react"

export const TransactionBoxContext = createContext<{
    appendTransaction: (transaction: Transaction) => void
} | null>(null)

type TransactionBoxProviderProps = {
    children: React.ReactNode
    appendTransaction: (transaction: Transaction) => void
}

export default function TransactionBoxProvider({ children, appendTransaction }: TransactionBoxProviderProps) {
    return <TransactionBoxContext.Provider value={{ appendTransaction }}>{children}</TransactionBoxContext.Provider>
}

"use client"

import { Transaction } from "@/types/transaction"
import { useCallback, useState } from "react"

import InvestmentProvider from "@/providers/InvestmentProvider"
import TransactionBoxProvider from "@/providers/TransactionBoxProvider"

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const appendTransaction = useCallback((transaction: Transaction) => {
        setTransactions(transactions => [...transactions, transaction])
    }, [])

    return (
        <InvestmentProvider>
            <TransactionBoxProvider appendTransaction={appendTransaction}>{children}</TransactionBoxProvider>
        </InvestmentProvider>
    )
}

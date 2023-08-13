"use client"

import { Transaction } from "@/types/transaction"
import { useCallback, useState } from "react"

import InvestmentProvider from "@/providers/InvestmentProvider"
import TransactionBoxProvider from "@/providers/TransactionBoxProvider"
import TransactionBox from "@/components/TransactionBox"

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    const [transactions, setTransactions] = useState<Transaction[]>([])

    const appendTransaction = useCallback((transaction: Transaction) => {
        setTransactions(transactions => [...transactions, transaction])
    }, [])

    const removeTransaction = useCallback((index: number) => {
        setTransactions(transactions => transactions.filter((_, i) => i !== index))
    }, [])

    return (
        <InvestmentProvider>
            <TransactionBoxProvider appendTransaction={appendTransaction}>{children}</TransactionBoxProvider>
            <div className="flex flex-col absolute right-10 bottom-10 space-y-4">
                {transactions.map((transaction, index) => (
                    <TransactionBox
                        key={index}
                        message={transaction.message}
                        hash={transaction.hash}
                        onRemove={() => removeTransaction(index)}
                    />
                ))}
            </div>
        </InvestmentProvider>
    )
}

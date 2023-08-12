"use client"

import { PerProjectInvestments } from "@/types/perprojectinvestments"
import { createContext, useEffect, useState } from "react"
import { useAccount } from "wagmi"

export const InvestmentContext = createContext<PerProjectInvestments | null>(null)

type InvestmentProviderProps = {
    children: React.ReactNode
}

export default function InvestmentProvider({ children }: InvestmentProviderProps) {
    const [perProjectInvestments, setPerProjectInvestments] = useState<PerProjectInvestments | null>(null)

    const { address } = useAccount()

    useEffect(() => {
        if (address) {
            fetchInvestments(address).then(setPerProjectInvestments)
        }
    }, [address])

    return <InvestmentContext.Provider value={perProjectInvestments}>{children}</InvestmentContext.Provider>
}

async function fetchInvestments(address: string): Promise<PerProjectInvestments | null> {
    const res = await fetch("/api/getPerProjectInvestments?address=" + address, {
        cache: "no-store",
    })

    return await res.json()
}

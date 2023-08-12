"use client"

import InvestmentProvider from "@/providers/InvestmentProvider"

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
    return <InvestmentProvider>{children}</InvestmentProvider>
}

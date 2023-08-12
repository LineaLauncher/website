"use client"

import { createContext, useMemo } from "react"

type ConversionProviderProps = {
    children: React.ReactNode
    paymentTokenDecimals: number
    projectTokenDecimals: number
}

export const ConversionContext = createContext<{
    paymentTokenToNum: (n: BigInt | bigint) => number
    numToPaymentToken: (n: number) => bigint
    projectTokenToNum: (n: BigInt | bigint) => number
    numToProjectToken: (n: number) => bigint
} | null>(null)

export default function ConversionProvider({
    children,
    paymentTokenDecimals,
    projectTokenDecimals,
}: ConversionProviderProps) {
    const paymentTokenToNum = useMemo(() => {
        return (n: BigInt | bigint) => {
            return Number(n.valueOf()) / 10 ** paymentTokenDecimals
        }
    }, [paymentTokenDecimals])

    const numToPaymentToken = useMemo(() => {
        return (n: number) => {
            return BigInt(n * 10 ** paymentTokenDecimals)
        }
    }, [paymentTokenDecimals])

    const projectTokenToNum = useMemo(() => {
        return (n: BigInt | bigint) => {
            return Number(n.valueOf()) / 10 ** projectTokenDecimals
        }
    }, [projectTokenDecimals])

    const numToProjectToken = useMemo(() => {
        return (n: number) => {
            return BigInt(n * 10 ** projectTokenDecimals)
        }
    }, [projectTokenDecimals])

    return (
        <ConversionContext.Provider
            value={{ paymentTokenToNum, numToPaymentToken, projectTokenToNum, numToProjectToken }}
        >
            {children}
        </ConversionContext.Provider>
    )
}

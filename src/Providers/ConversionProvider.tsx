"use client"

import memoize from "lodash.memoize"

import { createContext, useCallback, useMemo } from "react"

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
    const paymentTokenToNum = useCallback(
        (n: BigInt | bigint) => {
            const convert = memoize((value: BigInt | bigint) => Number(value.valueOf()) / 10 ** paymentTokenDecimals)
            return convert(n)
        },
        [paymentTokenDecimals]
    )

    const numToPaymentToken = useCallback(
        (n: number) => {
            const convert = memoize((value: number) => BigInt(value * 10 ** paymentTokenDecimals))
            return convert(n)
        },
        [paymentTokenDecimals]
    )

    const projectTokenToNum = useCallback(
        (n: BigInt | bigint) => {
            const convert = memoize((value: BigInt | bigint) => Number(value.valueOf()) / 10 ** projectTokenDecimals)
            return convert(n)
        },
        [projectTokenDecimals]
    )

    const numToProjectToken = useCallback(
        (n: number) => {
            const convert = memoize((value: number) => BigInt(value * 10 ** projectTokenDecimals))
            return convert(n)
        },
        [projectTokenDecimals]
    )

    return (
        <ConversionContext.Provider
            value={{ paymentTokenToNum, numToPaymentToken, projectTokenToNum, numToProjectToken }}
        >
            {children}
        </ConversionContext.Provider>
    )
}

"use client"

import { NextUIProvider } from "@nextui-org/react"

type WrappedNextUIProviderProps = {
    children: React.ReactNode
}
export default function WrappedNextUIProvider({ children }: WrappedNextUIProviderProps) {
    return <NextUIProvider>{children}</NextUIProvider>
}

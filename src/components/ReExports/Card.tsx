"use client"

import { Card as NextUICard } from "@nextui-org/react"

export default function Card({ children, ...props }: any) {
    return <NextUICard {...props}>{children}</NextUICard>
}

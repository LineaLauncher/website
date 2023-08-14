"use client"

import { Button as NextUIButton } from "@nextui-org/react"

export default function Button({ children, ...props }: any) {
    return <NextUIButton {...props}>{children}</NextUIButton>
}

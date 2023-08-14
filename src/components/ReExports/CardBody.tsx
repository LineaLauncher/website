"use client"

import { CardBody as NextUICardBody } from "@nextui-org/react"

export default function CardBody({ children, ...props }: any) {
    return <NextUICardBody {...props}>{children}</NextUICardBody>
}

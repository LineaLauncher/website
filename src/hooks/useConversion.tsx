import { ConversionContext } from "@/providers/ConversionProvider"
import { useContext } from "react"

export default function useConversion() {
    const context = useContext(ConversionContext)

    if (!context) {
        throw new Error("useConversion must be used within a ConversionProvider")
    }

    return context
}

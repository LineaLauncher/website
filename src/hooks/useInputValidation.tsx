import { useCallback } from "react"

import useConversion from "./useConversion"
import type SaleStatus from "@/types/salestatus"
import useTotalRaised from "./useTotalRaised"

export default function useValidation(
    userPaymentTokenBalance: bigint | undefined,
    paymentTokenDecimals: number,
    totalRaising: number,
    contractAddress: string,
    saleStatus: SaleStatus,
    totalUserInvestment: TotalUserInvestmentAndMerkle,
    currentInvestmentAmount: number,
    setCurrentInvestmentAmount: (amount: number) => void
) {
    const { paymentTokenToNum } = useConversion()

    const totalRaised = useTotalRaised(contractAddress)

    const maximumInvestableNumber =
        saleStatus == "roundOneSaleStarted"
            ? totalUserInvestment.round1.maximum.number - totalUserInvestment.round1.amount.number
            : totalUserInvestment.round2.maximum.number - totalUserInvestment.round2.amount.number

    const handleInputChange = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            const value = parseFloat(e.target.value)

            if (userPaymentTokenBalance !== undefined && totalRaised !== undefined) {
                const userPaymentTokenBalanceNum = paymentTokenToNum(userPaymentTokenBalance)

                const raised = paymentTokenToNum(totalRaised)
                const remaining = totalRaising - raised

                const minimum = Math.min(userPaymentTokenBalanceNum, maximumInvestableNumber, remaining)
                if (value > minimum) {
                    setCurrentInvestmentAmount(minimum)
                    e.target.value = minimum.toString()
                    return
                }
            } else {
                if (value > maximumInvestableNumber) {
                    setCurrentInvestmentAmount(maximumInvestableNumber)
                    e.target.value = maximumInvestableNumber.toString()
                    return
                }
            }

            setCurrentInvestmentAmount(isNaN(value) ? 0 : value)
        },
        [
            userPaymentTokenBalance,
            setCurrentInvestmentAmount,
            paymentTokenToNum,
            totalRaised,
            totalRaising,
            maximumInvestableNumber,
        ]
    )

    const valueChangeIsOk = useCallback(
        (value: number) => {
            if (userPaymentTokenBalance !== undefined) {
                const userPaymentTokenBalanceNum = paymentTokenToNum(userPaymentTokenBalance)

                const minimum = Math.min(userPaymentTokenBalanceNum, maximumInvestableNumber)
                if (value > minimum) {
                    return false
                }
            } else {
                if (value > maximumInvestableNumber) {
                    return false
                }
            }

            return true
        },
        [userPaymentTokenBalance, paymentTokenToNum, maximumInvestableNumber]
    )

    const onKeyDown = useCallback(
        (e: React.KeyboardEvent<HTMLInputElement>) => {
            if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.key === "ArrowLeft" || e.key === "ArrowRight") {
                return
            }

            if (e.key === "ArrowUp") {
                e.preventDefault()
                const newValue = currentInvestmentAmount + 1
                if (newValue <= maximumInvestableNumber && valueChangeIsOk(newValue)) {
                    setCurrentInvestmentAmount(newValue)
                    e.currentTarget.value = newValue.toString()
                }
                return
            }
            if (e.key === "ArrowDown") {
                e.preventDefault()
                const newValue = currentInvestmentAmount - 1
                if (newValue >= 0 && valueChangeIsOk(newValue)) {
                    setCurrentInvestmentAmount(newValue)
                    e.currentTarget.value = newValue.toString()
                }
                return
            }

            if (!((e.key >= "0" && e.key <= "9") || e.key === "." || e.key === "Backspace")) {
                e.preventDefault()
                return
            }

            const keyAddedValue = e.currentTarget.value + e.key
            if (keyAddedValue.indexOf(".") !== keyAddedValue.lastIndexOf(".")) {
                e.preventDefault()
                return
            }

            const split = keyAddedValue.split(".")
            if (split.length > 1 && split[1].length > paymentTokenDecimals) {
                if (e.key !== "Backspace") {
                    e.preventDefault()
                    return
                }
            }
        },
        [currentInvestmentAmount, maximumInvestableNumber, valueChangeIsOk, setCurrentInvestmentAmount]
    )

    return { handleInputChange, onKeyDown }
}

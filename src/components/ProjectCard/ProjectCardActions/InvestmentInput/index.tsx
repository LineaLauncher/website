"use client"

import type { Project } from "@/types/project"
import { useEffect, useRef, useState } from "react"

import type SaleStatus from "@/types/salestatus"
import InvestModal from "./InvestModal"
import InvestModalParams from "@/types/investmodalparams"
import useConversion from "@/hooks/useConversion"
import Image from "next/image"
import useInputValidation from "@/hooks/useInputValidation"
import useBalance from "@/hooks/useBalance"
import ApproveModal from "./ApproveModal"

const MERKLE_PURCHASE_ABI = [
    {
        internalType: "bytes32[]",
        name: "_proof",
        type: "bytes32[]",
    },
    {
        internalType: "uint256",
        name: "_maxAmount",
        type: "uint256",
    },
    {
        internalType: "uint256",
        name: "_amountPaymentTokensSent",
        type: "uint256",
    },
]

const PURCHASE_PUBLIC_ABI = [
    {
        inputs: [
            {
                internalType: "uint256",
                name: "_amountPaymentTokensSent",
                type: "uint256",
            },
        ],
        name: "purchasePublic",
        outputs: [],
        stateMutability: "nonpayable",
        type: "function",
    },
]

const buttonClass =
    "text-sm font-bold rounded-md w-full px-4 py-2 border-2 border-white transition-all duration-100 ease-in-out hover:bg-white hover:text-black"

type InvestmentInputProps = {
    project: Project
    saleStatus: SaleStatus
    totalUserInvestment: TotalUserInvestmentAndMerkle
}

export default function InvestmentInput({ project, saleStatus, totalUserInvestment }: InvestmentInputProps) {
    const [currentInvestmentAmount, setCurrentInvestmentAmount] = useState<number>(0)
    const [investModalParams, setInvestModalParams] = useState<null | InvestModalParams>(null)
    const [approveModalIsOpen, setApproveModalIsOpen] = useState(false)
    const [requiredMoreApproval, setRequiredMoreApproval] = useState<undefined | number>(undefined)

    const inputRef = useRef<HTMLInputElement>(null)

    const { numToPaymentToken, paymentTokenToNum } = useConversion()

    const { userAllowance, userPaymentTokenBalance, approveText, formattedAllowance } = useBalance(
        project.paymentTokenAddress,
        project.contractAddress,
        inputRef,
        currentInvestmentAmount,
        requiredMoreApproval,
        setCurrentInvestmentAmount
    )

    const { handleInputChange, onKeyDown } = useInputValidation(
        userPaymentTokenBalance,
        project.paymentTokenDecimals,
        project.totalRaising,
        project.contractAddress,
        saleStatus,
        totalUserInvestment,
        currentInvestmentAmount,
        setCurrentInvestmentAmount
    )

    useEffect(() => {
        if (userAllowance !== undefined) {
            const userAllowanceNum = paymentTokenToNum(userAllowance)
            const requiredAmount = currentInvestmentAmount - userAllowanceNum

            setRequiredMoreApproval(requiredAmount > 0 ? currentInvestmentAmount : undefined)
        }
    }, [currentInvestmentAmount, userAllowance, paymentTokenToNum])

    const enoughAllowance =
        userAllowance && // checks for 0 as well, don't change to !== undefined
        currentInvestmentAmount !== undefined &&
        userAllowance >= numToPaymentToken(currentInvestmentAmount)

    const handleMerkleInvest = (round: 1 | 2, proof: string[]) => {
        if (!currentInvestmentAmount) return // checks for 0

        const investArgs = {
            address: project.contractAddress as `0x${string}`,
            abi: MERKLE_PURCHASE_ABI,
            functionName: "purchaseWithMerkleProof",
            args: [
                proof,
                round === 1 ? totalUserInvestment.round1.maximum.bigint : totalUserInvestment.round2.maximum.bigint,
                numToPaymentToken(currentInvestmentAmount),
            ],
        }

        setInvestModalParams({
            investArgs,
            round,
            amount: currentInvestmentAmount,
            name: project.name,
        })
    }

    const handlePublicInvest = () => {
        if (!currentInvestmentAmount) return // checks for 0

        setInvestModalParams({
            investArgs: {
                address: project.contractAddress as `0x${string}`,
                abi: PURCHASE_PUBLIC_ABI,
                functionName: "purchasePublic",
                args: [numToPaymentToken(currentInvestmentAmount)],
            },
            amount: currentInvestmentAmount,
            name: project.name,
        })
    }

    const investmentInput = (
        <div className="flex items-center border-2 border-gray-800 rounded-md p-2 w-4/5 bg-black">
            <Image src={project.paymentTokenLogo} width={24} height={24} alt={`${project.paymentTokenTicker} logo`} />
            <input
                type="text"
                className="bg-black text-white w-3/4 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                placeholder="Amount"
                onChange={handleInputChange}
                onKeyDown={onKeyDown}
                ref={inputRef}
            />
        </div>
    )

    const investmentOrApproveButton = () => {
        if (saleStatus === "saleNotStarted") {
            return (
                <button className={buttonClass} onClick={() => setApproveModalIsOpen(true)}>
                    {`Approve USDC - Current Allowance: ${formattedAllowance}`}
                </button>
            )
        }

        if (saleStatus === "roundOneSaleStarted") {
            if (totalUserInvestment.round1.alloType === "merkle") {
                if (totalUserInvestment.round1.proof === undefined) {
                    return (
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center m-auto justify-center border-2 border-gray-800 rounded-md p-2 w-full bg-black">
                                <span className="text-sm text-center">
                                    You have an allocation for this round, but your Merkle proofs cannot be found.
                                    Please refresh the page.
                                </span>
                            </div>
                        </div>
                    )
                }

                if (enoughAllowance) {
                    return (
                        <>
                            {investmentInput}
                            <button
                                className="font-bold w-1/2 rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black"
                                onClick={() => handleMerkleInvest(1, totalUserInvestment.round1.proof!)}
                            >
                                Invest
                            </button>
                        </>
                    )
                } else {
                    return (
                        <>
                            {investmentInput}
                            <button className={buttonClass} onClick={() => setApproveModalIsOpen(true)}>
                                {approveText}
                            </button>
                        </>
                    )
                }
            } else {
                if (enoughAllowance) {
                    return (
                        <>
                            {investmentInput}
                            <button
                                className="font-bold w-1/2 rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black"
                                onClick={() => handlePublicInvest()}
                            >
                                Invest
                            </button>
                        </>
                    )
                } else {
                    return (
                        <>
                            {investmentInput}
                            <button className={buttonClass} onClick={() => setApproveModalIsOpen(true)}>
                                {approveText}
                            </button>
                        </>
                    )
                }
            }
        }

        if (saleStatus === "roundTwoSaleStarted") {
            if (totalUserInvestment.round2.alloType === "merkle") {
                if (totalUserInvestment.round2.proof === undefined) {
                    return (
                        <div className="flex items-center space-x-2">
                            <div className="flex items-center m-auto justify-center border-2 border-gray-800 rounded-md p-2 w-full bg-black">
                                <span className="text-sm text-center">
                                    You have an allocation for this round, but your Merkle proofs cannot be found.
                                    Please refresh the page.
                                </span>
                            </div>
                        </div>
                    )
                }

                if (enoughAllowance) {
                    return (
                        <>
                            {investmentInput}
                            <button
                                className="font-bold w-1/2 rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black"
                                onClick={() => handleMerkleInvest(1, totalUserInvestment.round2.proof!)}
                            >
                                Invest
                            </button>
                        </>
                    )
                } else {
                    return (
                        <>
                            {investmentInput}
                            <button className={buttonClass} onClick={() => setApproveModalIsOpen(true)}>
                                {approveText}
                            </button>
                        </>
                    )
                }
            } else {
                if (enoughAllowance) {
                    return (
                        <>
                            {investmentInput}
                            <button
                                className="font-bold w-1/2 rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black"
                                onClick={() => handlePublicInvest()}
                            >
                                Invest
                            </button>
                        </>
                    )
                } else {
                    return (
                        <>
                            {investmentInput}
                            <button className={buttonClass} onClick={() => setApproveModalIsOpen(true)}>
                                {approveText}
                            </button>
                        </>
                    )
                }
            }
        }
    }

    return (
        <div className="flex flex-row items-center space-x-2">
            <ApproveModal
                modalIsOpen={approveModalIsOpen}
                setModalIsOpen={setApproveModalIsOpen}
                maximumInvestment={
                    totalUserInvestment.round1.maximum.number + totalUserInvestment.round2.maximum.number
                }
                defaultAmount={requiredMoreApproval}
                tokenDecimals={project.paymentTokenDecimals}
                contractAddress={project.paymentTokenAddress}
                paymentTokenLogo={project.paymentTokenLogo}
                paymentTokenTicker={project.paymentTokenTicker}
                paymentTokenAddress={project.paymentTokenAddress}
            />
            {investModalParams !== null && (
                <InvestModal
                    modalIsOpen={investModalParams !== null}
                    resetInvestment={() => setInvestModalParams(null)}
                    investmentParams={investModalParams}
                />
            )}

            {investmentOrApproveButton()}
        </div>
    )
}

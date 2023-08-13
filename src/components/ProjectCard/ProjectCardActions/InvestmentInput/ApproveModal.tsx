"use client"

import Modal from "react-modal"
import Image from "next/image"
import localizeNumber from "@/utils/localizeNumber"
import useConversion from "@/hooks/useConversion"
import useTransactionBox from "@/hooks/useTransactionBox"

import { writeContract } from "wagmi/actions"
import { useEffect, useState } from "react"

const APPROVE_ABI = [
    {
        constant: false,
        inputs: [
            {
                name: "_spender",
                type: "address",
            },
            {
                name: "_value",
                type: "uint256",
            },
        ],
        name: "approve",
        outputs: [
            {
                name: "",
                type: "bool",
            },
        ],
        payable: false,
        stateMutability: "nonpayable",
        type: "function",
    },
]

Modal.setAppElement("html")

interface ApproveModalProps {
    modalIsOpen: boolean
    setModalIsOpen: (modalIsOpen: boolean) => void
    maximumInvestment: number
    defaultAmount?: number
    tokenDecimals: number
    contractAddress: string
    paymentTokenLogo: string
    paymentTokenTicker: string
    paymentTokenAddress: string
}

const ApproveModal = ({
    modalIsOpen,
    setModalIsOpen,
    maximumInvestment,
    defaultAmount,
    tokenDecimals,
    contractAddress,
    paymentTokenLogo,
    paymentTokenTicker,
    paymentTokenAddress,
}: ApproveModalProps) => {
    const [approveAmount, setApproveAmount] = useState(0)

    const { appendTransaction } = useTransactionBox()
    const { numToPaymentToken } = useConversion()

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = parseFloat(e.target.value)

        setApproveAmount(isNaN(value) ? 0 : value)
    }

    const handleApprove = () => {
        const approvalParams = {
            address: paymentTokenAddress as `0x${string}`,
            abi: APPROVE_ABI,
            functionName: "approve",
            args: [contractAddress, numToPaymentToken(approveAmount)],
        }

        writeContract({
            address: approvalParams.address,
            abi: approvalParams.abi as any[],
            functionName: approvalParams.functionName,
            args: approvalParams.args,
        }).then(hash => {
            appendTransaction({ hash: hash.hash, message: "Sent approval transaction" })
            setApproveAmount(0)
            setModalIsOpen(false)
        })
    }

    const handleApproveInfinite = () => {
        writeContract({
            address: paymentTokenAddress as `0x${string}`,
            abi: APPROVE_ABI,
            functionName: "approve",
            args: [contractAddress, "0xffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff"],
        }).then(hash => {
            appendTransaction({ hash: hash.hash, message: "Sent approval transaction" })
            setApproveAmount(0)
            setModalIsOpen(false)
        })
    }

    const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.ctrlKey || e.metaKey || e.altKey || e.shiftKey || e.key === "ArrowLeft" || e.key === "ArrowRight") {
            return
        }

        if (e.key === "ArrowUp") {
            e.preventDefault()
            const newValue = approveAmount + 1
            if (newValue <= maximumInvestment) {
                setApproveAmount(newValue)
                e.currentTarget.value = newValue.toString()
            }
            return
        }
        if (e.key === "ArrowDown") {
            e.preventDefault()
            const newValue = approveAmount - 1
            if (newValue >= 0) {
                setApproveAmount(newValue)
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
        if (split.length > 1 && split[1].length > tokenDecimals) {
            if (e.key !== "Backspace") {
                e.preventDefault()
                return
            }
        }
    }

    useEffect(() => {
        setApproveAmount(defaultAmount ? defaultAmount : 0)
    }, [defaultAmount])

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => {
                setModalIsOpen(false)
            }}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                    color: "white",
                    backgroundColor: "black",
                    margin: "auto",
                    height: "min(calc(75vh - 80px), 250px)",
                    width: "min(90%, 500px)",
                    minWidth: "25%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                    overflow: "scroll",
                    left: "25px",
                    right: "25px",
                },
            }}
        >
            <svg
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => {
                    setModalIsOpen(false)
                }}
                className="absolute top-2 right-2 h-6 w-6 cursor-pointer hover:scale-110 transition-all duration-300"
            >
                <g strokeWidth="0" />
                <g strokeLinecap="round" strokeLinejoin="round" />
                <path
                    d="m3 21.32 18-18m-18 0 18 18"
                    stroke="#fff"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
            <div className="flex flex-col space-y-2">
                <h2 className="text-center">Round 1 + 2 Allocation: {maximumInvestment}</h2>
                <p className="text-gray-400 text-center">This action will set the approval, not increase it!</p>
                <div className="flex items-center space-x-2 border-2 border-gray-800 rounded-md p-2 bg-black">
                    <Image src={paymentTokenLogo} width={24} height={24} alt={`${paymentTokenTicker} logo`} />
                    <input
                        type="text"
                        className="bg-black text-white w-3/4 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                        placeholder="Amount"
                        onChange={handleInputChange}
                        onKeyDown={onKeyDown}
                        defaultValue={defaultAmount}
                    />
                </div>
                <div className="flex items-center justify-center flex-row space-x-2">
                    <button
                        className="text-xs font-bold rounded-md px-4 py-2 border-2 border-white transition-all duration-100 ease-in-out hover:bg-white hover:text-black"
                        onClick={handleApproveInfinite}
                    >
                        Approve Infinite
                    </button>
                    <button
                        className="text-xs font-bold rounded-md px-4 py-2 border-2 border-white transition-all duration-100 ease-in-out hover:bg-white hover:text-black"
                        onClick={handleApprove}
                    >
                        Approve {localizeNumber(approveAmount)}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ApproveModal

"use client"

import { writeContract } from "wagmi/actions"

import Modal from "react-modal"
import InvestModalParams from "@/types/investmodalparams"
import useTransactionBox from "@/hooks/useTransactionBox"

Modal.setAppElement("html")

interface InvestmentModalProps {
    modalIsOpen: boolean
    resetInvestment: () => void
    investmentParams: InvestModalParams
}

const InvestModal = ({ modalIsOpen, resetInvestment, investmentParams }: InvestmentModalProps) => {
    const { appendTransaction } = useTransactionBox()

    const handleInvest = () => {
        writeContract(investmentParams.investArgs).then(hash => {
            appendTransaction({ hash: hash.hash, message: "Sent investment transaction" })
            resetInvestment()
        })
    }

    return (
        <Modal
            isOpen={modalIsOpen}
            onRequestClose={() => resetInvestment()}
            style={{
                overlay: {
                    backgroundColor: "rgba(0, 0, 0, 0.5)",
                },
                content: {
                    color: "white",
                    backgroundColor: "black",
                    margin: "auto",
                    height: "min(calc(75vh - 80px), 200px)",
                    width: "min(90%, 350px)",
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
            // className="md:w-1/4"
            // className="bg-opacity-50 text-white bg-black m-auto w-1/4 h-1/4 flex flex-col justify-center items-center overflow-scroll"
        >
            <svg
                viewBox="-0.5 0 25 25"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                onClick={() => resetInvestment()}
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
                <h2 className="text-center">
                    You are investing {investmentParams.amount} USDC to {investmentParams.name}{" "}
                    {investmentParams.round && `on Round ${investmentParams.round}`}
                </h2>
                <div className="flex items-center justify-center flex-row space-x-2">
                    <button
                        className="text-xs font-bold rounded-md px-4 py-2 border-2 border-white transition-all duration-100 ease-in-out hover:bg-white hover:text-black"
                        onClick={() => resetInvestment()}
                    >
                        Go Back
                    </button>
                    <button
                        className="text-xs font-bold rounded-md px-4 py-2 border-2 border-white transition-all duration-100 ease-in-out hover:bg-white hover:text-black"
                        onClick={handleInvest}
                    >
                        Invest
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default InvestModal

"use client"

import { FaCoins } from "@react-icons/all-files/fa/FaCoins"
import { PieChart } from "react-minimal-pie-chart"
import { useMemo, useState } from "react"

import Modal from "react-modal"
import clsx from "clsx"

Modal.setAppElement("html")

type TokenomicsProps = {
    className?: string
    tokenomics: Tokenomics[]
}

const colors = ["#86EAE9", "#8CC2E9", "#7775AF", "#9F3B93", "#8EE6FF", "#7E97C3", "#855AA5", "#A90062"]

export default function Tokenomics({ className, tokenomics }: TokenomicsProps) {
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipStyle, setTooltipStyle] = useState({})
    const [modalIsOpen, setModalIsOpen] = useState(false)

    const tokenomicsData = useMemo(() => {
        return tokenomics.map((tokenomic, index) => {
            return {
                title: tokenomic.title,
                value: tokenomic.value,
                color: colors[index % colors.length],
            }
        })
    }, [tokenomics])

    const handleMouseEnter = () => {
        setShowTooltip(true)
    }

    const handleMouseLeave = () => {
        setShowTooltip(false)
    }

    const handleMouseMove = (e: any) => {
        setTooltipStyle({
            left: `${e.pageX + 10}px`,
            top: `${e.pageY + 10}px`,
        })
    }

    return (
        <div className={clsx(className)}>
            <FaCoins
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
                onMouseMove={handleMouseMove}
                className="cursor-pointer hover:scale-125 transition-all duration-300 ease-in-out"
                onClick={() => setModalIsOpen(true)}
            />
            {showTooltip && (
                <div style={tooltipStyle} className="absolute bg-gray-950 text-white p-1 rounded">
                    Open Tokenomics
                </div>
            )}
            <Modal
                isOpen={modalIsOpen}
                onRequestClose={() => setModalIsOpen(false)}
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
            >
                <svg
                    viewBox="-0.5 0 25 25"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    onClick={() => setModalIsOpen(false)}
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
                <div className="flex flex-row space-x-4 p-4">
                    <PieChart
                        data={tokenomicsData}
                        radius={32}
                        lineWidth={25}
                        segmentsStyle={{
                            transition: "stroke .3s",
                            cursor: "pointer",
                        }}
                        animate
                        label={({ dataEntry }) => Math.round(dataEntry.percentage) + "%"}
                        labelStyle={{
                            fontSize: "5px",
                            fontFamily: "__Roboto_Mono_bbf4d0",
                            fill: "#ffffff",
                        }}
                        labelPosition={112}
                    />
                    <div className="flex flex-col space-y-2 m-auto text-xs">
                        {tokenomicsData.map((entry, index) => (
                            <div key={index} className="flex items-center mb-2">
                                <div
                                    style={{
                                        width: "20px",
                                        height: "20px",
                                        backgroundColor: entry.color,
                                    }}
                                    className="mr-2"
                                ></div>
                                <p>{entry.title}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </Modal>
        </div>
    )
}

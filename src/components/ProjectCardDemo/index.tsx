"use client"

import { useEffect, useState } from "react"

import localizeNumber from "@/utils/localizeNumber"
import Tokenomics from "../ProjectCard/ProjectCardHead/ProjectInfoIcons/Tokenomics"
import OpenSite from "../ProjectCard/ProjectCardHead/ProjectInfoIcons/OpenSite"

const USDC_SVG = (
    <svg
        data-name="86977684-12db-4850-8f30-233a7c267d11"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 2000 2000"
        className="w-6 h-6 mr-2"
    >
        <path
            d="M1000 2000c554.17 0 1000-445.83 1000-1000S1554.17 0 1000 0 0 445.83 0 1000s445.83 1000 1000 1000z"
            fill="#2775ca"
        />
        <path
            d="M1275 1158.33c0-145.83-87.5-195.83-262.5-216.66-125-16.67-150-50-150-108.34s41.67-95.83 125-95.83c75 0 116.67 25 137.5 87.5 4.17 12.5 16.67 20.83 29.17 20.83h66.66c16.67 0 29.17-12.5 29.17-29.16v-4.17c-16.67-91.67-91.67-162.5-187.5-170.83v-100c0-16.67-12.5-29.17-33.33-33.34h-62.5c-16.67 0-29.17 12.5-33.34 33.34v95.83c-125 16.67-204.16 100-204.16 204.17 0 137.5 83.33 191.66 258.33 212.5 116.67 20.83 154.17 45.83 154.17 112.5s-58.34 112.5-137.5 112.5c-108.34 0-145.84-45.84-158.34-108.34-4.16-16.66-16.66-25-29.16-25h-70.84c-16.66 0-29.16 12.5-29.16 29.17v4.17c16.66 104.16 83.33 179.16 220.83 200v100c0 16.66 12.5 29.16 33.33 33.33h62.5c16.67 0 29.17-12.5 33.34-33.33v-100c125-20.84 208.33-108.34 208.33-220.84z"
            fill="#fff"
        />
        <path
            d="M787.5 1595.83c-325-116.66-491.67-479.16-370.83-800 62.5-175 200-308.33 370.83-370.83 16.67-8.33 25-20.83 25-41.67V325c0-16.67-8.33-29.17-25-33.33-4.17 0-12.5 0-16.67 4.16-395.83 125-612.5 545.84-487.5 941.67 75 233.33 254.17 412.5 487.5 487.5 16.67 8.33 33.34 0 37.5-16.67 4.17-4.16 4.17-8.33 4.17-16.66v-58.34c0-12.5-12.5-29.16-25-37.5zm441.67-1300c-16.67-8.33-33.34 0-37.5 16.67-4.17 4.17-4.17 8.33-4.17 16.67v58.33c0 16.67 12.5 33.33 25 41.67 325 116.66 491.67 479.16 370.83 800-62.5 175-200 308.33-370.83 370.83-16.67 8.33-25 20.83-25 41.67V1700c0 16.67 8.33 29.17 25 33.33 4.17 0 12.5 0 16.67-4.16 395.83-125 612.5-545.84 487.5-941.67-75-237.5-258.34-416.67-487.5-491.67z"
            fill="#fff"
        />
    </svg>
)

const ETH_SVG = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlSpace="preserve"
        viewBox="255.38 115.68 731.62 731.62"
        className="w-12 h-12"
    >
        <style>{"\n    .st1{fill-opacity:.602}.st1,.st2{fill:#fff}\n  "}</style>
        <g transform="translate(.4)">
            <circle
                cx={620.8}
                cy={481.5}
                r={365.8}
                style={{
                    fill: "#627eea",
                }}
            />
            <path className="st1" d="M632.2 207.1v202.8l171.4 76.6z" />
            <path className="st2" d="M632.2 207.1 460.8 486.5l171.4-76.6z" />
            <path className="st1" d="M632.2 617.9v137.8l171.5-237.3z" />
            <path className="st2" d="M632.2 755.7V617.9l-171.4-99.5z" />
            <path
                style={{
                    fill: "#fff",
                    fillOpacity: 0.2,
                }}
                d="m632.2 586 171.4-99.5-171.4-76.6z"
            />
        </g>
        <path className="st1" d="M461.2 486.5 632.6 586V409.9z" />
    </svg>
)

const getSaleStatus = (step: number | undefined) => {
    if (!step) return "Round 1 - Whitelist"
    if (step >= 2 && step <= 9) return "Upcoming"
    if (step >= 11 && step <= 12) return "Round 2 - FCFS"
    if (step >= 13) return "Completed"
    return "Round 1 - Whitelist"
}

const getProgressBarWidth = (step: number | undefined) => {
    if (!step) return "w-1/4"
    if (step >= 2 && step <= 9) return "w-0"
    if (step == 11) return "w-3/4"
    if (step == 12) return "w-[99.95%]"
    if (step >= 13) return "w-full"
    return "w-1/4"
}

const getRaisedAmount = (step: number | undefined) => {
    if (!step) return 250000
    if (step >= 2 && step <= 9) return 0
    if (step == 11) return 750000
    if (step == 12) return 999500
    if (step >= 13) return 1000000
    return 250000
}

interface ProjectCardDemoProps {
    step?: number
}

const ProjectCardDemo = ({ step }: ProjectCardDemoProps) => {
    const [saleCountdown, setSaleCountdown] = useState(20 * 60 * 60)
    const [alwaysDownCountdown, setAlwaysDownCountdown] = useState(14 * 60 * 60)

    useEffect(() => {
        const timer = setInterval(() => {
            setSaleCountdown(prevCountdown => {
                if (step && step >= 13) {
                    return prevCountdown + 1
                } else {
                    if (prevCountdown <= 0) {
                        return 0
                    }
                    return prevCountdown - 1
                }
            })

            setAlwaysDownCountdown(prevCountdown => {
                if (prevCountdown <= 0) {
                    clearInterval(timer)
                    return 0
                }
                return prevCountdown - 1
            })
        }, 1000)

        return () => clearInterval(timer)
    }, [step])

    const saleSeconds = saleCountdown % 60
    const saleMinutes = Math.floor(saleCountdown / 60) % 60
    const saleHours = Math.floor(saleCountdown / 3600) % 24
    const saleDays = Math.floor(saleCountdown / 86400)

    const downSeconds = alwaysDownCountdown % 60
    const downMinutes = Math.floor(alwaysDownCountdown / 60) % 60
    const downHours = Math.floor(alwaysDownCountdown / 3600) % 24
    const downDays = Math.floor(alwaysDownCountdown / 86400)

    return (
        <div className="border-2 border-gray-800 rounded-lg p-4 space-y-4 w-full sm:w-[15rem] md:w-[20rem] xl:w-[25rem] mx-auto">
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    {ETH_SVG}
                    <div>
                        <h2 className="text-xl font-bold">Example Project</h2>
                        <p>1 USDC = 5 $EXM</p>
                        <p className="text-sm text-gray-500">
                            Sale Status: <span>{getSaleStatus(step)}</span>
                        </p>
                        <p className="text-sm text-gray-500">
                            {step && step >= 13 ? "Ended" : "Time Left:"}{" "}
                            <span className="text-gray-400 font-semibold">
                                {saleDays}d {saleHours}h {saleMinutes}m {saleSeconds}s
                            </span>{" "}
                            {step && step >= 13 && "ago"}
                        </p>
                    </div>
                </div>
            </div>
            <div className="flex flex-row space-x-2">
                <Tokenomics
                    className={step === 3 ? "border-2 border-red-700" : undefined}
                    tokenomics={[
                        { title: "Public Sale", value: 33 },
                        { title: "Private Sale", value: 15 },
                        { title: "Team", value: 20 },
                    ]}
                />
                <OpenSite
                    siteType="refund"
                    className={step === 4 ? "border-2 border-red-700" : undefined}
                    url="https://to_be_soon_linked_to_gitbook.com"
                    description="This project does not allow refunds"
                    value={false}
                />
                <OpenSite
                    siteType="public"
                    className={step === 5 ? "border-2 border-red-700" : undefined}
                    url={"https://to_be_soon_linked_to_gitbook.com"}
                    description="Public Round 1 and 2"
                    value={[true, true]}
                />
                <OpenSite
                    siteType="contract"
                    description="View Contract on LineaScan"
                    className={step === 6 ? "border-2 border-red-700" : undefined}
                    url="https://lineascan.build/address/0x0000000000000000000000000000000000000000"
                />
                <div className={"flex flex-row space-x-2 " + (step === 7 ? "border-2 border-red-700" : "")}>
                    <OpenSite siteType="website" url="https://example.com" />
                    <OpenSite siteType="twitter" url="https://twitter.com" />
                    <OpenSite siteType="telegram" url="https://t.me" />
                    <OpenSite siteType="medium" url="https://medium.com" />
                    <OpenSite siteType="discord" url="https://discord.com" />
                    <OpenSite siteType="github" url="https://github.com" />
                </div>
            </div>
            <p>An example project!</p>
            <div className="border-2 border-gray-800 rounded-lg p-1">
                <div className={`bg-green-400 rounded-lg h-1 ${getProgressBarWidth(step)}`}></div>
            </div>
            <p>
                Raised: <span>{localizeNumber(getRaisedAmount(step))}</span> / {localizeNumber(1000000)} USDC
            </p>
            <p>
                Your investment:{" "}
                <span className={"font-bold " + (step === 9 ? "border-2 border-red-700" : "")}>
                    {`${step && step >= 2 && step <= 9 ? 0 : 100}/200`} USDC
                </span>
            </p>
            <p>
                <span className={step === 9 ? "border-2 border-red-700" : ""}>
                    Your allocation: <span className="font-bold">100/100</span>
                </span>
            </p>
            <p>
                {step === undefined
                    ? "Vesting: 25% Monthly"
                    : "Vesting: 25% each day after 23 August 2023, 8:00 AM UTC"}
            </p>
            <div className="flex flex-row items-center space-x-2">
                {step && step >= 14 ? (
                    <button className="text-sm font-bold w-full rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black">
                        Refund deadline passes in {downDays}d {downHours}h {downMinutes}m {downSeconds}s
                    </button>
                ) : step && step >= 13 ? (
                    <button className="text-sm font-bold w-full rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black">
                        Withdraw 20% in {downDays + 1}d {downHours}h {downMinutes}m {downSeconds}s
                    </button>
                ) : step && step >= 2 && step <= 9 ? (
                    <button className="text-sm font-bold rounded-md w-full px-4 py-2 border-2 border-white transition-all duration-100 ease-in-out hover:bg-white hover:text-black">
                        Approve USDC - Current Allowance: 0
                    </button>
                ) : (
                    <>
                        <div className="flex items-center border-2 border-gray-800 rounded-md p-2 w-4/5 bg-black">
                            {USDC_SVG}
                            <input
                                type="text"
                                className="bg-black text-white w-3/4 focus:outline-none focus:ring-0 [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                                placeholder="Amount"
                                disabled
                            />
                        </div>
                        <button className="font-bold w-1/2 rounded-md px-4 py-2 border-2 border-white transition-all ease-in-out hover:bg-white hover:text-black">
                            Invest
                        </button>
                    </>
                )}
            </div>
        </div>
    )
}

export default ProjectCardDemo

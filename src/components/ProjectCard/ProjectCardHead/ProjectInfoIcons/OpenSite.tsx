"use client"

import { useState } from "react"
import { FaUserAlt } from "@react-icons/all-files/fa/FaUserAlt"
import { FaUserAltSlash } from "@react-icons/all-files/fa/FaUserAltSlash"
import { FaSlash } from "@react-icons/all-files/fa/FaSlash"
import { FaUndo } from "@react-icons/all-files/fa/FaUndo"
import { FaFileAlt } from "@react-icons/all-files/fa/FaFileAlt"
import { FaGlobe } from "@react-icons/all-files/fa/FaGlobe"
import { FaTwitter } from "@react-icons/all-files/fa/FaTwitter"
import { FaTelegramPlane } from "@react-icons/all-files/fa/FaTelegramPlane"
import { FaDiscord } from "@react-icons/all-files/fa/FaDiscord"
import { FaGithub } from "@react-icons/all-files/fa/FaGithub"
import { FaMediumM } from "@react-icons/all-files/fa/FaMediumM"
import { FaExternalLinkAlt } from "@react-icons/all-files/fa/FaExternalLinkAlt"
import { FaUsers } from "@react-icons/all-files/fa/FaUsers"

import type ProjectIcon from "@/types/projecticon"
import clsx from "clsx"

const getRefundSVG = (
    value: boolean,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onMouseMove: (e: any) => void
) => {
    if (value) {
        return (
            <FaUndo
                className="hover:scale-125 transition-all duration-300 ease-in-out"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
            />
        )
    } else {
        return (
            <span
                className="hover:scale-125 transition-all duration-300 ease-in-out relative inline-block"
                onMouseEnter={onMouseEnter}
                onMouseLeave={onMouseLeave}
                onMouseMove={onMouseMove}
            >
                <FaSlash textAnchor="middle" alignmentBaseline="middle" className="rotate-90 text-[0.9em] ml-[0.05rem] mb-[0.125rem]" />
                <FaUndo
                    textAnchor="middle"
                    alignmentBaseline="middle"
                    style={{ fontSize: "0.8em", position: "absolute", left: ".15em", bottom: ".25em" }}
                />
            </span>
        )
    }
}

const getPublicSVG = (
    value: boolean[],
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onMouseMove: (e: any) => void
) => {
    switch (true) {
        case value[0] && value[1]:
            return (
                <FaUsers
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
        case !(value[0] || value[1]):
            return (
                <FaUserAltSlash
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
        default:
            return (
                <FaUserAlt
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
    }
}

const getSVG = (
    siteType: Exclude<ProjectIcon, "public" | "refund">,
    onMouseEnter: () => void,
    onMouseLeave: () => void,
    onMouseMove: (e: any) => void
) => {
    switch (siteType) {
        case "contract":
            return (
                <FaFileAlt
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
        case "website":
            return (
                <FaGlobe
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
        case "twitter":
            return (
                <FaTwitter
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
        case "telegram":
            return (
                <FaTelegramPlane
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
        case "discord":
            return (
                <FaDiscord
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
        case "github":
            return (
                <FaGithub
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
        case "medium":
            return (
                <FaMediumM
                    onMouseEnter={onMouseEnter}
                    onMouseLeave={onMouseLeave}
                    onMouseMove={onMouseMove}
                    className="hover:scale-125 transition-all duration-300 ease-in-out"
                />
            )
    }
}

interface OpenSiteProps {
    url: string
    siteType: ProjectIcon
    description?: string
    className?: string
    value?: boolean | boolean[]
}

export default function OpenSite({ url, siteType, description, value, className }: OpenSiteProps) {
    const [showTooltip, setShowTooltip] = useState(false)
    const [tooltipStyle, setTooltipStyle] = useState({})

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
        <a href={url} target="_blank" rel="noopener noreferrer" className={clsx("cursor-pointer", className)}>
            {siteType === "public"
                ? getPublicSVG(value as boolean[], handleMouseEnter, handleMouseLeave, handleMouseMove)
                : siteType === "refund"
                ? getRefundSVG(value as boolean, handleMouseEnter, handleMouseLeave, handleMouseMove)
                : getSVG(siteType, handleMouseEnter, handleMouseLeave, handleMouseMove)}
            {showTooltip && (
                <div style={tooltipStyle} className="absolute bg-gray-950 text-white p-1 rounded flex flex-row gap-x-2 items-center">
                    {description || `Open ${siteType.charAt(0).toUpperCase() + siteType.slice(1)}`}
                    <FaExternalLinkAlt />
                </div>
            )}
        </a>
    )
}

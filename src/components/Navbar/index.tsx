"use client"

import { useEffect, useState } from "react"
// import { ConnectButton } from "@/rainbow"

import NavButton from "./NavButton"
import Link from "next/link"
import Image from "next/image"
import clsx from "clsx"

export default function Nav() {
    const [isOpen, setIsOpen] = useState(false)

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth > 768) {
                setIsOpen(false)
            }
        }

        window.addEventListener("resize", handleResize)

        return () => {
            window.removeEventListener("resize", handleResize)
        }
    }, [])

    return (
        <nav className="w-full flex flex-wrap items-center justify-between p-6 border-b border-gray-800">
            <div className="flex items-center space-x-2 md:space-x-0">
                <Link href="/" className="flex items-center p-2 text-2xl font-bold">
                    <Image src="/linealauncher.svg" alt="LineaLauncher" width={64} height={64} />
                    <span>LineaLauncher</span>
                </Link>
                <button onClick={() => setIsOpen(!isOpen)} className="md:hidden px-2">
                    {isOpen ? "Close" : "Menu"}
                </button>
            </div>
            <div
                className={clsx(
                    "w-full md:w-auto md:flex md:items-center md:justify-end space-y-2 md:space-y-0 md:space-x-4 pl-2 md:pl-0", isOpen ? "block" : "hidden"
                )}
            >
                <div className="flex flex-col md:flex-row items-start md:items-center">
                    <NavButton text="IDOs" path="/projects" />
                    <NavButton text="Apply for IDO" path="/apply" />
                    <NavButton text="How it Works" path="/demo" />
                    <NavButton text="Staking" path="/staking" />
                    <div className="rounded-md m-auto px-4 py-2 border-4 border-transparent transition-all duration-200 ease-in-out hover:border-white hover:-translate-x-1 hover:translate-y-1 border-l-2 border-t-2 border-b-2 hover:border-r-4 hover:border-t-2 hover:border-b-2">
                        text!
                    </div>
                </div>
            </div>
        </nav>
    )
}

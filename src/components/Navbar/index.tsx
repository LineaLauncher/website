"use client"

import { useEffect, useState } from "react"
import { ConnectButton } from "@rainbow-me/rainbowkit"

import NavButton from "./NavButton"
import Link from "next/link"
import { Link as NextUILink } from "@nextui-org/react"

import {
    Button,
    Navbar,
    NavbarBrand,
    NavbarContent,
    NavbarItem,
    NavbarMenu,
    NavbarMenuItem,
    NavbarMenuToggle,
} from "@nextui-org/react"
import Logo from "./Logo"
import { set } from "firebase/database"

export default function Nav() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    return (
        <Navbar onMenuOpenChange={setIsMenuOpen}>
            <NavbarContent>
                <NavbarMenuToggle aria-label={isMenuOpen ? "Close menu" : "Open menu"} className="sm:hidden" />
                <NavbarBrand>
                    <Logo />
                </NavbarBrand>
            </NavbarContent>

            <NavbarContent className="hidden sm:flex gap-4" justify="center">
                <NavbarItem className="m-auto group rounded-md px-4 py-2 border-4 border-transparent transition-all duration-100 ease-in-out hover:border-white hover:-translate-x-1 hover:translate-y-1 border-l-2 hover:border-r-4 hover:border-t-2 hover:border-b-2">
                    <NavButton text="IDOs" path="/projects" />
                </NavbarItem>
                <NavbarItem className="m-auto group rounded-md px-4 py-2 border-4 border-transparent transition-all duration-100 ease-in-out hover:border-white hover:-translate-x-1 hover:translate-y-1 border-l-2 hover:border-r-4 hover:border-t-2 hover:border-b-2">
                    <NavButton text="Apply for IDO" path="/apply" />
                </NavbarItem>
                <NavbarItem className="m-auto group rounded-md px-4 py-2 border-4 border-transparent transition-all duration-100 ease-in-out hover:border-white hover:-translate-x-1 hover:translate-y-1 border-l-2 hover:border-r-4 hover:border-t-2 hover:border-b-2">
                    <NavButton text="How it Works" path="/demo" />
                </NavbarItem>
                <NavbarItem className="m-auto group rounded-md px-4 py-2 border-4 border-transparent transition-all duration-100 ease-in-out hover:border-white hover:-translate-x-1 hover:translate-y-1 border-l-2 hover:border-r-4 hover:border-t-2 hover:border-b-2">
                    <NavButton text="Staking" path="/staking" />
                </NavbarItem>
                <NavbarItem className="rounded-md m-auto px-4 py-2 border-4 border-transparent transition-all duration-200 ease-in-out hover:border-white hover:-translate-x-1 hover:translate-y-1 border-l-2 border-t-2 border-b-2 hover:border-r-4 hover:border-t-2 hover:border-b-2">
                    <ConnectButton />
                </NavbarItem>
            </NavbarContent>

            <NavbarMenu className="bg-black text-white flex flex-col space-y-2 pt-4">
                <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                    <Link href="/projects">
                        IDOs
                    </Link>
                </NavbarMenuItem>
                <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                    <Link href="/apply">Apply for IDO</Link>
                </NavbarMenuItem>
                <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                    <Link href="/demo">How it Works</Link>
                </NavbarMenuItem>
                <NavbarMenuItem onClick={() => setIsMenuOpen(false)}>
                    <Link href="/staking">Staking</Link>
                </NavbarMenuItem>
                <NavbarMenuItem className="text-white">
                    <ConnectButton />
                </NavbarMenuItem>
            </NavbarMenu>
        </Navbar>
    )

    // return (
    //     <Navbar>
    //         <NavbarBrand>
    //             <Link href="/" className="flex items-center p-2 text-2xl font-bold">

    //                 <span>LineaLauncher</span>
    //             </Link>
    //             <button onClick={() => setIsOpen(!isOpen)} className="md:hidden px-2">
    //                 {isOpen ? "Close" : "Menu"}
    //             </button>
    //         </NavbarBrand>
    //         <NavbarContent className="">
    //             {/* <div
    //                 className={clsx(
    //                     "w-full md:w-auto md:flex md:items-center md:justify-end space-y-2 md:space-y-0 md:space-x-4 pl-2 md:pl-0",
    //                     isOpen ? "block" : "hidden"
    //                 )}
    //             > */}
    //             <div className="flex flex-col md:flex-row items-start md:items-center">
    // <NavbarItem>
    //     <NavButton text="IDOs" path="/projects" />
    // </NavbarItem>
    // <NavbarItem>
    //     <NavButton text="Apply for IDO" path="/apply" />
    // </NavbarItem>
    // <NavbarItem>
    //     <NavButton text="How it Works" path="/demo" />
    // </NavbarItem>
    // <NavbarItem>
    //     <NavButton text="Staking" path="/staking" />
    // </NavbarItem>
    // <div className="rounded-md m-auto px-4 py-2 border-4 border-transparent transition-all duration-200 ease-in-out hover:border-white hover:-translate-x-1 hover:translate-y-1 border-l-2 border-t-2 border-b-2 hover:border-r-4 hover:border-t-2 hover:border-b-2">
    //     <ConnectButton />
    // </div>
    //             </div>
    //             {/* </div> */}
    //         </NavbarContent>
    //     </Navbar>
    // )
}

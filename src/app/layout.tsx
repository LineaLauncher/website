import "./globals.css"

import { Roboto_Mono } from "next/font/google"
import type { Metadata } from "next"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import clsx from "clsx"
import EthereumProvider from "@/providers/EthereumProvider"

const robotoMono = Roboto_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
    // metadataBase: {
    // }
    title: "LineaLauncher",
    description: "A Decentralized IDO Platform on Linea",
    applicationName: "LineaLauncher",
    keywords: [
        "Linea",
        "LineaLauncher",
        "IDO",
        "Launchpad",
        "Linea Launchpad",
        "Linea IDO",
        "LineaLauncher IDO",
        "LineaLauncher Launchpad",
    ],
    themeColor: "#000000",
    icons: {
        icon: "favicon.ico",
    },
    // openGraph: {
    //     type: "website",
    //     locale: "en_US",
    //     url: "https://linealauncher.com/",
    //     title: "LineaLauncher",
    //     description: "Decentralized IDO Platform on Linea",
    // },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="en">
            <body className={clsx("bg-black min-h-screen", robotoMono.className)}>
                <EthereumProvider fontFamily={robotoMono.style.fontFamily}>
                    <div className="min-h-screen flex flex-col text-white">
                        <header>
                            <Navbar />
                        </header>
                        {children}
                        <Footer />
                    </div>
                </EthereumProvider>
            </body>
        </html>
    )
}

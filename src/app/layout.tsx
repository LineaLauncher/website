import "./globals.css"

import { Roboto_Mono } from "next/font/google"
import type { Metadata } from "next"

import Navbar from "@/components/Navbar"
import Footer from "@/components/Footer"
import clsx from "clsx"
import EthereumProvider from "@/providers/EthereumProvider"
import WrappedNextUIProvider from "@/providers/WrappedNextUIProvider"

const robotoMono = Roboto_Mono({ subsets: ["latin"] })

export const metadata: Metadata = {
    metadataBase: new URL("https://linealauncher.com"),
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
        icon: "/favicon.svg",
        apple: "/apple-touch-icon.png",
    },
    manifest: "/manifest.json",
    twitter: {
        site: "@linealauncher",
        creator: "@linealauncher",
        images: "/linealauncher.png",
    },
    openGraph: {
        type: "website",
        url: "https://linealauncher.com",
        locale: "en",
        title: "LineaLauncher",
        description: "A Decentralized IDO Platform on Linea",
        siteName: "LineaLauncher",
        images: "/linealauncher.png",
    },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
    // min-h-screen flex flex-col
    return (
        <html lang="en">
            <body className={clsx("min-h-screen", robotoMono.className)}>
                <WrappedNextUIProvider>
                    <EthereumProvider fontFamily={robotoMono.style.fontFamily}>
                        <div className="dark text-foreground bg-background min-h-screen flex flex-col">
                            <header>
                                <Navbar />
                            </header>
                            {children}
                            <Footer />
                        </div>
                    </EthereumProvider>
                </WrappedNextUIProvider>
            </body>
        </html>
    )
}

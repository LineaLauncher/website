import "./globals.css"
import type { Metadata } from "next"
import { Roboto_Mono } from "next/font/google"

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
    // openGraph: {
    //     type: "website",
    //     locale: "en_US",
    //     url: "https://linealauncher.com/",
    //     title: "LineaLauncher",
    //     description: "Decentralized IDO Platform on Linea",
    // },
    robots: {
        index: true,
        follow: true,
    }
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en" className="bg-black">
            <body className={robotoMono.className}>{children}</body>
        </html>
    )
}

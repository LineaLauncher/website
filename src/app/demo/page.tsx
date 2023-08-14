import { Metadata } from "next"

import DemoPage from "@/components/DemoPage"

const Demo = () => {
    return (
        <main className="p-4 md:p-16 lg:px-24 flex-grow">
            <DemoPage />
        </main>
    )
}

export default Demo

export const metadata: Metadata = {
    metadataBase: new URL("https://linealauncher.com"),
    title: "LineaLauncher",
    description: "See how LineaLauncher, a decentralized IDO platform on Linea, works.",
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
        icon: "/favicon.ico",
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

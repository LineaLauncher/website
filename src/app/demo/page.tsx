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
    // metadataBase: {
    // }
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
        icon: "favicon.ico",
    },
}

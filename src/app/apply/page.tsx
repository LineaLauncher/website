import { Metadata } from "next"

import ApplyPage from "@/components/ApplyPage"

const Apply = () => {
    return (
        <main className="flex flex-grow m-auto justify-center items-center p-8">
            <ApplyPage />
        </main>
    )
}

export default Apply

export const metadata: Metadata = {
    metadataBase: new URL("https://linealauncher.com"),
    title: "LineaLauncher",
    description: "Apply to be featured as an IDO on LineaLauncher, a decentralized IDO platform on Linea.",
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

import { Metadata } from "next"

const Staking = () => {
    return (
        <main className="flex flex-grow m-auto justify-center items-center p-8">
            <h1>Staking not yet available</h1>
        </main>
    )
}

export default Staking

export const metadata: Metadata = {
    metadataBase: new URL("https://linealauncher.com"),
    title: "LineaLauncher",
    description:
        "Stake your $LLR to invest in projects on LineaLauncher, a decentralized IDO platform on Linea, works.",
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

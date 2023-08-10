import FooterDivider from "./FooterDivider"
import FooterLinkItem from "./FooterLinkItem"
import Image from "next/image"

export default function Footer() {
    return (
        <footer className="p-4 md:p-6 border-t border-gray-800 flex space-y-2 flex-col items-center justify-center md:flex-row md:space-y-0 md:justify-between">
            <div className="flex flex-row items-center justify-center mt-2 md:mt-0">
                <div className="flex flex-col md:flex-row items-center md:space-x-4">
                    <p className="mb-2 md:mb-0 md:mr-4 text-center">&copy; 2023 LineaLauncher</p>
                    <div className="flex flex-row md:flex-row items-center space-x-2 md:space-x-4">
                        <a href="https://twitter.com/linealauncher" className="hover:text-gray-400">
                            <Image src="/twitter.svg" width={24} height={24} alt="Twitter" />
                        </a>
                        <a href="https://t.me/linealauncher" className="hover:text-gray-400">
                            <Image src="/telegram.svg" width={24} height={24} alt="Telegram" />
                        </a>
                    </div>
                </div>
            </div>
            <div className="flex flex-col md:flex-row items-center md:items-start space-y-2 md:space-y-0">
                <div className="flex flex-row items-center justify-center">
                    <div className="flex flex-col md:flex-row items-center justify-center space-y-2 md:space-y-0 md:space-x-4">
                        <FooterLinkItem href="/" text="Home" />
                        <FooterDivider />
                        <FooterLinkItem href="/demo" text="Demo" />
                        <FooterDivider />
                        <FooterLinkItem href="/projects" text="Projects" />
                        <FooterDivider />
                        <FooterLinkItem href="/staking" text="Staking" />
                        <FooterDivider />
                        <FooterLinkItem href="/apply" text="Apply for IDO" />
                    </div>
                </div>
            </div>
        </footer>
    )
}

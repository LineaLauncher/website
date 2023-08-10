import Link from "next/link"

type FooterLinkItemProps = {
    text: string
    href: string
}

export default function FooterLinkItem({ text, href }: FooterLinkItemProps) {
    return (
        <Link href={href}>
            <span className="hover:text-gray-400 cursor-pointer">{text}</span>
        </Link>
    )
}

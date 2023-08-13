"use client"

import { usePathname } from "next/navigation"
import Link from "next/link"
import clsx from "clsx"

type NavButtonProps = {
    text: string
    path: string
    newTab?: boolean
}

export default function NavButton({ text, path, newTab }: NavButtonProps) {
    const pathName = usePathname()

    return (
        <Link href={path} target={newTab ? "_blank" : "_self"}>
            {text}
            <span
                className={clsx(
                    "block h-0.5 transition-all duration-300 bg-white",
                    pathName === path ? "w-full" : "w-0"
                )}
            ></span>
        </Link>
    )
}

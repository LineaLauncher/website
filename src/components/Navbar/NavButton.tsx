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
        <Link
            className="m-auto group rounded-md px-4 py-2 border-4 border-transparent transition-all duration-100 ease-in-out hover:border-white hover:-translate-x-1 hover:translate-y-1 border-l-2 hover:border-r-4 hover:border-t-2 hover:border-b-2"
            href={path}
            target={newTab ? "_blank" : "_self"}
        >
            {text}
            <span
                className={clsx("block h-0.5 transition-all duration-300 bg-white", pathName === path ? "w-full" : "w-0")}
            ></span>
        </Link>
    )
}


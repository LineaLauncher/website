import Image from "next/image"
import Link from "next/link"

export default function Logo() {
    return (
        <Link href="/" className="flex flex-row space-x-2 items-center">
            <Image src="/linealauncher.svg" alt="LineaLauncher" width={64} height={64} />
            <p className="font-bold text-inherit">LineaLauncher</p>
        </Link>
    )
}

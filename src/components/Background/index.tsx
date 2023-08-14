import Image from "next/image"

export default function Background() {
    return (
        <div className="relative z-0">
            <div className="fixed dark:md:block opacity-30 -bottom-[40%] -left-[20%] z-0">
                <div style={{ width: "100%", height: "100%", position: "relative" }}>
                    <Image
                        src="/left.png"
                        alt="left background"
                        className="relative shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                        width={1266}
                        height={1211}
                    />
                </div>
            </div>
            <div className="fixed dark:md:block opacity-30 -top-[80%] -right-[60%] 2xl:-top-[60%] 2xl:-right-[45%] rotate-12 z-0">
                <Image
                    src="/right.png"
                    alt="right background"
                    className="relative shadow-black/5 data-[loaded=true]:opacity-100 shadow-none transition-transform-opacity motion-reduce:transition-none !duration-300 rounded-large"
                    width={1833}
                    height={1822}
                />
            </div>
        </div>
    )
}

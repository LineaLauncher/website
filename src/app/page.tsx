import Link from "next/link"

export default function Home() {
    return (
        <main className="flex-grow p-4 md:p-8 md:px-16">
            <section className="flex flex-col space-y-4 md:space-y-8 mb-8 mt-8 md:mt-16 px-4 md:px-24">
                <h1 className="text-3xl md:text-6xl font-bold items-center">Empowering Innovation on Linea</h1>
                <p className="text-sm md:text-lg">
                    LineaLauncher is a decentralized IDO platform on Linea. LineaLauncher provides a platform for
                    innovators to launch their projects and for investors to be a part of the next big thing on the
                    Linea mainnet. Our seamless process ensures that launching and investing in projects is as easy as a
                    few clicks.
                </p>
                <p className="text-sm md:text-lg">
                    With our user-friendly interface and seamless process, launching your project or investing in the
                    next big thing is just a few clicks away.
                </p>
            </section>

            <section className="border-t border-gray-700 my-8 md:my-16 py-8 md:py-16 px-4 md:px-24 flex flex-col justify-center">
                <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 md:space-x-4">
                    <div className="flex-grow mt-4 flex flex-col justify-center">
                        <h2 className="text-2xl md:text-4xl font-bold mb-4">How It Works</h2>
                        <p className="text-sm md:text-lg">
                            Launching your project on LineaLauncher is a simple and straightforward process. You provide
                            the details of your project, set your fundraising goals, and we take care of the rest.
                            Investors can browse through the projects, learn more about them, and invest directly from
                            LineaLauncher.
                        </p>
                        <div className="flex flex-col md:flex-row md:space-x-2">
                            <Link
                                href="/projects"
                                className="inline-block mt-2 md:mt-4 px-2 md:px-6 py-1 md:py-2 text-sm md:text-lg font-semibold border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
                            >
                                Invest in IDOs
                            </Link>
                            <Link
                                href="/apply"
                                className="inline-block mt-2 md:mt-4 px-2 md:px-6 py-1 md:py-2 text-sm md:text-lg font-semibold border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
                            >
                                Launch your Project
                            </Link>
                        </div>
                    </div>
                    <div className="w-full md:w-1/2 flex justify-center items-center">{/* <ProjectCardDemo /> */}</div>
                </div>
            </section>

            <section className="border-t border-gray-700 my-8 md:my-16 py-8 md:py-16 px-4 md:px-24">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">Why LineaLauncher?</h2>
                <p className="text-sm md:text-lg">
                    LineaLauncher is decentralized, optimized to handle a heavy load of users, and provides a simple
                    process. This makes it the ideal platform for launching your project or investing in the next big
                    thing.
                </p>
                <div className="flex flex-col md:flex-row md:space-x-2">
                    <Link
                        href="/demo"
                        className="inline-block mt-2 md:mt-4 px-2 md:px-6 py-1 md:py-2 text-sm md:text-lg font-semibold border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
                    >
                        See Investing Step by Step
                    </Link>
                    <Link
                        href="/"
                        className="inline-block mt-2 md:mt-4 px-2 md:px-6 py-1 md:py-2 text-sm md:text-lg font-semibold border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
                    >
                        Read the Docs
                    </Link>
                </div>
            </section>
        </main>
    )
}

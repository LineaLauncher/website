"use client"

import { useState } from "react"
import { CSSTransition } from "react-transition-group"

import ProjectCardDemo from "@/components/ProjectCardDemo"
import Link from "next/link"

export default function DemoPage() {
    const [step, setStep] = useState(1)

    const titles = [
        "Welcome top LineaLauncher!",
        "Interpreting Project Information",
        "Understanding the Icons: Tokenomics",
        "Understanding the Icons: Refunds",
        "Understanding the Icons: Public Funding",
        "Understanding the Icons: Contract",
        "Understanding the Icons: Links",
        "Investing In Projects",
        "Investing: Before Sale Starts",
        "Investing: Round 1",
        "Investing: Round 2",
        "Investing: Round 2",
        "Withdrawals",
        "Refunds",
        "You Have Completed the Tutorial!",
    ]

    const paragraphs = [
        <p className="text-lg" key={0}>
            Investing in a project on LineaLauncher is a simple and straightforward process. You can browse through the
            projects, learn more about them, and invest directly from LineaLauncher. To continue the introduction, click
            on next.
        </p>,
        <p className="text-lg" key={1}>
            This is an example project titled &quot;Example Project&quot;, which happens to have the same logo as
            Ethereum. Currently, the sale hasn&apos;t started yet, meaning you can&apos;t invest, and there&apos;s
            approximately 20 hours until you can. The project offers 5 $EXM tokens for each USDC you invest. Finally,
            the project has currently raised 0 USDC, and aims to raise 1M USDC in total.
        </p>,
        <p className="text-lg" key={2}>
            Each project has a set of icons that represent the project&apos;s features. The first icon, denoted with a
            red border, opens the project&apos;s tokenomics when clicked on.
        </p>,
        <p className="text-lg" key={3}>
            The second icon tells whether the project offers refunds or not. Refunds will be explained in the later
            steps, but if the refund symbol is crossed out, then the project does not offer refunds.
        </p>,
        <p className="text-lg" key={4}>
            Hovering over the third icon tells you whether the project has allowed public funding. If this is the case,
            then you don&apos;t need to be whitelisted to invest! If the icon is crossed out, then the project does not
            allow public funding. If there are multiple user symbols, then the project offers both rounds as public
            sales. If there is only one user symbol, then the project only offers round two as a public sale.
        </p>,
        <p className="text-lg" key={5}>
            When clicked, the third icon takes you to the project&apos;s contract on LineaScan.
        </p>,
        <p className="text-lg" key={6}>
            The rest of the icons provide links to the project&apos;s social media presence, website, and GitHub. You
            may notice that some of these icons don&apos;t appear on some projects. This simply means the project
            doesn&apos;t have a presence on that platform. In order, these clickable icons denote the project&apos;s
            website, Twitter, Telegram, Medium, Discord, and GitHub (for project&apos;s source code).
        </p>,
        <p className="text-lg" key={7}>
            For each project, there are 2 rounds of sales. Some projects may also offer additional private sales, which
            also happen in 2 rounds of sales. For both of the rounds, you either need to be whitelisted in order to
            invest, or the project must allow public funding. Usually, round 1 is whitelisted, whereas round 2 is
            public.
        </p>,
        <p className="text-lg" key={8}>
            Before the sale starts, you will have the chance to approve the payment token, in this case USDC, by
            clicking the approve button. You can also see your total allocation, which is currently outlined with a red
            border. Your allocation on each round is also found below.
        </p>,
        <p className="text-lg" key={9}>
            When Round 1 starts, everyone whitelisted will have a chance to invest. The time you invest doesn&apos;t
            matter - as long as you invest before the end of Round 1, you are guaranteed to spend your allocation. To
            invest, you must first approve your tokens before the sale starts. If you haven&apos;t approved already, or
            approved a smaller amount, than you will still have a chance to approve now.
        </p>,
        <p className="text-lg" key={10}>
            Round 2 works the same way as Round 1, except Round 2 is in a first come first serve (FCFS) basis, meaning
            your allocation isn&apos;t guaranteed. The faster you invest, the more likely you are to spend your
            allocation! Once the project hits their raise target, the sale will end.
        </p>,
        <p className="text-lg" key={11}>
            Oops! The project is about to hit their target, and you haven&apos;t invested yet! Should you try and
            invest? If the remaining allocation is less than your invested amount, the smart contract will adjust your
            investment to match the available allocation. The surplus won&apos;t be withdrawn from your wallet. This
            allows you to invest with confidence!
        </p>,
        <p className="text-lg" key={12}>
            You can not immediately withdraw your tokens once the sale ends. Instead, you must wait until the withdraw
            time comes, which will be displayed via a countdown. Projects may also offer a vesting period, which means
            you can only withdraw a certain amount of tokens per certain time period.
        </p>,
        <p className="text-lg" key={13}>
            Some projects may choose to offer refunds. You can claim a refund if the sale has concluded, you
            haven&apos;t missed the refund deadline, haven&apos;t withdrawn any tokens, and the project permits refunds.
            Click the button to claim your refund before the deadline passes!
        </p>,
        <p className="text-lg" key={14}>
            You have completed the tutorial! You can now browse through the projects, and invest in them. If you have
            any questions, feel free to join our{" "}
            <a href="https://t.me/linealauncher" className="text-blue-500 hover:underline" target="_blank">
                Telegram
            </a>{" "}
            and don&apos;t forget to follow us on{" "}
            <a href="https://twitter.com/linealauncher" className="text-blue-500 hover:underline" target="_blank">
                Twitter
            </a>
            !
        </p>,
    ]

    return (
        <div className="flex flex-col space-y-8 md:space-y-0 md:flex-row md:space-x-8 lg:space-x-16">
            <div className="flex-grow px-2 md:px-8 mt-4">
                <h2 className="text-2xl md:text-4xl font-bold mb-4">{titles[step - 1]}</h2>
                {paragraphs[step - 1]}
                <div className="flex flex-row space-x-4">
                    {step !== 1 && (
                        <button
                            className="mt-4 px-6 py-2 text-lg font-semibold text-white border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
                            onClick={() => step > 1 && setStep(step - 1)}
                        >
                            Back
                        </button>
                    )}
                    {step === 1 && (
                        <a
                            href="https://to_be_soon_linked_to_gitbook.com"
                            className="mt-4 px-6 py-2 text-lg font-semibold text-white border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            Docs
                        </a>
                    )}
                    {step == 15 ? (
                        <Link
                            href="/projects"
                            className="mt-4 px-6 py-2 text-lg font-semibold text-white border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
                        >
                            See Projects
                        </Link>
                    ) : (
                        <button
                            className="mt-4 px-6 py-2 text-lg font-semibold text-white border-2 border-white rounded hover:bg-white hover:text-black transition-colors"
                            onClick={() => setStep(step + 1)}
                        >
                            Next
                        </button>
                    )}
                </div>
            </div>
            <div className="w-full md:w-1/2">
                <CSSTransition in={step > 1} timeout={300} classNames="project-card" unmountOnExit>
                    <ProjectCardDemo step={step} />
                </CSSTransition>
            </div>
        </div>
    )
}

import { getProjects } from "@/utils/db"
import { Metadata } from "next"

import ProjectCard from "@/components/ProjectCard"
import ProjectsDisplay from "@/components/ProjectsDisplay"
import ConversionProvider from "@/providers/ConversionProvider"

export default async function ProjectsPage() {
    const { upcomingAndCurrentProjects, pastProjects } = await getProjects()

    return (
        <main className="flex-grow p-2 md:p-6 py-6">
            <ProjectsDisplay
                upcomingAndCurrentProjects={upcomingAndCurrentProjects.map((project, i) => (
                    <ConversionProvider
                        key={i}
                        paymentTokenDecimals={project.paymentTokenDecimals}
                        projectTokenDecimals={project.projectTokenDecimals}
                    >
                        <ProjectCard key={i} project={project} />
                    </ConversionProvider>
                ))}
                pastProjects={pastProjects.map((project, i) => (
                    <ConversionProvider
                        key={i}
                        paymentTokenDecimals={project.paymentTokenDecimals}
                        projectTokenDecimals={project.projectTokenDecimals}
                    >
                        <ProjectCard key={i} project={project} />
                    </ConversionProvider>
                ))}
            />
        </main>
    )
}

export const dynamic = "force-dynamic"

export const metadata: Metadata = {
    // metadataBase: {
    // }
    title: "LineaLauncher",
    description: "See and invest in IDOs and projects on LineaLauncher, a decentralized IDO platform on Linea.",
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
        icon: "favicon.ico",
    },
}

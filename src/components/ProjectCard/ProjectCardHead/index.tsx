import { Project } from "@/types/project"

import ProjectInfoIcons from "./ProjectInfoIcons"
import SaleStatus from "./SaleStatus"
import Image from "next/image"

type ProjectCardHeadProps = {
    project: Project
}

export default function ProjectCardHead({ project }: ProjectCardHeadProps) {
    return (
        <>
            <div className="flex items-center justify-between">
                <div className="flex items-center space-x-4">
                    <Image src={project.logo} alt={`$${project.ticker} logo`} width={48} height={48} />
                    <div>
                        <h2 className="text-xl font-bold">{project.name}</h2>
                        <p>
                            1 {project.paymentTokenTicker} = {project.tokensPerPaymentToken} ${project.ticker}
                        </p>
                        <SaleStatus
                            roundOneStartDate={project.roundOneStartDate}
                            roundTwoStartDate={project.roundTwoStartDate}
                            saleEndDate={project.saleEndDate}
                        />
                    </div>
                </div>
            </div>
            <ProjectInfoIcons project={project} />
            <p>{project.description}</p>
            {/* <p>Vesting: {project.vesting}</p> */}
        </>
    )
}

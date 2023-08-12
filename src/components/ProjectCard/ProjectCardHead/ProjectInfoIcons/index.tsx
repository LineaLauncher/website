import type { Project } from "@/types/project"

import OpenSite from "./OpenSite"
import Tokenomics from "./Tokenomics"

type ProjectInfoIconsProps = {
    project: Project
}

export default function ProjectInfoIcons({ project }: ProjectInfoIconsProps) {
    return (
        <div className="flex flex-row space-x-2">
            <Tokenomics tokenomics={project.tokenomics} />
            <OpenSite
                siteType="refund"
                value={project.allowsRefund}
                url={"https://to_be_soon_linked_to_gitbook.com"}
                description={
                    project.allowsRefund ? "This project allows refunds" : "This project does not allow refunds"
                }
            />
            <OpenSite
                siteType="public"
                url={"https://to_be_soon_linked_to_gitbook.com"}
                value={[project.publicRoundOne, project.publicRoundTwo]}
                description={
                    project.publicRoundOne && project.publicRoundTwo
                        ? "Public Round 1 and 2"
                        : project.publicRoundOne
                        ? "Public Round 1"
                        : project.publicRoundTwo
                        ? "Public Round 2"
                        : "No Public Rounds"
                }
            />
            <OpenSite
                siteType="contract"
                description="View Contract on LineaScan"
                url={"https://goerli.lineascan.build/address/" + project.contractAddress}
            />
            {project.website && <OpenSite siteType="website" url={project.website} />}
            {project.twitter && <OpenSite siteType="twitter" url={project.twitter} />}
            {project.telegram && <OpenSite siteType="telegram" url={project.telegram} />}
            {project.medium && <OpenSite siteType="medium" url={project.medium} />}
            {project.discord && <OpenSite siteType="discord" url={project.discord} />}
            {project.github && <OpenSite siteType="github" url={project.github} />}
        </div>
    )
}

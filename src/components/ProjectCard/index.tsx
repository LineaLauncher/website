import type { Project } from "@/types/project"

import ProjectCardHead from "./ProjectCardHead"
import RaiseStatus from "./RaiseStatus"
import ProjectCardActions from "./ProjectCardActions"

type ProjectCardProps = {
    project: Project
}

export default function ProjectCard({ project }: ProjectCardProps) {
    
    return (
        <div className="flex flex-col border-2 border-gray-800 rounded-lg p-4 space-y-4 w-[25rem]">
            <ProjectCardHead project={project} />
            <RaiseStatus project={project} />
            <ProjectCardActions project={project} />
        </div>
    )
}

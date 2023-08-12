"use client"

import { useState } from "react"

import CategoryButton from "./CategoryButton"
import type Category from "@/types/projecttype"

type ProjectsDisplayProps = {
    upcomingAndCurrentProjects: React.ReactNode
    pastProjects: React.ReactNode
}

export default function ProjectsDisplay({ upcomingAndCurrentProjects, pastProjects }: ProjectsDisplayProps) {
    const [selectedCategory, setSelectedCategory] = useState<Category>("Upcoming and Current IDOs")

    return (
        <div className="md:px-16 lg:px-32 justify-evenly">
            <div className="flex justify-between mb-2 md:mb-4">
                <CategoryButton
                    text="Upcoming and Current IDOs"
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
                <CategoryButton
                    text="Past IDOs"
                    selectedCategory={selectedCategory}
                    setSelectedCategory={setSelectedCategory}
                />
            </div>
            <div className="flex justify-center py-8">
                <div className="grid grid-cols-1 lg:grid-cols-2 2xl:grid-cols-4 gap-16 lg:gap-24 items-center justify-center">
                    {selectedCategory === "Upcoming and Current IDOs" ? upcomingAndCurrentProjects : pastProjects}
                </div>
            </div>
        </div>
    )
}

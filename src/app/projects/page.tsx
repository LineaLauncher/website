import { getProjects } from "@/utils/db"

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

/* <>
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
            {!loaded ? (
                projectsInformation.map((_, index) => {
                    return <Skeleton key={index} />
                })
            ) : selectedCategory === "Upcoming and Current IDOs" ? (
                fetchedUpcomingAndCurrent.length > 0 ? (
                    fetchedUpcomingAndCurrent.map((projectData, index) => (
                        <ProjectCard
                            key={index}
                            userInvestment={projectData.totalUserInvestment}
                            {...projectData}
                            appendTransaction={(transaction) => {
                                setTransactions((prevTransactions) => [
                                    ...prevTransactions,
                                    transaction,
                                ])
                            }}
                        />
                    ))
                ) : (
                    <div className="text-lg text-gray-500">
                        No upcoming or current IDOs! Check back soon!
                    </div>
                )
            ) : fetchedPastIDOs.length > 0 ? (
                fetchedPastIDOs.map((projectData, index) => (
                    <ProjectCard
                        key={index}
                        userInvestment={projectData.totalUserInvestment}
                        appendTransaction={(transaction) => {
                            setTransactions((prevTransactions) => [
                                ...prevTransactions,
                                transaction,
                            ])
                        }}
                        {...projectData}
                    />
                ))
            ) : (
                <div className="text-lg text-gray-500">
                    No past IDOs! Check back soon!
                </div>
            )}
        </div>
    </div>
</div>
<div className="flex flex-col absolute right-10 bottom-10 space-y-4">
    {transactions.map((transaction, index) => (
        <TransactionBox
            key={index}
            message={transaction.message}
            hash={transaction.hash}
            onRemove={() => removeTransaction(index)}
        />
    ))}
</div>
</> */

import { getProjects } from "@/utils/db"

export default async function ProjectsPage() {
    const { upcomingAndCurrentProjects, pastProjects } = await getProjects()

    console.log({upcomingAndCurrentProjects, pastProjects})

    return (
        <main className="p-2 md:p-6 py-6 flex-grow">
            {/* <Projects projectsInformationJSON={projects} /> */}
        </main>
    )    
}
//
// <AddressProviderClient>
//     <ProjectsAndMerkleServer />
//        <ProjectProviderClient>
//           <UserBalanceProviderClient />
//               <ProjectCardClient />
//        </UserBalanceProviderClient>
//     </ProjectProviderClient>
// </AddressProviderClient>

// return (
// <Projects> // Client
//     {projects.map(project => (
//         <ProjectProvider project={project}> // Client
//             <MerkleProvider> // Server
//                 <ProjectCard /> // Client
//             </MerkleProvider>
//         </ProjectProvider>
//     ))}
// </Projects>
// )

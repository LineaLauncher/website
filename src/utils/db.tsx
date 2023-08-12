import "server-only"

import { type Timestamp, collection, getDocs, getFirestore } from "firebase/firestore"
import { FirebaseProjectResponse, Project } from "@/types/project"
import { initializeApp } from "firebase/app"

import validateProject from "./validateproject"

const FIREBASE_PUBLIC_CONFIG = {
    apiKey: "AIzaSyCiUQXksk7c_n4divsgzKJS2qVu_wN6N4Y",
    authDomain: "linealauncher-production.firebaseapp.com",
    projectId: "linealauncher-production",
    storageBucket: "linealauncher-production.appspot.com",
    messagingSenderId: "588360433673",
    appId: "1:588360433673:web:95179a5118d0c1958a78d8",
}

const firebaseApp = initializeApp(FIREBASE_PUBLIC_CONFIG)
const db = getFirestore(firebaseApp)

export async function getProjects() {
    const projectsSnapshot = await getDocs(collection(db, "projects"))
    const projects: Project[] = []

    projectsSnapshot.docs.forEach(project => {
        const data = project.data() as Partial<FirebaseProjectResponse>
        const transformedData = transformData(data)

        if (transformedData && validateProject(transformedData)) {
            projects.push(transformedData)
        } else {
            console.log("Invalid project skipped:", transformedData)
        }
    })

    projects.sort((a, b) => new Date(a.roundOneStartDate).getTime() - new Date(b.roundOneStartDate).getTime())

    const upcomingAndCurrentProjects = projects.filter(project => new Date(project.roundOneStartDate) <= new Date())
    const pastProjects = projects.filter(project => new Date(project.roundOneStartDate) > new Date())

    return { upcomingAndCurrentProjects, pastProjects }
}

function transformData(data: Partial<FirebaseProjectResponse>): Partial<Project> | null {
    if (!data || !hasValidDates(data)) {
        return null
    }

    const { roundOneStartDate, roundTwoStartDate, saleEndDate, maximumRefundTime, vestingTimestamps } = data
    return {
        ...data,
        roundOneStartDate: roundOneStartDate.toDate(),
        roundTwoStartDate: roundTwoStartDate.toDate(),
        saleEndDate: saleEndDate.toDate(),
        maximumRefundTime: maximumRefundTime.toDate(),
        vestingTimestamps: vestingTimestamps.map(t => t.toDate()),
    }
}

function hasValidDates(data: Partial<FirebaseProjectResponse>): data is Partial<FirebaseProjectResponse> & {
    roundOneStartDate: Timestamp
    roundTwoStartDate: Timestamp
    saleEndDate: Timestamp
    maximumRefundTime: Timestamp
    vestingTimestamps: Timestamp[]
} {
    if (
        !data.roundOneStartDate ||
        !data.roundTwoStartDate ||
        !data.saleEndDate ||
        !data.maximumRefundTime ||
        !data.vestingTimestamps
    ) {
        return false
    }

    return true
}

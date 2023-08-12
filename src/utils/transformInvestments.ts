import type { PerProjectInvestments, PerProjectInvestmentsFirebaseResponse } from "@/types/perprojectinvestments"

export default function transformInvestments(
    investments: PerProjectInvestmentsFirebaseResponse
): PerProjectInvestments {
    const transformedInvestments: PerProjectInvestments = {}

    for (const [projectName, investment] of Object.entries(investments)) {
        transformedInvestments[projectName] = {
            round1: {
                maximum: investment.amount1,
                proof: investment.proof1,
            },
            round2: {
                maximum: investment.amount2,
                proof: investment.proof2,
            },
        }
    }

    return transformedInvestments
}

import type { InvestmentFirebaseResponse, PerProjectInvestmentsFirebaseResponse } from "@/types/perprojectinvestments"

export default function discardInvalidInvestments(investments: Partial<PerProjectInvestmentsFirebaseResponse>) {
    const validInvestments: PerProjectInvestmentsFirebaseResponse = {}

    for (const [projectName, investment] of Object.entries(investments)) {
        if (validateInvestment(investment)) {
            validInvestments[projectName] = investment
        } else {
            console.log(`Invalid investment for ${projectName}`)
        }
    }

    return validInvestments
}

function validateInvestment(
    investment: Partial<InvestmentFirebaseResponse> | undefined
): investment is InvestmentFirebaseResponse {
    if (!investment) {
        return false
    }

    if (!investment.amount1 || !investment.amount2 || !investment.proof1 || !investment.proof2) {
        return false
    }

    if (!Array.isArray(investment.proof1) || !Array.isArray(investment.proof2)) {
        return false
    }

    if (typeof investment.amount1 !== "number" || typeof investment.amount2 !== "number") {
        return false
    }

    return true
}

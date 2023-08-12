export type InvestmentFirebaseResponse = {
    amount1: number
    amount2: number
    proof1: string[]
    proof2: string[]
}

export type PerProjectInvestmentsFirebaseResponse = {
    [projectName: string]: InvestmentFirebaseResponse
}

export type PerProjectInvestments = {
    [projectName: string]: {
        round1: {
            maximum: number
            proof: string[]
        }
        round2: {
            maximum: number
            proof: string[]
        }
    }
}

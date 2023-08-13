type TotalUserInvestmentAndMerkle = {
    round1: {
        maximum: {
            number: number
            bigint: bigint
        }
        amount: {
            number: number
            bigint: bigint
        }
        proof?: string[]
        alloType: "merkle" | "public"
    }
    round2: {
        maximum: {
            number: number
            bigint: bigint
        }
        amount: {
            number: number
            bigint: bigint
        }
        proof?: string[]
        alloType: "merkle" | "public"
    }
}

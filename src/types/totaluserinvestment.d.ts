type TotalUserInvestment = {
    round1: {
        maximum: {
            number: number
            bigint: bigint
        }
        amount: {
            number: number
            bigint: bigint
        }
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
        alloType: "merkle" | "public"
    }
}

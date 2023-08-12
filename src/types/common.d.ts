type Tokenomics = {
    title: string
    value: number
}

interface CommonProjectResponse {
    tokenomics: Tokenomics[]
    paymentTokenAddress: string
    projectTokenAddress: string
    contractAddress: string
    paymentTokenTicker: string
    paymentTokenLogo: string
    paymentTokenDecimals: number
    tokensPerPaymentToken: number
    projectTokenDecimals: number
    totalRaising: number
    vestingReleasePercentages: number[]
    allowsRefund: boolean
    description: string
    publicRoundOne: boolean
    publicRoundTwo: boolean
    publicRoundOneCap?: number
    publicRoundTwoCap?: number
    vesting: string
    ticker: string
    name: string
    logo: string
    id: string
    twitter?: string
    telegram?: string
    website?: string
    github?: string
    medium?: string
    discord?: string
}

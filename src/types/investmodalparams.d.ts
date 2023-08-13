type InvestModalParams = {
    investArgs: {
        address: `0x${string}`
        abi: Abi
        functionName: string
        args: (bigint | string[])[]
    }
    amount: number
    round?: 1 | 2
    name: string
}

export default InvestModalParams

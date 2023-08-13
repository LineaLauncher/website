export type TransactionStatus = "pending" | "confirmed" | "failed"

export type Transaction = {
    hash: string
    message: string
}

import type { Timestamp } from "firebase/firestore"

export interface Project extends CommonProjectResponse {
    vestingTimestamps: Date[]
    roundOneStartDate: Date
    roundTwoStartDate: Date
    saleEndDate: Date
    maximumRefundTime: Date
}

export interface FirebaseProjectResponse extends CommonProjectResponse {
    vestingTimestamps: Timestamp[]
    roundOneStartDate: Timestamp
    roundTwoStartDate: Timestamp
    saleEndDate: Timestamp
    maximumRefundTime: Timestamp
}

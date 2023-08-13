export default function validateApplyFormData(data: any): data is ApplyFormData {
    const requiredFields: (keyof ApplyFormData)[] = [
        "projectName",
        "email",
        "communicationChannel",
        "username",
        "webAddress",
        "overview",
        "whitepaper",
        "launchDate",
        "refundOption",
        "fundraisingDetails",
        "additionalDetails",
    ]

    return requiredFields.every(field => data[field] !== undefined)
}

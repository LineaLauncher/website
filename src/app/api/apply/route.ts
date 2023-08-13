import { addApplication } from "@/utils/db"
import { NextRequest, NextResponse } from "next/server"

import validateApplyFormData from "@/utils/validateApplyFormData"

const verifyToken = async (token: string): Promise<boolean> => {
    const response = await fetch("https://www.google.com/recaptcha/api/siteverify", {
        method: "POST",
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
        },
        body: `secret=6LeH3o8nAAAAALW8uFWCGc1qZLOTVrovbo-uNLh6&response=${token}`,
    })

    const recaptcha = await response.json()

    if (!recaptcha) return false
    if (!recaptcha.score) return false
    if (!recaptcha.success) return false
    if (!recaptcha.action) return false
    if (recaptcha.action !== "apply_form_submit") return false

    if (recaptcha.score > 0.5) return true

    return false
}

export async function POST(req: NextRequest) {
    const recaptchaToken = req.headers.get("g-recaptcha-response")

    if (!recaptchaToken) {
        return NextResponse.json({ error: "No recaptcha token provided" }, { status: 400 })
    }

    const formData = await req.json()

    if (!validateApplyFormData(formData)) {
        return NextResponse.json({ error: "Missing required fields" }, { status: 400 })
    }

    if (
        formData.overview.length > 1000 ||
        formData.fundraisingDetails.length > 1000 ||
        formData.additionalDetails.length > 1000
    ) {
        return NextResponse.json(
            {
                error: "Overview, fundraising, and additional details must be 1000 characters or less",
            },
            { status: 400 }
        )
    }

    const verified = await verifyToken(recaptchaToken)
    if (!verified) {
        return NextResponse.json({ error: "Invalid Recaptcha token" }, { status: 400 })
    }

    await addApplication(formData).catch(_ => {
        return NextResponse.json({ error: "Internal server error" }, { status: 500 })
    })

    return NextResponse.json({ success: true })
}

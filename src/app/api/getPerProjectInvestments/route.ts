import { getPerProjectInvestments } from "@/utils/db"
import { type NextRequest, NextResponse } from "next/server"

export async function GET(req: NextRequest) {
    const address = req.nextUrl.searchParams.get("address")

    if (typeof address !== "string") {
        return NextResponse.json({ error: "Missing address" })
    }

    const perProjectInvestments = await getPerProjectInvestments(address)

    if (!perProjectInvestments) {
        return NextResponse.json({})
    }

    return NextResponse.json(perProjectInvestments)
}

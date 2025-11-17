import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    let settings = await prisma.settings.findUnique({
      where: { id: "global" },
    })

    // Create default if not exists
    if (!settings) {
      settings = await prisma.settings.create({
        data: { id: "global" },
      })
    }

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Failed to fetch settings:", error)
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 })
  }
}

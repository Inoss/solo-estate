import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  try {
    const developers = await prisma.developer.findMany({
      include: {
        projects: {
          where: { published: true },
        },
      },
      orderBy: { name: "asc" },
    })

    return NextResponse.json(developers)
  } catch (error) {
    console.error("Failed to fetch developers:", error)
    return NextResponse.json({ error: "Failed to fetch developers" }, { status: 500 })
  }
}

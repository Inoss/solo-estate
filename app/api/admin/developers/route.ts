import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/developers - List all developers
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const developers = await prisma.developer.findMany({
      include: {
        _count: {
          select: { projects: true }
        }
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(developers)
  } catch (error) {
    console.error("Failed to fetch developers:", error)
    return NextResponse.json(
      { error: "Failed to fetch developers" },
      { status: 500 }
    )
  }
}

// POST /api/admin/developers - Create new developer
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const developer = await prisma.developer.create({
      data: {
        name: data.name,
        slug: data.slug,
        logo: data.logo,
        descriptionEn: data.descriptionEn,
        descriptionKa: data.descriptionKa,
        descriptionRu: data.descriptionRu,
        descriptionHe: data.descriptionHe,
        descriptionAz: data.descriptionAz,
        descriptionHy: data.descriptionHy,
        descriptionUk: data.descriptionUk,
        rating: data.rating ? parseFloat(data.rating) : null,
        completedProjects: data.completedProjects ? parseInt(data.completedProjects) : null,
        website: data.website,
      },
    })

    return NextResponse.json(developer)
  } catch (error) {
    console.error("Failed to create developer:", error)
    return NextResponse.json(
      { error: "Failed to create developer" },
      { status: 500 }
    )
  }
}

import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/developers/[id] - Get single developer
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    const developer = await prisma.developer.findUnique({
      where: { id },
      include: {
        projects: true,
      },
    })

    if (!developer) {
      return NextResponse.json({ error: "Developer not found" }, { status: 404 })
    }

    return NextResponse.json(developer)
  } catch (error) {
    console.error("Failed to fetch developer:", error)
    return NextResponse.json(
      { error: "Failed to fetch developer" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/developers/[id] - Update developer
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params
    const data = await request.json()

    const developer = await prisma.developer.update({
      where: { id },
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
    console.error("Failed to update developer:", error)
    return NextResponse.json(
      { error: "Failed to update developer" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/developers/[id] - Delete developer
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const { id } = await params

    await prisma.developer.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete developer:", error)
    return NextResponse.json(
      { error: "Failed to delete developer" },
      { status: 500 }
    )
  }
}

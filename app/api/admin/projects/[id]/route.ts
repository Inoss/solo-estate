import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/projects/[id] - Get single project
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

    const project = await prisma.project.findUnique({
      where: { id },
      include: {
        developer: true,
      },
    })

    if (!project) {
      return NextResponse.json({ error: "Project not found" }, { status: 404 })
    }

    return NextResponse.json(project)
  } catch (error) {
    console.error("Failed to fetch project:", error)
    return NextResponse.json(
      { error: "Failed to fetch project" },
      { status: 500 }
    )
  }
}

// PUT /api/admin/projects/[id] - Update project
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

    const project = await prisma.project.update({
      where: { id },
      data: {
        slug: data.slug,
        titleEn: data.titleEn,
        titleKa: data.titleKa,
        titleRu: data.titleRu,
        titleHe: data.titleHe,
        titleAz: data.titleAz,
        titleHy: data.titleHy,
        titleUk: data.titleUk,
        descriptionEn: data.descriptionEn,
        descriptionKa: data.descriptionKa,
        descriptionRu: data.descriptionRu,
        descriptionHe: data.descriptionHe,
        descriptionAz: data.descriptionAz,
        descriptionHy: data.descriptionHy,
        descriptionUk: data.descriptionUk,
        developerId: data.developerId,
        status: data.status,
        propertyType: data.propertyType,
        area: data.area ? parseFloat(data.area) : null,
        locationCity: data.locationCity,
        locationArea: data.locationArea,
        locationAddress: data.locationAddress,
        locationLat: data.locationLat ? parseFloat(data.locationLat) : null,
        locationLng: data.locationLng ? parseFloat(data.locationLng) : null,
        price: parseFloat(data.price),
        pricePerSqm: data.pricePerSqm ? parseFloat(data.pricePerSqm) : null,
        currency: data.currency || "USD",
        priceRangeMin: data.priceRangeMin ? parseFloat(data.priceRangeMin) : null,
        priceRangeMax: data.priceRangeMax ? parseFloat(data.priceRangeMax) : null,
        yield: data.yield ? parseFloat(data.yield) : null,
        capRate: data.capRate ? parseFloat(data.capRate) : null,
        irr: data.irr ? parseFloat(data.irr) : null,
        monthlyRent: data.monthlyRent ? parseFloat(data.monthlyRent) : null,
        occupancy: data.occupancy ? parseFloat(data.occupancy) : null,
        managementFee: data.managementFee ? parseFloat(data.managementFee) : null,
        deliveryQuarter: data.deliveryQuarter,
        deliveryYear: data.deliveryYear ? parseInt(data.deliveryYear) : null,
        coverImage: data.coverImage,
        gallery: data.gallery ? JSON.stringify(data.gallery) : null,
        videoUrl: data.videoUrl,
        floorPlans: data.floorPlans ? JSON.stringify(data.floorPlans) : null,
        highlights: data.highlights ? JSON.stringify(data.highlights) : null,
        documents: data.documents || null,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        ogImage: data.ogImage,
        featured: data.featured || false,
        published: data.published !== false,
      },
    })

    return NextResponse.json(project)
  } catch (error) {
    console.error("Failed to update project:", error)
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 }
    )
  }
}

// DELETE /api/admin/projects/[id] - Delete project
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

    await prisma.project.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete project:", error)
    return NextResponse.json(
      { error: "Failed to delete project" },
      { status: 500 }
    )
  }
}

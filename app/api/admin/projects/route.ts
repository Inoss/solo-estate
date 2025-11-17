import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/projects - List all projects
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const projects = await prisma.project.findMany({
      include: {
        developer: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    })

    return NextResponse.json(projects)
  } catch (error) {
    console.error("Failed to fetch projects:", error)
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 }
    )
  }
}

// POST /api/admin/projects - Create new project
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const project = await prisma.project.create({
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
    console.error("Failed to create project:", error)
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 }
    )
  }
}

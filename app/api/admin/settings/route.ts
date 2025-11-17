import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/settings
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    let settings = await prisma.settings.findUnique({
      where: { id: "global" },
    })

    // Create default settings if not exists
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

// PUT /api/admin/settings
export async function PUT(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const settings = await prisma.settings.upsert({
      where: { id: "global" },
      update: {
        siteNameEn: data.siteNameEn,
        siteNameKa: data.siteNameKa,
        siteNameRu: data.siteNameRu,
        siteNameHe: data.siteNameHe,
        siteNameAz: data.siteNameAz,
        siteNameHy: data.siteNameHy,
        siteNameUk: data.siteNameUk,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        address: data.address,
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
        twitter: data.twitter,
        defaultMetaTitle: data.defaultMetaTitle,
        defaultMetaDescription: data.defaultMetaDescription,
        defaultOgImage: data.defaultOgImage,
      },
      create: {
        id: "global",
        siteNameEn: data.siteNameEn,
        siteNameKa: data.siteNameKa,
        siteNameRu: data.siteNameRu,
        siteNameHe: data.siteNameHe,
        siteNameAz: data.siteNameAz,
        siteNameHy: data.siteNameHy,
        siteNameUk: data.siteNameUk,
        email: data.email,
        phone: data.phone,
        whatsapp: data.whatsapp,
        address: data.address,
        facebook: data.facebook,
        instagram: data.instagram,
        linkedin: data.linkedin,
        twitter: data.twitter,
        defaultMetaTitle: data.defaultMetaTitle,
        defaultMetaDescription: data.defaultMetaDescription,
        defaultOgImage: data.defaultOgImage,
      },
    })

    return NextResponse.json(settings)
  } catch (error) {
    console.error("Failed to update settings:", error)
    return NextResponse.json({ error: "Failed to update settings" }, { status: 500 })
  }
}

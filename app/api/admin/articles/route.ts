import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/articles
export async function GET(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const articles = await prisma.article.findMany({
      orderBy: { createdAt: "desc" },
    })

    return NextResponse.json(articles)
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return NextResponse.json({ error: "Failed to fetch articles" }, { status: 500 })
  }
}

// POST /api/admin/articles
export async function POST(request: NextRequest) {
  try {
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const data = await request.json()

    const article = await prisma.article.create({
      data: {
        slug: data.slug,
        titleEn: data.titleEn,
        titleKa: data.titleKa,
        titleRu: data.titleRu,
        titleHe: data.titleHe,
        titleAz: data.titleAz,
        titleHy: data.titleHy,
        titleUk: data.titleUk,
        contentEn: data.contentEn,
        contentKa: data.contentKa,
        contentRu: data.contentRu,
        contentHe: data.contentHe,
        contentAz: data.contentAz,
        contentHy: data.contentHy,
        contentUk: data.contentUk,
        excerptEn: data.excerptEn,
        excerptKa: data.excerptKa,
        excerptRu: data.excerptRu,
        excerptHe: data.excerptHe,
        excerptAz: data.excerptAz,
        excerptHy: data.excerptHy,
        excerptUk: data.excerptUk,
        coverImage: data.coverImage,
        category: data.category,
        tags: data.tags ? JSON.stringify(data.tags) : null,
        metaTitle: data.metaTitle,
        metaDescription: data.metaDescription,
        ogImage: data.ogImage,
        featured: data.featured || false,
        published: data.published !== false,
      },
    })

    return NextResponse.json(article)
  } catch (error) {
    console.error("Failed to create article:", error)
    return NextResponse.json({ error: "Failed to create article" }, { status: 500 })
  }
}

import { auth } from "@/auth"
import { prisma } from "@/lib/db"
import { NextRequest, NextResponse } from "next/server"

// GET /api/admin/articles/[id]
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

    const article = await prisma.article.findUnique({
      where: { id },
    })

    if (!article) {
      return NextResponse.json({ error: "Article not found" }, { status: 404 })
    }

    return NextResponse.json(article)
  } catch (error) {
    console.error("Failed to fetch article:", error)
    return NextResponse.json({ error: "Failed to fetch article" }, { status: 500 })
  }
}

// PUT /api/admin/articles/[id]
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

    const article = await prisma.article.update({
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
    console.error("Failed to update article:", error)
    return NextResponse.json({ error: "Failed to update article" }, { status: 500 })
  }
}

// DELETE /api/admin/articles/[id]
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

    await prisma.article.delete({
      where: { id },
    })

    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Failed to delete article:", error)
    return NextResponse.json({ error: "Failed to delete article" }, { status: 500 })
  }
}

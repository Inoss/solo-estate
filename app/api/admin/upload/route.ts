import { auth } from "@/auth"
import { saveFile } from "@/lib/upload"
import { NextRequest, NextResponse } from "next/server"

export async function POST(request: NextRequest) {
  try {
    // Check authentication
    const session = await auth()
    if (!session) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }

    const formData = await request.formData()
    const file = formData.get("file") as File
    const directory = (formData.get("directory") as string) || "images"

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    // Validate directory
    if (!["images", "documents", "gallery"].includes(directory)) {
      return NextResponse.json({ error: "Invalid directory" }, { status: 400 })
    }

    // Save file
    const url = await saveFile(file, directory as any)

    return NextResponse.json({ url })
  } catch (error) {
    console.error("Upload error:", error)
    return NextResponse.json(
      { error: "Failed to upload file" },
      { status: 500 }
    )
  }
}

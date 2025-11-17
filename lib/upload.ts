import { writeFile } from "fs/promises"
import { join } from "path"

export async function saveFile(
  file: File,
  directory: "images" | "documents" | "gallery"
): Promise<string> {
  const bytes = await file.arrayBuffer()
  const buffer = Buffer.from(bytes)

  // Create unique filename
  const timestamp = Date.now()
  const randomString = Math.random().toString(36).substring(2, 8)
  const extension = file.name.split(".").pop()
  const filename = `${timestamp}-${randomString}.${extension}`

  // Save to public/uploads directory
  const path = join(process.cwd(), "public", "uploads", directory, filename)
  await writeFile(path, buffer)

  // Return public URL
  return `/uploads/${directory}/${filename}`
}

export function getFileUrl(path: string): string {
  if (!path) return ""
  if (path.startsWith("http")) return path
  return path
}

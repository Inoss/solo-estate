"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface GalleryManagerProps {
  label: string
  images: string[]
  onChange: (images: string[]) => void
}

export default function GalleryManager({
  label,
  images,
  onChange,
}: GalleryManagerProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (!files || files.length === 0) return

    setError("")
    setIsUploading(true)

    try {
      const uploadPromises = Array.from(files).map(async (file) => {
        // Validate file
        if (!file.type.startsWith("image/")) {
          throw new Error("Please select only image files")
        }
        if (file.size > 5 * 1024 * 1024) {
          throw new Error("File size must be less than 5MB")
        }

        const formData = new FormData()
        formData.append("file", file)
        formData.append("directory", "gallery")

        const response = await fetch("/api/admin/upload", {
          method: "POST",
          body: formData,
        })

        if (!response.ok) throw new Error("Upload failed")

        const data = await response.json()
        return data.url
      })

      const urls = await Promise.all(uploadPromises)
      onChange([...images, ...urls])
    } catch (err: any) {
      setError(err.message || "Failed to upload images")
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = (index: number) => {
    const newImages = images.filter((_, i) => i !== index)
    onChange(newImages)
  }

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-slate-700">
        {label}
      </label>

      {/* Upload Button */}
      <div className="border-2 border-dashed border-slate-300 rounded-lg p-4 text-center hover:border-blue-400 transition">
        <input
          type="file"
          accept="image/*"
          multiple
          onChange={handleFileChange}
          disabled={isUploading}
          className="hidden"
          id="gallery-upload"
        />
        <label
          htmlFor="gallery-upload"
          className="cursor-pointer flex flex-col items-center"
        >
          <Upload className="h-8 w-8 text-slate-400 mb-2" />
          <span className="text-sm font-medium text-slate-700">
            {isUploading ? "Uploading..." : "Click to upload images"}
          </span>
          <span className="text-xs text-slate-500 mt-1">
            PNG, JPG, GIF up to 5MB (multiple files allowed)
          </span>
        </label>
      </div>

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}

      {/* Image Grid */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {images.map((url, index) => (
            <div key={index} className="relative group">
              <div className="relative w-full h-32 rounded-lg overflow-hidden border border-slate-200">
                <Image
                  src={url}
                  alt={`Gallery image ${index + 1}`}
                  fill
                  className="object-cover"
                />
              </div>
              <button
                type="button"
                onClick={() => handleRemove(index)}
                className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition opacity-0 group-hover:opacity-100"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}

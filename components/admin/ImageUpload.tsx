"use client"

import { useState } from "react"
import { Upload, X } from "lucide-react"
import Image from "next/image"

interface ImageUploadProps {
  label: string
  value: string
  onChange: (url: string) => void
  directory?: "images" | "documents" | "gallery"
  required?: boolean
}

export default function ImageUpload({
  label,
  value,
  onChange,
  directory = "images",
  required = false,
}: ImageUploadProps) {
  const [isUploading, setIsUploading] = useState(false)
  const [error, setError] = useState("")

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setError("File size must be less than 5MB")
      return
    }

    setError("")
    setIsUploading(true)

    try {
      const formData = new FormData()
      formData.append("file", file)
      formData.append("directory", directory)

      const response = await fetch("/api/admin/upload", {
        method: "POST",
        body: formData,
      })

      if (!response.ok) {
        throw new Error("Upload failed")
      }

      const data = await response.json()
      onChange(data.url)
    } catch (err) {
      setError("Failed to upload image")
      console.error(err)
    } finally {
      setIsUploading(false)
    }
  }

  const handleRemove = () => {
    onChange("")
  }

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {value ? (
        <div className="relative inline-block">
          <div className="relative w-64 h-48 rounded-lg overflow-hidden border border-slate-200">
            <Image
              src={value}
              alt="Preview"
              fill
              className="object-cover"
            />
          </div>
          <button
            type="button"
            onClick={handleRemove}
            className="absolute -top-2 -right-2 bg-red-500 text-white p-1 rounded-full hover:bg-red-600 transition"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
      ) : (
        <div className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:border-blue-400 transition">
          <input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isUploading}
            className="hidden"
            id={`upload-${label}`}
          />
          <label
            htmlFor={`upload-${label}`}
            className="cursor-pointer flex flex-col items-center"
          >
            <Upload className="h-10 w-10 text-slate-400 mb-2" />
            <span className="text-sm font-medium text-slate-700">
              {isUploading ? "Uploading..." : "Click to upload image"}
            </span>
            <span className="text-xs text-slate-500 mt-1">
              PNG, JPG, GIF up to 5MB
            </span>
          </label>
        </div>
      )}

      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
    </div>
  )
}

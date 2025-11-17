"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MultilingualInput from "@/components/admin/MultilingualInput"
import ImageUpload from "@/components/admin/ImageUpload"

export default function NewDeveloperPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [description, setDescription] = useState({
    en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: ""
  })

  const [name, setName] = useState("")
  const [slug, setSlug] = useState("")
  const [logo, setLogo] = useState("")
  const [rating, setRating] = useState("")
  const [completedProjects, setCompletedProjects] = useState("")
  const [website, setWebsite] = useState("")

  const handleDescriptionChange = (lang: string, value: string) => {
    setDescription(prev => ({ ...prev, [lang]: value }))
  }

  const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    setName(value)
    if (!slug) {
      const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      setSlug(autoSlug)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const data = {
        name,
        slug,
        logo,
        descriptionEn: description.en,
        descriptionKa: description.ka,
        descriptionRu: description.ru,
        descriptionHe: description.he,
        descriptionAz: description.az,
        descriptionHy: description.hy,
        descriptionUk: description.uk,
        rating: rating || null,
        completedProjects: completedProjects || null,
        website: website || null,
      }

      const response = await fetch("/api/admin/developers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to create developer")

      router.push("/admin/developers")
    } catch (err: any) {
      setError(err.message || "Failed to create developer")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Add New Developer</h1>
        <p className="text-slate-600 mt-1">Create a new real estate developer</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">Basic Information</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Developer Name <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={handleNameChange}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Developer Company Name"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">
              Slug (URL) <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
              required
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="developer-slug"
            />
          </div>

          <MultilingualInput
            label="Description"
            name="description"
            type="textarea"
            values={description}
            onChange={handleDescriptionChange}
            placeholder="Enter developer description"
          />

          <ImageUpload
            label="Logo"
            value={logo}
            onChange={setLogo}
            directory="images"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">Details</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Rating</label>
              <input
                type="number"
                step="0.1"
                min="0"
                max="5"
                value={rating}
                onChange={(e) => setRating(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="4.5"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Completed Projects</label>
              <input
                type="number"
                value={completedProjects}
                onChange={(e) => setCompletedProjects(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="25"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Website</label>
              <input
                type="url"
                value={website}
                onChange={(e) => setWebsite(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="https://example.com"
              />
            </div>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Developer"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/developers")}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

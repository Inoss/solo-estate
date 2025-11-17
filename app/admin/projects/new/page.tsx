"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MultilingualInput from "@/components/admin/MultilingualInput"
import ImageUpload from "@/components/admin/ImageUpload"
import GalleryManager from "@/components/admin/GalleryManager"

export default function NewProjectPage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Title state
  const [title, setTitle] = useState({
    en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: ""
  })

  // Description state
  const [description, setDescription] = useState({
    en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: ""
  })

  // Basic fields
  const [slug, setSlug] = useState("")
  const [status, setStatus] = useState("offPlan")
  const [propertyType, setPropertyType] = useState("apartment")
  const [area, setArea] = useState("")
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [coverImage, setCoverImage] = useState("")
  const [gallery, setGallery] = useState<string[]>([])
  const [published, setPublished] = useState(true)

  const handleTitleChange = (lang: string, value: string) => {
    setTitle(prev => ({ ...prev, [lang]: value }))
    // Auto-generate slug from English title
    if (lang === "en" && !slug) {
      const autoSlug = value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
      setSlug(autoSlug)
    }
  }

  const handleDescriptionChange = (lang: string, value: string) => {
    setDescription(prev => ({ ...prev, [lang]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setIsSubmitting(true)

    try {
      const data = {
        slug,
        titleEn: title.en,
        titleKa: title.ka,
        titleRu: title.ru,
        titleHe: title.he,
        titleAz: title.az,
        titleHy: title.hy,
        titleUk: title.uk,
        descriptionEn: description.en,
        descriptionKa: description.ka,
        descriptionRu: description.ru,
        descriptionHe: description.he,
        descriptionAz: description.az,
        descriptionHy: description.hy,
        descriptionUk: description.uk,
        status,
        propertyType,
        area: area || null,
        price: parseFloat(price),
        currency,
        coverImage,
        gallery,
        published,
      }

      const response = await fetch("/api/admin/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to create project")
      }

      router.push("/admin/projects")
    } catch (err: any) {
      setError(err.message || "Failed to create project")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Add New Project</h1>
        <p className="text-slate-600 mt-1">Create a new real estate project</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Basic Information */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">
            Basic Information
          </h2>

          <MultilingualInput
            label="Project Title"
            name="title"
            type="text"
            required
            values={title}
            onChange={handleTitleChange}
            placeholder="Enter project title"
          />

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
              placeholder="project-url-slug"
            />
            <p className="text-xs text-slate-500 mt-1">
              Used in the URL. Auto-generated from English title.
            </p>
          </div>

          <MultilingualInput
            label="Description"
            name="description"
            type="textarea"
            values={description}
            onChange={handleDescriptionChange}
            placeholder="Enter project description"
          />
        </div>

        {/* Property Details */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">
            Property Details
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Status <span className="text-red-500">*</span>
              </label>
              <select
                value={status}
                onChange={(e) => setStatus(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="offPlan">Off Plan</option>
                <option value="underConstruction">Under Construction</option>
                <option value="ready">Ready</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Property Type <span className="text-red-500">*</span>
              </label>
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="apartment">Apartment</option>
                <option value="aparthotel">Aparthotel</option>
                <option value="commercial">Commercial</option>
                <option value="villa">Villa</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Area (sqm)
              </label>
              <input
                type="number"
                step="0.01"
                value={area}
                onChange={(e) => setArea(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="100.50"
              />
            </div>
          </div>
        </div>

        {/* Pricing */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">
            Pricing
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.01"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="150000"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Currency
              </label>
              <select
                value={currency}
                onChange={(e) => setCurrency(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="USD">USD</option>
                <option value="EUR">EUR</option>
                <option value="GEL">GEL</option>
                <option value="RUB">RUB</option>
              </select>
            </div>
          </div>
        </div>

        {/* Media */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">
            Media
          </h2>

          <ImageUpload
            label="Cover Image"
            value={coverImage}
            onChange={setCoverImage}
            directory="images"
          />

          <GalleryManager
            label="Project Gallery"
            images={gallery}
            onChange={setGallery}
          />
        </div>

        {/* Publishing */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">
            Publishing
          </h2>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="published"
              checked={published}
              onChange={(e) => setPublished(e.target.checked)}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
            />
            <label htmlFor="published" className="ml-2 block text-sm text-slate-700">
              Publish immediately
            </label>
          </div>
        </div>

        {/* Submit Buttons */}
        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isSubmitting ? "Creating..." : "Create Project"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/projects")}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

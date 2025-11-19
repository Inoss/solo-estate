"use client"

import { useState, useEffect, use } from "react"
import { useRouter } from "next/navigation"
import MultilingualInput from "@/components/admin/MultilingualInput"
import ImageUpload from "@/components/admin/ImageUpload"
import GalleryManager from "@/components/admin/GalleryManager"

export default function EditProjectPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params)
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  // Form state
  const [title, setTitle] = useState({
    en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: ""
  })
  const [description, setDescription] = useState({
    en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: ""
  })
  const [slug, setSlug] = useState("")
  const [status, setStatus] = useState("offPlan")
  const [propertyType, setPropertyType] = useState("apartment")
  const [area, setArea] = useState("")
  const [price, setPrice] = useState("")
  const [currency, setCurrency] = useState("USD")
  const [pricePerSqm, setPricePerSqm] = useState("")
  const [yieldPercent, setYieldPercent] = useState("")
  const [roiPercent, setRoiPercent] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [gallery, setGallery] = useState<string[]>([])
  const [published, setPublished] = useState(true)

  useEffect(() => {
    fetchProject()
  }, [id])

  const fetchProject = async () => {
    try {
      const response = await fetch(`/api/admin/projects/${id}`)
      if (!response.ok) throw new Error("Failed to fetch project")

      const project = await response.json()

      // Populate form fields
      setTitle({
        en: project.titleEn || "",
        ka: project.titleKa || "",
        ru: project.titleRu || "",
        he: project.titleHe || "",
        az: project.titleAz || "",
        hy: project.titleHy || "",
        uk: project.titleUk || "",
      })
      setDescription({
        en: project.descriptionEn || "",
        ka: project.descriptionKa || "",
        ru: project.descriptionRu || "",
        he: project.descriptionHe || "",
        az: project.descriptionAz || "",
        hy: project.descriptionHy || "",
        uk: project.descriptionUk || "",
      })
      setSlug(project.slug)
      setStatus(project.status)
      setPropertyType(project.propertyType)
      setArea(project.area?.toString() || "")
      setPrice(project.price.toString())
      setCurrency(project.currency)
      setPricePerSqm(project.pricePerSqm?.toString() || "")
      setYieldPercent(project.yield?.toString() || "")
      setRoiPercent(project.irr?.toString() || "")
      setCoverImage(project.coverImage || "")
      setGallery(project.gallery ? JSON.parse(project.gallery) : [])
      setPublished(project.published)
    } catch (err) {
      setError("Failed to load project")
      console.error(err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleTitleChange = (lang: string, value: string) => {
    setTitle(prev => ({ ...prev, [lang]: value }))
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
        area: area ? parseFloat(area) : null,
        price: parseFloat(price),
        pricePerSqm: pricePerSqm ? parseFloat(pricePerSqm) : null,
        yield: yieldPercent ? parseFloat(yieldPercent) : null,
        irr: roiPercent ? parseFloat(roiPercent) : null,
        currency,
        coverImage,
        gallery,
        published,
      }

      const response = await fetch(`/api/admin/projects/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        throw new Error("Failed to update project")
      }

      router.push("/admin/projects")
    } catch (err: any) {
      setError(err.message || "Failed to update project")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <div className="p-8 text-center">
        <p className="text-slate-600">Loading project...</p>
      </div>
    )
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Edit Project</h1>
        <p className="text-slate-600 mt-1">Update project information</p>
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

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Price per sqm
              </label>
              <input
                type="number"
                step="0.01"
                value={pricePerSqm}
                onChange={(e) => setPricePerSqm(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="1500"
              />
            </div>
          </div>
        </div>

        {/* Investment Metrics */}
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">
            Investment Metrics
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                Yield % (per annum)
              </label>
              <input
                type="number"
                step="0.01"
                value={yieldPercent}
                onChange={(e) => setYieldPercent(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="8.5"
              />
              <p className="text-sm text-slate-500 mt-1">Annual rental yield percentage</p>
            </div>

            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">
                ROI % (IRR)
              </label>
              <input
                type="number"
                step="0.01"
                value={roiPercent}
                onChange={(e) => setRoiPercent(e.target.value)}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                placeholder="12.5"
              />
              <p className="text-sm text-slate-500 mt-1">Return on Investment / Internal Rate of Return</p>
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
              Published
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
            {isSubmitting ? "Saving..." : "Save Changes"}
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

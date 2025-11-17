"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import MultilingualInput from "@/components/admin/MultilingualInput"
import ImageUpload from "@/components/admin/ImageUpload"

export default function NewArticlePage() {
  const router = useRouter()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")

  const [title, setTitle] = useState({ en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: "" })
  const [excerpt, setExcerpt] = useState({ en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: "" })
  const [content, setContent] = useState({ en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: "" })

  const [slug, setSlug] = useState("")
  const [category, setCategory] = useState("")
  const [coverImage, setCoverImage] = useState("")
  const [published, setPublished] = useState(true)
  const [featured, setFeatured] = useState(false)

  const handleTitleChange = (lang: string, value: string) => {
    setTitle(prev => ({ ...prev, [lang]: value }))
    if (lang === "en" && !slug) {
      setSlug(value.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, ""))
    }
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
        excerptEn: excerpt.en,
        excerptKa: excerpt.ka,
        excerptRu: excerpt.ru,
        excerptHe: excerpt.he,
        excerptAz: excerpt.az,
        excerptHy: excerpt.hy,
        excerptUk: excerpt.uk,
        contentEn: content.en,
        contentKa: content.ka,
        contentRu: content.ru,
        contentHe: content.he,
        contentAz: content.az,
        contentHy: content.hy,
        contentUk: content.uk,
        category,
        coverImage,
        published,
        featured,
      }

      const response = await fetch("/api/admin/articles", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to create article")

      router.push("/admin/articles")
    } catch (err: any) {
      setError(err.message || "Failed to create article")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className="p-8 max-w-5xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Add New Article</h1>
        <p className="text-slate-600 mt-1">Create a new blog post</p>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">Basic Information</h2>

          <MultilingualInput
            label="Article Title"
            name="title"
            type="text"
            required
            values={title}
            onChange={handleTitleChange}
            placeholder="Enter article title"
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
            />
          </div>

          <MultilingualInput
            label="Excerpt"
            name="excerpt"
            type="textarea"
            values={excerpt}
            onChange={(lang, value) => setExcerpt(prev => ({ ...prev, [lang]: value }))}
            placeholder="Short summary"
          />

          <MultilingualInput
            label="Content"
            name="content"
            type="textarea"
            values={content}
            onChange={(lang, value) => setContent(prev => ({ ...prev, [lang]: value }))}
            placeholder="Full article content"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">Details</h2>

          <div>
            <label className="block text-sm font-medium text-slate-700 mb-2">Category</label>
            <input
              type="text"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              placeholder="Investment, Market News, Guides"
            />
          </div>

          <ImageUpload
            label="Cover Image"
            value={coverImage}
            onChange={setCoverImage}
            directory="images"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-4">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">Publishing</h2>

          <div className="flex items-center gap-6">
            <label className="flex items-center">
              <input
                type="checkbox"
                checked={published}
                onChange={(e) => setPublished(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <span className="ml-2 text-sm text-slate-700">Publish immediately</span>
            </label>

            <label className="flex items-center">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-slate-300 rounded"
              />
              <span className="ml-2 text-sm text-slate-700">Featured article</span>
            </label>
          </div>
        </div>

        <div className="flex gap-4">
          <button
            type="submit"
            disabled={isSubmitting}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50"
          >
            {isSubmitting ? "Creating..." : "Create Article"}
          </button>
          <button
            type="button"
            onClick={() => router.push("/admin/articles")}
            className="px-6 py-3 bg-slate-200 hover:bg-slate-300 text-slate-700 font-medium rounded-lg transition"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  )
}

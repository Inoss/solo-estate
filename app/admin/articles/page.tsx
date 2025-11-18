"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Search, FileText, Eye, Star } from "lucide-react"
import Image from "next/image"

interface Article {
  id: string
  titleEn: string
  category: string | null
  published: boolean
  featured: boolean
  createdAt: string
  slug: string
  coverImage?: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")
  const [filterStatus, setFilterStatus] = useState<string>("all")

  useEffect(() => {
    fetchArticles()
  }, [])

  const fetchArticles = async () => {
    try {
      const response = await fetch("/api/admin/articles")
      if (response.ok) {
        const data = await response.json()
        setArticles(data)
      }
    } catch (error) {
      console.error("Failed to fetch articles:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this article?")) return

    try {
      const response = await fetch(`/api/admin/articles/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchArticles()
      } else {
        alert("Failed to delete article")
      }
    } catch (error) {
      console.error("Failed to delete article:", error)
      alert("Failed to delete article")
    }
  }

  const filteredArticles = articles.filter((article) => {
    const matchesSearch = article.titleEn.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesFilter = filterStatus === "all" ||
      (filterStatus === "published" && article.published) ||
      (filterStatus === "draft" && !article.published) ||
      (filterStatus === "featured" && article.featured)
    return matchesSearch && matchesFilter
  })

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 backdrop-blur-lg bg-white/80">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Articles</h1>
              <p className="text-slate-600">Manage blog posts and insights</p>
            </div>
            <Link
              href="/admin/articles/new"
              className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-purple-500 hover:from-purple-700 hover:to-purple-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-purple-500/30 hover:shadow-purple-500/50 hover:scale-105 font-medium"
            >
              <Plus className="h-5 w-5" />
              Write New Article
            </Link>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search articles..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent outline-none transition"
              />
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setFilterStatus("all")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filterStatus === "all"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                All
              </button>
              <button
                onClick={() => setFilterStatus("published")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filterStatus === "published"
                    ? "bg-green-600 text-white shadow-lg shadow-green-500/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Published
              </button>
              <button
                onClick={() => setFilterStatus("draft")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filterStatus === "draft"
                    ? "bg-yellow-600 text-white shadow-lg shadow-yellow-500/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Drafts
              </button>
              <button
                onClick={() => setFilterStatus("featured")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  filterStatus === "featured"
                    ? "bg-amber-600 text-white shadow-lg shadow-amber-500/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Featured
              </button>
            </div>
          </div>
        </div>

        {/* Articles Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-pulse">
                <div className="aspect-video bg-slate-200 rounded-xl mb-4"></div>
                <div className="h-6 bg-slate-200 rounded mb-3"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredArticles.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <FileText className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No articles found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm || filterStatus !== "all"
                ? "Try adjusting your filters"
                : "Start writing your first article"}
            </p>
            {!searchTerm && filterStatus === "all" && (
              <Link
                href="/admin/articles/new"
                className="inline-flex items-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium"
              >
                <Plus className="h-5 w-5" />
                Write First Article
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticles.map((article) => (
              <div
                key={article.id}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image */}
                <div className="aspect-video bg-slate-100 relative overflow-hidden">
                  {article.coverImage ? (
                    <Image
                      src={article.coverImage}
                      alt={article.titleEn}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-200">
                      <FileText className="h-16 w-16 text-purple-400" />
                    </div>
                  )}
                  <div className="absolute top-3 left-3 right-3 flex justify-between items-start">
                    {article.featured && (
                      <span className="px-3 py-1.5 rounded-full text-xs font-semibold bg-amber-500/90 text-white backdrop-blur-sm flex items-center gap-1">
                        <Star className="h-3 w-3 fill-white" />
                        Featured
                      </span>
                    )}
                    <span
                      className={`px-3 py-1.5 rounded-full text-xs font-semibold backdrop-blur-sm ml-auto ${
                        article.published
                          ? "bg-green-500/90 text-white"
                          : "bg-yellow-500/90 text-white"
                      }`}
                    >
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </div>
                </div>

                {/* Content */}
                <div className="p-5">
                  <div className="mb-3">
                    {article.category && (
                      <span className="inline-block px-3 py-1 bg-purple-100 text-purple-700 rounded-lg text-xs font-semibold mb-2">
                        {article.category}
                      </span>
                    )}
                  </div>

                  <h3 className="font-bold text-lg text-slate-900 mb-3 line-clamp-2 group-hover:text-purple-600 transition-colors">
                    {article.titleEn}
                  </h3>

                  <p className="text-sm text-slate-500 mb-4">
                    {new Date(article.createdAt).toLocaleDateString('en-US', {
                      month: 'short',
                      day: 'numeric',
                      year: 'numeric'
                    })}
                  </p>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/admin/articles/${article.id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium"
                    >
                      <Edit className="h-4 w-4" />
                      Edit
                    </Link>
                    <Link
                      href={`/en/insights/${article.slug}`}
                      target="_blank"
                      className="flex items-center justify-center gap-2 bg-slate-100 hover:bg-slate-200 text-slate-700 px-4 py-2.5 rounded-lg transition-all duration-300"
                    >
                      <Eye className="h-4 w-4" />
                    </Link>
                    <button
                      onClick={() => handleDelete(article.id)}
                      className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-lg transition-all duration-300"
                    >
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

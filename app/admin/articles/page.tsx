"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

interface Article {
  id: string
  titleEn: string
  category: string | null
  published: boolean
  featured: boolean
  createdAt: string
}

export default function ArticlesPage() {
  const [articles, setArticles] = useState<Article[]>([])
  const [isLoading, setIsLoading] = useState(true)

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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Articles</h1>
          <p className="text-slate-600 mt-1">Manage blog posts and articles</p>
        </div>
        <Link
          href="/admin/articles/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="h-5 w-5" />
          Add New Article
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-600">Loading...</div>
        ) : articles.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            No articles yet. Create your first article!
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Title</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Category</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Status</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {articles.map((article) => (
                <tr key={article.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{article.titleEn}</div>
                    {article.featured && (
                      <span className="text-xs text-yellow-600">⭐ Featured</span>
                    )}
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-sm text-slate-600">{article.category || "-"}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-1 text-xs font-semibold rounded-full ${
                      article.published ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"
                    }`}>
                      {article.published ? "Published" : "Draft"}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Link href={`/admin/articles/${article.id}`} className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(article.id)} className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
                      <Trash2 className="h-4 w-4" />
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  )
}

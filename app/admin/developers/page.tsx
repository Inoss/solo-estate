"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2, Search, Users, ExternalLink, Star } from "lucide-react"

interface Developer {
  id: string
  name: string
  slug: string
  rating: number | null
  completedProjects: number | null
  website: string | null
  _count: {
    projects: number
  }
}

export default function DevelopersPage() {
  const [developers, setDevelopers] = useState<Developer[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState("")

  useEffect(() => {
    fetchDevelopers()
  }, [])

  const fetchDevelopers = async () => {
    try {
      const response = await fetch("/api/admin/developers")
      if (response.ok) {
        const data = await response.json()
        setDevelopers(data)
      }
    } catch (error) {
      console.error("Failed to fetch developers:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this developer?")) return

    try {
      const response = await fetch(`/api/admin/developers/${id}`, {
        method: "DELETE",
      })

      if (response.ok) {
        fetchDevelopers()
      } else {
        alert("Failed to delete developer")
      }
    } catch (error) {
      console.error("Failed to delete developer:", error)
      alert("Failed to delete developer")
    }
  }

  const filteredDevelopers = developers.filter((developer) =>
    developer.name.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 backdrop-blur-lg bg-white/80">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Developers</h1>
              <p className="text-slate-600">Manage real estate developers</p>
            </div>
            <Link
              href="/admin/developers/new"
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 font-medium"
            >
              <Plus className="h-5 w-5" />
              Add New Developer
            </Link>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Search */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-slate-400" />
            <input
              type="text"
              placeholder="Search developers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-12 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-transparent outline-none transition"
            />
          </div>
        </div>

        {/* Developers Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 animate-pulse">
                <div className="h-6 bg-slate-200 rounded mb-4"></div>
                <div className="h-4 bg-slate-200 rounded w-2/3 mb-2"></div>
                <div className="h-4 bg-slate-200 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : filteredDevelopers.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <Users className="h-16 w-16 text-slate-300 mx-auto mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 mb-2">No developers found</h3>
            <p className="text-slate-600 mb-6">
              {searchTerm
                ? "Try adjusting your search"
                : "Get started by adding your first developer"}
            </p>
            {!searchTerm && (
              <Link
                href="/admin/developers/new"
                className="inline-flex items-center gap-2 bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-xl transition-all duration-300 font-medium"
              >
                <Plus className="h-5 w-5" />
                Add First Developer
              </Link>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredDevelopers.map((developer) => (
              <div
                key={developer.id}
                className="group bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="font-bold text-lg text-slate-900 mb-1 group-hover:text-green-600 transition-colors">
                      {developer.name}
                    </h3>
                    {developer.website && (
                      <a
                        href={developer.website}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-sm text-blue-600 hover:text-blue-700 inline-flex items-center gap-1"
                      >
                        <ExternalLink className="h-3 w-3" />
                        Website
                      </a>
                    )}
                  </div>
                  {developer.rating && (
                    <div className="flex items-center gap-1 bg-yellow-100 px-3 py-1.5 rounded-full">
                      <Star className="h-4 w-4 text-yellow-600 fill-yellow-600" />
                      <span className="text-sm font-semibold text-yellow-700">
                        {developer.rating}
                      </span>
                    </div>
                  )}
                </div>

                {/* Stats */}
                <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-slate-200">
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Active Projects</p>
                    <p className="text-2xl font-bold text-slate-900">{developer._count.projects}</p>
                  </div>
                  <div>
                    <p className="text-xs text-slate-500 mb-1">Completed</p>
                    <p className="text-2xl font-bold text-slate-900">
                      {developer.completedProjects || 0}
                    </p>
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2">
                  <Link
                    href={`/admin/developers/${developer.id}`}
                    className="flex-1 flex items-center justify-center gap-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2.5 rounded-lg transition-all duration-300 font-medium"
                  >
                    <Edit className="h-4 w-4" />
                    Edit
                  </Link>
                  <button
                    onClick={() => handleDelete(developer.id)}
                    className="flex items-center justify-center gap-2 bg-red-50 hover:bg-red-100 text-red-600 px-4 py-2.5 rounded-lg transition-all duration-300"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

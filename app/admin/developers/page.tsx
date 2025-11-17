"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Plus, Edit, Trash2 } from "lucide-react"

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

  return (
    <div className="p-8">
      <div className="flex items-center justify-between mb-6">
        <div>
          <h1 className="text-3xl font-bold text-slate-900">Developers</h1>
          <p className="text-slate-600 mt-1">Manage real estate developers</p>
        </div>
        <Link
          href="/admin/developers/new"
          className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition"
        >
          <Plus className="h-5 w-5" />
          Add New Developer
        </Link>
      </div>

      <div className="bg-white rounded-lg shadow overflow-hidden">
        {isLoading ? (
          <div className="p-8 text-center text-slate-600">Loading...</div>
        ) : developers.length === 0 ? (
          <div className="p-8 text-center text-slate-600">
            No developers yet. Create your first developer!
          </div>
        ) : (
          <table className="w-full">
            <thead className="bg-slate-50 border-b border-slate-200">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Rating</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Projects</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-slate-700 uppercase">Website</th>
                <th className="px-6 py-3 text-right text-xs font-medium text-slate-700 uppercase">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {developers.map((developer) => (
                <tr key={developer.id} className="hover:bg-slate-50">
                  <td className="px-6 py-4">
                    <div className="text-sm font-medium text-slate-900">{developer.name}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-sm text-slate-600">
                      {developer.rating ? `⭐ ${developer.rating}` : "-"}
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <span className="px-2 py-1 text-xs font-semibold rounded-full bg-blue-100 text-blue-800">
                      {developer._count.projects} projects
                    </span>
                  </td>
                  <td className="px-6 py-4">
                    {developer.website ? (
                      <a href={developer.website} target="_blank" rel="noopener noreferrer" className="text-sm text-blue-600 hover:underline">
                        Visit
                      </a>
                    ) : (
                      <span className="text-sm text-slate-400">-</span>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right text-sm font-medium">
                    <Link href={`/admin/developers/${developer.id}`} className="text-blue-600 hover:text-blue-900 mr-4 inline-flex items-center gap-1">
                      <Edit className="h-4 w-4" />
                      Edit
                    </Link>
                    <button onClick={() => handleDelete(developer.id)} className="text-red-600 hover:text-red-900 inline-flex items-center gap-1">
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

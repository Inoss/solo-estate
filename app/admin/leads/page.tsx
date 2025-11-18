"use client"

import { useEffect, useState } from "react"
import { Phone, Mail, User, Calendar, MapPin, DollarSign, Home, Clock, TrendingUp, Download, Filter } from "lucide-react"

interface Lead {
  id: string
  phone: string
  source: string | null
  locale: string | null
  createdAt: string
}

interface QuizSubmission {
  id: string
  propertyType: string
  budget: string
  location: string
  purpose: string
  timeline: string
  size: string
  infrastructure: string
  contactName: string
  contactEmail: string
  contactPhone: string
  locale: string | null
  createdAt: string
}

export default function LeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [quizSubmissions, setQuizSubmissions] = useState<QuizSubmission[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [activeTab, setActiveTab] = useState<"leads" | "quiz">("leads")
  const [filterLocale, setFilterLocale] = useState<string>("all")

  useEffect(() => {
    fetchData()
  }, [])

  const fetchData = async () => {
    try {
      const [leadsResponse, quizResponse] = await Promise.all([
        fetch("/api/leads"),
        fetch("/api/quiz"),
      ])

      if (leadsResponse.ok) {
        const leadsData = await leadsResponse.json()
        setLeads(leadsData)
      }

      if (quizResponse.ok) {
        const quizData = await quizResponse.json()
        setQuizSubmissions(quizData)
      }
    } catch (error) {
      console.error("Failed to fetch data:", error)
    } finally {
      setIsLoading(false)
    }
  }

  const filteredLeads = filterLocale === "all"
    ? leads
    : leads.filter(lead => lead.locale === filterLocale)

  const filteredQuiz = filterLocale === "all"
    ? quizSubmissions
    : quizSubmissions.filter(quiz => quiz.locale === filterLocale)

  const exportToCSV = () => {
    if (activeTab === "leads") {
      const csv = [
        ["ID", "Phone", "Source", "Language", "Date"].join(","),
        ...filteredLeads.map(lead => [
          lead.id,
          lead.phone,
          lead.source || "",
          lead.locale || "",
          new Date(lead.createdAt).toLocaleString()
        ].join(","))
      ].join("\n")

      const blob = new Blob([csv], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `leads-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
    } else {
      const csv = [
        ["ID", "Name", "Email", "Phone", "Property Type", "Budget", "Location", "Purpose", "Timeline", "Size", "Date"].join(","),
        ...filteredQuiz.map(quiz => [
          quiz.id,
          quiz.contactName,
          quiz.contactEmail,
          quiz.contactPhone,
          quiz.propertyType,
          quiz.budget,
          quiz.location,
          quiz.purpose,
          quiz.timeline,
          quiz.size,
          new Date(quiz.createdAt).toLocaleString()
        ].join(","))
      ].join("\n")

      const blob = new Blob([csv], { type: "text/csv" })
      const url = window.URL.createObjectURL(blob)
      const a = document.createElement("a")
      a.href = url
      a.download = `quiz-submissions-${new Date().toISOString().split('T')[0]}.csv`
      a.click()
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50/30 to-slate-50">
      {/* Header */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 backdrop-blur-lg bg-white/80">
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold text-slate-900 mb-1">Leads & Inquiries</h1>
              <p className="text-slate-600">Manage customer leads and quiz submissions</p>
            </div>
            <button
              onClick={exportToCSV}
              className="flex items-center gap-2 bg-gradient-to-r from-green-600 to-emerald-500 hover:from-green-700 hover:to-emerald-600 text-white px-6 py-3 rounded-xl transition-all duration-300 shadow-lg shadow-green-500/30 hover:shadow-green-500/50 hover:scale-105 font-medium"
            >
              <Download className="h-5 w-5" />
              Export to CSV
            </button>
          </div>
        </div>
      </div>

      <div className="p-8">
        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Total Leads</p>
                <p className="text-3xl font-bold text-slate-900">{leads.length}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-blue-500 to-blue-600 flex items-center justify-center">
                <Phone className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Quiz Submissions</p>
                <p className="text-3xl font-bold text-slate-900">{quizSubmissions.length}</p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-purple-500 to-purple-600 flex items-center justify-center">
                <Home className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>

          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-600 mb-1">Today</p>
                <p className="text-3xl font-bold text-slate-900">
                  {[...leads, ...quizSubmissions].filter(item =>
                    new Date(item.createdAt).toDateString() === new Date().toDateString()
                  ).length}
                </p>
              </div>
              <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-green-500 to-green-600 flex items-center justify-center">
                <TrendingUp className="h-7 w-7 text-white" />
              </div>
            </div>
          </div>
        </div>

        {/* Tabs and Filters */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 mb-6">
          <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
            <div className="flex gap-2">
              <button
                onClick={() => setActiveTab("leads")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === "leads"
                    ? "bg-blue-600 text-white shadow-lg shadow-blue-500/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Phone Leads ({leads.length})
              </button>
              <button
                onClick={() => setActiveTab("quiz")}
                className={`px-6 py-3 rounded-xl font-medium transition-all duration-300 ${
                  activeTab === "quiz"
                    ? "bg-purple-600 text-white shadow-lg shadow-purple-500/30"
                    : "bg-slate-100 text-slate-600 hover:bg-slate-200"
                }`}
              >
                Quiz Submissions ({quizSubmissions.length})
              </button>
            </div>

            <div className="flex items-center gap-2">
              <Filter className="h-5 w-5 text-slate-400" />
              <select
                value={filterLocale}
                onChange={(e) => setFilterLocale(e.target.value)}
                className="px-4 py-2 border border-slate-200 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              >
                <option value="all">All Languages</option>
                <option value="en">English</option>
                <option value="ka">Georgian</option>
                <option value="ru">Russian</option>
                <option value="he">Hebrew</option>
                <option value="az">Azerbaijani</option>
                <option value="hy">Armenian</option>
                <option value="uk">Ukrainian</option>
              </select>
            </div>
          </div>
        </div>

        {/* Content */}
        {isLoading ? (
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto"></div>
            <p className="text-slate-600 mt-4">Loading data...</p>
          </div>
        ) : activeTab === "leads" ? (
          /* Phone Leads Table */
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-slate-50 border-b border-slate-200">
                  <tr>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Phone Number
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Source
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Language
                    </th>
                    <th className="px-6 py-4 text-left text-xs font-semibold text-slate-600 uppercase tracking-wider">
                      Date
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  {filteredLeads.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="px-6 py-12 text-center text-slate-500">
                        No leads found
                      </td>
                    </tr>
                  ) : (
                    filteredLeads.map((lead) => (
                      <tr key={lead.id} className="hover:bg-slate-50 transition-colors">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2">
                            <Phone className="h-4 w-4 text-blue-600" />
                            <span className="font-semibold text-slate-900">{lead.phone}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-700">
                            {lead.source || "Unknown"}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <span className="text-sm text-slate-600 uppercase">{lead.locale || "N/A"}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-2 text-sm text-slate-600">
                            <Calendar className="h-4 w-4" />
                            {new Date(lead.createdAt).toLocaleDateString()} at{" "}
                            {new Date(lead.createdAt).toLocaleTimeString()}
                          </div>
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </div>
        ) : (
          /* Quiz Submissions */
          <div className="grid grid-cols-1 gap-6">
            {filteredQuiz.length === 0 ? (
              <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                <Home className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold text-slate-900 mb-2">No quiz submissions found</h3>
                <p className="text-slate-600">Quiz submissions will appear here when customers complete the property quiz</p>
              </div>
            ) : (
              filteredQuiz.map((quiz) => (
                <div
                  key={quiz.id}
                  className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-lg transition-shadow"
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-6 pb-4 border-b border-slate-200">
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 mb-1">{quiz.contactName}</h3>
                      <div className="flex flex-wrap gap-3 text-sm text-slate-600">
                        <div className="flex items-center gap-1">
                          <Mail className="h-4 w-4" />
                          {quiz.contactEmail}
                        </div>
                        <div className="flex items-center gap-1">
                          <Phone className="h-4 w-4" />
                          {quiz.contactPhone}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-slate-600 mb-1">
                        {new Date(quiz.createdAt).toLocaleDateString()}
                      </div>
                      <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-700">
                        {quiz.locale?.toUpperCase() || "N/A"}
                      </span>
                    </div>
                  </div>

                  {/* Property Details */}
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-100 flex items-center justify-center flex-shrink-0">
                        <Home className="h-5 w-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Property Type</p>
                        <p className="font-semibold text-slate-900">{quiz.propertyType}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-green-100 flex items-center justify-center flex-shrink-0">
                        <DollarSign className="h-5 w-5 text-green-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Budget</p>
                        <p className="font-semibold text-slate-900">{quiz.budget}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-purple-100 flex items-center justify-center flex-shrink-0">
                        <MapPin className="h-5 w-5 text-purple-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Location</p>
                        <p className="font-semibold text-slate-900">{quiz.location}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-orange-100 flex items-center justify-center flex-shrink-0">
                        <TrendingUp className="h-5 w-5 text-orange-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Purpose</p>
                        <p className="font-semibold text-slate-900">{quiz.purpose}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-pink-100 flex items-center justify-center flex-shrink-0">
                        <Clock className="h-5 w-5 text-pink-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Timeline</p>
                        <p className="font-semibold text-slate-900">{quiz.timeline}</p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3">
                      <div className="w-10 h-10 rounded-lg bg-cyan-100 flex items-center justify-center flex-shrink-0">
                        <Home className="h-5 w-5 text-cyan-600" />
                      </div>
                      <div>
                        <p className="text-xs text-slate-500 mb-0.5">Size</p>
                        <p className="font-semibold text-slate-900">{quiz.size}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  )
}

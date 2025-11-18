"use client"

import { useState, useEffect } from "react"
import MultilingualInput from "@/components/admin/MultilingualInput"

export default function SettingsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState(false)

  const [siteName, setSiteName] = useState({ en: "", ka: "", ru: "", he: "", az: "", hy: "", uk: "" })
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [whatsapp, setWhatsapp] = useState("")
  const [address, setAddress] = useState("")
  const [facebook, setFacebook] = useState("")
  const [instagram, setInstagram] = useState("")
  const [linkedin, setLinkedin] = useState("")
  const [twitter, setTwitter] = useState("")

  useEffect(() => {
    fetchSettings()
  }, [])

  const fetchSettings = async () => {
    try {
      const response = await fetch("/api/admin/settings")
      if (!response.ok) throw new Error("Failed to fetch settings")

      const data = await response.json()
      setSiteName({
        en: data.siteNameEn || "",
        ka: data.siteNameKa || "",
        ru: data.siteNameRu || "",
        he: data.siteNameHe || "",
        az: data.siteNameAz || "",
        hy: data.siteNameHy || "",
        uk: data.siteNameUk || "",
      })
      setEmail(data.email || "")
      setPhone(data.phone || "")
      setWhatsapp(data.whatsapp || "")
      setAddress(data.address || "")
      setFacebook(data.facebook || "")
      setInstagram(data.instagram || "")
      setLinkedin(data.linkedin || "")
      setTwitter(data.twitter || "")
    } catch (err) {
      setError("Failed to load settings")
    } finally {
      setIsLoading(false)
    }
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError("")
    setSuccess(false)
    setIsSubmitting(true)

    try {
      const data = {
        siteNameEn: siteName.en,
        siteNameKa: siteName.ka,
        siteNameRu: siteName.ru,
        siteNameHe: siteName.he,
        siteNameAz: siteName.az,
        siteNameHy: siteName.hy,
        siteNameUk: siteName.uk,
        email,
        phone,
        whatsapp,
        address,
        facebook,
        instagram,
        linkedin,
        twitter,
      }

      const response = await fetch("/api/admin/settings", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) throw new Error("Failed to update settings")

      setSuccess(true)
      setTimeout(() => setSuccess(false), 3000)
    } catch (err: any) {
      setError(err.message || "Failed to update settings")
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return <div className="p-8 text-center"><p className="text-slate-600">Loading...</p></div>
  }

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-slate-900">Global Settings</h1>
        <p className="text-slate-600 mt-1">Manage site-wide configuration</p>
      </div>

      {error && <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-6">{error}</div>}
      {success && <div className="bg-green-50 border border-green-200 text-green-700 px-4 py-3 rounded-lg mb-6">Settings saved successfully!</div>}

      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">Site Information</h2>
          <MultilingualInput
            label="Site Name"
            name="siteName"
            type="text"
            values={siteName}
            onChange={(lang, value) => setSiteName(prev => ({ ...prev, [lang]: value }))}
            placeholder="SOLO Estate"
          />
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">Contact Information</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Email</label>
              <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="sales@soloestate.ge" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Phone</label>
              <input type="tel" value={phone} onChange={(e) => setPhone(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="+995 xxx xxx xxx" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">WhatsApp</label>
              <input type="tel" value={whatsapp} onChange={(e) => setWhatsapp(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="+995 xxx xxx xxx" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Address</label>
              <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="Tbilisi, Georgia" />
            </div>
          </div>
        </div>

        <div className="bg-white rounded-lg shadow p-6 space-y-6">
          <h2 className="text-xl font-semibold text-slate-900 border-b pb-3">Social Media</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Facebook</label>
              <input type="url" value={facebook} onChange={(e) => setFacebook(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="https://facebook.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Instagram</label>
              <input type="url" value={instagram} onChange={(e) => setInstagram(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="https://instagram.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">LinkedIn</label>
              <input type="url" value={linkedin} onChange={(e) => setLinkedin(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="https://linkedin.com/..." />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">Twitter</label>
              <input type="url" value={twitter} onChange={(e) => setTwitter(e.target.value)} className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none" placeholder="https://twitter.com/..." />
            </div>
          </div>
        </div>

        <button type="submit" disabled={isSubmitting} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition disabled:opacity-50">
          {isSubmitting ? "Saving..." : "Save Settings"}
        </button>
      </form>
    </div>
  )
}

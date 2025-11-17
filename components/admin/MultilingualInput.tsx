"use client"

import { useState } from "react"

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "ka", name: "Georgian", flag: "🇬🇪" },
  { code: "ru", name: "Russian", flag: "🇷🇺" },
  { code: "he", name: "Hebrew", flag: "🇮🇱" },
  { code: "az", name: "Azerbaijani", flag: "🇦🇿" },
  { code: "hy", name: "Armenian", flag: "🇦🇲" },
  { code: "uk", name: "Ukrainian", flag: "🇺🇦" },
]

interface MultilingualInputProps {
  label: string
  name: string
  type?: "text" | "textarea"
  required?: boolean
  values: Record<string, string>
  onChange: (lang: string, value: string) => void
  placeholder?: string
}

export default function MultilingualInput({
  label,
  name,
  type = "text",
  required = false,
  values,
  onChange,
  placeholder = "",
}: MultilingualInputProps) {
  const [activeTab, setActiveTab] = useState("en")

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-slate-700">
        {label}
        {required && <span className="text-red-500 ml-1">*</span>}
      </label>

      {/* Language Tabs */}
      <div className="flex gap-1 border-b border-slate-200">
        {languages.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setActiveTab(lang.code)}
            className={`px-3 py-2 text-sm font-medium border-b-2 transition ${
              activeTab === lang.code
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-slate-600 hover:text-slate-900"
            }`}
          >
            <span className="mr-1">{lang.flag}</span>
            {lang.name}
          </button>
        ))}
      </div>

      {/* Input Fields */}
      <div className="pt-2">
        {languages.map((lang) => (
          <div
            key={lang.code}
            className={activeTab === lang.code ? "block" : "hidden"}
          >
            {type === "textarea" ? (
              <textarea
                name={`${name}${lang.code.charAt(0).toUpperCase() + lang.code.slice(1)}`}
                value={values[lang.code] || ""}
                onChange={(e) => onChange(lang.code, e.target.value)}
                required={required && lang.code === "en"}
                placeholder={`${placeholder} (${lang.name})`}
                rows={4}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            ) : (
              <input
                type="text"
                name={`${name}${lang.code.charAt(0).toUpperCase() + lang.code.slice(1)}`}
                value={values[lang.code] || ""}
                onChange={(e) => onChange(lang.code, e.target.value)}
                required={required && lang.code === "en"}
                placeholder={`${placeholder} (${lang.name})`}
                className="w-full px-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
              />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

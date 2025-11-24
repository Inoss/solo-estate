'use client'

import { usePathname } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { locales, localeNames, type Locale } from '@/i18n'
import { useState } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const pathname = usePathname()
  const [isPending, setIsPending] = useState(false)
  const t = useTranslations('common')

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) return

    setIsPending(true)

    // Extract current locale from pathname (more reliable than using state)
    const pathParts = pathname.split('/').filter(Boolean)
    const currentLocaleInPath = pathParts[0]

    // Check if the first part is a valid locale
    const isValidLocale = locales.includes(currentLocaleInPath as Locale)

    let pathnameWithoutLocale = ''

    if (isValidLocale) {
      // Remove the locale from the beginning of the path
      const remainingParts = pathParts.slice(1)
      if (remainingParts.length > 0) {
        pathnameWithoutLocale = '/' + remainingParts.join('/')
      }
    }

    // Construct new path with new locale
    const newPath = `/${newLocale}${pathnameWithoutLocale}`

    // Use window.location for a clean navigation
    window.location.href = newPath
  }

  return (
    <div className="relative inline-block group">
      {/* Globe icon + Current language indicator */}
      <div className="flex items-center gap-2">
        <svg
          className="h-5 w-5 text-amber-400 group-hover:text-amber-300 transition-colors"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"
          />
        </svg>
        <select
          value={locale}
          onChange={(e) => handleLanguageChange(e.target.value as Locale)}
          disabled={isPending}
          className="appearance-none bg-gradient-to-r from-slate-800 to-slate-700 border border-amber-900/30 rounded-lg px-4 py-2.5 pr-10 text-sm font-semibold text-slate-100 cursor-pointer hover:border-amber-500/50 hover:bg-slate-700 transition-all duration-200 shadow-lg shadow-black/20 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-amber-500/50"
          aria-label={t('language')}
        >
          {locales.map((loc) => (
            <option
              key={loc}
              value={loc}
              className="bg-slate-800 text-slate-100 py-2"
            >
              {localeNames[loc]}
            </option>
          ))}
        </select>
        <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-3">
          <svg className="h-4 w-4 text-amber-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Loading indicator */}
      {isPending && (
        <div className="absolute -right-8 top-1/2 -translate-y-1/2">
          <div className="animate-spin h-4 w-4 border-2 border-amber-500 border-t-transparent rounded-full"></div>
        </div>
      )}
    </div>
  )
}

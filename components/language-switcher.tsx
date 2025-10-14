'use client'

import { usePathname, useRouter } from 'next/navigation'
import { useLocale, useTranslations } from 'next-intl'
import { locales, localeNames, type Locale } from '@/i18n'
import { useTransition } from 'react'

export function LanguageSwitcher() {
  const locale = useLocale() as Locale
  const router = useRouter()
  const pathname = usePathname()
  const [isPending, startTransition] = useTransition()
  const t = useTranslations('common')

  const handleLanguageChange = (newLocale: Locale) => {
    if (newLocale === locale) return

    startTransition(() => {
      // Remove the current locale from pathname to get the path without locale
      const pathWithoutLocale = pathname.replace(`/${locale}`, '') || '/'

      // Navigate to the new locale with the same path
      const newPath = `/${newLocale}${pathWithoutLocale}`

      router.push(newPath)
      router.refresh()
    })
  }

  return (
    <div className="relative inline-block">
      <select
        value={locale}
        onChange={(e) => handleLanguageChange(e.target.value as Locale)}
        disabled={isPending}
        className="appearance-none bg-transparent border border-border rounded-md px-3 py-2 pr-8 text-sm cursor-pointer hover:bg-muted transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label={t('language')}
      >
        {locales.map((loc) => (
          <option key={loc} value={loc}>
            {localeNames[loc]}
          </option>
        ))}
      </select>
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2">
        <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </div>
    </div>
  )
}

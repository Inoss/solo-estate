'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { LanguageSwitcher } from './language-switcher'
import { Button } from './ui/button'
import { useState } from 'react'

export function Header() {
  const t = useTranslations('common')
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const navigation = [
    { name: t('home'), href: '/' },
    { name: t('projects'), href: '/projects' },
    { name: t('about'), href: '/about' },
    { name: t('services'), href: '/services' },
    { name: t('insights'), href: '/insights' },
    { name: t('contact'), href: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-50 w-full border-b border-amber-900/10 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 shadow-lg backdrop-blur supports-[backdrop-filter]:bg-slate-900/95">
      {/* Top accent line */}
      <div className="h-1 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500"></div>

      <nav className="mx-auto flex max-w-7xl items-center justify-between p-4 lg:px-8" aria-label="Global">
        {/* Logo */}
        <div className="flex lg:flex-1">
          <Link href="/" className="-m-1.5 p-1.5 flex items-center group">
            <div className="relative">
              <Image
                src="/logo.png"
                alt="SOLO Estate"
                width={180}
                height={52}
                className="h-12 lg:h-14 w-auto transition-all duration-300 group-hover:scale-110 drop-shadow-[0_0_15px_rgba(202,138,4,0.5)]"
                priority
              />
              <div className="absolute inset-0 bg-amber-400/30 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            </div>
            <span className="ml-3 text-amber-400 font-bold text-xs tracking-wider hidden lg:block opacity-80 group-hover:opacity-100 transition-opacity">
              Premium Real Estate
            </span>
          </Link>
        </div>

        {/* Mobile menu button */}
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-amber-400 hover:text-amber-300 hover:bg-slate-800 transition-all duration-200"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            <span className="sr-only">Open main menu</span>
            {mobileMenuOpen ? (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" strokeWidth="2" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
              </svg>
            )}
          </button>
        </div>

        {/* Desktop navigation */}
        <div className="hidden lg:flex lg:gap-x-8">
          {navigation.map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className="relative text-sm font-semibold leading-6 text-slate-100 hover:text-amber-400 transition-all duration-300 group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-amber-400 to-amber-500 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </div>

        {/* Right side - Language switcher and CTA */}
        <div className="hidden lg:flex lg:flex-1 lg:justify-end lg:gap-x-4 items-center">
          <LanguageSwitcher />
          <Link href="/contact">
            <Button className="bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg shadow-amber-500/50 hover:shadow-amber-600/50 transition-all duration-300 hover:scale-105">
              {t('requestOffer')}
            </Button>
          </Link>
        </div>
      </nav>

      {/* Mobile menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden bg-slate-900/98 backdrop-blur-xl border-t border-amber-900/20">
          <div className="space-y-1 px-4 pb-4 pt-2">
            {navigation.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="block rounded-lg px-4 py-3 text-base font-medium text-slate-100 hover:text-amber-400 hover:bg-slate-800/50 transition-all duration-200 border border-transparent hover:border-amber-900/30"
                onClick={() => setMobileMenuOpen(false)}
              >
                {item.name}
              </Link>
            ))}
            <div className="flex flex-col gap-3 pt-4 border-t border-amber-900/20">
              <LanguageSwitcher />
              <Link href="/contact">
                <Button className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold shadow-lg shadow-amber-500/50">
                  {t('requestOffer')}
                </Button>
              </Link>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}

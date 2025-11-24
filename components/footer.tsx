'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'

export function Footer() {
  const t = useTranslations('footer')
  const tCommon = useTranslations('common')
  const currentYear = new Date().getFullYear()

  const companyLinks = [
    { name: tCommon('about'), href: '/about' },
    { name: tCommon('services'), href: '/services' },
    { name: tCommon('projects'), href: '/projects' },
    { name: tCommon('contact'), href: '/contact' },
  ]

  const legalLinks = [
    { name: t('terms'), href: '/legal/terms' },
    { name: t('privacy'), href: '/legal/privacy' },
  ]

  const socialLinks = [
    { name: 'Facebook', href: 'https://www.facebook.com/profile.php?id=61558366256708&mibextid=wwXIfr&rdid=snb7fqt8A2aBtQzL&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DwssytEPX%2F%3Fmibextid%3DwwXIfr#', icon: 'facebook' },
    { name: 'Instagram', href: 'https://www.instagram.com/soloestate_?igsh=MWc1czR4YnR0ZHNzNg%3D%3D&utm_source=qr', icon: 'instagram' },
    { name: 'LinkedIn', href: 'https://www.linkedin.com/company/solo-estate', icon: 'linkedin' },
  ]

  return (
    <footer className="bg-muted mt-16">
      <div className="mx-auto max-w-7xl px-6 py-12 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2">
            <Link href="/" className="inline-block mb-6 group">
              <div className="relative">
                <Image
                  src="/logo.png"
                  alt="SOLO Estate"
                  width={200}
                  height={58}
                  className="h-14 w-auto transition-all duration-300 group-hover:scale-105 drop-shadow-[0_0_10px_rgba(202,138,4,0.3)]"
                />
                <div className="absolute inset-0 bg-amber-400/20 blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </div>
            </Link>
            <p className="text-base text-muted-foreground mb-3 font-medium">
              Premium Investment Real Estate in Georgia
            </p>
            <p className="text-sm text-muted-foreground/80 leading-relaxed">
              Your trusted partner for exclusive property investments in Tbilisi, Batumi, and beyond.
            </p>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4">{t('company')}</h4>
            <ul className="space-y-2">
              {companyLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4">{t('legal')}</h4>
            <ul className="space-y-2">
              {legalLinks.map((link) => (
                <li key={link.name}>
                  <Link
                    href={link.href}
                    className="text-sm text-muted-foreground hover:text-primary transition-colors"
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4">{t('followUs')}</h4>
            <div className="flex space-x-4">
              {socialLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-muted-foreground hover:text-primary transition-colors"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <span className="sr-only">{link.name}</span>
                  <div className="h-6 w-6">
                    {/* Placeholder for social icons */}
                    <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24">
                      <circle cx="12" cy="12" r="10" />
                    </svg>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 border-t pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            {t('copyright', { year: currentYear })}
          </p>
        </div>
      </div>
    </footer>
  )
}

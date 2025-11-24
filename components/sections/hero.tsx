'use client'

import { Link } from '@/i18n/routing'
import Image from 'next/image'
import { useTranslations } from 'next-intl'
import { Button } from '@/components/ui/button'
import { ArrowRight, TrendingUp, Building2, Shield, Users } from 'lucide-react'

export function Hero() {
  const t = useTranslations('home.hero')

  return (
    <section className="relative overflow-hidden min-h-[90vh] flex items-center">
      {/* Hero Background Image */}
      <div className="absolute inset-0">
        <Image
          src="/images/hero.png"
          alt="SOLO Estate - Premium Real Estate"
          fill
          priority
          className="object-cover"
          sizes="100vw"
          quality={90}
        />

        {/* Subtle Logo Watermark - Top Right */}
        <div className="absolute top-12 right-12 z-10 opacity-15 hidden lg:block">
          <Image
            src="/logo.png"
            alt="SOLO Estate"
            width={250}
            height={72}
            className="h-20 w-auto drop-shadow-2xl"
          />
        </div>
      </div>

      {/* Enhanced Dark Overlay with Gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/70 to-black/60" />

      {/* Animated Floating Elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {/* Floating circles */}
        <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '0s' }} />
        <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
        <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        <div className="absolute bottom-20 right-1/3 w-28 h-28 bg-yellow-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '1s' }} />

        {/* Animated dots pattern */}
        <div className="absolute top-1/4 right-10 grid grid-cols-3 gap-2 opacity-20">
          {[...Array(9)].map((_, i) => (
            <div key={i} className="w-1 h-1 bg-accent rounded-full animate-pulse" style={{ animationDelay: `${i * 0.2}s` }} />
          ))}
        </div>
      </div>

      {/* Content Container */}
      <div className="container relative z-10 mx-auto px-6 lg:px-8">
        <div className="max-w-4xl mx-auto text-center">
          {/* Premium Badge */}
          <div className="mb-6 inline-flex items-center gap-2 rounded-full bg-accent/20 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-accent border border-accent/30 shadow-lg animate-fade-in">
            <Shield className="h-4 w-4" />
            <span>{t('badge')}</span>
          </div>

          {/* Main Heading */}
          <h1 className="mb-6 text-5xl font-bold tracking-tight text-white sm:text-6xl lg:text-7xl leading-tight animate-fade-in">
            {t('title')}
            <span className="block mt-2 bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h1>

          {/* Subheading */}
          <p className="mb-10 text-xl text-gray-200 max-w-2xl mx-auto leading-relaxed animate-fade-in">
            {t('subtitle')}
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 mb-12 animate-fade-in justify-center">
            <Link href="/projects">
              <Button
                size="lg"
                className="w-full sm:w-auto gradient-gold text-white hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl px-8 py-7 h-auto text-lg font-bold group"
              >
                <span>{t('ctaPrimary')}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>

            <Link href="/contact">
              <Button
                size="lg"
                variant="outline"
                className="w-full sm:w-auto glass text-white border-white/30 hover:bg-white/20 transition-all duration-300 px-8 py-7 h-auto text-lg font-semibold"
              >
                <span>{t('ctaSecondary')}</span>
              </Button>
            </Link>
          </div>

          {/* Trust Indicators */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-in">
            <div className="glass rounded-xl p-5 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/20 p-2">
                  <Building2 className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{t('stats.properties')}</div>
                  <div className="text-sm text-gray-300">{t('stats.propertiesLabel')}</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-5 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/20 p-2">
                  <TrendingUp className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{t('stats.roi')}</div>
                  <div className="text-sm text-gray-300">{t('stats.roiLabel')}</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-5 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/20 p-2">
                  <Shield className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{t('stats.verified')}</div>
                  <div className="text-sm text-gray-300">{t('stats.verifiedLabel')}</div>
                </div>
              </div>
            </div>

            <div className="glass rounded-xl p-5 backdrop-blur-md hover:bg-white/15 transition-all duration-300">
              <div className="flex items-start gap-3">
                <div className="rounded-lg bg-accent/20 p-2">
                  <Users className="h-6 w-6 text-accent" />
                </div>
                <div>
                  <div className="text-2xl font-bold text-white">{t('stats.developers')}</div>
                  <div className="text-sm text-gray-300">{t('stats.developersLabel')}</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Element */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-background to-transparent" />
    </section>
  )
}

'use client'

import { useTranslations } from 'next-intl'
import { AnimatedCounter } from '@/components/animated-counter'
import { TrendingUp, Users, Building2, DollarSign } from 'lucide-react'

export function Stats() {
  const t = useTranslations('home.stats')

  const stats = [
    {
      value: 50,
      suffix: 'M+',
      prefix: '$',
      label: t('totalInvestment'),
      icon: DollarSign,
    },
    {
      value: 500,
      suffix: '+',
      label: t('happyInvestors'),
      icon: Users,
    },
    {
      value: 12.5,
      suffix: '%',
      label: t('averageROI'),
      icon: TrendingUp,
    },
    {
      value: 100,
      suffix: '+',
      label: t('activeProjects'),
      icon: Building2,
    },
  ]

  return (
    <section className="relative py-20 bg-gradient-to-br from-primary via-primary/95 to-accent overflow-hidden">
      {/* Animated background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-10 left-10 w-64 h-64 bg-accent rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-10 right-10 w-64 h-64 bg-yellow-500 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }} />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
            {t('title')} <span className="text-accent">{t('titleHighlight')}</span>
          </h2>
          <p className="text-white/80 text-lg">{t('subtitle')}</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => {
            const Icon = stat.icon
            return (
              <div
                key={index}
                className="group relative bg-white/10 backdrop-blur-sm rounded-2xl p-6 border border-white/20 hover:bg-white/20 hover:border-accent/50 transition-all duration-300 text-center"
              >
                {/* Icon */}
                <div className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-gradient-to-br from-accent to-yellow-500 shadow-xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-7 w-7 text-white" />
                </div>

                {/* Animated Value */}
                <div className="text-4xl md:text-5xl font-bold mb-2 text-white">
                  <AnimatedCounter
                    end={stat.value}
                    duration={2000}
                    prefix={stat.prefix || ''}
                    suffix={stat.suffix}
                  />
                </div>

                {/* Label */}
                <div className="text-sm md:text-base text-white/90 font-medium">
                  {stat.label}
                </div>

                {/* Decorative bottom line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </div>
            )
          })}
        </div>

        {/* Additional trust indicator */}
        <div className="mt-12 text-center">
          <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/20">
            <div className="flex -space-x-2">
              {[1, 2, 3, 4, 5].map((i) => (
                <div
                  key={i}
                  className="w-8 h-8 rounded-full border-2 border-white bg-gradient-to-br from-accent to-yellow-500"
                />
              ))}
            </div>
            <span className="text-white font-semibold text-sm ml-2">
              {t('joinInvestors')}
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

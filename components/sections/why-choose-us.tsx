'use client'

import { useTranslations } from 'next-intl'
import { Shield, Award, Users, Clock, BarChart3, HeadphonesIcon } from 'lucide-react'

export function WhyChooseUs() {
  const t = useTranslations('home.whyChooseUs')

  const benefits = [
    {
      icon: Shield,
      title: t('benefit1Title'),
      description: t('benefit1Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Award,
      title: t('benefit2Title'),
      description: t('benefit2Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: BarChart3,
      title: t('benefit3Title'),
      description: t('benefit3Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Users,
      title: t('benefit4Title'),
      description: t('benefit4Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: Clock,
      title: t('benefit5Title'),
      description: t('benefit5Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
    {
      icon: HeadphonesIcon,
      title: t('benefit6Title'),
      description: t('benefit6Desc'),
      gradient: 'from-accent via-accent/80 to-accent/60',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] opacity-50" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
          <div className="inline-flex items-center rounded-full bg-accent/10 px-4 py-2 text-sm font-semibold text-accent mb-4">
            <Award className="h-4 w-4 mr-2" />
            {t('badge')}
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            {t('title')}
            <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground">
            {t('subtitle')}
          </p>
        </div>

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon
            return (
              <div
                key={index}
                className="group relative bg-gradient-to-br from-white to-secondary/30 rounded-2xl p-8 shadow-sm hover:shadow-2xl transition-all duration-500 border border-border/50 card-hover-lift"
              >
                {/* Icon Container */}
                <div className="mb-6 inline-flex">
                  <div className={`p-4 rounded-xl bg-gradient-to-br ${benefit.gradient} shadow-lg`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                </div>

                {/* Content */}
                <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                  {benefit.title}
                </h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {benefit.description}
                </p>

                {/* Decorative Element */}
                <div className={`absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r ${benefit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
              </div>
            )
          })}
        </div>

        {/* Stats Bar */}
        <div className="mt-16 grid grid-cols-2 gap-6 md:grid-cols-4 bg-gradient-to-br from-primary to-primary/90 rounded-2xl p-8 text-white shadow-xl">
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{t('stat1')}</div>
            <div className="text-sm opacity-90">{t('stat1Desc')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{t('stat2')}</div>
            <div className="text-sm opacity-90">{t('stat2Desc')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{t('stat3')}</div>
            <div className="text-sm opacity-90">{t('stat3Desc')}</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-bold mb-2">{t('stat4')}</div>
            <div className="text-sm opacity-90">{t('stat4Desc')}</div>
          </div>
        </div>
      </div>
    </section>
  )
}

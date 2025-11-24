'use client'

import { useTranslations } from 'next-intl'
import { MessageSquare, Search, FileCheck, TrendingUp, ArrowRight } from 'lucide-react'
import { Link } from '@/i18n/routing'
import { Button } from '@/components/ui/button'

export function HowItWorks() {
  const t = useTranslations('home.howItWorks')

  const steps = [
    {
      number: '01',
      title: t('step1Title'),
      description: t('step1Desc'),
      icon: MessageSquare,
      color: 'accent',
      bgColor: 'bg-accent/10',
    },
    {
      number: '02',
      title: t('step2Title'),
      description: t('step2Desc'),
      icon: Search,
      color: 'accent',
      bgColor: 'bg-accent/10',
    },
    {
      number: '03',
      title: t('step3Title'),
      description: t('step3Desc'),
      icon: FileCheck,
      color: 'accent',
      bgColor: 'bg-accent/10',
    },
    {
      number: '04',
      title: t('step4Title'),
      description: t('step4Desc'),
      icon: TrendingUp,
      color: 'accent',
      bgColor: 'bg-accent/10',
    },
  ]

  return (
    <section className="py-20 lg:py-28 bg-gradient-premium relative overflow-hidden">
      {/* Decorative geometric elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-16">
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

        {/* Steps Grid */}
        <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4 mb-12">
          {steps.map((step, index) => {
            const Icon = step.icon
            return (
              <div
                key={step.number}
                className="relative group"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="relative bg-white rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-500 border border-border/50 h-full card-hover-lift">
                  {/* Step Number Badge */}
                  <div className="absolute -top-4 -right-4 w-12 h-12 rounded-full gradient-gold text-white font-bold text-lg flex items-center justify-center shadow-lg z-10">
                    {step.number}
                  </div>

                  {/* Icon */}
                  <div className={`mb-6 inline-flex p-4 rounded-xl ${step.bgColor} transition-transform duration-300 group-hover:scale-110`}>
                    <Icon className={`h-8 w-8 text-${step.color}`} />
                  </div>

                  {/* Content */}
                  <h3 className="mb-3 text-xl font-bold text-foreground group-hover:text-accent transition-colors">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    {step.description}
                  </p>

                  {/* Connecting Arrow (desktop only) */}
                  {index < steps.length - 1 && (
                    <div className="hidden lg:block absolute top-1/2 -right-4 transform -translate-y-1/2 z-20">
                      <ArrowRight className="h-6 w-6 text-accent" />
                    </div>
                  )}
                </div>
              </div>
            )
          })}
        </div>

        {/* CTA Section */}
        <div className="text-center mt-16">
          <div className="inline-flex flex-col sm:flex-row gap-4">
            <Link href="/contact">
              <Button size="lg" className="gradient-gold text-white hover:opacity-90 px-8 py-6 h-auto text-lg font-bold shadow-xl group">
                <span>{t('ctaPrimary')}</span>
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
            <Link href="/projects">
              <Button size="lg" variant="outline" className="border-2 px-8 py-6 h-auto text-lg font-semibold">
                {t('ctaSecondary')}
              </Button>
            </Link>
          </div>
          <p className="mt-6 text-sm text-muted-foreground">
            {t('ctaNote')}
          </p>
        </div>
      </div>
    </section>
  )
}

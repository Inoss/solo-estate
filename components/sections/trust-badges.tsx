'use client'

import { useTranslations } from 'next-intl'
import { Award, ShieldCheck, Headphones, BarChart3 } from 'lucide-react'

export function TrustBadges() {
  const t = useTranslations('home.trustBadges')

  const badges = [
    {
      title: t('licensed'),
      icon: Award,
      description: 'Fully licensed and regulated',
    },
    {
      title: t('verified'),
      icon: ShieldCheck,
      description: 'Every property verified',
    },
    {
      title: t('support'),
      icon: Headphones,
      description: 'Always here to help',
    },
    {
      title: t('transparent'),
      icon: BarChart3,
      description: 'Clear and honest data',
    },
  ]

  return (
    <section className="py-16 lg:py-20 bg-gradient-to-br from-secondary/30 via-background to-accent/5 relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(201,169,97,0.08),transparent_70%)]" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h3 className="text-2xl lg:text-3xl font-bold text-foreground mb-3">
            Why Trust <span className="text-accent">SOLO Estate</span>
          </h3>
          <p className="text-muted-foreground">Your confidence is our foundation</p>
        </div>

        {/* Trust Badges Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {badges.map((badge, index) => {
            const Icon = badge.icon
            return (
              <div
                key={index}
                className="group relative bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-border/50 hover:border-accent/50 text-center card-hover-lift"
              >
                {/* Icon Container */}
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-xl bg-gradient-to-br from-accent to-accent/70 shadow-lg mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-8 w-8 text-white" />
                </div>

                {/* Content */}
                <h4 className="text-lg font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                  {badge.title}
                </h4>
                <p className="text-sm text-muted-foreground">
                  {badge.description}
                </p>

                {/* Bottom Accent Line */}
                <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-accent to-yellow-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl" />
              </div>
            )
          })}
        </div>

        {/* Trust Stat Bar */}
        <div className="mt-12 flex flex-wrap items-center justify-center gap-8 text-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">98%</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground">Client Satisfaction</div>
              <div className="text-sm text-muted-foreground">Based on 500+ reviews</div>
            </div>
          </div>

          <div className="hidden sm:block w-px h-12 bg-border" />

          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center shadow-lg">
              <span className="text-white font-bold text-lg">A+</span>
            </div>
            <div className="text-left">
              <div className="font-bold text-foreground">Industry Rating</div>
              <div className="text-sm text-muted-foreground">Top rated agency</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useTranslations, useLocale } from 'next-intl'
import { ProjectCard } from '@/components/project-card'
import { Button } from '@/components/ui/button'
import type { Locale } from '@/i18n'
import { TrendingUp, Home, Building, MapPin } from 'lucide-react'

interface FeaturedProjectsProps {
  projects: any[]
}

export function FeaturedProjects({ projects }: FeaturedProjectsProps) {
  const t = useTranslations('home.featured')
  const tCommon = useTranslations('common')
  const locale = useLocale() as Locale

  const [activeFilter, setActiveFilter] = useState<string>('all')
  const [activeCity, setActiveCity] = useState<string>('all')

  if (!projects || projects.length === 0) {
    return (
      <section className="py-16 lg:py-24 bg-background">
        <div className="mx-auto max-w-7xl px-6 lg:px-8">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              {t('title')}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">
              {t('subtitle')}
            </p>
            <div className="mt-8 p-8 bg-muted rounded-lg">
              <p className="text-muted-foreground">
                No featured projects yet. Add projects in the{' '}
                <Link href="/studio" className="text-primary hover:underline">
                  Admin Panel
                </Link>
                {' '}and mark them as "Featured" to display them here.
              </p>
            </div>
          </div>
        </div>
      </section>
    )
  }

  // Filter tabs
  const filters = [
    { id: 'all', label: t('filterAll'), icon: Building },
    { id: 'investment', label: t('filterInvestment'), icon: TrendingUp },
    { id: 'residence', label: t('filterResidence'), icon: Home },
  ]

  // City filters
  const cities = [
    { id: 'all', label: t('cityAll') },
    { id: 'Tbilisi', label: t('cityTbilisi') },
    { id: 'Batumi', label: t('cityBatumi') },
  ]

  // Filter projects
  const filteredProjects = projects.filter(project => {
    const matchesFilter = activeFilter === 'all' ||
      (activeFilter === 'investment' && project.investment?.yield && project.investment.yield > 0) ||
      (activeFilter === 'residence' && (!project.investment?.yield || project.investment.yield === 0))

    const matchesCity = activeCity === 'all' || project.location?.city === activeCity

    return matchesFilter && matchesCity
  })

  return (
    <section className="py-20 lg:py-28 bg-white texture-noise relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 pattern-dots opacity-50" />

      {/* Decorative geometric elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="mx-auto max-w-7xl px-6 lg:px-8 relative">
        {/* Section Header */}
        <div className="mx-auto max-w-3xl text-center mb-12">
          <div className="inline-flex items-center rounded-full bg-gradient-to-r from-accent/20 to-yellow-500/20 backdrop-blur-sm px-5 py-2.5 text-sm font-bold text-accent mb-6 border border-accent/30">
            <TrendingUp className="h-4 w-4 mr-2" />
            {t('badge')}
          </div>
          <h2 className="text-4xl font-bold tracking-tight text-foreground sm:text-5xl mb-6">
            {t('title')}
            <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            {t('subtitle')}
          </p>
        </div>

        {/* Horizontal Filter Bar - BD Group Style */}
        <div className="mb-12 bg-white rounded-2xl shadow-lg border border-border/50 p-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            {/* Purpose Filters */}
            <div className="flex flex-wrap items-center gap-3">
              {filters.map((filter) => {
                const Icon = filter.icon
                return (
                  <button
                    key={filter.id}
                    onClick={() => setActiveFilter(filter.id)}
                    className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                      activeFilter === filter.id
                        ? 'bg-gradient-to-r from-accent to-yellow-500 text-white shadow-lg'
                        : 'bg-secondary/50 text-foreground hover:bg-secondary'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {filter.label}
                  </button>
                )
              })}
            </div>

            {/* City Filters */}
            <div className="flex flex-wrap items-center gap-2">
              {cities.map((city) => (
                <button
                  key={city.id}
                  onClick={() => setActiveCity(city.id)}
                  className={`px-4 py-2.5 rounded-lg font-bold text-sm uppercase tracking-wide transition-all duration-300 ${
                    activeCity === city.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-secondary/50 text-foreground hover:bg-secondary'
                  }`}
                >
                  {city.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Projects Grid - 3 columns like BD Group */}
        {filteredProjects.length > 0 ? (
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mb-12">
            {filteredProjects.slice(0, 6).map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-2xl border border-border/50">
            <p className="text-lg text-muted-foreground">
              {t('noResults')}
            </p>
          </div>
        )}

        {/* Show More Button - BD Group Style */}
        <div className="text-center">
          <Link href={`/${locale}/projects`}>
            <Button
              size="lg"
              className="gradient-gold text-white hover:opacity-90 px-10 py-6 h-auto text-base font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group rounded-xl"
            >
              <span>Show more</span>
              <span className="ml-3 text-xl group-hover:translate-x-1 transition-transform inline-block">→</span>
            </Button>
          </Link>
        </div>
      </div>
    </section>
  )
}

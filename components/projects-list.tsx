'use client'

import { useState, useMemo } from 'react'
import { useLocale } from 'next-intl'
import { ProjectCard } from '@/components/project-card'
import { ProjectFilters, FilterState } from '@/components/project-filters'
import type { Locale } from '@/i18n'

interface Project {
  _id: string
  title: Record<Locale, string>
  slug: { current: string }
  coverImage?: any
  pricing: {
    price: number
    currency?: string
  }
  investment?: {
    yield?: number
  }
  delivery?: {
    quarter?: string
    year?: number
  }
  status: string
  propertyType: string
  location?: {
    city?: string
  }
  highlights?: string[]
  publishedAt?: string
}

interface ProjectsListProps {
  projects: Project[]
}

export function ProjectsList({ projects }: ProjectsListProps) {
  const locale = useLocale() as Locale

  const [filters, setFilters] = useState<FilterState>({
    search: '',
    status: '',
    propertyType: '',
    city: '',
    minPrice: '',
    maxPrice: '',
    minYield: '',
    sortBy: 'newest',
  })

  const filteredAndSortedProjects = useMemo(() => {
    let result = [...projects]

    // Search filter
    if (filters.search) {
      const searchLower = filters.search.toLowerCase()
      result = result.filter(project =>
        project.title[locale]?.toLowerCase().includes(searchLower) ||
        project.title.en?.toLowerCase().includes(searchLower) ||
        project.location?.city?.toLowerCase().includes(searchLower)
      )
    }

    // Status filter
    if (filters.status && filters.status !== 'all') {
      result = result.filter(project => project.status === filters.status)
    }

    // Property Type filter
    if (filters.propertyType && filters.propertyType !== 'all') {
      result = result.filter(project => project.propertyType === filters.propertyType)
    }

    // City filter
    if (filters.city && filters.city !== 'all') {
      result = result.filter(project => project.location?.city === filters.city)
    }

    // Price range filter
    if (filters.minPrice) {
      const minPrice = parseFloat(filters.minPrice)
      result = result.filter(project => project.pricing.price >= minPrice)
    }
    if (filters.maxPrice) {
      const maxPrice = parseFloat(filters.maxPrice)
      result = result.filter(project => project.pricing.price <= maxPrice)
    }

    // Minimum Yield filter
    if (filters.minYield) {
      const minYield = parseFloat(filters.minYield)
      result = result.filter(project => (project.investment?.yield || 0) >= minYield)
    }

    // Sorting
    switch (filters.sortBy) {
      case 'priceLow':
        result.sort((a, b) => a.pricing.price - b.pricing.price)
        break
      case 'priceHigh':
        result.sort((a, b) => b.pricing.price - a.pricing.price)
        break
      case 'yieldHigh':
        result.sort((a, b) => (b.investment?.yield || 0) - (a.investment?.yield || 0))
        break
      case 'newest':
      default:
        result.sort((a, b) => {
          const dateA = new Date(a.publishedAt || 0).getTime()
          const dateB = new Date(b.publishedAt || 0).getTime()
          return dateB - dateA
        })
    }

    return result
  }, [projects, filters, locale])

  return (
    <div className="relative">
      {/* Background decorative elements */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-40 left-0 w-96 h-96 bg-primary/5 rounded-full blur-3xl -z-10" />

      {/* Horizontal Filters Bar at Top */}
      <div className="mb-8 bg-white rounded-2xl shadow-lg border border-border/50 p-6">
        <h3 className="text-lg font-bold text-foreground mb-6 flex items-center gap-2">
          <div className="w-1 h-6 bg-gradient-to-b from-accent to-yellow-500 rounded-full" />
          Find Your Property
        </h3>
        <ProjectFilters filters={filters} onFilterChange={setFilters} />
      </div>

      {/* Results Header with Count and Sort */}
      <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-3">
            <span className="inline-flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-accent to-yellow-500 text-white font-bold text-sm shadow-lg">
              {filteredAndSortedProjects.length}
            </span>
            <span>
              {filteredAndSortedProjects.length === 1 ? 'Property' : 'Properties'} Available
            </span>
          </h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground font-medium">Sort by:</span>
          <select
            value={filters.sortBy}
            onChange={(e) => setFilters({ ...filters, sortBy: e.target.value })}
            className="px-4 py-2 rounded-lg border border-border bg-white text-sm font-medium focus:outline-none focus:ring-2 focus:ring-accent shadow-sm"
          >
            <option value="newest">Newest First</option>
            <option value="priceLow">Price: Low to High</option>
            <option value="priceHigh">Price: High to Low</option>
            <option value="yieldHigh">Highest Yield</option>
          </select>
        </div>
      </div>

      {/* Projects Grid - 3 Columns like BD Group */}
      {filteredAndSortedProjects.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAndSortedProjects.map((project) => (
            <ProjectCard key={project._id} project={project} />
          ))}
        </div>
      ) : (
        <div className="bg-white rounded-2xl shadow-lg border border-border/50 p-12 text-center">
          <div className="max-w-md mx-auto">
            <div className="w-20 h-20 bg-gradient-to-br from-accent/20 to-yellow-500/20 rounded-full mx-auto mb-6 flex items-center justify-center">
              <svg className="w-10 h-10 text-accent" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-foreground mb-3">No properties found</h3>
            <p className="text-muted-foreground mb-6">
              We couldn't find any properties matching your criteria. Try adjusting your filters to see more results.
            </p>
            <button
              onClick={() => setFilters({
                search: '',
                status: '',
                propertyType: '',
                city: '',
                minPrice: '',
                maxPrice: '',
                minYield: '',
                sortBy: 'newest',
              })}
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-accent to-yellow-500 text-white font-bold rounded-lg hover:opacity-90 transition-opacity shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              Reset All Filters
            </button>
          </div>
        </div>
      )}
    </div>
  )
}

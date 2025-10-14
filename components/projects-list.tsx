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
    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
      {/* Filters Sidebar */}
      <div className="lg:col-span-1">
        <div className="sticky top-24">
          <ProjectFilters filters={filters} onFilterChange={setFilters} />
        </div>
      </div>

      {/* Projects Grid */}
      <div className="lg:col-span-3">
        <div className="mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {filteredAndSortedProjects.length} {filteredAndSortedProjects.length === 1 ? 'Project' : 'Projects'} Found
          </h2>
          <p className="text-muted-foreground">
            Browse our curated selection of investment properties in Georgia
          </p>
        </div>

        {filteredAndSortedProjects.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {filteredAndSortedProjects.map((project) => (
              <ProjectCard key={project._id} project={project} />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-xl text-muted-foreground mb-4">No projects found</p>
            <p className="text-sm text-muted-foreground">
              Try adjusting your filters to see more results
            </p>
          </div>
        )}
      </div>
    </div>
  )
}

'use client'

import Image from 'next/image'
import type { Locale } from '@/i18n'

interface ProjectHeroProps {
  project: any
  locale: Locale
}

export function ProjectHero({ project, locale }: ProjectHeroProps) {
  // Handle both string URLs and Sanity image objects
  const imageUrl = typeof project.coverImage === 'string'
    ? project.coverImage
    : project.coverImage?.url || '/images/placeholder-project.jpg'

  const title = project.title[locale] || project.title.en
  const statusLabels: Record<string, string> = {
    offPlan: 'Off-Plan',
    underConstruction: 'Under Construction',
    ready: 'Ready',
  }

  const propertyTypeLabels: Record<string, string> = {
    apartment: 'Apartment',
    aparthotel: 'Aparthotel',
    commercial: 'Commercial',
    villa: 'Villa',
  }

  return (
    <div className="relative h-[500px] w-full">
      <Image
        src={imageUrl || ''}
        alt={title}
        fill
        className="object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />

      <div className="absolute bottom-0 left-0 right-0 p-8">
        <div className="container mx-auto">
          <div className="flex flex-wrap gap-2 mb-4">
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded">
              {statusLabels[project.status] || project.status}
            </span>
            <span className="inline-block bg-white/20 backdrop-blur-sm text-white text-sm font-semibold px-3 py-1 rounded">
              {propertyTypeLabels[project.propertyType] || project.propertyType}
            </span>
            {project.highlights && project.highlights.length > 0 && (
              <span className="inline-block bg-accent text-white text-sm font-semibold px-3 py-1 rounded">
                {project.highlights[0]}
              </span>
            )}
          </div>

          <h1 className="text-4xl md:text-5xl font-bold text-white mb-3">
            {title}
          </h1>

          {project.location?.city && (
            <p className="text-xl text-white/90">
              📍 {project.location.area ? `${project.location.area}, ` : ''}{project.location.city}
            </p>
          )}
        </div>
      </div>
    </div>
  )
}

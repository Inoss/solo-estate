'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useLocale } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { urlForImage } from '@/sanity/lib/image'
import { formatPrice, formatPercent } from '@/lib/utils'
import type { Locale } from '@/i18n'
import { MapPin, TrendingUp, Calendar, ArrowRight, Home, Building2, Maximize2 } from 'lucide-react'

interface ProjectCardProps {
  project: {
    _id: string
    title: Record<Locale, string>
    slug: { current: string }
    coverImage?: any
    coverImageUrl?: string | null
    gallery?: any[]
    pricing: {
      price: number
      currency?: string
      pricePerSqm?: number
    }
    investment?: {
      yield?: number
    }
    delivery?: {
      quarter?: string
      year?: number
    }
    status: string
    location?: {
      city?: string
    }
    specifications?: {
      area?: {
        min?: number
        max?: number
      }
      finishing?: string[]
    }
    paymentOptions?: string[]
    highlights?: string[]
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale() as Locale

  // Handle different image sources
  const imageUrl = project.coverImageUrl
    ? project.coverImageUrl
    : project.coverImage
      ? typeof project.coverImage === 'string'
        ? project.coverImage
        : urlForImage(project.coverImage).width(800).height(600).url()
      : '/images/placeholder-project.jpg'

  // Get gallery thumbnails
  const galleryImages = project.gallery?.slice(0, 4).map(img =>
    typeof img === 'string' ? img : urlForImage(img).width(200).height(150).url()
  ) || []

  return (
    <Card className="group overflow-hidden border border-border/50 shadow-md hover:shadow-2xl transition-all duration-500 card-hover-lift bg-white">
      <Link href={`/${locale}/projects/${project.slug.current}`}>
        {/* Image Container with Gallery Thumbnails */}
        <div className="relative">
          <div className="relative h-64 w-full overflow-hidden bg-gradient-to-br from-muted to-muted/50">
            <Image
              src={imageUrl || ''}
              alt={project.title[locale] || project.title.en}
              fill
              className="object-cover transition-transform duration-700 group-hover:scale-105"
            />

            {/* Gradient Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-60 group-hover:opacity-80 transition-opacity duration-300" />

            {/* Investment Yield Badge - Top Left */}
            {project.investment?.yield && project.investment.yield > 0 && (
              <div className="absolute top-4 left-4 z-10">
                <div className="bg-gradient-to-r from-green-500 to-emerald-600 text-white px-4 py-2 rounded-xl shadow-xl backdrop-blur-sm border border-white/20">
                  <div className="flex items-center gap-2">
                    <TrendingUp className="h-4 w-4" />
                    <div>
                      <div className="text-xs font-medium opacity-90">Yield per annum</div>
                      <div className="text-lg font-bold leading-none">{formatPercent(project.investment.yield)}</div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Status Badge - Top Right */}
            {project.status && (
              <div className="absolute top-4 right-4 z-10">
                <span className="inline-flex items-center gap-1.5 bg-white/95 backdrop-blur-md px-3 py-2 rounded-lg text-xs font-bold text-primary shadow-lg border border-accent/20">
                  {project.status === 'ready' && '✓ Ready to Move'}
                  {project.status === 'underConstruction' && '🏗 Under Construction'}
                  {project.status === 'offPlan' && '📋 Off-Plan'}
                </span>
              </div>
            )}

            {/* Gallery Thumbnails Overlay - Bottom */}
            {galleryImages.length > 0 && (
              <div className="absolute bottom-3 left-3 right-3 z-10">
                <div className="flex gap-1.5">
                  {galleryImages.map((imgUrl, idx) => (
                    <div
                      key={idx}
                      className="relative w-14 h-14 rounded-lg overflow-hidden border-2 border-white/80 shadow-lg opacity-90 hover:opacity-100 transition-opacity"
                    >
                      <Image
                        src={imgUrl}
                        alt={`Gallery ${idx + 1}`}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ))}
                  {galleryImages.length < 4 && (
                    <div className="flex items-center justify-center w-14 h-14 rounded-lg bg-white/20 backdrop-blur-sm border-2 border-white/60 text-white text-xs font-bold">
                      +{project.gallery?.length || 0}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </Link>

      <CardContent className="p-6">
        <Link href={`/${locale}/projects/${project.slug.current}`}>
          {/* Title */}
          <h3 className="text-xl font-bold mb-3 line-clamp-2 group-hover:text-accent transition-colors duration-300 min-h-[3.5rem] leading-tight">
            {project.title[locale] || project.title.en}
          </h3>
        </Link>

        {/* Price - Large and Prominent */}
        <div className="mb-5">
          <p className="text-3xl font-bold bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">
            {project.pricing.pricePerSqm
              ? `from ${formatPrice(project.pricing.pricePerSqm, project.pricing.currency)}/m²`
              : `from ${formatPrice(project.pricing.price, project.pricing.currency)}`
            }
          </p>
        </div>

        {/* Property Details Grid */}
        <div className="grid grid-cols-2 gap-4 mb-5 pb-5 border-b border-border/50">
          {/* Commissioning */}
          {project.delivery?.year && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                <Calendar className="h-3.5 w-3.5" />
                Commissioning
              </div>
              <p className="text-sm font-bold text-foreground">
                {project.delivery.year}
              </p>
            </div>
          )}

          {/* Area */}
          {project.specifications?.area?.min && (
            <div className="space-y-1">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                <Maximize2 className="h-3.5 w-3.5" />
                Area
              </div>
              <p className="text-sm font-bold text-foreground">
                from {project.specifications.area.min} m²
              </p>
            </div>
          )}

          {/* Location */}
          {project.location?.city && (
            <div className="space-y-1 col-span-2">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium uppercase tracking-wide">
                <MapPin className="h-3.5 w-3.5" />
                Location
              </div>
              <p className="text-sm font-bold text-foreground">{project.location.city}</p>
            </div>
          )}
        </div>

        {/* Finishing Types */}
        {project.specifications?.finishing && project.specifications.finishing.length > 0 && (
          <div className="mb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">Finishing:</p>
            <div className="flex flex-wrap gap-2">
              {project.specifications.finishing.map((type, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-3 py-1 rounded-full bg-secondary text-xs font-semibold text-secondary-foreground"
                >
                  {type}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* Payment Options */}
        {project.paymentOptions && project.paymentOptions.length > 0 && (
          <div className="mb-5">
            <p className="text-xs text-muted-foreground font-medium uppercase tracking-wide mb-2">Payment method:</p>
            <div className="flex flex-wrap gap-2">
              {project.paymentOptions.map((option, idx) => (
                <span
                  key={idx}
                  className="inline-flex items-center px-2.5 py-1 rounded-md bg-accent/10 text-xs font-medium text-accent border border-accent/20"
                >
                  {option}
                </span>
              ))}
            </div>
          </div>
        )}

        {/* CTA Button */}
        <Link href={`/${locale}/projects/${project.slug.current}`} className="block">
          <Button
            className="w-full gradient-gold text-white hover:opacity-90 transition-all duration-300 group/btn shadow-lg hover:shadow-xl h-12 text-base font-bold"
            size="lg"
          >
            <span>Get offers</span>
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

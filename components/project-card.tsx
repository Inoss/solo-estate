'use client'

import Image from 'next/image'
import { Link } from '@/i18n/routing'
import { useLocale } from 'next-intl'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
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
    galleryUrls?: string[]
    pricing: {
      price: number
      currency?: string
      pricePerSqm?: number | null
      maxPrice?: number
      priceRange?: {
        min: number
        max: number
      }
    }
    investment?: {
      yield?: number | null
    }
    delivery?: {
      quarter?: string | null
      year?: number
    } | null
    status: string
    propertyType: string
    location?: {
      city?: string
      area?: string
      address?: string
      distanceToSea?: string
    }
    area?: number | null
    specifications?: {
      area?: {
        min?: number
        max?: number
      }
      finishing?: string[]
      buildings?: number
      layouts?: string
    }
    paymentOptions?: string[]
    highlights?: string[]
    developer?: string | { _type: string; _ref: string } | null
  }
}

export function ProjectCard({ project }: ProjectCardProps) {
  const locale = useLocale() as Locale

  // Handle different image sources (now using direct URLs from database)
  const imageUrl = project.coverImageUrl ||
    (typeof project.coverImage === 'string' ? project.coverImage : null) ||
    '/images/placeholder-project.jpg'

  // Get gallery thumbnails (using direct URLs)
  const galleryImages = project.galleryUrls?.slice(0, 4) || []

  return (
    <Card className="group overflow-hidden border border-border/50 shadow-md hover:shadow-2xl transition-all duration-500 card-hover-lift bg-white">
      <Link href={`/projects/${project.slug.current}`}>
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

            {/* SOLO Estate Logo Watermark */}
            <div className="absolute bottom-20 right-3 opacity-20 group-hover:opacity-30 transition-opacity duration-300">
              <Image
                src="/logo.png"
                alt="SOLO Estate"
                width={80}
                height={23}
                className="h-6 w-auto drop-shadow-lg"
              />
            </div>

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
        <Link href={`/projects/${project.slug.current}`}>
          {/* Title */}
          <h3 className="text-xl font-bold mb-2 line-clamp-2 group-hover:text-accent transition-colors duration-300 leading-tight">
            {project.title[locale] || project.title.en}
          </h3>
        </Link>

        {/* Developer/Subtitle */}
        {project.developer && typeof project.developer === 'string' && (
          <p className="text-sm text-muted-foreground mb-4">by {project.developer}</p>
        )}

        {/* About Project Section */}
        <div className="mb-4 pb-4 border-b border-border/50">
          <p className="text-xs font-bold text-foreground mb-3 uppercase tracking-wide">About project:</p>

          <div className="space-y-2.5">
            {/* City */}
            {project.location?.city && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground font-medium">City:</span>
                <span className="font-semibold text-foreground text-right">{project.location.city}</span>
              </div>
            )}

            {/* Address */}
            {project.location?.address && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground font-medium">Address:</span>
                <span className="font-semibold text-foreground text-right max-w-[60%]">{project.location.address}</span>
              </div>
            )}

            {/* Property Type */}
            <div className="flex items-start justify-between text-sm">
              <span className="text-muted-foreground font-medium">Property type:</span>
              <span className="font-semibold text-foreground text-right capitalize">{project.propertyType || 'Apartment'}</span>
            </div>

            {/* Number of Buildings */}
            {project.specifications?.buildings && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground font-medium">Number of buildings:</span>
                <span className="font-semibold text-foreground text-right">{project.specifications.buildings}</span>
              </div>
            )}

            {/* Due Date */}
            {project.delivery?.year && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground font-medium">Due date:</span>
                <span className="font-semibold text-foreground text-right">{project.delivery.year}</span>
              </div>
            )}

            {/* Distance to Sea */}
            {project.location?.distanceToSea && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground font-medium">Distance to sea:</span>
                <span className="font-semibold text-foreground text-right">{project.location.distanceToSea}</span>
              </div>
            )}

            {/* Square */}
            {(project.specifications?.area?.min || project.area) && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground font-medium">Square:</span>
                <span className="font-semibold text-foreground text-right">
                  {project.specifications?.area?.min
                    ? `from ${project.specifications.area.min} м²${project.specifications.area.max ? ` to ${project.specifications.area.max} м²` : ''}`
                    : `${project.area} м²`
                  }
                </span>
              </div>
            )}

            {/* Types of Layouts */}
            {project.specifications?.layouts && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground font-medium">Types of layouts:</span>
                <span className="font-semibold text-foreground text-right">{project.specifications.layouts}</span>
              </div>
            )}

            {/* Finishing */}
            {project.specifications?.finishing && project.specifications.finishing.length > 0 && (
              <div className="flex items-start justify-between text-sm">
                <span className="text-muted-foreground font-medium">Finishing:</span>
                <span className="font-semibold text-foreground text-right">{project.specifications.finishing.join(', ')}</span>
              </div>
            )}
          </div>
        </div>

        {/* Price Section */}
        <div className="mb-5">
          <p className="text-xs font-bold text-foreground mb-2 uppercase tracking-wide">Price:</p>
          <p className="text-2xl font-bold bg-gradient-to-r from-accent to-yellow-600 bg-clip-text text-transparent">
            {project.pricing.pricePerSqm
              ? `from ${formatPrice(project.pricing.pricePerSqm, project.pricing.currency)}/m²`
              : `from ${formatPrice(project.pricing.price, project.pricing.currency)}`
            }
            {project.pricing.maxPrice && ` to ${formatPrice(project.pricing.maxPrice, project.pricing.currency)}`}
          </p>
        </div>

        {/* CTA Button */}
        <Link href={`/projects/${project.slug.current}`} className="block">
          <Button
            className="w-full gradient-gold text-white hover:opacity-90 transition-all duration-300 group/btn shadow-lg hover:shadow-xl h-11 text-sm font-bold"
            size="lg"
          >
            <span>More details</span>
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover/btn:translate-x-1" />
          </Button>
        </Link>
      </CardContent>
    </Card>
  )
}

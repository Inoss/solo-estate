'use client'

import { useState } from 'react'
import Image from 'next/image'

interface ProjectGalleryProps {
  gallery: any[]
  title: string
}

export function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!gallery || gallery.length === 0) return null

  // Helper to get image URL from either string or object
  const getImageUrl = (image: any) => {
    if (typeof image === 'string') return image
    return image?.url || image?.src || ''
  }

  // Helper to get alt text
  const getAltText = (image: any, fallback: string) => {
    if (typeof image === 'string') return fallback
    return image?.alt || fallback
  }

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gallery</h2>

      {/* Main Image */}
      <div className="relative h-[400px] md:h-[500px] w-full mb-4 rounded-lg overflow-hidden bg-muted">
        <Image
          src={getImageUrl(gallery[selectedImage])}
          alt={getAltText(gallery[selectedImage], `${title} - Image ${selectedImage + 1}`)}
          fill
          className="object-cover"
        />
      </div>

      {/* Thumbnail Grid */}
      <div className="grid grid-cols-4 md:grid-cols-6 gap-2">
        {gallery.map((image, index) => (
          <button
            key={index}
            onClick={() => setSelectedImage(index)}
            className={`relative h-20 rounded overflow-hidden border-2 transition-all ${
              selectedImage === index
                ? 'border-primary ring-2 ring-primary ring-offset-2'
                : 'border-transparent hover:border-primary/50'
            }`}
          >
            <Image
              src={getImageUrl(image)}
              alt={getAltText(image, `${title} - Thumbnail ${index + 1}`)}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

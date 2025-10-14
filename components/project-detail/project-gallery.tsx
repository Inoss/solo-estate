'use client'

import { useState } from 'react'
import Image from 'next/image'
import { urlForImage } from '@/sanity/lib/image'

interface ProjectGalleryProps {
  gallery: any[]
  title: string
}

export function ProjectGallery({ gallery, title }: ProjectGalleryProps) {
  const [selectedImage, setSelectedImage] = useState(0)

  if (!gallery || gallery.length === 0) return null

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Gallery</h2>

      {/* Main Image */}
      <div className="relative h-[400px] md:h-[500px] w-full mb-4 rounded-lg overflow-hidden bg-muted">
        <Image
          src={urlForImage(gallery[selectedImage]).width(1200).height(800).url() || ''}
          alt={gallery[selectedImage].alt || `${title} - Image ${selectedImage + 1}`}
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
              src={urlForImage(image).width(200).height(200).url() || ''}
              alt={image.alt || `${title} - Thumbnail ${index + 1}`}
              fill
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  )
}

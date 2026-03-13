'use client'

import { useState } from 'react'
import Image from 'next/image'
import Lightbox from 'yet-another-react-lightbox'
import 'yet-another-react-lightbox/styles.css'
import type { PortfolioImage } from '@/types/sanity'
import { getImageUrl } from '@/lib/sanity'

interface PortfolioLightboxProps {
  images: PortfolioImage[]
  categoryDisplayNames: Record<string, string>
  categoryRouteSlugs: Record<string, string>
}

export default function PortfolioLightbox({
  images,
  categoryDisplayNames,
  categoryRouteSlugs,
}: PortfolioLightboxProps) {
  const [lightboxIndex, setLightboxIndex] = useState(-1)
  const [loadedImages, setLoadedImages] = useState<Set<string>>(new Set())

  const lightboxSlides = images.map((item) => ({
    src: getImageUrl(item.image),
    title: categoryDisplayNames[item.category] || item.category,
    description: item.location,
  }))

  const handleImageLoad = (imageId: string) => {
    setLoadedImages((prev) => new Set(prev).add(imageId))
  }

  return (
    <>
      {/* Pure CSS Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full space-y-6">
        {images.length > 0 ? (
          images.map((item, index) => {
            const imageUrl = getImageUrl(item.image)
            const displayCategory = categoryDisplayNames[item.category] || item.category
            const isLoaded = loadedImages.has(item._id)
            const dimensions = item.image.asset?.metadata?.dimensions
            const aspectRatio = dimensions?.aspectRatio ?? 0.8 // Default to 4:5 portrait if no data

            return (
              <button
                key={item._id}
                onClick={() => setLightboxIndex(index)}
                className="break-inside-avoid relative group overflow-hidden bg-gray-100 cursor-pointer mb-6 w-full text-left border-0 p-0 outline-none hover:outline-none"
              >
                <div
                  className="relative w-full overflow-hidden"
                  style={{ aspectRatio: String(aspectRatio) }}
                >
                  {!isLoaded && (
                    <div className="absolute inset-0 animate-pulse bg-gradient-to-br from-gray-100 to-gray-200" />
                  )}
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={displayCategory}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className={`object-cover transition-all duration-500 group-hover:brightness-110 ${
                        isLoaded ? 'opacity-100' : 'opacity-0'
                      }`}
                      priority={item.featured}
                      loading={item.featured ? 'eager' : 'lazy'}
                      onLoad={() => handleImageLoad(item._id)}
                    />
                  )}
                </div>

                {/* Subtle hover overlay */}
                <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors duration-300 pointer-events-none" />
              </button>
            )
          })
        ) : (
          <div className="col-span-full text-center py-12">
            <p className="font-sans text-gray-500">
              No hay imágenes disponibles en este momento.
            </p>
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      <Lightbox
        open={lightboxIndex >= 0}
        index={lightboxIndex}
        close={() => setLightboxIndex(-1)}
        slides={lightboxSlides}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  )
}

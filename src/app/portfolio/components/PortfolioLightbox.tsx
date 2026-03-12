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

  const lightboxSlides = images.map((item) => ({
    src: getImageUrl(item.image),
    title: categoryDisplayNames[item.category] || item.category,
    description: item.location,
  }))

  return (
    <>
      {/* Pure CSS Masonry Grid */}
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full space-y-6">
        {images.length > 0 ? (
          images.map((item, index) => {
            const imageUrl = getImageUrl(item.image)
            const displayCategory = categoryDisplayNames[item.category] || item.category

            return (
              <button
                key={item._id}
                onClick={() => setLightboxIndex(index)}
                className="break-inside-avoid relative group overflow-hidden bg-gray-100 cursor-pointer mb-6 w-full text-left border-0 p-0 outline-none hover:outline-none"
              >
                <div className="relative w-full aspect-[3/4]">
                  {imageUrl && (
                    <Image
                      src={imageUrl}
                      alt={displayCategory}
                      fill
                      sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                      className="object-cover transition-transform duration-700 ease-in-out group-hover:scale-105"
                      priority={item.featured}
                    />
                  )}
                </div>

                {/* Category Badge - Always Visible */}
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent p-4 flex flex-col justify-end">
                  <span className="font-sans text-xs uppercase tracking-widest text-accent">
                    {displayCategory}
                  </span>
                  {item.location && (
                    <p className="font-sans text-xs text-gray-300">
                      {item.location}
                    </p>
                  )}
                </div>

                {/* Hover Overlay - View in Fullscreen */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <div className="bg-white/90 hover:bg-white text-secondary font-sans font-semibold text-sm uppercase tracking-widest px-6 py-2 transition-colors rounded">
                    Ver en Grande
                  </div>
                </div>
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
        render={{
          slide: (slide, offset, rect) => (
            <div
              style={{
                width: rect.width,
                height: rect.height,
              }}
            >
              <img
                src={slide.src}
                alt={slide.title || 'Portfolio image'}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                }}
              />
            </div>
          ),
        }}
        styles={{
          container: { backgroundColor: 'rgba(0, 0, 0, 0.95)' },
        }}
      />
    </>
  )
}

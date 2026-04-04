'use client'

import { useEffect, useMemo, useState } from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'

interface HeroSlide {
  src: string
  alt: string
}

interface HeroCarouselProps {
  slides: HeroSlide[]
  intervalMs?: number
}

export default function HeroCarousel({ slides, intervalMs = 5200 }: HeroCarouselProps) {
  const [index, setIndex] = useState(0)

  const safeSlides = useMemo(() => slides.filter((slide) => Boolean(slide.src)), [slides])

  useEffect(() => {
    if (safeSlides.length <= 1) return

    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % safeSlides.length)
    }, intervalMs)

    return () => clearInterval(timer)
  }, [intervalMs, safeSlides.length])

  useEffect(() => {
    if (index >= safeSlides.length) {
      setIndex(0)
    }
  }, [index, safeSlides.length])

  if (safeSlides.length === 0) {
    return <div className="absolute inset-0 -z-10 bg-secondary" />
  }

  return (
    <div className="absolute inset-0 -z-10 overflow-hidden">
      {safeSlides.map((slide, slideIndex) => {
        const isActive = slideIndex === index

        return (
          <motion.div
            key={slide.src}
            initial={false}
            animate={{ opacity: isActive ? 1 : 0, scale: isActive ? 1 : 1.015 }}
            transition={{ duration: 1.35, ease: [0.22, 1, 0.36, 1] }}
            className="absolute inset-0 will-change-transform will-change-opacity"
            style={{ zIndex: isActive ? 2 : 1 }}
            aria-hidden={!isActive}
          >
            <Image
              src={slide.src}
              alt={slide.alt}
              fill
              priority={slideIndex === 0}
              loading={slideIndex === 0 ? 'eager' : 'lazy'}
              className="object-cover brightness-[0.55]"
              sizes="100vw"
            />
          </motion.div>
        )
      })}

      <div className="absolute inset-0 bg-black/[0.68]" />
      <div className="absolute inset-0 bg-gradient-to-b from-black/[0.45] via-transparent to-black/[0.30]" />
      <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/[0.85] to-transparent" />

      {safeSlides.length > 1 && (
        <div className="absolute z-20 left-1/2 -translate-x-1/2 bottom-8 flex items-center gap-2.5">
          {safeSlides.map((slide, dotIndex) => (
            <button
              key={slide.src}
              type="button"
              onClick={() => setIndex(dotIndex)}
              className={`h-1.5 rounded-full transition-all duration-300 ${
                dotIndex === index ? 'w-7 bg-white' : 'w-3 bg-white/45 hover:bg-white/70'
              }`}
              aria-label={`Go to slide ${dotIndex + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  )
}

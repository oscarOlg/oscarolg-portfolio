'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'
import { getImageUrl } from '@/lib/sanity'
import type { PortfolioImage } from '@/types/sanity'

interface PrivateHeroProps {
  heroImage?: PortfolioImage | null
}

export default function PrivateHero({ heroImage }: PrivateHeroProps) {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const hero = locale.privateInvestmentGuide.hero
  const heroImageUrl = heroImage ? getImageUrl(heroImage.image) : null

  return (
    <section className="relative w-full h-screen flex items-center justify-center overflow-hidden -mt-16">
      {/* Background Image or Fallback */}
      <div className="absolute inset-0">
        {heroImageUrl ? (
          <Image
            src={heroImageUrl}
            alt={heroImage?.title || 'Private Investment Guide Hero'}
            fill
            className="object-cover"
            priority
          />
        ) : (
          <div className="w-full h-full bg-gradient-to-br from-gray-200 to-gray-300" />
        )}
      </div>
      
      {/* Overlay Gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/50 to-black/70 z-10" />

      {/* Content */}
      <motion.div 
        className="relative z-20 text-center px-4 md:px-8 max-w-3xl"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1, ease: 'easeOut' }}
      >
        <motion.h1 
          className="font-serif text-4xl md:text-6xl lg:text-7xl text-white leading-tight mb-6 font-bold"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: 'easeOut' }}
        >
          {hero.title}
        </motion.h1>

        <motion.p 
          className="font-sans text-lg md:text-xl text-white/80 leading-relaxed"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.4, ease: 'easeOut' }}
        >
          {hero.subtitle}
        </motion.p>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div 
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 text-white/60"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <svg className="w-6 h-6 mx-auto" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
        </svg>
      </motion.div>
    </section>
  )
}

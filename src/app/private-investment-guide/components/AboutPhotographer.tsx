'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'

interface AboutPhotographerProps {
  imageUrl?: string | null
}

export default function AboutPhotographer({ imageUrl }: AboutPhotographerProps) {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const about = locale.privateInvestmentGuide.about
  
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, margin: '-100px' }}
            className="order-2 md:order-1"
          >
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
              {imageUrl ? (
                <Image
                  src={imageUrl}
                  alt="Oscar Sanchez - Fotógrafo"
                  fill
                  className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
              ) : (
                <div className="w-full h-full bg-secondary/10" />
              )}
            </div>
          </motion.div>

          {/* Text */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true, margin: '-100px' }}
            className="order-1 md:order-2"
          >
            <h2 className="font-serif text-4xl md:text-5xl text-secondary font-bold mb-8">
              {about.heading}<span className="text-accent">{about.headingHighlight}</span>
            </h2>

            <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
              {about.description}
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

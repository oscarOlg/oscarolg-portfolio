'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'
import { getImageUrl } from '@/lib/sanity'
import type { PortfolioImage } from '@/types/sanity'

interface SessionSectionProps {
  sessionImage?: PortfolioImage | null
}

export default function SessionSection({ sessionImage }: SessionSectionProps) {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const session = locale.privateInvestmentGuide.session
  const sessionFeatures = locale.privateInvestmentGuide.sessionFeatures
  const sessionImageUrl = sessionImage ? getImageUrl(sessionImage.image) : null
  
  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-gray-50 border-y border-gray-200">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-secondary font-bold mb-4">
            {session.heading}
          </h2>
          <p className="font-sans text-lg text-gray-600">
            {session.subheading}
          </p>
        </motion.div>

        <div className="flex flex-col md:flex-row gap-12 md:gap-16 items-start">
          {/* Image - Left Side */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="w-full md:w-auto md:flex-shrink-0"
          >
            <div className="relative w-full md:w-80 aspect-[4/5] bg-gradient-to-br from-gray-200 to-gray-300 rounded-lg overflow-hidden">
              {sessionImageUrl ? (
                <Image
                  src={sessionImageUrl}
                  alt={session.title}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="absolute inset-0 flex items-center justify-center">
                  <svg className="w-16 h-16 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={0.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                </div>
              )}
            </div>
          </motion.div>

          {/* Content - Right Side */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.9 }}
            viewport={{ once: true }}
            className="w-full space-y-6"
          >
            <div>
              <h3 className="font-serif text-3xl text-secondary font-bold mb-2">
                {session.title}
              </h3>
              <p className="font-sans text-2xl text-accent font-semibold mb-4">
                ${session.price.toLocaleString('es-MX')} MXN
              </p>
            </div>

            <div className="space-y-4">
              <p className="font-sans text-base text-gray-700 leading-relaxed">
                {sessionFeatures.description}
              </p>

              <div className="space-y-3 py-4 border-y border-gray-200">
                {sessionFeatures.features.map((feature, idx) => (
                  <div key={idx} className="flex gap-3 items-start">
                    <span className="text-accent font-bold text-lg flex-shrink-0">✓</span>
                    <span className="font-sans text-sm text-gray-700">
                      <span className="font-semibold">{feature.label}</span> {feature.detail}
                    </span>
                  </div>
                ))}
              </div>

              <p className="font-sans text-sm text-gray-600 italic leading-relaxed pt-4">
                ✨ <span className="font-semibold">Momento especial:</span> {sessionFeatures.specialOffer}
              </p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

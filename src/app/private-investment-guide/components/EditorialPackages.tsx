'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'
import { getImageUrl } from '@/lib/sanity'
import type { PortfolioImage } from '@/types/sanity'

interface Package {
  id: string
  name: string
  displayName: string
  subtitle: string
  price: number
  audience: string
  promise: string
  features: string[]
  badge?: string | null
}

interface PackageCardProps {
  pkg: Package
  index: number
  image?: PortfolioImage | null
  experienceLabel: string
  investmentLabel: string
}

function PackageCard({ pkg, index, image, experienceLabel, investmentLabel }: PackageCardProps) {
  const imageUrl = image ? getImageUrl(image.image, 550, 687) : null
  
  return (
    <motion.article
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.9, delay: index * 0.12 }}
      viewport={{ once: true, margin: '-100px' }}
      className="mb-16 scroll-mt-8 border border-gray-200 rounded-lg bg-white shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden"
    >
      <div className="grid grid-cols-1 md:grid-cols-3 gap-0">
        {/* Image - Left Side (1 column on desktop) */}
        <div className="md:col-span-1">
          <div className="relative w-full aspect-[4/5] md:h-full bg-gradient-to-br from-gray-200 to-gray-300">
            {imageUrl ? (
              <Image
                src={imageUrl}
                alt={pkg.name}
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
        </div>

        {/* Content - Right Side (2 columns on desktop) */}
        <div className="md:col-span-2 p-8 md:p-10 flex flex-col">
          {/* Header */}
          <div className="mb-5">
            <div className="flex items-start justify-between gap-3 mb-2">
              <h3 className="font-serif text-2xl md:text-3xl text-secondary font-bold">
                {pkg.displayName}
              </h3>
              {pkg.badge && (
                <div className="px-2 py-1 bg-accent/15 border border-accent text-accent font-sans text-xs uppercase tracking-widest font-bold rounded flex-shrink-0 whitespace-nowrap">
                  {pkg.badge}
                </div>
              )}
            </div>
            <p className="font-sans text-sm text-gray-600 font-medium">
              {pkg.subtitle}
            </p>
          </div>

          {/* Story - Compact */}
          <div className="space-y-3 mb-6">
            <p className="font-sans text-sm text-gray-700 leading-relaxed italic">
              {pkg.audience}
            </p>
            <p className="font-sans text-sm text-gray-700 leading-relaxed">
              {pkg.promise}
            </p>
          </div>

          {/* Deliverables Checklist - Compact */}
          <div className="mb-6 p-5 bg-gray-50 border border-gray-200 rounded flex-1">
            <h4 className="font-serif text-sm text-secondary font-bold mb-3 uppercase tracking-wide">
              {experienceLabel}
            </h4>
            <ul className="space-y-2.5">
              {pkg.features.map((feature, idx) => (
                <li key={idx} className="flex gap-2.5 items-start">
                  <span className="text-accent font-bold flex-shrink-0 mt-0.5">✓</span>
                  <span className="font-sans text-xs text-gray-700 leading-relaxed">
                    {feature}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Price - Bottom */}
          <div className="pt-5 border-t border-gray-200">
            <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-1.5 font-semibold">
              {investmentLabel}
            </p>
            <p className="font-serif text-3xl text-secondary font-bold">
              ${pkg.price.toLocaleString('es-MX')} <span className="text-sm font-sans text-gray-600 font-normal">MXN</span>
            </p>
          </div>
        </div>
      </div>
    </motion.article>
  )
}

interface EditorialPackagesProps {
  packageImages?: PortfolioImage[]
}

export default function EditorialPackages({ packageImages = [] }: EditorialPackagesProps) {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const packagesData = locale.privateInvestmentGuide.packages
  const packages = packagesData.collections as Package[]

  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-white">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-20 text-center"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-secondary font-bold mb-4">
            {packagesData.heading}
          </h2>
          <p className="font-sans text-lg text-gray-600">
            {packagesData.subheading}
          </p>
        </motion.div>

        {/* Packages */}
        {packages.map((pkg, index) => (
          <PackageCard 
            key={pkg.id} 
            pkg={pkg} 
            index={index} 
            image={packageImages[index] || null}
            experienceLabel={packagesData.experienceLabel}
            investmentLabel={packagesData.investmentLabel}
          />
        ))}
      </div>
    </section>
  )
}

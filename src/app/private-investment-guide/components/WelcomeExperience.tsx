'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'

export default function WelcomeExperience() {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const welcome = locale.privateInvestmentGuide.welcome

  const paragraphs = [
    welcome.philosophyIntro,
    welcome.philosophyCore,
    welcome.philosophyApproach,
    welcome.philosophyClosing,
  ]
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-gray-100/50 border-y border-gray-200">
      <div className="max-w-3xl mx-auto">
        {paragraphs.map((paragraph, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: index * 0.15 }}
            viewport={{ once: true, margin: '-100px' }}
            className="mb-8"
          >
            {/* Highlight the philosophy line */}
            {paragraph.includes(welcome.philosophyCore) ? (
              <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                <span className="block my-2 font-serif text-xl md:text-2xl text-secondary font-bold leading-relaxed">
                  {welcome.philosophyCore}
                </span>
              </p>
            ) : (
              <p className="font-sans text-base md:text-lg text-gray-700 leading-relaxed">
                {paragraph}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  )
}

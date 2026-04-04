'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'
import { trackCTAClick } from '@/lib/analytics'

export default function ClosingCTA() {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const closingData = locale.privateInvestmentGuide.closing

  return (
    <section className="w-full py-20 md:py-32 px-4 md:px-8 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-2xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9 }}
          viewport={{ once: true }}
          className="space-y-8"
        >
          <div>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-secondary font-bold mb-4">
              ¿Listos para apartar su fecha?
            </h2>
            <p className="font-sans text-lg text-gray-600">
              Aseguremos que el día de su boda sea documentado con el estilo que merece.
            </p>
          </div>

          {/* Primary CTA */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <a
              href="https://calendly.com/oscar-olg-photo/15min"
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackCTAClick('private_guide_calendly', 'private_investment_guide', lang)}
              className="inline-block px-10 py-5 bg-accent text-secondary font-sans font-bold text-base uppercase tracking-widest rounded-lg hover:bg-accent/90 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              Agendar Videollamada de Confirmación
            </a>
          </motion.div>

          {/* Secondary Option */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
            viewport={{ once: true }}
            className="space-y-4 pt-8 border-t border-gray-200"
          >
            <p className="font-sans text-gray-600">
              ¿Listos para conversar?
            </p>
            <Link
              href="/contact"
              onClick={() => trackCTAClick('private_guide_whatsapp', 'private_investment_guide', lang)}
              className="inline-block px-8 py-3 border-2 border-secondary text-secondary font-sans font-semibold uppercase tracking-widest text-sm rounded-lg hover:bg-secondary hover:text-dominant transition-all duration-300"
            >
              Escribir por WhatsApp
            </Link>
          </motion.div>

          {/* Final Message */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
            className="font-serif text-lg text-gray-600 italic pt-8"
          >
            No es solo una inversión en fotografía.<br />
            Es invertir en recordar.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}

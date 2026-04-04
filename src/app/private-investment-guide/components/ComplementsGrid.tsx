'use client'

import { motion } from 'framer-motion'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'

interface Complement {
  name: string
  price: number
  description: string
}

const complements: Complement[] = [
  {
    name: 'Colección de Recuerdos',
    price: 1500,
    description: '50 fotos (4x6") + 2 ampliaciones (8x10")',
  },
  {
    name: 'Herencia Familiar',
    price: 2800,
    description: '100 fotos (4x6") + 4 ampliaciones (8x10")',
  },
  {
    name: 'Arte en Casa',
    price: 3500,
    description: '1 grande (16x20") + 2 medianas (11x14")',
  },
  {
    name: 'Photobook Premium 10x10',
    price: 4500,
    description: 'Encuadernación de pasta dura',
  },
  {
    name: 'Photobook Gran Formato 12x12',
    price: 6000,
    description: 'Encuadernación de pasta dura',
  },
  {
    name: 'Hora de Cobertura Extra',
    price: 2000,
    description: 'Una hora adicional de documentación el día del evento',
  },
]

function ComplementCard({ item, index }: { item: Complement; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.08 }}
      viewport={{ once: true, margin: '-50px' }}
      className="p-6 border border-gray-200 rounded-lg hover:border-accent hover:shadow-lg transition-all duration-300"
    >
      <div className="space-y-2">
        <h3 className="font-serif text-lg text-secondary font-bold">
          {item.name}
        </h3>
        <p className="font-sans text-accent text-xl font-semibold">
          ${item.price.toLocaleString('es-MX')} MXN
        </p>
        <p className="font-sans text-sm text-gray-600 leading-relaxed">
          {item.description}
        </p>
      </div>
    </motion.div>
  )
}

export default function ComplementsGrid() {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const complements = locale.privateInvestmentGuide.complements.items
  return (
    <section className="w-full py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="mb-12"
        >
          <h2 className="font-serif text-4xl md:text-5xl text-secondary font-bold text-center mb-4">
            {locale.privateInvestmentGuide.complements.heading}
          </h2>
          <p className="font-sans text-lg text-gray-600 text-center">
            {locale.privateInvestmentGuide.complements.subheading}
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {complements.map((item, index) => (
            <ComplementCard key={item.name} item={item} index={index} />
          ))}
        </div>
      </div>
    </section>
  )
}

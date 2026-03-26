'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '@/contexts/LanguageContext';

/**
 * Phase 2 Unified Pricing Model Component
 * Displays the new simplified portrait pricing structure:
 * - Base: $2,100 MXN (Clásico - Standard session)
 * - +$250 MXN per additional person
 * 
 * Perfect for: XV años, graduations, families, couples, business headshots
 */
export function UnifiedPortraitPricing() {
  const { lang } = useLanguage();
  const t = {
    es: {
      title: 'Precios Claros y Transparentes',
      subtitle: 'Un modelo flexible que crece contigo',
      baseLabel: 'Sesión Base Clásica',
      basePrice: '$2,100 MXN',
      baseDescription: '1 persona, 1 hora, cambio de atuendo',
      additionalLabel: 'Por cada persona adicional',
      additionalPrice: '+$250 MXN',
      additionalDescription: 'Parejas, familias, amigos',
      examples: 'Ejemplos de Sesiones',
      example1Title: 'Individual (XV Años, Graduación)',
      example1Price: '$2,100 MXN',
      example2Title: 'Pareja (Compromiso, Aniversario)',
      example2Price: '$2,350 MXN',
      example3Title: 'Familia (3 personas)',
      example3Price: '$2,600 MXN',
      example4Title: 'Grupo (4+ personas)',
      example4Price: 'Consultar',
      typesTitle: 'Perfecto para:',
      types: [
        '👰 Quinceañeras (XV Años)',
        '🎓 Fotos de Graduación',
        '💼 Headshots Profesionales',
        '💑 Parejas & Compromisos',
        '👨‍👩‍👧‍👦 Fotos Familiares',
        '📸 Momentos Especiales',
      ],
      cta: 'Reservar Sesión',
    },
    en: {
      title: 'Clear & Transparent Pricing',
      subtitle: 'A flexible model that grows with you',
      baseLabel: 'Classic Base Session',
      basePrice: '$2,100 MXN',
      baseDescription: '1 person, 1 hour, outfit change',
      additionalLabel: 'Per additional person',
      additionalPrice: '+$250 MXN',
      additionalDescription: 'Couples, families, friends',
      examples: 'Session Examples',
      example1Title: 'Individual (XV Años, Graduation)',
      example1Price: '$2,100 MXN',
      example2Title: 'Couple (Engagement, Anniversary)',
      example2Price: '$2,350 MXN',
      example3Title: 'Family (3 people)',
      example3Price: '$2,600 MXN',
      example4Title: 'Group (4+ people)',
      example4Price: 'Contact us',
      typesTitle: 'Perfect for:',
      types: [
        '👰 Quinceañeras (XV Años)',
        '🎓 Graduation Photos',
        '💼 Professional Headshots',
        '💑 Couples & Engagements',
        '👨‍👩‍👧‍👦 Family Photos',
        '📸 Special Moments',
      ],
      cta: 'Book Your Session',
    },
  };

  const copy = lang === 'en' ? t.en : t.es;

  return (
    <div className="w-full bg-gradient-to-br from-accent/5 via-dominant to-accent/5 border border-accent/20 rounded-lg p-8 md:p-12 my-12">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="text-center mb-12"
      >
        <h2 className="font-serif text-3xl md:text-4xl text-secondary font-bold mb-3">
          {copy.title}
        </h2>
        <p className="font-sans text-lg text-gray-600 max-w-2xl mx-auto">
          {copy.subtitle}
        </p>
      </motion.div>

      {/* Pricing Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
        {/* Base Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="bg-white border-2 border-secondary rounded-lg p-8 text-center"
        >
          <div className="mb-4">
            <span className="inline-block text-4xl mb-3">🎯</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-secondary mb-2">
            {copy.baseLabel}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{copy.baseDescription}</p>
          <div className="bg-secondary/10 rounded py-3 px-4 mb-4">
            <p className="font-sans font-bold text-2xl text-secondary">
              {copy.basePrice}
            </p>
          </div>
          <p className="text-xs text-gray-500">Includes all editing + digital gallery</p>
        </motion.div>

        {/* Additional Pricing */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="bg-white border-2 border-accent rounded-lg p-8 text-center"
        >
          <div className="mb-4">
            <span className="inline-block text-4xl mb-3">➕</span>
          </div>
          <h3 className="font-serif text-xl font-bold text-secondary mb-2">
            {copy.additionalLabel}
          </h3>
          <p className="text-gray-600 text-sm mb-4">{copy.additionalDescription}</p>
          <div className="bg-accent/10 rounded py-3 px-4 mb-4">
            <p className="font-sans font-bold text-2xl text-accent">
              {copy.additionalPrice}
            </p>
          </div>
          <p className="text-xs text-gray-500">For as many people as you want</p>
        </motion.div>
      </div>

      {/* Price Examples */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="mb-12"
      >
        <h3 className="font-serif text-2xl text-secondary font-bold text-center mb-8">
          {copy.examples}
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {[
            { title: copy.example1Title, price: copy.example1Price },
            { title: copy.example2Title, price: copy.example2Price },
            { title: copy.example3Title, price: copy.example3Price },
            { title: copy.example4Title, price: copy.example4Price },
          ].map((example, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: 0.25 + idx * 0.05 }}
              className="bg-white rounded-lg p-6 text-center border border-gray-200 hover:shadow-md transition-shadow"
            >
              <p className="font-serif text-sm font-bold text-secondary mb-3">
                {example.title}
              </p>
              <p className="font-sans font-bold text-lg text-accent">
                {example.price}
              </p>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Use Cases */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className="bg-white rounded-lg border border-gray-200 p-8"
      >
        <h3 className="font-serif text-xl text-secondary font-bold text-center mb-6">
          {copy.typesTitle}
        </h3>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {copy.types.map((type, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3, delay: 0.35 + idx * 0.05 }}
              className="text-center py-3 px-4 bg-gray-50 rounded hover:bg-secondary/5 transition-colors"
            >
              <p className="font-sans text-sm text-gray-700">{type}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  );
}

/**
 * Pricing Table Component
 * Shows simplified pricing in table format
 */
export function PortraitPricingTable() {
  const { lang } = useLanguage();

  const rows = [
    {
      es: { people: '1 persona (XV, Graduación, Professional)', price: '$2,100 MXN' },
      en: { people: '1 person (XV, Graduation, Professional)', price: '$2,100 MXN' },
    },
    {
      es: { people: '2 personas (Pareja, Compromiso)', price: '$2,350 MXN' },
      en: { people: '2 people (Couple, Engagement)', price: '$2,350 MXN' },
    },
    {
      es: { people: '3 personas (Pequeña familia)', price: '$2,600 MXN' },
      en: { people: '3 people (Small family)', price: '$2,600 MXN' },
    },
    {
      es: { people: '4 personas (Familia completa)', price: '$2,850 MXN' },
      en: { people: '4 people (Full family)', price: '$2,850 MXN' },
    },
    {
      es: { people: '5+ personas (Grupo grande)', price: '$3,100+ MXN' },
      en: { people: '5+ people (Large group)', price: '$3,100+ MXN' },
    },
  ];

  return (
    <div className="w-full overflow-x-auto my-8">
      <table className="w-full border-collapse">
        <tbody>
          {rows.map((row, idx) => {
            const data = lang === 'en' ? row.en : row.es;
            return (
              <tr
                key={idx}
                className={idx % 2 === 0 ? 'bg-gray-50' : 'bg-white'}
              >
                <td className="border border-gray-200 px-6 py-4 font-sans text-sm text-gray-700">
                  {data.people}
                </td>
                <td className="border border-gray-200 px-6 py-4 font-sans font-bold text-lg text-secondary text-right">
                  {data.price}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

'use client'

import { useLanguage } from '@/contexts/LanguageContext'

const placeholderTestimonials = {
  es: [
    {
      quote: 'Nos hizo sentir tranquilos todo el día y las fotos quedaron espectaculares.',
      author: 'Ana + Luis',
    },
    {
      quote: 'Entrega clara, comunicación rápida y una cobertura elegante de principio a fin.',
      author: 'Fer + Diego',
    },
    {
      quote: 'Cada imagen se siente real, emotiva y con muchísima intención.',
      author: 'Mar + Andrés',
    },
  ],
  en: [
    {
      quote: 'He made us feel calm all day and the photos turned out stunning.',
      author: 'Ana + Luis',
    },
    {
      quote: 'Clear delivery, fast communication, and elegant coverage from start to finish.',
      author: 'Fer + Diego',
    },
    {
      quote: 'Every image feels real, emotional, and intentionally crafted.',
      author: 'Mar + Andres',
    },
  ],
} as const

export default function HomepageTestimonialStrip() {
  const { lang } = useLanguage()
  const testimonials = lang === 'en' ? placeholderTestimonials.en : placeholderTestimonials.es

  return (
    <section className="w-full bg-secondary/95 border-y border-dominant/10 px-6 md:px-12 py-7 md:py-8">
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-3 md:gap-4">
        {testimonials.map((item, index) => (
          <article
            key={`${item.author}-${item.quote.slice(0, 20)}`}
            className={`relative border px-5 py-4 md:px-6 md:py-5 ${
              index === 0
                ? 'bg-dominant/8 border-accent/40 shadow-[0_8px_24px_-18px_rgba(0,0,0,0.5)]'
                : 'bg-dominant/4 border-dominant/12'
            }`}
          >
            <span className="absolute -top-3 left-4 font-serif text-3xl leading-none text-accent/55">“</span>
            <p className="font-sans text-[13px] md:text-sm text-dominant/82 leading-relaxed pr-1">{item.quote}</p>
            <div className="mt-3 flex items-center gap-2">
              <span className="h-px w-8 bg-accent/45" aria-hidden="true" />
              <p className="font-sans text-[10px] uppercase tracking-[0.16em] text-accent">{item.author}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  )
}

'use client'

import Link from 'next/link'

interface FloatingCTAProps {
  category?: string
}

export default function FloatingCTA({ category }: FloatingCTAProps) {
  const categoryMap: Record<string, string> = {
    weddings: 'bodas',
    portraits: 'retratos',
    events: 'eventos',
    quinceaneras: 'quinceaneras',
    couples: 'parejas',
    commercial: 'comercial',
    editorial: 'editorial',
    maternity: 'maternidad',
  }

  const categorySlug = category ? categoryMap[category] : ''

  return (
    <div className="fixed bottom-6 right-6 flex flex-col gap-2 z-30 sm:bottom-8 sm:right-8">
      {/* Contact Button */}
      <Link
        href="/contact"
        className="flex items-center justify-center gap-1 bg-accent hover:bg-accent/90 text-secondary font-sans font-semibold text-xs uppercase tracking-widest px-3 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 w-48 sm:w-56"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
        </svg>
        Contactar
      </Link>

      {/* Pricing Button */}
      <Link
        href={categorySlug ? `/services#${categorySlug}` : '/services'}
        className="flex items-center justify-center gap-1 bg-secondary hover:bg-secondary/90 border-2 border-accent text-accent font-sans font-semibold text-xs uppercase tracking-widest px-3 py-3 rounded-full shadow-lg transition-all transform hover:scale-105 w-48 sm:w-56"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        Precios
      </Link>
    </div>
  )
}

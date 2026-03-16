'use client'

import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { t } from '@/lib/translations'

interface FloatingCTAProps {
  category?: string
}

export default function FloatingCTA({ category }: FloatingCTAProps) {
  const { lang } = useLanguage()
  const tr = (obj: { es: string; en: string }) => lang === 'en' ? obj.en : obj.es

  const categoryMap: Record<string, string> = {
    weddings: 'bodas',
    portraits: 'retratos',
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
        className="flex items-center justify-center gap-2 bg-accent/90 backdrop-blur-sm hover:bg-accent text-secondary font-sans font-semibold text-xs uppercase tracking-widest px-4 py-2.5 rounded-full shadow-lg transition-all transform hover:scale-105"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {tr(t.portfolio.floatingContact)}
      </Link>

      {/* Pricing Button */}
      <Link
        href={categorySlug ? `/services#${categorySlug}` : '/services'}
        className="flex items-center justify-center gap-2 bg-secondary/80 backdrop-blur-sm hover:bg-secondary/95 text-dominant font-sans font-semibold text-xs uppercase tracking-widest px-4 py-2.5 rounded-full shadow-lg transition-all transform hover:scale-105"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {tr(t.portfolio.floatingPrices)}
      </Link>
    </div>
  )
}

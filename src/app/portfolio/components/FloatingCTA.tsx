'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'

interface FloatingCTAProps {
  category?: string
}

export default function FloatingCTA({ category }: FloatingCTAProps) {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const portfolio = locale.portfolio
  const servicesHref = '/services'
  const [isScrolling, setIsScrolling] = useState(false)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  void category

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolling(true)

      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }

      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 180)
    }

    window.addEventListener('scroll', handleScroll, { passive: true })

    return () => {
      window.removeEventListener('scroll', handleScroll)
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
    }
  }, [])

  return (
    <div
      className={`fixed z-30 flex flex-col gap-2.5 right-4 sm:right-6 md:right-8 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] transform transition-all duration-750 ease-out ${
        isScrolling ? 'opacity-0 translate-y-2 pointer-events-none' : 'opacity-100 translate-y-0'
      }`}
    >
      {/* Contact Button */}
      <Link
        href="/contact"
        className="flex items-center justify-center gap-2 bg-accent/90 backdrop-blur-sm hover:bg-accent text-secondary font-sans font-semibold text-[11px] uppercase tracking-[0.14em] px-5 py-3 rounded-full shadow-lg shadow-secondary/20 transition-all transform hover:scale-[1.03]"
      >
        <svg className="w-4 h-4 shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
        </svg>
        {portfolio.floatingContact}
      </Link>

      {/* Pricing Button */}
      <Link
        href={servicesHref}
        className="flex items-center justify-center gap-2 bg-secondary/82 backdrop-blur-sm hover:bg-secondary/95 text-dominant font-sans font-semibold text-[11px] uppercase tracking-[0.14em] px-5 py-3 rounded-full shadow-lg shadow-secondary/20 transition-all transform hover:scale-[1.03]"
      >
        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        {portfolio.floatingPrices}
      </Link>
    </div>
  )
}

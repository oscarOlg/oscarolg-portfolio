'use client'

import { useEffect, useRef, useState } from 'react'
import { useLanguage } from '@/contexts/LanguageContext'
import { getSiteLocale } from '@/i18n/locales'
import { getWhatsAppUrl, getWhatsAppDisplayNumber } from '@/lib/whatsapp'
import { trackLeadFormWhatsAppOpened } from '@/lib/analytics'

export default function FloatingWhatsAppCTA() {
  const { lang } = useLanguage()
  const locale = getSiteLocale(lang)
  const portfolio = locale.portfolio
  const whatsappUrl = getWhatsAppUrl()
  const whatsappNumber = getWhatsAppDisplayNumber()
  
  const [isScrolling, setIsScrolling] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const scrollTimeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  if (!whatsappUrl || !whatsappNumber) return null

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

  const handleClick = () => {
    trackLeadFormWhatsAppOpened('floating_cta', lang)
  }

  return (
    <div
      className={`fixed z-40 flex flex-col items-center justify-center right-4 sm:right-6 md:right-8 bottom-[max(1rem,env(safe-area-inset-bottom))] sm:bottom-[max(1.25rem,env(safe-area-inset-bottom))] transform transition-all duration-750 ease-out ${
        isScrolling || !isVisible 
          ? 'opacity-0 translate-y-2 pointer-events-none' 
          : 'opacity-100 translate-y-0'
      }`}
    >
      {/* WhatsApp Floating Button */}
      <a
        href={whatsappUrl}
        target="_blank"
        rel="noopener noreferrer"
        onClick={handleClick}
        className="flex items-center justify-center gap-2.5 bg-gradient-to-br from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 text-white font-sans font-semibold text-[11px] uppercase tracking-[0.14em] px-4 py-3 md:px-5 md:py-3 rounded-full shadow-lg shadow-green-500/30 transition-all transform hover:scale-[1.05] backdrop-blur-sm"
        aria-label={`Contactar por WhatsApp: ${whatsappNumber}`}
      >
        <svg 
          className="w-5 h-5 shrink-0" 
          fill="currentColor" 
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-9.746 9.798c0 2.708.732 5.349 2.122 7.651L2.601 23.3l8.256-2.676c2.213 1.228 4.688 1.871 7.268 1.871 5.432 0 9.834-4.43 9.834-9.9.215-2.568-.674-5.65-3.195-7.978C18.678 6.287 16.226 5.14 13.051 5.079zm0-2.08c2.125 0 4.229.858 5.767 2.437 1.537 1.578 2.384 3.652 2.384 5.859 0 4.587-3.721 8.309-8.298 8.309-1.434 0-2.836-.357-4.118-1.04l-.295-.16-3.06.992.968-3.267-.2-.317a8.307 8.307 0 01-1.277-4.517c0-4.587 3.721-8.309 8.298-8.309z"/>
        </svg>
        <span className="hidden sm:inline">{portfolio.floatingContact}</span>
      </a>
    </div>
  )
}

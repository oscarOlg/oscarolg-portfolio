import es from './es.json'
import en from './en.json'
import type { Language } from '@/contexts/LanguageContext'

export type SiteLocale = typeof es

export function getSiteLocale(lang: Language): SiteLocale {
  return lang === 'en' ? (en as SiteLocale) : (es as SiteLocale)
}

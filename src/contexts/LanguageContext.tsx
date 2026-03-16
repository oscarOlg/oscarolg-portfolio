'use client';

import { createContext, useContext, useState, useEffect } from 'react';

export type Language = 'es' | 'en';

interface LanguageContextValue {
  lang: Language;
  setLang: (l: Language) => void;
}

const LanguageContext = createContext<LanguageContextValue>({
  lang: 'es',
  setLang: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>('es');
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    const stored = localStorage.getItem('lang');
    if (stored === 'en') setLangState('en');
  }, []);

  const setLang = (l: Language) => {
    setLangState(l);
    localStorage.setItem('lang', l);
  };

  return (
    <LanguageContext.Provider value={{ lang: mounted ? lang : 'es', setLang }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  return useContext(LanguageContext);
}

/**
 * Returns `en` when lang is 'en' and en is non-null, otherwise returns `es`.
 * Used by all components that render bilingual CMS props.
 */
export function pickLang<T>(lang: Language, es: T | undefined, en: T | undefined): T | undefined {
  return lang === 'en' && en != null ? en : es;
}

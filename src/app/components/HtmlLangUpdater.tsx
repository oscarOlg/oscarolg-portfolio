'use client';

import { useEffect } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';

/** Zero-render component — updates <html lang> after mount when language changes. */
export default function HtmlLangUpdater() {
  const { lang } = useLanguage();
  useEffect(() => {
    document.documentElement.lang = lang;
  }, [lang]);
  return null;
}

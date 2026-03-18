'use client';

import Link from 'next/link';
import Socials from './Socials';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';

export default function Footer() {
  const { lang } = useLanguage();
  const tr = (obj: { es: string; en: string }) => (lang === 'en' ? obj.en : obj.es);

  const footerLinks = [
    { href: '/portfolio', label: tr(t.footer.links.portfolio) },
    { href: '/services',  label: tr(t.footer.links.services) },
    { href: '/about',     label: tr(t.footer.links.about) },
    { href: '/contact',   label: tr(t.footer.links.contact) },
  ];

  return (
    <footer className="w-full mt-auto border-t border-gray-200/80 bg-dominant">
      <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 md:pt-24 md:pb-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 items-start">
          <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm md:max-w-none">
            <Link href="/" className="flex flex-col leading-none mb-5">
              <span className="font-serif text-2xl tracking-widest uppercase">
                Oscar Olg
              </span>
              <span className="font-sans font-light text-[10px] tracking-[0.28em] uppercase mt-1 text-secondary/60">
                Photography
              </span>
            </Link>
            <p className="font-serif italic text-lg text-secondary/80 max-w-md mb-5">
              {tr(t.footer.tagline)}
            </p>
            <a
              href="mailto:oscar.olg.photo@gmail.com"
              className="font-sans text-xs uppercase tracking-widest text-secondary/70 border-b border-secondary/30 pb-1 hover:text-accent hover:border-accent transition-colors"
            >
              oscar.olg.photo@gmail.com
            </a>
          </div>

          <div className="flex flex-col items-center md:items-center text-center">
            <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-secondary/45 mb-5">
              {tr(t.footer.navHeading)}
            </p>
            <div className="flex flex-col gap-3 items-center">
              {footerLinks.map(({ href, label }) => (
                <Link
                  key={href}
                  href={href}
                  className="font-sans text-sm text-secondary/80 hover:text-accent transition-colors"
                >
                  {label}
                </Link>
              ))}
            </div>
          </div>

          <div className="flex flex-col items-center md:items-end text-center md:text-right">
            <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-secondary/45 mb-5">
              {tr(t.footer.contactHeading)}
            </p>
            <p className="font-sans text-sm text-secondary/80 mb-2">
              {tr(t.footer.city)}
            </p>
            <a
              href="https://wa.me/526562932374"
              target="_blank"
              rel="noopener noreferrer"
              className="font-sans text-sm text-secondary/80 hover:text-accent transition-colors mb-5"
            >
              WhatsApp: +52 656 293 2374
            </a>
            <Socials
              containerClassName="flex gap-5"
              itemClassName="text-secondary/70 hover:text-accent transition-colors"
            />
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-200/70 flex flex-col md:flex-row gap-3 items-center justify-between text-center md:text-left">
          <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-secondary/45">
            Oscar Olg Photography
          </p>
          <p className="font-sans text-xs text-secondary/50">
            {tr(t.footer.tagline2)}
          </p>
        </div>
      </div>
    </footer>
  );
}

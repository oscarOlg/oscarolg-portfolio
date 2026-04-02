'use client';

import Link from 'next/link';
import Socials from './Socials';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSiteLocale } from '@/i18n/locales';
import { getWhatsAppDisplayNumber, getWhatsAppUrl } from '@/lib/whatsapp';

export default function Footer() {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const whatsappUrl = getWhatsAppUrl();
  const whatsappDisplayNumber = getWhatsAppDisplayNumber();

  const footerLinks = [
    { href: '/portfolio', label: locale.footer.links.portfolio },
    { href: '/services',  label: locale.footer.links.services },
    { href: '/about',     label: locale.footer.links.about },
    { href: '/contact',   label: locale.footer.links.contact },
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
              {locale.footer.tagline}
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
              {locale.footer.navHeading}
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
              {locale.footer.contactHeading}
            </p>
            <p className="font-sans text-sm text-secondary/80 mb-2">
              {locale.footer.city}
            </p>
            {whatsappUrl && whatsappDisplayNumber && (
              <a
                href={whatsappUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="font-sans text-sm text-secondary/80 hover:text-accent transition-colors mb-5"
              >
                WhatsApp: {whatsappDisplayNumber}
              </a>
            )}
            <Socials
              containerClassName="flex gap-5"
              itemClassName="text-secondary/70 hover:text-accent transition-colors"
            />
          </div>
        </div>
      </div>
    </footer>
  );
}

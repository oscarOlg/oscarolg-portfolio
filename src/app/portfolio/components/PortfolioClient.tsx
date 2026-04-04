'use client';

import Link from 'next/link';
import PortfolioLightbox from './PortfolioLightbox';
import FloatingCTA from '../components/FloatingCTA';
import type { PortfolioImage } from '@/types/sanity';
import { useLanguage } from '@/contexts/LanguageContext';
import { getSiteLocale } from '@/i18n/locales';

interface PortfolioClientProps {
  allImages: PortfolioImage[];
  categoryDisplayNames: Record<string, string>;
}

export default function PortfolioClient({
  allImages,
  categoryDisplayNames,
}: PortfolioClientProps) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const portfolio = locale.portfolio;

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full max-w-[1700px] mx-auto px-3 md:px-5 pt-6 md:pt-8">
        <div className="w-full">
          <PortfolioLightbox
            images={allImages}
            categoryDisplayNames={categoryDisplayNames}
          />
        </div>

        <div className="mt-16 md:mt-20 text-center pb-8">
          <h3 className="font-serif text-2xl mb-6">
            {portfolio.ctaHeading}
          </h3>
          <Link
            href="/contact"
            className="inline-block bg-accent text-secondary font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-opacity-90 transition-all font-semibold"
          >
            {portfolio.ctaButton}
          </Link>
        </div>
      </div>

      {/* Floating CTA Buttons */}
      <FloatingCTA category="weddings" />
    </div>
  );
}

'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';
import PortfolioLightbox from './PortfolioLightbox';
import PortfolioNav, {
  PORTFOLIO_CATEGORIES,
  type PortfolioCategoryKey,
} from './PortfolioNav';
import FloatingCTA from '../components/FloatingCTA';
import type { PortfolioImage } from '@/types/sanity';
import { useLanguage } from '@/contexts/LanguageContext';
import { t } from '@/lib/translations';

interface PortfolioClientProps {
  allImages: PortfolioImage[];
  categoryDisplayNames: Record<string, string>;
}

const isPortfolioCategory = (value: string): value is PortfolioCategoryKey =>
  PORTFOLIO_CATEGORIES.some((category) => category.key === value);

export default function PortfolioClient({
  allImages,
  categoryDisplayNames,
}: PortfolioClientProps) {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const tr = (obj: { es: string; en: string }) => lang === 'en' ? obj.en : obj.es;

  // Get active category from URL
  const categoryParam = searchParams?.get('category');
  const activeCategory: 'all' | PortfolioCategoryKey =
    categoryParam && isPortfolioCategory(categoryParam) ? categoryParam : 'all';

  // Filter images client-side (instant, no API call)
  const filteredImages =
    activeCategory === 'all'
      ? allImages
      : allImages.filter((image) => image.category === activeCategory);

  return (
    <div className="w-full flex flex-col items-center">
      <PortfolioNav activeCategory={activeCategory} />

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 flex flex-col items-center">
        {/* Show loading state with fade effect when switching categories */}
        <div className="w-full">
          <PortfolioLightbox
            images={filteredImages}
            categoryDisplayNames={categoryDisplayNames}
          />
        </div>

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h3 className="font-serif text-2xl mb-6">
            {tr(t.portfolio.ctaHeading)}
          </h3>
          <Link
            href="/contact"
            className="inline-block bg-accent text-secondary font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-opacity-90 transition-all font-semibold"
          >
            {tr(t.portfolio.ctaButton)}
          </Link>
        </div>
      </div>

      {/* Floating CTA Buttons */}
      <FloatingCTA
        category={activeCategory === 'all' ? undefined : activeCategory}
      />
    </div>
  );
}

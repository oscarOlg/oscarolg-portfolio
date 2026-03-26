'use client';

import Link from "next/link";
import { getVisibleServices } from "@/config/services";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { PORTFOLIO_CATEGORIES, type PortfolioCategoryKey } from "../portfolioConfig";

export { PORTFOLIO_CATEGORIES, type PortfolioCategoryKey };

interface PortfolioNavProps {
  /** Pass "all" for the main /portfolio page, or a category key for subcategory pages */
  activeCategory: "all" | PortfolioCategoryKey;
}

export default function PortfolioNav({ activeCategory }: PortfolioNavProps) {
  const { lang } = useLanguage();
  const tr = (obj: { es: string; en: string }) => lang === 'en' ? obj.en : obj.es;

  const linkClass = (active: boolean) =>
    `font-sans text-xs tracking-widest uppercase pb-1 border-b-2 transition-colors ${
      active
        ? "text-accent border-accent font-semibold"
        : "text-secondary border-transparent hover:text-accent hover:border-accent"
    }`;

  return (
    <nav
      className="sticky top-16 z-40 w-full bg-dominant/85 backdrop-blur-sm shadow-lg border-b border-secondary/10"
      aria-label={tr(t.portfolio.filterAriaLabel)}
    >
      <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-5 md:gap-7 lg:gap-10 px-6 md:px-12 py-4">
        <Link href="/portfolio" className={linkClass(activeCategory === "all")}>
          {tr(t.portfolio.allLabel)}
        </Link>
        {getVisibleServices().map((service) => (
          <Link
            key={service.portfolio_category}
            href={`/portfolio?category=${service.portfolio_category}`}
            className={linkClass(activeCategory === service.portfolio_category)}
          >
            {lang === 'en' ? service.nameEn : service.name}
          </Link>
        ))}
      </div>
    </nav>
  );
}

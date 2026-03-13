import Link from "next/link";
import { getPortfolioImages } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import PortfolioLightbox from "./components/PortfolioLightbox";
import PortfolioNav, {
  PORTFOLIO_CATEGORIES,
  type PortfolioCategoryKey,
} from "./components/PortfolioNav";
import FloatingCTA from "./components/FloatingCTA";

// Map Sanity category names to display names
const categoryDisplayNames: Record<string, string> = Object.fromEntries(
  PORTFOLIO_CATEGORIES.map(({ key, label }) => [key, label])
);

interface PortfolioPageProps {
  searchParams?: Promise<{
    category?: string | string[];
  }> | {
    category?: string | string[];
  };
}

const isPortfolioCategory = (value: string): value is PortfolioCategoryKey =>
  PORTFOLIO_CATEGORIES.some((category) => category.key === value);

export default async function PortfolioPage({ searchParams }: PortfolioPageProps) {
  const portfolioData: PortfolioImage[] = await getPortfolioImages();

  const resolvedSearchParams = await searchParams;

  const categoryParam = Array.isArray(resolvedSearchParams?.category)
    ? resolvedSearchParams?.category[0]
    : resolvedSearchParams?.category;

  const activeCategory: "all" | PortfolioCategoryKey =
    categoryParam && isPortfolioCategory(categoryParam) ? categoryParam : "all";

  const filteredImages =
    activeCategory === "all"
      ? portfolioData
      : portfolioData.filter((image) => image.category === activeCategory);

  return (
    <div className="w-full flex flex-col items-center">

      <PortfolioNav activeCategory={activeCategory} />

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 flex flex-col items-center">

        {/* Portfolio Grid with Lightbox */}
        <PortfolioLightbox
          images={filteredImages}
          categoryDisplayNames={categoryDisplayNames}
        />

        {/* Call to Action */}
        <div className="mt-24 text-center">
          <h3 className="font-serif text-2xl mb-6">¿Listo para crear tus propios recuerdos?</h3>
          <Link
            href="/contact"
            className="inline-block bg-accent text-secondary font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-opacity-90 transition-all font-semibold"
          >
            Consultar Disponibilidad
          </Link>
        </div>
      </div>

      {/* Floating CTA Buttons */}
      <FloatingCTA category={activeCategory === "all" ? undefined : activeCategory} />

    </div>
  );
}
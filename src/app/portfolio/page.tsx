import Image from "next/image";
import Link from "next/link";
import { getPortfolioImages } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import PortfolioLightbox from "./components/PortfolioLightbox";
import PortfolioNav, { PORTFOLIO_CATEGORIES } from "./components/PortfolioNav";
import FloatingCTA from "./components/FloatingCTA";

// Map Sanity category names to display names
const categoryDisplayNames: Record<string, string> = Object.fromEntries(
  PORTFOLIO_CATEGORIES.map(({ key, label }) => [key, label])
);

// Map category keys to route slugs (keys and slugs are identical)
const categoryRouteSlugs: Record<string, string> = Object.fromEntries(
  PORTFOLIO_CATEGORIES.map(({ key }) => [key, key])
);

export default async function PortfolioPage() {
  const portfolioData: PortfolioImage[] = await getPortfolioImages();

  return (
    <div className="w-full flex flex-col items-center">

      <PortfolioNav activeCategory="all" />

      {/* Main Content */}
      <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 flex flex-col items-center">

        {/* Portfolio Grid with Lightbox */}
        <PortfolioLightbox
          images={portfolioData}
          categoryDisplayNames={categoryDisplayNames}
          categoryRouteSlugs={categoryRouteSlugs}
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
      <FloatingCTA />

    </div>
  );
}
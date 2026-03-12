import Image from "next/image";
import Link from "next/link";
import { getPortfolioImages } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import PortfolioLightbox from "./components/PortfolioLightbox";

// Map Sanity category names to display names
const categoryDisplayNames: Record<string, string> = {
  weddings: "Bodas",
  portraits: "Retratos",
  events: "Eventos",
  quinceaneras: "Quinceañeras",
  couples: "Parejas",
  commercial: "Comercial",
  editorial: "Editorial",
  maternity: "Maternidad",
};

// Map display names to route slugs
const categoryRouteSlugs: Record<string, string> = {
  weddings: "weddings",
  portraits: "portraits",
  events: "events", // Note: route is 'events' not 'corporate'
  quinceaneras: "quinceaneras",
  couples: "couples",
  commercial: "commercial",
  editorial: "editorial",
  maternity: "maternity",
};

export default async function PortfolioPage() {
  // Fetch all portfolio images from Sanity
  const portfolioData: PortfolioImage[] = await getPortfolioImages();

  // Get unique categories from the data for navigation
  const categories = Array.from(
    new Set(portfolioData.map((item) => item.category))
  ).sort();

  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 flex flex-col items-center">

      {/* Sub-navigation for Categories */}
      <nav className="flex flex-wrap justify-center gap-6 md:gap-10 text-xs tracking-widest uppercase mb-16 text-gray-500">
        <span className="text-secondary border-b border-accent pb-1 cursor-pointer">Todo</span>
        {categories.map((category) => (
          <Link
            key={category}
            href={`/portfolio/${categoryRouteSlugs[category] || category}`}
            className="hover:text-secondary transition-colors cursor-pointer pb-1"
          >
            {categoryDisplayNames[category] || category}
          </Link>
        ))}
      </nav>

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
  );
}
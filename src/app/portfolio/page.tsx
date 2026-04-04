import { getPortfolioImagesByCategory, getPortfolioImagesByUsage } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import type { Metadata } from "next";
import { Suspense } from "react";
import PortfolioClient from "./components/PortfolioClient";

export const metadata: Metadata = {
  title: 'Portafolio | Fotógrafo de Bodas en Ciudad Juárez',
  description: 'Portafolio editorial de bodas en Ciudad Juárez. Explora historias diseñadas para preservar la conexión de parejas con estilo y narrativa.',
  openGraph: {
    title: 'Portafolio | Fotógrafo de Bodas en Ciudad Juárez',
    description: 'Portafolio editorial de bodas en Ciudad Juárez.',
    url: '/portfolio',
  },
};

// Revalidate portfolio data every 60 seconds
// This enables ISR: page cached for 60s, then revalidated with fresh Sanity data
export const revalidate = 60;

const categoryDisplayNames: Record<string, string> = {
  weddings: 'Bodas',
};

// Loading fallback
function PortfolioLoadingFallback() {
  return (
    <div className="w-full">
      {/* Image grid */}
      <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12">
        <div className="columns-1 md:columns-2 lg:columns-3 gap-6 space-y-6">
          {[...Array(9)].map((_, i) => (
            <div
              key={i}
              className="bg-secondary/10 aspect-[3/4] rounded-sm animate-pulse break-inside-avoid"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default async function PortfolioPage() {
  const portfolioData: PortfolioImage[] = await getPortfolioImagesByUsage('portfolio', 'portfolio_grid');

  // Pass to client component for instant client-side filtering
  // Wrapped in Suspense for useSearchParams() dynamic rendering
  return (
    <Suspense fallback={<PortfolioLoadingFallback />}>
      <PortfolioClient
        allImages={portfolioData}
        categoryDisplayNames={categoryDisplayNames}
      />
    </Suspense>
  );
}
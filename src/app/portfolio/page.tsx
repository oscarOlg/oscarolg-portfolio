import { getPortfolioImages } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import type { Metadata } from "next";
import { Suspense } from "react";
import PortfolioClient from "./components/PortfolioClient";
import {
  PORTFOLIO_CATEGORIES,
} from "./portfolioConfig";

export const metadata: Metadata = {
  title: 'Portafolio',
  description: 'Explora el trabajo fotográfico de Oscar Sanchez en Ciudad Juárez: bodas, retratos, parejas, maternidad, fotografía comercial y editorial.',
  openGraph: {
    title: 'Portafolio | Oscar Sanchez Fotógrafo',
    description: 'Bodas, retratos, parejas, maternidad y más. Fotografía editorial en Ciudad Juárez.',
    url: '/portfolio',
  },
};

// Revalidate portfolio data every 60 seconds
// This enables ISR: page cached for 60s, then revalidated with fresh Sanity data
export const revalidate = 60;

// Map Sanity category names to display names
const categoryDisplayNames: Record<string, string> = Object.fromEntries(
  PORTFOLIO_CATEGORIES.map(({ key, label }) => [key, label])
);

// Loading fallback
function PortfolioLoadingFallback() {
  return (
    <div className="w-full">
      {/* Match PortfolioNav bar to prevent height shift when real nav mounts */}
      <div className="sticky top-16 z-40 w-full bg-dominant/85 backdrop-blur-sm shadow-lg border-b border-secondary/10">
        <div className="max-w-7xl mx-auto flex flex-wrap justify-center gap-5 md:gap-7 lg:gap-10 px-6 md:px-12 py-4">
          {[...Array(7)].map((_, i) => (
            <div key={i} className="h-3.5 w-16 bg-secondary/15 rounded animate-pulse" />
          ))}
        </div>
      </div>
      {/* Image grid */}
      <div className="w-full max-w-7xl mx-auto py-12 px-6 md:px-12">
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
  // Fetch all portfolio images once on the server
  const portfolioData: PortfolioImage[] = await getPortfolioImages();

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
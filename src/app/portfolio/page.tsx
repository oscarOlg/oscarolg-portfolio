import { getPortfolioImages } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import { Suspense } from "react";
import PortfolioClient from "./components/PortfolioClient";
import {
  PORTFOLIO_CATEGORIES,
} from "./components/PortfolioNav";

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
    <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 flex flex-col items-center">
      <div className="columns-1 md:columns-2 lg:columns-3 gap-6 w-full space-y-6">
        {[...Array(6)].map((_, i) => (
          <div
            key={i}
            className="bg-secondary/20 aspect-[3/4] rounded-sm animate-pulse"
          />
        ))}
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
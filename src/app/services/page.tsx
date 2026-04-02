// src/app/services/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesContent from "./ServicesContent";
import { getImageUrl, getServiceConfigByKey, getServicePackagesByCategory, getPortfolioImageBySlug, getPortfolioImagesByCategory } from "@/lib/sanity";

export const metadata: Metadata = {
  title: 'Inversión | Fotógrafo de Bodas en Ciudad Juárez',
  description: 'Paquetes de fotografía de bodas en Ciudad Juárez con inversión clara y cobertura editorial para disfrutar tu día sin estrés.',
  openGraph: {
    title: 'Inversión | Fotógrafo de Bodas en Ciudad Juárez',
    description: 'Servicios de fotografía de boda en Ciudad Juárez con propuesta clara y cobertura elegante.',
    url: '/services',
  },
};

// Revalidate every 60 seconds (ISR with fresh Sanity data)
export const revalidate = 60;

const PACKAGE_IMAGE_SLUG_CANDIDATES: Record<string, string[]> = {
  clasica: ["weddings-dscf8029", "weddings-dscf0232"],
  save_the_date: ["weddings-p-e-8ca09067dscf3244", "weddings-dscf7956"],
};

function ServicesLoadingFallback() {
  return (
    <div className="flex flex-col w-full">
      {/* Subheading + hero */}
      <div className="w-full mb-16 flex flex-col items-center text-center">
        <div className="w-full max-w-4xl px-4 mb-8 space-y-3">
          <div className="h-4 bg-secondary/10 rounded animate-pulse mx-auto max-w-2xl" />
          <div className="h-4 bg-secondary/10 rounded animate-pulse mx-auto max-w-xl" />
        </div>
        <div className="w-full h-64 bg-secondary/10 animate-pulse" />
      </div>
      {/* Service card */}
      <div className="w-full border border-gray-200 shadow-sm">
        <div className="flex justify-center px-8 md:px-12 pt-8 pb-6">
          <div className="w-full md:w-11/12 lg:w-5/6 h-14 bg-secondary/10 animate-pulse rounded-sm" />
        </div>
        <div className="px-8 md:px-12 pb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(3)].map((_, i) => (
              <div key={i} className="min-h-[380px] bg-secondary/10 animate-pulse rounded-sm" />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default async function ServicesPage() {
  const [weddingConfig, weddingPackages, heroImage, weddingImages] = await Promise.all([
    getServiceConfigByKey("weddings"),
    getServicePackagesByCategory("weddings"),
    getPortfolioImageBySlug("weddings-dscf8029"),
    getPortfolioImagesByCategory("weddings"),
  ]);

  if (!weddingConfig) {
    return null;
  }

  const findBySlugCandidates = (candidates: string[]) => {
    const match = weddingImages.find((img) => candidates.includes(img.slug?.current || ""));
    return match ? getImageUrl(match.image, 1200) : "";
  };

  const packageImageOverrides: Record<string, string> = {
    clasica:
      findBySlugCandidates(PACKAGE_IMAGE_SLUG_CANDIDATES.clasica) ||
      (weddingImages[0] ? getImageUrl(weddingImages[0].image, 1200) : ""),
    save_the_date:
      findBySlugCandidates(PACKAGE_IMAGE_SLUG_CANDIDATES.save_the_date) ||
      (weddingImages[1] ? getImageUrl(weddingImages[1].image, 1200) : weddingImages[0] ? getImageUrl(weddingImages[0].image, 1200) : ""),
  };

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 md:px-12">
      <Suspense fallback={<ServicesLoadingFallback />}>
        <ServicesContent
          config={weddingConfig}
          packages={weddingPackages}
          heroImage={heroImage}
          weddingImages={weddingImages}
          packageImageOverrides={packageImageOverrides}
        />
      </Suspense>
    </div>
  );
}

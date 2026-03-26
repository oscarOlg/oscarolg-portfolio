// src/app/services/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesContent from "./ServicesContent";
import ServicesTracker from "@/app/components/ServicesTracker";
import { getServiceConfigs, getServicePackages, getPortfolioImageBySlug, getServiceThumbnails } from "@/lib/sanity";
import { SERVICES, getVisibleServices } from "@/config/services";

export const metadata: Metadata = {
  title: 'Servicios y Precios | Oscar Olg Fotógrafo Juárez',
  description: 'Paquetes fotográficos en Ciudad Juárez: bodas, retratos, parejas, maternidad. Precios claros y transparentes para cada sesión.',
  openGraph: {
    title: 'Servicios y Precios | Oscar Olg Fotógrafo',
    description: 'Paquetes fotográficos. Bodas, retratos, parejas y maternidad en Ciudad Juárez.',
    url: '/services',
  },
};

// Revalidate every 60 seconds (ISR with fresh Sanity data)
export const revalidate = 60;

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
  // Get only visible services for display
  const visibleServices = getVisibleServices();

  // All data fetched in a single parallel batch (was: 2 sequential batches of 3+6 queries)
  const [configs, allPackages, heroImage, serviceImagesByKey] = await Promise.all([
    getServiceConfigs(),
    getServicePackages(),
    getPortfolioImageBySlug("weddings-dscf8029"),
    getServiceThumbnails(visibleServices),
  ]);

  // Group packages by their service category (only visible services)
  const packagesByService: Record<string, typeof allPackages> = {};
  visibleServices.forEach((s) => {
    packagesByService[s.key] = allPackages.filter(
      (p) => p.category === s.key
    );
  });

  // Map configs by serviceKey for quick lookup
  const configByKey = Object.fromEntries(
    configs.map((c) => [c.serviceKey, c])
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-12 px-6 md:px-12">
      <ServicesTracker />
      <Suspense fallback={<ServicesLoadingFallback />}>
        <ServicesContent
          configByKey={configByKey}
          packagesByService={packagesByService}
          heroImage={heroImage}
          serviceImagesByKey={serviceImagesByKey}
        />
      </Suspense>
    </div>
  );
}

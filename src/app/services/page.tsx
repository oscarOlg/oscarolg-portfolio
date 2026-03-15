// src/app/services/page.tsx
import type { Metadata } from "next";
import { Suspense } from "react";
import ServicesContent from "./ServicesContent";
import { getServiceConfigs, getServicePackages, getPortfolioImageBySlug, getPortfolioImagesByCategory } from "@/lib/sanity";
import { SERVICES } from "@/config/services";

export const metadata: Metadata = {
  title: 'Servicios y Precios',
  description: 'Paquetes fotográficos en Ciudad Juárez: bodas, retratos, parejas, maternidad, comercial y editorial. Precios claros y transparentes para cada sesión.',
  openGraph: {
    title: 'Servicios y Precios | Oscar Sanchez Fotógrafo',
    description: 'Paquetes fotográficos en Ciudad Juárez. Bodas, retratos, parejas y más.',
    url: '/services',
  },
};

// Revalidate every 60 seconds (ISR with fresh Sanity data)
export const revalidate = 60;

export default async function ServicesPage() {
  // Fetch configs, packages, and hero image in parallel
  const [configs, allPackages, heroImage] = await Promise.all([
    getServiceConfigs(),
    getServicePackages(),
    getPortfolioImageBySlug("weddings-dscf8029"),
  ]);

  // Fetch featured images for each service category in parallel
  const serviceImagesPromises = SERVICES.map((service) =>
    getPortfolioImagesByCategory(service.portfolio_category).then((images) => ({
      serviceKey: service.key,
      image: images[0] || null, // Get first image as featured
    }))
  );

  const serviceImagesResults = await Promise.all(serviceImagesPromises);
  const serviceImagesByKey = Object.fromEntries(
    serviceImagesResults.map((result) => [result.serviceKey, result.image])
  );

  // Group packages by their service category
  const packagesByService: Record<string, typeof allPackages> = {};
  SERVICES.forEach((s) => {
    packagesByService[s.key] = allPackages.filter(
      (p) => p.category === s.key
    );
  });

  // Map configs by serviceKey for quick lookup
  const configByKey = Object.fromEntries(
    configs.map((c) => [c.serviceKey, c])
  );

  return (
    <div className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12">
      <Suspense
        fallback={
          <div className="text-center py-20 text-gray-500 font-sans tracking-widest uppercase text-sm">
            Cargando paquetes...
          </div>
        }
      >
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

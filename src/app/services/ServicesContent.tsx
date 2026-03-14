// src/app/services/ServicesContent.tsx
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import AccordionItem from "./components/AccordionItem";
import ServicePackageTemplate from "./components/ServicePackageTemplate";
import { SERVICES, type ServiceKey } from "@/config/services";
import { getImageUrl } from "@/lib/sanity";
import type { ServiceConfig, ServicePackage, PortfolioImage } from "@/types/sanity";

interface Props {
  configByKey: Record<string, ServiceConfig>;
  packagesByService: Record<string, ServicePackage[]>;
  heroImage: PortfolioImage | null;
}

export default function ServicesContent({ configByKey, packagesByService, heroImage }: Props) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const router = useRouter();
  const pathname = usePathname();

  const isValidTab = (tab: string | null): tab is ServiceKey =>
    SERVICES.some((s) => s.key === tab);

  const openTab: ServiceKey | null = isValidTab(tabParam) ? tabParam : null;

  const toggleTab = (tabId: string) => {
    if (openTab === tabId) {
      router.replace(pathname, { scroll: false });
    } else {
      router.replace(`${pathname}?tab=${tabId}`, { scroll: false });
    }
  };

  const heroImageUrl = heroImage ? getImageUrl(heroImage.image, 1200) : null;

  return (
    <div className="flex flex-col w-full">
      {/* ── Header visual ── */}
      <div className="w-full mb-16 flex flex-col items-center text-center">
        <p className="font-sans text-base md:text-lg text-gray-600 max-w-4xl leading-relaxed mb-8 px-4">
          Memorias visuales pensadas para perdurar. Selecciona el tipo de sesión o cobertura que buscas para descubrir los detalles, inclusiones y el valor de tu inversión.
        </p>
        <div className="relative w-full h-64 shadow-sm overflow-hidden rounded-none">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={heroImage?.title || "Detalle de fotografía elegante"}
              fill
              className="object-cover transition-all duration-700"
              priority
            />
          ) : (
            <div className="w-full h-full bg-gray-100" />
          )}
        </div>
      </div>

      {/* ── Accordeones (generados desde Sanity) ── */}
      <div className="flex flex-col gap-6 w-full">
        {SERVICES.map((service) => {
          const config = configByKey[service.key];
          const packages = packagesByService[service.key] ?? [];

          // If this service hasn't been configured in Sanity yet, skip it
          if (!config) return null;

          return (
            <AccordionItem
              key={service.key}
              id={service.key}
              title={service.name}
              isOpen={openTab === service.key}
              onToggle={toggleTab}
            >
              <ServicePackageTemplate config={config} packages={packages} />
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
}

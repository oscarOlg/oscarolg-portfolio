// src/app/services/ServicesContent.tsx
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import ServicePackageTemplate from "./components/ServicePackageTemplate";
import { SERVICES, type ServiceKey } from "@/config/services";
import { getImageUrl } from "@/lib/sanity";
import type { ServiceConfig, ServicePackage, PortfolioImage } from "@/types/sanity";

interface Props {
  configByKey: Record<string, ServiceConfig>;
  packagesByService: Record<string, ServicePackage[]>;
  heroImage: PortfolioImage | null;
  serviceImagesByKey: Record<string, PortfolioImage | null>;
}

export default function ServicesContent({ configByKey, packagesByService, heroImage, serviceImagesByKey }: Props) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isValidTab = (tab: string | null): tab is ServiceKey =>
    SERVICES.some((s) => s.key === tab);

  const selectedService: ServiceKey = isValidTab(tabParam) ? tabParam : "weddings";
  const selectedServiceName = SERVICES.find((s) => s.key === selectedService)?.name || "Bodas";

  const handleSelectService = (serviceKey: ServiceKey) => {
    const scrollY = window.scrollY;
    router.replace(`${pathname}?tab=${serviceKey}`, { scroll: false });
    requestAnimationFrame(() => {
      window.scrollTo(0, scrollY);
    });
    setIsDropdownOpen(false);
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const config = configByKey[selectedService];
  const packages = packagesByService[selectedService] ?? [];
  const heroImageUrl = heroImage ? getImageUrl(heroImage.image, 1200) : null;
  const selectedServiceImage = serviceImagesByKey[selectedService];
  const selectedServiceImageUrl = selectedServiceImage ? getImageUrl(selectedServiceImage.image, 600) : null;

  if (!config) return null;

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

      {/* ── Service Content Card ── */}
      <div className="w-full bg-dominant border border-gray-300 shadow-sm">
        {/* ── Service Selector Dropdown (Inside Card) ── */}
        <div className="flex justify-center px-8 md:px-12 pt-8">
          <div ref={dropdownRef} className="relative w-full md:w-11/12 lg:w-5/6">
            <button
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center px-6 py-4 bg-dominant border-2 border-gray-300 text-secondary font-serif text-lg font-bold hover:border-accent transition-all duration-200 cursor-pointer"
            >
              <span>
                {selectedServiceName}
              </span>
              <div className="flex items-center gap-2">
                <span className="font-sans text-xs text-gray-400 italic whitespace-nowrap">
                  Haz click para cambiar
                </span>
                <span className={`transition-all duration-300 text-base font-bold ${isDropdownOpen ? "rotate-180 scale-110" : "rotate-0"}`}>
                  ▼
                </span>
              </div>
            </button>

            {/* Dropdown Menu with Thumbnails */}
            <AnimatePresence>
              {isDropdownOpen && (
                <motion.div
                  className="absolute top-full left-0 right-0 mt-1 bg-dominant backdrop-blur-sm border-2 border-gray-300 border-t-0 shadow-lg z-10 rounded-b-sm overflow-hidden"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                >
                  {SERVICES.map((service, idx) => {
                    const serviceImage = serviceImagesByKey[service.key];
                    const serviceImageUrl = serviceImage ? getImageUrl(serviceImage.image, 80) : null;
                    
                    return (
                      <motion.button
                        key={service.key}
                        onClick={() => handleSelectService(service.key as ServiceKey)}
                        className={`w-full flex items-center gap-3 text-left px-6 py-3 font-serif text-base transition-all duration-150 cursor-pointer ${
                          selectedService === service.key
                            ? "bg-secondary text-dominant font-bold shadow-sm"
                            : "text-secondary hover:bg-gray-100 hover:shadow-sm"
                        } ${idx < SERVICES.length - 1 ? "border-b border-gray-300" : ""}`}
                        whileHover={{ backgroundColor: selectedService === service.key ? undefined : "rgb(243, 244, 246)" }}
                      >
                        {serviceImageUrl && (
                          <div className="relative w-12 h-12 flex-shrink-0 border border-gray-300 overflow-hidden rounded-sm group-hover:shadow-md transition-shadow">
                            <Image
                              src={serviceImageUrl}
                              alt={service.name}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        )}
                        <span className="flex-grow font-medium">{service.name}</span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Packages Grid ── */}
        <div className="px-8 md:px-12 pb-8">
          <ServicePackageTemplate config={config} packages={packages} />
        </div>
      </div>
    </div>
  );
}

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
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

interface Props {
  configByKey: Record<string, ServiceConfig>;
  packagesByService: Record<string, ServicePackage[]>;
  heroImage: PortfolioImage | null;
  serviceImagesByKey: Record<string, PortfolioImage | null>;
}

function ChevronIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width="14"
      height="8"
      viewBox="0 0 14 8"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <path
        d="M1 1L7 7L13 1"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </motion.svg>
  );
}

export default function ServicesContent({ configByKey, packagesByService, heroImage, serviceImagesByKey }: Props) {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const router = useRouter();
  const pathname = usePathname();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const { lang } = useLanguage();
  const tr = (obj: { es: string; en: string }) => lang === 'en' ? obj.en : obj.es;

  const isValidTab = (tab: string | null): tab is ServiceKey =>
    SERVICES.some((s) => s.key === tab);

  const selectedService: ServiceKey = isValidTab(tabParam) ? tabParam : "weddings";
  const selectedServiceObj = SERVICES.find((s) => s.key === selectedService);
  const selectedServiceName = selectedServiceObj
    ? (lang === 'en' ? selectedServiceObj.nameEn : selectedServiceObj.name)
    : "Bodas";

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

  if (!config) return null;

  return (
    <div className="flex flex-col w-full">
      {/* ── Header visual ── */}
      <div className="w-full mb-16 flex flex-col items-center text-center">
        <p className="font-sans text-base md:text-lg text-gray-600 max-w-4xl leading-relaxed mb-8 px-4">
          {tr(t.services.subheading)}
        </p>
        <div className="relative w-full h-64 shadow-sm overflow-hidden rounded-none">
          {heroImageUrl ? (
            <Image
              src={heroImageUrl}
              alt={heroImage?.title || tr(t.services.heroAlt)}
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
            <motion.button
              key={selectedService}
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              className="w-full flex justify-between items-center px-6 py-4 bg-dominant border-2 border-gray-300 text-secondary font-serif text-lg font-bold hover:border-accent transition-all duration-200 cursor-pointer"
              initial={{ scale: 0.98, opacity: 0.9 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <span>
                {selectedServiceName}
              </span>
              <div className="flex items-center">
                <ChevronIcon isOpen={isDropdownOpen} />
              </div>
            </motion.button>

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
                        initial={{ opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.045, duration: 0.18, ease: "easeOut" }}
                      >
                        {serviceImageUrl && (
                          <div className="relative w-12 h-12 flex-shrink-0 border border-gray-300 overflow-hidden rounded-sm group-hover:shadow-md transition-shadow">
                            <Image
                              src={serviceImageUrl}
                              alt={lang === 'en' ? service.nameEn : service.name}
                              fill
                              className="object-cover object-top"
                            />
                          </div>
                        )}
                        <span className="flex-grow font-medium">
                          {lang === 'en' ? service.nameEn : service.name}
                        </span>
                      </motion.button>
                    );
                  })}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>

        {/* ── Packages Grid ── */}
        <AnimatePresence mode="sync">
          <motion.div
            key={selectedService}
            className="px-8 md:px-12 pb-8"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
          >
            <ServicePackageTemplate config={config} packages={packages} />
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}

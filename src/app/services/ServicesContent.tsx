// src/app/services/ServicesContent.tsx
"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";

import ServicePackageTemplate from "./components/ServicePackageTemplate";
import { HeroCard } from "./components/HeroCard";
import { ExpandableSection } from "./components/ExpandableSection";
import { SERVICES, getVisibleServices, type ServiceKey } from "@/config/services";
import { getImageUrl } from "@/lib/sanity";
import type { ServiceConfig, ServicePackage, PortfolioImage } from "@/types/sanity";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";
import { usePrimaryPromo } from "@/hooks/usePromotions";
import { PromoHeaderBanner, PromoCard } from "@/app/components/PromoCard";

interface Props {
  configByKey: Record<string, ServiceConfig>;
  packagesByService: Record<string, ServicePackage[]>;
  heroImage: PortfolioImage | null;
  serviceImagesByKey: Record<string, PortfolioImage | null>;
}

export default function ServicesContent({ configByKey, packagesByService, heroImage, serviceImagesByKey }: Props) {
  const [expandedService, setExpandedService] = useState<ServiceKey | null>("portrait");
  const { lang } = useLanguage();
  const tr = (obj: { es: string; en: string }) => lang === 'en' ? obj.en : obj.es;

  const visibleServices = getVisibleServices();

  // Get active promotions for each service
  const portraitPromo = usePrimaryPromo({ 
    service: 'portraits',
    displayOn: 'services'
  });
  const weddingPromo = usePrimaryPromo({ 
    service: 'weddings',
    displayOn: 'services'
  });

  // Auto-collapse other services when expanding one
  const handleServiceExpand = (serviceKey: ServiceKey) => {
    setExpandedService(expandedService === serviceKey ? null : serviceKey);
  };

  const heroImageUrl = heroImage ? getImageUrl(heroImage.image, 1200) : null;

  return (
    <div className="flex flex-col w-full">
      {/* ── PROMOTIONS HEADER ── */}
      {(portraitPromo || weddingPromo) && (
        <div className="w-full mb-8">
          {portraitPromo && expandedService === 'portrait' && (
            <PromoHeaderBanner 
              promo={portraitPromo}
              onClick={() => {
                document.getElementById('services-container')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}
          {weddingPromo && expandedService === 'wedding' && (
            <PromoHeaderBanner 
              promo={weddingPromo}
              onClick={() => {
                document.getElementById('services-container')?.scrollIntoView({ behavior: 'smooth' });
              }}
            />
          )}
        </div>
      )}

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

      {/* ── MAIN SERVICES CONTAINER ── */}
      <div className="w-full bg-dominant border border-gray-300 shadow-sm">
        {/* ── HERO CARDS: Service Selection ── */}
        <div className="p-8 md:p-12 border-b border-gray-300">
          <div className="mb-8 text-center">
            <h2 className="font-serif text-3xl md:text-4xl font-bold text-secondary mb-2">
              {lang === 'en' ? 'Choose Your Perfect Moment' : 'Elige Tu Momento Perfecto'}
            </h2>
            <p className="font-sans text-gray-600 text-base">
              {lang === 'en' ? 'Click to see packages and pricing' : 'Haz clic para ver paquetes y precios'}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6" id="services-container">
            {visibleServices.map((service) => {
              const isExpanded = expandedService === service.key;
              const icon = service.key === 'portrait' ? '📸' : '💍';
              const serviceName = lang === 'en' ? service.nameEn : service.name;

              return (
                <HeroCard
                  key={service.key}
                  title={serviceName}
                  icon={icon}
                  isExpanded={isExpanded}
                  onClick={() => handleServiceExpand(service.key as ServiceKey)}
                >
                  {isExpanded ? null : <span className="text-sm text-gray-500">{lang === 'en' ? 'Click to expand' : 'Haz clic para expandir'}</span>}
                </HeroCard>
              );
            })}
          </div>
        </div>

        {/* ── DYNAMIC CONTENT CONTAINER: Packages Display ── */}
        <div className="p-8 md:p-12">
          <AnimatePresence mode="wait">
            {expandedService && configByKey[expandedService] && (
              <motion.div
                key={expandedService}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3, ease: "easeOut" }}
              >
                {/* Promo Header for this service */}
                {expandedService === 'portrait' && portraitPromo && (
                  <div className="mb-8">
                    <PromoHeaderBanner 
                      promo={portraitPromo}
                      onClick={() => {
                        const contactLink = document.querySelector('a[href="/contact"]') as HTMLAnchorElement;
                        contactLink?.click();
                      }}
                    />
                  </div>
                )}
                {expandedService === 'wedding' && weddingPromo && (
                  <div className="mb-8">
                    <PromoHeaderBanner 
                      promo={weddingPromo}
                      onClick={() => {
                        const contactLink = document.querySelector('a[href="/contact"]') as HTMLAnchorElement;
                        contactLink?.click();
                      }}
                    />
                  </div>
                )}

                {/* Packages for selected service */}
                <ServicePackageTemplate 
                  config={configByKey[expandedService]} 
                  packages={packagesByService[expandedService] ?? []} 
                />

                {/* Promo Card for this service */}
                {expandedService === 'portrait' && portraitPromo && (
                  <div className="mt-8">
                    <PromoCard promo={portraitPromo} />
                  </div>
                )}
                {expandedService === 'wedding' && weddingPromo && (
                  <div className="mt-8">
                    <PromoCard promo={weddingPromo} />
                  </div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}

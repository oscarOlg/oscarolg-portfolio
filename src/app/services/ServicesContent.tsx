// src/app/services/ServicesContent.tsx
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Image from "next/image";

import AccordionItem from "./components/AccordionItem"; 
import WeddingPackages from "./components/WeddingPackages";
import IndividualPackages from "./components/IndividualPackages";
import CouplePackages from "./components/CouplePackages";
import MaternityPackages from "./components/MaternityPackages";
import CommercialPackages from "./components/CommercialPackages";
import EditorialPackages from "./components/EditorialPackages";

// 1. Enum actualizado con los nuevos tabs
export enum ServiceTab {
  WEDDINGS = "weddings",
  MATERNITY = "maternity",
  PORTRAIT = "portrait",
  COUPLE = "couple",
  COMMERCIAL = "commercial",
  EDITORIAL = "editorial"
}

export default function ServicesContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const router = useRouter();
  const pathname = usePathname();
  
  const isValidTab = (tab: string | null): tab is ServiceTab => {
    return Object.values(ServiceTab).includes(tab as ServiceTab);
  };

  const [openTab, setOpenTab] = useState<ServiceTab | null>(
    isValidTab(tabParam) ? tabParam : ServiceTab.WEDDINGS
  );

  useEffect(() => {
    if (isValidTab(tabParam)) {
      setOpenTab(tabParam);
    }
  }, [tabParam]);

  const toggleTab = (tabId: string) => {
    const selectedTab = tabId as ServiceTab;
    if (openTab === selectedTab) {
      setOpenTab(null);
      router.replace(pathname, { scroll: false });
    } else {
      setOpenTab(selectedTab);
      router.replace(`${pathname}?tab=${selectedTab}`, { scroll: false });
    }
  };

  return (
    <div className="flex flex-col w-full">
      
      {/* ======================= HEADER VISUAL ======================= */}
      <div className="w-full mb-16 flex flex-col items-center text-center">
        <p className="font-sans text-base md:text-lg text-gray-600 max-w-4xl leading-relaxed mb-8 px-4">
          Memorias visuales pensadas para perdurar. Selecciona el tipo de sesión o cobertura que buscas para descubrir los detalles, inclusiones y el valor de tu inversión.
        </p>
        <div className="relative w-full h-64 shadow-sm overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=2070&auto=format&fit=crop" 
            alt="Detalle de fotografía elegante" 
            fill 
            className="object-cover grayscale transition-all duration-700"
          />
        </div>
      </div>

      {/* ======================= ACORDEONES ======================= */}
      <div className="flex flex-col gap-6 w-full">
        
        <AccordionItem 
          id={ServiceTab.WEDDINGS} 
          title="Bodas" 
          isOpen={openTab === ServiceTab.WEDDINGS} 
          onToggle={toggleTab}
        >
          <WeddingPackages />
        </AccordionItem>

        <AccordionItem 
          id={ServiceTab.PORTRAIT} 
          title="Retratos" 
          isOpen={openTab === ServiceTab.PORTRAIT} 
          onToggle={toggleTab}
        >
          <IndividualPackages />
        </AccordionItem>

        <AccordionItem 
          id={ServiceTab.COUPLE} 
          title="Retrato de Pareja" 
          isOpen={openTab === ServiceTab.COUPLE} 
          onToggle={toggleTab}
        >
          <CouplePackages />
        </AccordionItem>

        <AccordionItem 
          id={ServiceTab.MATERNITY} 
          title="Maternidad" 
          isOpen={openTab === ServiceTab.MATERNITY} 
          onToggle={toggleTab}
        >
          <MaternityPackages />
        </AccordionItem>

        <AccordionItem 
          id={ServiceTab.COMMERCIAL} 
          title="Comercial y Branding" 
          isOpen={openTab === ServiceTab.COMMERCIAL} 
          onToggle={toggleTab}
        >
          <CommercialPackages />
        </AccordionItem>

        <AccordionItem 
          id={ServiceTab.EDITORIAL} 
          title="Moda y Editorial" 
          isOpen={openTab === ServiceTab.EDITORIAL} 
          onToggle={toggleTab}
        >
          <EditorialPackages />
        </AccordionItem>

      </div>
    </div>
  );
}
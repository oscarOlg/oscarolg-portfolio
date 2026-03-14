// src/app/services/ServicesContent.tsx
"use client";

import { useSearchParams, useRouter, usePathname } from "next/navigation";
import Image from "next/image";

import AccordionItem from "./components/AccordionItem";
import { SERVICES, type ServiceKey } from "@/config/services";
import { getServiceComponent } from "@/config/component-registry";

export default function ServicesContent() {
  const searchParams = useSearchParams();
  const tabParam = searchParams.get("tab");
  const router = useRouter();
  const pathname = usePathname();

  const isValidTab = (tab: string | null): tab is ServiceKey => {
    return SERVICES.some((s) => s.key === tab);
  };

  const openTab: ServiceKey | null = isValidTab(tabParam) ? tabParam : "weddings";

  const toggleTab = (tabId: string) => {
    if (openTab === tabId) {
      router.replace(pathname, { scroll: false });
    } else {
      router.replace(`${pathname}?tab=${tabId}`, { scroll: false });
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

      {/* ======================= ACCORDEONS (DYNAMICALLY GENERATED) ======================= */}
      <div className="flex flex-col gap-6 w-full">
        {SERVICES.map((service) => {
          const Component = getServiceComponent(service.component);
          if (!Component) return null;

          return (
            <AccordionItem
              key={service.key}
              id={service.key}
              title={service.name}
              isOpen={openTab === service.key}
              onToggle={toggleTab}
            >
              <Component />
            </AccordionItem>
          );
        })}
      </div>
    </div>
  );
}
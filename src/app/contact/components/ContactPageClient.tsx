"use client";

import React from "react";
import Image from "next/image";
import Link from "next/link";
import type { ServicePackage } from "@/types/sanity";
import { useLanguage, pickLang } from "@/contexts/LanguageContext";
import { 
  CONTACT_CONFIG, 
  SERVICE_LIBRARY, 
  FEATURED_SERVICES,
  getWhatsAppLink 
} from "@/config/contact";

interface ContactPageClientProps {
  packages: ServicePackage[];
  contactImageUrl: string;
}

type ServiceKey = keyof typeof SERVICE_LIBRARY;

export default function ContactPageClient({
  packages,
  contactImageUrl,
}: ContactPageClientProps) {
  const { lang } = useLanguage() as { lang: "es" | "en" };
  const isEn = lang === "en";

  // Get service descriptions based on language
  const serviceDescriptions: Record<ServiceKey, { es: string; en: string }> = {
    portraits: {
      es: 'Retratos individuales, parejas, grupos, XV, maternidad, conceptos',
      en: 'Individual portraits, couples, groups, XV, maternity, concepts',
    },
    weddings: {
      es: 'Cobertura de bodas, sesiones de compromiso, paquetes completos',
      en: 'Wedding coverage, engagement sessions, full-day packages',
    },
    graduation: {
      es: 'Sesiones de graduación',
      en: 'Graduation sessions',
    },
    xvyears: {
      es: 'Sesiones de XV años',
      en: 'XV years celebration sessions',
    },
    couples: {
      es: 'Sesiones de parejas y compromiso',
      en: 'Couple and engagement sessions',
    },
    maternity: {
      es: 'Sesiones de maternidad',
      en: 'Maternity sessions',
    },
    familyholiday: {
      es: 'Retratos familiares para las fiestas',
      en: 'Family holiday portraits',
    },
    consultation: {
      es: 'Consulta general sobre mis servicios',
      en: 'General consultation about my services',
    },
  };

  // Build dynamic service directions from FEATURED_SERVICES
  const serviceDirections = FEATURED_SERVICES.map((serviceKey) => ({
    key: serviceKey as ServiceKey,
    description: isEn 
      ? serviceDescriptions[serviceKey as ServiceKey].en
      : serviceDescriptions[serviceKey as ServiceKey].es,
  }));

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-16 lg:gap-20 py-9 px-4 md:px-8">
      {/* ================= COLUMNA IZQUIERDA: IMAGEN E INFO ================= */}
      <div className="lg:w-5/12 flex flex-col">
        <h1 className="font-serif text-4xl md:text-5xl text-secondary mb-6">
          {isEn ? "Let's Talk" : "Hablemos"}
        </h1>
        <p className="font-sans text-base text-gray-600 leading-relaxed mb-8">
          {isEn
            ? "The best way to connect is through WhatsApp. Choose your service type below and send me a message—I'll respond within 2 hours."
            : "La mejor forma de conectar es por WhatsApp. Elige tu tipo de servicio abajo y envíame un mensaje—responderé en máximo 2 horas."}
        </p>



        {/* Response Time Promise */}
        <div className="bg-secondary/5 border-l-4 border-accent p-4 mb-8 rounded">
          <p className="font-sans text-sm font-semibold text-secondary">
            {isEn ? "📱 Messaging is active" : "📱 Los mensajes están activos"}
          </p>
          <p className="font-sans text-xs text-gray-600 mt-1">
            {isEn
              ? "Response time: typically within 2 hours (Mon-Fri, 9am-7pm Mexico City)"
              : "Tiempo de respuesta: típicamente en 2 horas (Lun-Vie, 9am-7pm hora Juárez)"}
          </p>
        </div>

                {/* Imagen Horizontal (aspect-video) */}
        <div className="relative w-full aspect-video mb-12 shadow-md">
          <Image
            src={contactImageUrl}
            alt="Contact us"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            priority
          />
        </div>
      </div>

      {/* ================= COLUMNA DERECHA: SERVICIO SELECTOR ================= */}
      <div className="lg:w-7/12 flex flex-col gap-8">
        <div>
          <h2 className="font-serif text-2xl md:text-3xl text-secondary mb-6">
            {isEn ? "Choose Your Service" : "Elige Tu Servicio"}
          </h2>
          <p className="font-sans text-sm text-gray-600 mb-4">
            {isEn
              ? "Click the button for your service type to start a conversation:"
              : "Haz clic en el botón de tu servicio para comenzar:"}
          </p>
        </div>

        {/* Service Buttons */}
        <div className="space-y-4">
          {serviceDirections.map((service) => {
            const config = SERVICE_LIBRARY[service.key];
            const whatsappLink = getWhatsAppLink(service.key, lang);

            return (
              <a
                key={service.key}
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex flex-col p-5 bg-white border-2 border-secondary/20 rounded-lg hover:border-accent hover:bg-accent/5 transition-all duration-300 hover:shadow-md"
              >
                <div className="flex items-start gap-4">
                  <span className="text-3xl flex-shrink-0">{config.icon}</span>
                  <div className="flex-grow">
                    <h3 className="font-sans font-bold text-secondary text-lg mb-1 group-hover:text-accent transition-colors">
                      {isEn ? config.labelEn : config.label}
                    </h3>
                    <p className="font-sans text-sm text-gray-600 mb-3">
                      {service.description}
                    </p>
                    <span className="inline-block font-sans text-sm font-semibold text-accent group-hover:translate-x-1 transition-transform">
                      {isEn ? "Send Message →" : "Enviar Mensaje →"}
                    </span>
                  </div>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </div>
  );
}

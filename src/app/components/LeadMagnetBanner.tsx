"use client";

import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { appendUtmToPath } from "@/lib/utm";

const WA_NUMBER = "526562932374";

export default function LeadMagnetBanner() {
  const { lang } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    lang === "en"
      ? "Hi Oscar, I would like to receive the free wedding photography guide."
      : "Hola Oscar, me gustaria recibir la guia gratuita de fotografia de bodas."
  );

  const guideHref = appendUtmToPath("/recursos/guia-bodas", {
    source: "website",
    medium: "homepage",
    campaign: "lead_magnet",
    content: "home_banner",
  });

  return (
    <section className="w-full px-6 md:px-12 py-16 bg-[#f6f3ee] border-y border-accent/30">
      <div className="max-w-5xl mx-auto text-center">
        <p className="font-sans text-xs uppercase tracking-[0.24em] text-secondary/60 mb-3">
          {lang === "en" ? "Free Resource" : "Recurso Gratuito"}
        </p>
        <h3 className="font-serif text-3xl md:text-4xl text-secondary mb-4 leading-tight">
          {lang === "en"
            ? "Wedding Photography Planning Guide"
            : "Guia para Planear tu Fotografia de Boda"}
        </h3>
        <p className="font-sans text-gray-700 max-w-2xl mx-auto mb-8">
          {lang === "en"
            ? "Get the checklist, timeline tips, and key questions to choose your photographer with confidence."
            : "Descarga checklist, timeline y preguntas clave para elegir fotografo con seguridad."}
        </p>

        <div className="flex flex-wrap justify-center gap-4">
          <Link
            href={guideHref}
            className="bg-secondary text-dominant uppercase tracking-widest text-xs md:text-sm px-8 py-4 font-bold hover:bg-accent hover:text-secondary transition-colors"
          >
            {lang === "en" ? "View guide" : "Ver guia"}
          </Link>
          <a
            href={`https://wa.me/${WA_NUMBER}?text=${whatsappMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className="border border-secondary text-secondary uppercase tracking-widest text-xs md:text-sm px-8 py-4 font-bold hover:bg-secondary hover:text-dominant transition-colors"
          >
            {lang === "en" ? "Request by WhatsApp" : "Pedir por WhatsApp"}
          </a>
        </div>
      </div>
    </section>
  );
}
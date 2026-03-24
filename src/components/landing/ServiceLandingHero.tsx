"use client";

import Link from "next/link";
import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ServiceLandingContent } from "@/lib/landing-content";

interface ServiceLandingHeroProps {
  serviceKey: string;
  content: ServiceLandingContent;
  heroImageUrl?: string;
  heroImageAlt: string;
}

export default function ServiceLandingHero({
  serviceKey,
  content,
  heroImageUrl,
  heroImageAlt,
}: ServiceLandingHeroProps) {
  const { lang } = useLanguage();

  const contactUrl = `/contact?service=${serviceKey}`;

  return (
    <section className="relative w-full min-h-[74vh] flex items-center px-6 md:px-12 py-20 overflow-hidden">
      {heroImageUrl ? (
        <div className="absolute inset-0 -z-10">
          <Image src={heroImageUrl} alt={heroImageAlt} fill priority className="object-cover" />
          <div className="absolute inset-0 bg-black/55" />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/35 to-black/20" />
        </div>
      ) : (
        <div className="absolute inset-0 -z-10 bg-gradient-to-br from-secondary via-gray-900 to-black" />
      )}

      <div className="max-w-4xl text-dominant">
        <p className="font-sans uppercase tracking-[0.24em] text-xs md:text-sm text-accent/90 mb-4">
          {lang === "en" ? "Landing page" : "Landing page"}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl leading-tight mb-5 max-w-3xl">
          {content.hero.headline}
        </h1>
        <p className="font-sans text-base md:text-xl text-gray-200 max-w-2xl mb-10">
          {content.hero.subheadline}
        </p>

        <div className="flex flex-wrap gap-4">
          <Link
            href={contactUrl}
            className="bg-accent text-secondary font-sans uppercase tracking-widest text-xs md:text-sm px-8 py-4 font-bold hover:bg-[#d7b66f] transition-colors"
          >
            {content.hero.cta}
          </Link>
          <a
            href="#service-packages"
            className="border border-dominant/70 text-dominant font-sans uppercase tracking-widest text-xs md:text-sm px-8 py-4 hover:bg-dominant hover:text-secondary transition-colors"
          >
            {lang === "en" ? "See pricing" : "Precios y detalles"}
          </a>
        </div>
      </div>
    </section>
  );
}

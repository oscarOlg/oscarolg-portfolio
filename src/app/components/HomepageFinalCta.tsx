"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";

export default function HomepageFinalCta() {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const finalCta = locale.homepage.finalCta;

  const displayHeading = finalCta.heading;
  const displayLocation = finalCta.location;
  const displayButtonText = finalCta.button;

  return (
    <AnimatedSection>
      <section className="w-full bg-accent py-28 px-6 text-center">
        <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-5 max-w-xl mx-auto leading-tight">
          {displayHeading}
        </h2>
        <p className="font-sans text-xs text-secondary/60 uppercase tracking-widest mb-12">
          {displayLocation}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-secondary text-dominant font-sans uppercase tracking-widest text-sm py-4 px-12 hover:bg-white hover:text-secondary transition-all duration-300 font-semibold"
        >
          {displayButtonText}
        </Link>
      </section>
    </AnimatedSection>
  );
}

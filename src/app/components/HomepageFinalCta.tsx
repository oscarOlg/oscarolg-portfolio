"use client";

import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { useLanguage, pickLang } from "@/contexts/LanguageContext";

interface HomepageFinalCtaProps {
  headingEs?: string;
  headingEn?: string;
  locationEs?: string;
  locationEn?: string;
  buttonTextEs?: string;
  buttonTextEn?: string;
}

export default function HomepageFinalCta({
  headingEs = "¿Listo para crear algo hermoso e irrepetible?",
  headingEn,
  locationEs = "Ciudad Juárez & México",
  locationEn,
  buttonTextEs = "Reservar fecha",
  buttonTextEn,
}: HomepageFinalCtaProps) {
  const { lang } = useLanguage();

  const displayHeading = pickLang(lang, headingEs, headingEn) ?? headingEs;
  const displayLocation = pickLang(lang, locationEs, locationEn) ?? locationEs;
  const displayButtonText = pickLang(lang, buttonTextEs, buttonTextEn) ?? buttonTextEs;

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

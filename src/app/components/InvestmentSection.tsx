"use client";

import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import InlineBoldText from "@/app/components/InlineBoldText";

interface Props {
  leftImageUrl?: string;
  rightImageUrl?: string;
}

export default function InvestmentSection({
  leftImageUrl,
  rightImageUrl,
}: Props) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const investment = locale.homepage.investment;

  const displayHeading = investment.heading;
  const displayP1 = investment.paragraph1;
  const displayP2 = investment.paragraph2;
  const displayCta = investment.cta;

  return (
    <section className="w-full max-w-7xl mx-auto py-24 px-6 md:px-12 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center bg-dominant">

      {/* Lado Izquierdo: Mensaje de Valor y CTA */}
      <div className="flex flex-col justify-center">
        <h2 className="font-serif text-4xl md:text-5xl leading-tight mb-8 text-secondary">
          {displayHeading}
        </h2>

        <p className="font-sans text-base md:text-lg leading-relaxed text-gray-700 mb-6">
          <InlineBoldText text={displayP1} />
        </p>

        <p className="font-sans text-base md:text-lg leading-relaxed text-gray-700 mb-10">
          <InlineBoldText text={displayP2} />
        </p>

        <div className="flex flex-col sm:flex-row items-start gap-6">
          <Link
            href="/services"
            className="bg-secondary text-dominant font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-accent hover:-translate-y-1 transition-all duration-300 font-semibold w-full sm:w-auto text-center shadow-sm"
          >
            {displayCta}
          </Link>
        </div>
      </div>

      {/* Lado Derecho: Composición Editorial */}
      <div className="relative w-full aspect-square md:aspect-[4/3] lg:aspect-square flex gap-4 md:gap-6">
        <div className="relative w-1/2 h-[80%] mt-auto shadow-sm overflow-hidden group">
          {leftImageUrl ? (
            <Image
              src={leftImageUrl}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              alt="Fotografía de sesión"
            />
          ) : (
            <div className="w-full h-full bg-secondary/15" />
          )}
        </div>
        <div className="relative w-1/2 h-[90%] shadow-sm overflow-hidden group">
          {rightImageUrl ? (
            <Image
              src={rightImageUrl}
              fill
              className="object-cover object-top group-hover:scale-105 transition-transform duration-700"
              alt="Fotografía de retrato"
            />
          ) : (
            <div className="w-full h-full bg-secondary/10" />
          )}
        </div>
      </div>

    </section>
  );
}

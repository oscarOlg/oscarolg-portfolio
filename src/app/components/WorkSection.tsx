"use client";

import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { SERVICES, getVisibleServices } from "@/config/services";
import { useLanguage } from "@/contexts/LanguageContext";

interface WorkSectionProps {
  categoryCover: Record<string, { imageUrl: string }>;
  headingEs?: string;
  headingEn?: string;
  subtitleEs?: string;
  subtitleEn?: string;
  viewMoreEs?: string;
  viewMoreEn?: string;
  viewAllEs?: string;
  viewAllEn?: string;
}

export default function WorkSection({
  categoryCover,
  headingEs = "Mi Trabajo",
  headingEn,
  subtitleEs = "Explora por tipo de sesión",
  subtitleEn,
  viewMoreEs = "Ver más →",
  viewMoreEn,
  viewAllEs = "Ver todo el portafolio →",
  viewAllEn,
}: WorkSectionProps) {
  const { lang } = useLanguage();

  const displayHeading = (lang === 'en' && headingEn) ? headingEn : headingEs;
  const displaySubtitle = (lang === 'en' && subtitleEn) ? subtitleEn : subtitleEs;
  const displayViewMore = (lang === 'en' && viewMoreEn) ? viewMoreEn : viewMoreEs;
  const displayViewAll = (lang === 'en' && viewAllEn) ? viewAllEn : viewAllEs;

  return (
    <section className="w-full bg-secondary py-24 px-6 md:px-12">
      <AnimatedSection>
        <div className="max-w-7xl mx-auto">
          <h2 className="font-serif text-3xl md:text-4xl text-dominant text-center mb-3">
            {displayHeading}
          </h2>
          <p className="font-sans text-xs text-dominant/60 text-center tracking-widest uppercase mb-16">
            {displaySubtitle}
          </p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {getVisibleServices().map((service, i) => {
              const cover = categoryCover[service.portfolio_category];
              const imgUrl = cover?.imageUrl ?? "";
              const label = lang === 'en' ? service.nameEn : service.name;
              return (
                <AnimatedSection key={service.portfolio_category} delay={i * 0.07}>
                  <Link
                    href={`/portfolio?category=${service.portfolio_category}`}
                    className="group relative block aspect-[3/4] overflow-hidden"
                  >
                    {imgUrl ? (
                      <Image
                        src={imgUrl}
                        alt={label}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/40" />
                    )}
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                      <span className="font-serif text-xl md:text-2xl text-white tracking-wide drop-shadow">
                        {label}
                      </span>
                      <span className="font-sans text-xs text-white/0 group-hover:text-white/80 uppercase tracking-widest translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                        {displayViewMore}
                      </span>
                    </div>
                  </Link>
                </AnimatedSection>
              );
            })}
          </div>
          <div className="text-center mt-14">
            <Link
              href="/portfolio"
              className="font-sans text-xs text-dominant/70 uppercase tracking-widest border-b border-dominant/40 pb-1 hover:text-dominant hover:border-dominant transition-colors"
            >
              {displayViewAll}
            </Link>
          </div>
        </div>
      </AnimatedSection>
    </section>
  );
}

"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import AnimatedSection from "./AnimatedSection";
import { SERVICES } from "@/config/services";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";

interface WeddingGridItem {
  imageUrl: string;
  alt: string;
}

interface WorkSectionProps {
  categoryCover: Record<string, { imageUrl: string }>;
  weddingGallery?: WeddingGridItem[];
}

function fisherYatesShuffle<T>(items: T[]): T[] {
  const result = [...items];

  for (let i = result.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [result[i], result[j]] = [result[j], result[i]];
  }

  return result;
}

export default function WorkSection({
  categoryCover,
  weddingGallery = [],
}: WorkSectionProps) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const work = locale.homepage.work;
  const [shuffledWeddingGallery, setShuffledWeddingGallery] = useState<WeddingGridItem[]>(weddingGallery);

  useEffect(() => {
    if (weddingGallery.length === 0) {
      setShuffledWeddingGallery([]);
      return;
    }

    const shuffled = fisherYatesShuffle(weddingGallery);
    setShuffledWeddingGallery(shuffled);
  }, [weddingGallery]);

  const hasWeddingGallery = shuffledWeddingGallery.length > 0;
  const displayHeading = work.heading;
  const displaySubtitle = work.subtitle;
  const displayViewAll = work.viewAll;

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

          {hasWeddingGallery ? (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {shuffledWeddingGallery.slice(0, 6).map((item, i) => (
                <AnimatedSection key={`${item.imageUrl}-${i}`} delay={i * 0.06}>
                  <Link
                    href="/portfolio"
                    className="group relative block aspect-[4/5] overflow-hidden bg-secondary/30"
                    aria-label={work.viewWeddingAria}
                  >
                    {item.imageUrl ? (
                      <Image
                        src={item.imageUrl}
                        alt={item.alt}
                        fill
                        className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                        sizes="(max-width: 768px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-secondary/40" />
                    )}
                    <div className="absolute inset-0 bg-black/18 group-hover:bg-black/8 transition-colors duration-300" />
                  </Link>
                </AnimatedSection>
              ))}
            </div>
          ) : (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {SERVICES.map((service, i) => {
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
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
          )}

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

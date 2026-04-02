"use client";

import Image from "next/image";
import Link from "next/link";
import packagesData from "@/config/wedding-packages.json";
import type { LeadMagnetConfig } from "@/config/lead-magnets";
import GiveawayLeadForm from "./GiveawayLeadForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";

interface Package {
  id: string;
  name: string;
  subtitle?: string;
  imageUrl: string;
  duration: string;
  description: string;
  features?: string[];
  price: number;
  mostChosen: boolean;
}

interface LandingProps {
  campaign: LeadMagnetConfig;
  heroImageUrl: string;
  aboutImageUrl: string;
  stripImageUrls: string[];
}

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-MX")}`;
}

export default function LandingPageClient({
  campaign,
  heroImageUrl,
  aboutImageUrl,
  stripImageUrls,
}: LandingProps) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const content = (locale.landing as any)?.[campaign.i18nKey];
  const allPackages = packagesData.packages as Package[];
  const featuredPackage = allPackages.find((item) => item.mostChosen) || allPackages[0] || null;

  if (!content) {
    return <div className="w-full text-center py-24">Loading...</div>;
  }

  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="relative h-[28rem] md:h-[36rem] overflow-hidden">
        <Image src={heroImageUrl} alt={content.hero.title} fill className="object-cover" priority />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 py-12 md:py-16 text-dominant">
          <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">{content.hero.eyebrow}</p>
          <h1 className="font-serif text-5xl md:text-7xl leading-tight max-w-4xl">{content.hero.title}</h1>
          <p className="text-sm md:text-base text-gray-200 mt-6 max-w-3xl leading-relaxed">{content.hero.body}</p>
        </div>
      </section>

      {/* About Section */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500 font-semibold mb-4">{content.about.title}</p>
            <h2 className="font-serif text-4xl md:text-5xl text-secondary mb-6">Oscar OLG Photography</h2>
            <p className="font-sans text-gray-700 leading-relaxed text-lg">{content.about.body}</p>
          </div>
          <div className="relative h-[24rem] md:h-[30rem] overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
            <Image src={aboutImageUrl} alt="Oscar photographer portrait" fill className="object-cover" />
          </div>
        </div>
      </section>

      {/* Curated Image Strip */}
      <section className="bg-gray-50 py-16 md:py-24">
        <div className="max-w-7xl mx-auto px-6 md:px-8">
          <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8 text-center">{content.strip.title}</p>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
            {stripImageUrls.slice(0, 6).map((url, index) => (
              <div key={`${url}-${index}`} className="relative aspect-square overflow-hidden rounded-lg">
                <Image src={url} alt={`Moment ${index + 1}`} fill className="object-cover hover:scale-105 transition-transform duration-300" />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Form + Instructions */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* Instructions sidebar */}
          <aside className="border border-gray-200 rounded-xl p-8 bg-gradient-to-b from-white to-gray-50/70 h-fit lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500 font-semibold mb-5">{content.instructions.title}</p>
            <ol className="space-y-4 text-sm text-gray-700 leading-relaxed">
              {content.instructions.items.map((item: string, idx: number) => (
                <li key={idx} className="flex gap-3">
                  <span className="font-serif text-accent flex-shrink-0 mt-0.5">{idx + 1}.</span>
                  <span>{item}</span>
                </li>
              ))}
            </ol>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500 font-semibold mb-4">{content.whatsapp.title}</p>
              <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
                {content.whatsapp.steps.map((step: string) => (
                  <li key={step}>✓ {step}</li>
                ))}
              </ul>
            </div>
          </aside>

          {/* Form */}
          <div>
            <GiveawayLeadForm campaignSlug={campaign.slug} />
          </div>
        </div>
      </section>

      {/* Featured Package */}
      {featuredPackage && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-6 text-center">{content.package.title}</p>
            <div className="border border-gray-200 bg-white overflow-hidden rounded-2xl shadow-lg">
              <div className="grid grid-cols-1 lg:grid-cols-[0.85fr_1.15fr]">
                <div className="relative min-h-[20rem] lg:min-h-full overflow-hidden">
                  <Image
                    src={featuredPackage.imageUrl.includes("[PLACEHOLDER") ? heroImageUrl : featuredPackage.imageUrl}
                    alt={featuredPackage.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-8 md:p-10 flex flex-col">
                  <h3 className="font-serif text-4xl text-secondary leading-tight mb-3">{featuredPackage.name}</h3>
                  {featuredPackage.subtitle && (
                    <p className="font-serif italic text-gray-600 mb-4">{featuredPackage.subtitle}</p>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-6">{featuredPackage.description}</p>
                  <ul className="space-y-2 mb-8">
                    {(featuredPackage.features || []).slice(0, 4).map((item) => (
                      <li key={item} className="text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-6 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-4">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Duracion</p>
                      <p className="font-serif text-lg text-secondary">{featuredPackage.duration}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">Inversion</p>
                      <p className="font-serif text-3xl md:text-4xl text-secondary">MXN {formatPrice(featuredPackage.price)}</p>
                    </div>
                  </div>
                  <Link href="/services" className="mt-6 inline-block bg-secondary text-dominant px-8 py-4 uppercase tracking-widest text-xs font-bold hover:bg-secondary/90 transition-colors w-full text-center">
                    Ver paquete completo
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* Final CTA */}
      <section className="bg-secondary text-dominant py-12 md:py-16">
        <div className="max-w-4xl mx-auto text-center px-6">
          <h2 className="font-serif text-3xl md:text-4xl mb-4">{content.cta.heading}</h2>
          <p className="text-sm md:text-base text-gray-200 mb-6">{content.cta.body}</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/portfolio" className="bg-accent text-secondary px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-accent/90 transition-colors">
              {content.cta.portfolioButton}
            </Link>
            <Link href="/contact" className="border border-dominant text-dominant px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-dominant/10 transition-colors">
              {content.cta.contactButton}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

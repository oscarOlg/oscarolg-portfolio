"use client";

import Image from "next/image";
import Link from "next/link";
import packagesData from "@/config/wedding-packages.json";
import type { LeadMagnetConfig } from "@/config/lead-magnets";
import GiveawayLeadForm from "./GiveawayLeadForm";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import InlineBoldText from "@/app/components/InlineBoldText";

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
  packageImageUrl?: string;
}

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-MX")}`;
}

export default function LandingPageClient({
  campaign,
  heroImageUrl,
  aboutImageUrl,
  stripImageUrls,
  packageImageUrl,
}: LandingProps) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const content = (locale.landing as any)?.[campaign.i18nKey];
  const allPackages = packagesData.packages as Package[];
  const featuredPackage = allPackages.find((item) => item.mostChosen) || allPackages[0] || null;
  const teaserDescription = featuredPackage?.description?.split(".").find((part) => part.trim().length > 0)?.trim();

  if (!content) {
    return <div className="w-full text-center py-24">{locale.landing.loading}</div>;
  }

  return (
    <div className="w-full">
      {/* Hero Section - only render if heroImageUrl exists */}
      {heroImageUrl && (
        <section className="relative h-[28rem] md:h-[36rem] overflow-hidden">
          <Image src={heroImageUrl} alt={content.hero.title} fill className="object-cover" priority />
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 px-6 md:px-10 py-12 md:py-16 text-dominant">
            <p className="text-xs uppercase tracking-[0.2em] text-accent font-semibold mb-3">{content.hero.eyebrow}</p>
            <h1 className="font-serif text-5xl md:text-7xl leading-tight max-w-4xl">{content.hero.title}</h1>
            <p className="text-sm md:text-base text-gray-200 mt-6 max-w-3xl leading-relaxed">{content.hero.body}</p>
          </div>
        </section>
      )}

      {/* About Section - only render if aboutImageUrl exists */}
      {aboutImageUrl && (
        <section className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <p className="text-xs uppercase tracking-[0.18em] text-gray-500 font-semibold mb-4">{content.about.title}</p>
              <h2 className="font-serif text-4xl md:text-5xl text-secondary mb-6">Oscar Olg Photography</h2>
              <p className="font-sans text-gray-700 leading-relaxed text-lg">{content.about.body}</p>
            </div>
            <div className="relative aspect-[4/5] w-full max-w-md mx-auto lg:mx-0 lg:justify-self-end overflow-hidden rounded-2xl border border-gray-200 shadow-lg">
              <Image src={aboutImageUrl} alt={content.about.imageAlt} fill className="object-cover object-top" />
            </div>
          </div>
        </section>
      )}

      {/* Curated Image Strip - only render if stripImageUrls exist */}
      {stripImageUrls.length > 0 && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-7xl mx-auto px-6 md:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-8 text-center">{content.strip.title}</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {stripImageUrls.slice(0, 4).map((url, index) => (
                <div key={`${url}-${index}`} className="group relative block aspect-[4/5] overflow-hidden bg-secondary/20 rounded-sm">
                  <Image
                    src={url}
                    alt={`${content.strip.momentAltPrefix} ${index + 1}`}
                    fill
                    className="object-cover object-top transition-transform duration-700 group-hover:scale-[1.04]"
                    sizes="(max-width: 768px) 50vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-black/18 group-hover:bg-black/8 transition-colors duration-300" />
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* Main Form + Instructions */}
      <section className="max-w-6xl mx-auto px-6 md:px-8 py-16 md:py-24">
        <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-10 items-start">
          {/* Instructions sidebar */}
          <aside className="min-w-0 border border-gray-200 rounded-xl p-8 bg-gradient-to-b from-white to-gray-50/70 h-fit lg:sticky lg:top-24">
            <div className="border border-accent/40 bg-accent/10 p-5 md:p-6 rounded-lg mb-8">
              <p className="font-serif text-2xl md:text-3xl text-secondary leading-tight mb-2">
                {content.form.preTitle}
              </p>
              <p className="font-sans text-xs uppercase tracking-[0.16em] text-secondary/80 mb-4">
                {content.form.preValue}
              </p>
              <p className="text-sm text-secondary leading-relaxed">
                <InlineBoldText text={content.form.intro} />
              </p>
            </div>

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
          <div className="min-w-0">
            <GiveawayLeadForm campaignSlug={campaign.slug} />
          </div>
        </div>
      </section>

      {/* Featured Package - only render if packageImageUrl exists */}
      {featuredPackage && packageImageUrl && (
        <section className="bg-gray-50 py-16 md:py-24">
          <div className="max-w-6xl mx-auto px-6 md:px-8">
            <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-6 text-center">{content.package.title}</p>
            <div className="max-w-4xl mx-auto border border-gray-200 bg-white overflow-hidden rounded-2xl shadow-lg">
              <div className="grid grid-cols-1 md:grid-cols-[0.78fr_1.22fr]">
                <div className="relative aspect-[4/5] md:aspect-auto md:min-h-[16rem] overflow-hidden">
                  <Image
                    src={packageImageUrl}
                    alt={featuredPackage.name}
                    fill
                    className="object-cover object-top"
                  />
                </div>
                <div className="p-5 md:p-6">
                  <h3 className="font-serif text-2xl md:text-3xl text-secondary leading-tight mb-1">{featuredPackage.name}</h3>
                  {featuredPackage.subtitle && (
                    <p className="font-serif italic text-gray-600 text-sm md:text-base mb-2">{featuredPackage.subtitle}</p>
                  )}
                  <p className="text-gray-700 leading-relaxed mb-4 text-sm">
                    {teaserDescription ? `${teaserDescription}.` : featuredPackage.description}
                  </p>
                  <ul className="space-y-1.5 mb-4">
                    {(featuredPackage.features || []).slice(0, 2).map((item) => (
                      <li key={item} className="text-xs md:text-sm text-gray-700 flex items-start gap-2">
                        <span className="text-accent mt-1">•</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="pt-4 border-t border-gray-200 flex flex-col sm:flex-row items-start sm:items-end justify-between gap-3">
                    <div>
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{content.package.durationLabel}</p>
                      <p className="font-serif text-sm md:text-base text-secondary">{featuredPackage.duration}</p>
                    </div>
                    <div className="text-left sm:text-right">
                      <p className="text-xs uppercase tracking-widest text-gray-500 mb-1">{content.package.investmentLabel}</p>
                      <p className="font-serif text-xl md:text-2xl text-secondary">MXN {formatPrice(featuredPackage.price)}</p>
                    </div>
                  </div>
                  <Link href="/services" className="mt-4 inline-block bg-secondary text-dominant px-6 py-3 uppercase tracking-widest text-[11px] font-bold hover:bg-secondary/90 transition-colors w-full text-center">
                    {content.package.viewPackageCta}
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

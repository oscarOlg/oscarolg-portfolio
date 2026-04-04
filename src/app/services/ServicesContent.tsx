// src/app/services/ServicesContent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import { getImageUrl } from "@/lib/sanity";
import type { ServiceConfig, ServicePackage, PortfolioImage } from "@/types/sanity";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import InlineBoldText from "@/app/components/InlineBoldText";
import { useScrollTracking } from "@/lib/analytics";
import packagesData from "@/config/wedding-packages.json";

interface Props {
  config: ServiceConfig;
  packages: ServicePackage[];
  heroImage: PortfolioImage | null;
  weddingImages: PortfolioImage[];
  packageImageOverrides?: Record<string, string>;
}

interface Package {
  id: string;
  order: number;
  name: string;
  nameEn: string;
  subtitle?: string;
  subtitleEn?: string;
  imageUrl: string;
  duration: string;
  durationEn: string;
  targetAudience?: string;
  targetAudienceEn?: string;
  promise?: string;
  promiseEn?: string;
  features?: string[];
  featuresEn?: string[];
  bonuses?: string[];
  bonusesEn?: string[];
  positioning: string;
  positioningEn: string;
  description: string;
  descriptionEn: string;
  price: number;
  mostChosen: boolean;
}

interface AddOn {
  id: string;
  name: string;
  nameEn: string;
  price: number;
  description: string;
  descriptionEn: string;
}

function formatPrice(price: number) {
  return "$" + price.toLocaleString("es-MX");
}

export default function ServicesContent({
  config,
  packages,
  heroImage,
  weddingImages,
  packageImageOverrides,
}: Props) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);

  // Track services page scroll engagement
  useScrollTracking("services_page");

  type LocalizedTestimonial = {
    author: string;
    text: string;
    highlight: string;
    imageAlt: string;
  };

  type LocalizedFaq = {
    question: string;
    answer: string;
  };

  const services = locale.services as Record<string, unknown>;
  const heroImageUrl = heroImage ? getImageUrl(heroImage.image, 1200) : null;
  const galleryTop = weddingImages.filter((img) => img.usageSection === "curated-top").slice(0, 6);

  const testimonials = locale.testimonials as LocalizedTestimonial[];
  const ketzia = testimonials.find((item) => /Ketzia/i.test(item.author));
  const testimonialImage = weddingImages.find((img) => img.usageSection === "testimonial-proof") || null;

  const pricingFaqs = (services.pricingFaqs as LocalizedFaq[] | undefined) ?? [];

  // Get packages data
  const allPackages = (packagesData.packages as Package[]).sort((a, b) => a.order - b.order);
  const featuredPackage = allPackages.find((pkg) => pkg.mostChosen) || allPackages[0] || null;
  const addOns = ((packagesData.addOns as AddOn[]) || []).filter(
    (addon) => addon.id !== "save-the-date" && addon.id !== "save_the_date"
  );

  const getFeaturedPackageData = () => {
    if (!featuredPackage) return null;
    const name = lang === "en" ? featuredPackage.nameEn : featuredPackage.name;
    const subtitle = lang === "en" ? featuredPackage.subtitleEn : featuredPackage.subtitle;
    const targetAudience =
      (lang === "en" ? featuredPackage.targetAudienceEn : featuredPackage.targetAudience) ||
      (lang === "en" ? featuredPackage.positioningEn : featuredPackage.positioning);
    const promise =
      (lang === "en" ? featuredPackage.promiseEn : featuredPackage.promise) ||
      (lang === "en" ? featuredPackage.descriptionEn : featuredPackage.description);
    const duration = lang === "en" ? featuredPackage.durationEn : featuredPackage.duration;
    const features = (lang === "en" ? featuredPackage.featuresEn : featuredPackage.features) || [];
    const bonuses = (lang === "en" ? featuredPackage.bonusesEn : featuredPackage.bonuses) || [];
    const displayImageUrl = packageImageOverrides?.[featuredPackage.id] || (featuredPackage.imageUrl.includes("[PLACEHOLDER") ? "" : featuredPackage.imageUrl);

    return { name, subtitle, targetAudience, promise, duration, features, bonuses, displayImageUrl };
  };

  const featuredData = getFeaturedPackageData();
  const labels = (services.packages || {}) as Record<string, string>;

  return (
    <div className="flex flex-col w-full">
      {/* ── 1. GALLERY (HERO) ── */}
      {galleryTop.length > 0 && (
        <section className="w-full">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 h-[22rem] md:h-[30rem] px-0">
            <div className="relative col-span-2 row-span-2">
              {galleryTop[0] && (
                <Image
                  src={getImageUrl(galleryTop[0].image, 1200)}
                  alt={galleryTop[0].title || String(services.galleryAltStory || "")}
                  fill
                  className="object-cover"
                  priority
                />
              )}
            </div>
            {galleryTop.slice(1, 5).map((img) => (
              <div key={img._id} className="relative">
                <Image
                  src={getImageUrl(img.image, 800)}
                  alt={img.title || String(services.galleryAltFrame || "")}
                  fill
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>
      )}

      {/* ── 2. MAIN PROMISE & STORY ── */}
      <section className="w-full pt-10 md:pt-16 pb-16 md:pb-20 max-w-5xl mx-auto px-4 md:px-8">
        <h1 className="font-serif text-6xl md:text-7xl text-secondary text-center mb-12 leading-tight">
          <InlineBoldText text={String(services.mainPromise || "")} boldClassName="font-semibold text-secondary" />
        </h1>
        
        <div className="font-sans text-lg md:text-xl text-gray-700 leading-8 space-y-6 max-w-4xl mx-auto">
          {String(services.oscarStory || "").split('\n\n').map((paragraph, idx) => (
            <p key={idx}><InlineBoldText text={paragraph} boldClassName="font-semibold text-secondary" /></p>
          ))}
        </div>
      </section>

      {/* ── 3. MOST POPULAR PACKAGE SECTION - HERO BACKGROUND ── */}
      {featuredData && (
        <section 
          className="w-full py-20 md:py-28 relative overflow-hidden"
          style={{
            backgroundImage: featuredData.displayImageUrl 
              ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('${featuredData.displayImageUrl}')`
              : 'linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5))',
            backgroundSize: 'cover',
            backgroundPosition: 'center 25%',
            backgroundAttachment: 'fixed'
          }}
        >
          <div className="max-w-4xl mx-auto px-4 md:px-8 relative z-10">
            {/* Section Heading */}
            <h2 className="font-serif text-4xl md:text-5xl text-dominant mb-6">
              {String(services.collectionsTitle || "")}
            </h2>

            {/* Intro Text */}
            <p className="font-sans text-lg text-gray-200 leading-relaxed mb-10">
              {String(services.collectionsIntro || "")}
            </p>

            {/* Package Name */}
            <div className="mb-10">
              <h3 className="font-serif text-3xl md:text-4xl text-dominant mb-2">
                {featuredData.name}
              </h3>
              {featuredData.subtitle && (
                <p className="font-serif italic text-lg text-gray-300">
                  {featuredData.subtitle}
                </p>
              )}
            </div>

            {/* Target Audience */}
            <p className="font-sans text-lg text-gray-200 leading-relaxed mb-8 italic">
              <InlineBoldText text={featuredData.targetAudience} boldClassName="font-semibold text-dominant" />
            </p>

            {/* Promise/Description */}
            <p className="font-sans text-lg text-gray-200 leading-relaxed mb-8">
              <InlineBoldText text={featuredData.promise.split('\n\n')[0]} boldClassName="font-semibold text-dominant" />
            </p>
            
            {featuredData.promise.includes('\n\n') && (
              <p className="font-sans text-base text-gray-300 leading-relaxed mb-10 italic">
                <InlineBoldText text={featuredData.promise.split('\n\n')[1]} boldClassName="font-semibold text-gray-200" />
              </p>
            )}

            {/* Features List - Simple bullets */}
            {featuredData.features.length > 0 && (
              <div className="mb-10">
                <ul className="space-y-3">
                  {featuredData.features.map((feature, idx) => (
                    <li key={idx} className="text-gray-200 font-sans text-base flex items-start gap-3">
                      <span className="text-accent flex-shrink-0 mt-1">•</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* CTA Text flows naturally */}
            <p className="font-sans text-lg text-gray-200 leading-relaxed mb-8">
              <InlineBoldText text={String(services.investmentGuideBody || "")} boldClassName="font-semibold text-dominant" />
            </p>

            {/* Button */}
            <Link
              href="/contact"
              className="inline-block bg-accent text-secondary px-8 md:px-10 py-4 md:py-5 uppercase tracking-widest text-sm font-bold hover:bg-accent/90 transition-colors mb-8"
            >
              {String(services.sendGuideButtonText || "")}
            </Link>

            {/* Price */}
            <div>
              <p className="text-xs uppercase tracking-widest text-gray-400 font-semibold mb-2">
                {String(labels.investmentLabel || "Investment")}
              </p>
              <p className="font-serif text-4xl md:text-5xl text-dominant font-bold">
                MXN {formatPrice(featuredPackage.price)}
              </p>
            </div>
          </div>
        </section>
      )}

      {/* ── 3. ADD-ONS SECTION ── */}
      {addOns.length > 0 && (
        <section className="w-full py-16 md:py-20 bg-gray-50">
          <div className="max-w-5xl mx-auto px-4 md:px-8">
            <h3 className="font-serif text-3xl md:text-4xl text-secondary mb-8">
              {String(labels.addOnsLabel || "Add-ons")}
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {addOns.map((addon) => (
                <div key={addon.id} className="bg-white border border-gray-200 p-6 rounded-lg">
                  <h4 className="font-serif text-xl text-secondary mb-2">
                    {lang === "en" ? addon.nameEn : addon.name}
                  </h4>
                  <p className="font-sans text-gray-600 text-sm mb-4 h-16 overflow-hidden">
                    {lang === "en" ? addon.descriptionEn : addon.description}
                  </p>
                  <p className="font-serif text-2xl text-accent font-bold">
                    MXN {formatPrice(addon.price)}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 5. TESTIMONIAL ── */}
      {ketzia && (
        <section className="w-full py-16 md:py-20 bg-white border-y border-gray-200">
          <div className="max-w-5xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
              <div className="relative min-h-[20rem] md:min-h-full">
                {testimonialImage ? (
                  <Image
                    src={getImageUrl(testimonialImage.image, 900)}
                    alt={ketzia.imageAlt}
                    fill
                    className="object-cover"
                  />
                ) : heroImageUrl ? (
                  <Image
                    src={heroImageUrl}
                    alt={ketzia.imageAlt}
                    fill
                    className="object-cover"
                  />
                ) : (
                  <div className="w-full h-full bg-secondary/10" />
                )}
              </div>
              <div className="p-8 md:p-12 flex flex-col justify-center">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-4">
                  {String(services.clientStoryLabel || "")}
                </p>
                <p className="font-serif text-2xl md:text-3xl text-secondary leading-relaxed mb-6">
                  "{ketzia.highlight}"
                </p>
                <p className="font-sans text-gray-700 leading-relaxed mb-6">
                  {ketzia.text}
                </p>
                <p className="font-medium text-secondary text-lg">
                  {ketzia.author}
                </p>
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ── 6. FAQs ── */}
      {pricingFaqs.length > 0 && (
        <section className="w-full py-16 md:py-20 bg-gray-50">
          <div className="max-w-4xl mx-auto px-4 md:px-8">
            <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-4 text-center">
              {String(services.faqTitle || "")}
            </h2>
            <p className="text-base text-gray-600 text-center mb-12 max-w-2xl mx-auto">
              {String(services.faqIntro || "")}
            </p>
            <div className="space-y-4">
              {pricingFaqs.map((faq, idx) => (
                <details key={idx} className="bg-white border border-gray-200 p-6 rounded-lg group">
                  <summary className="cursor-pointer font-semibold text-secondary text-lg flex justify-between items-center">
                    {faq.question}
                    <span className="text-accent text-xl group-open:rotate-180 transition-transform">+</span>
                  </summary>
                  <p className="mt-4 text-gray-700 leading-relaxed font-sans">
                    {faq.answer}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* ── 7. FINAL CTA ── */}
      <section className="w-full py-16 md:py-20 bg-secondary text-dominant text-center border-t border-secondary">
        <div className="max-w-3xl mx-auto px-4 md:px-8">
          <h2 className="font-serif text-3xl md:text-4xl mb-6">
            {String(services.finalCtaTitle || "")}
          </h2>
          <p className="font-sans text-base md:text-lg text-gray-300 mb-8 leading-relaxed">
            <InlineBoldText text={String(services.finalCtaBody || "")} boldClassName="font-semibold text-dominant" />
          </p>
          <Link
            href="/contact"
            className="inline-block bg-accent text-secondary px-8 md:px-10 py-4 md:py-5 uppercase tracking-widest text-sm font-bold hover:bg-accent/90 transition-colors"
          >
            {String(services.ctaPrimary || "")}
          </Link>
        </div>
      </section>
    </div>
  );
}

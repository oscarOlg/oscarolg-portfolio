// src/app/services/ServicesContent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import PackagesShowcase from "./components/PackagesShowcase";
import { getImageUrl } from "@/lib/sanity";
import type { ServiceConfig, ServicePackage, PortfolioImage } from "@/types/sanity";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import InlineBoldText from "@/app/components/InlineBoldText";

interface Props {
  config: ServiceConfig;
  packages: ServicePackage[];
  heroImage: PortfolioImage | null;
  weddingImages: PortfolioImage[];
  packageImageOverrides?: Record<string, string>;
}
type LocalizedTestimonial = {
  author: string;
  text: string;
  highlight: string;
  imageTitle?: string;
  imageAlt: string;
};

type LocalizedFaq = {
  question: string;
  answer: string;
};

function normalizeTitle(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

export default function ServicesContent({ config, packages, heroImage, weddingImages, packageImageOverrides = {} }: Props) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const services = locale.services as Record<string, unknown>;
  const heroImageUrl = heroImage ? getImageUrl(heroImage.image, 1200) : null;
  const galleryTop = weddingImages.slice(0, 6);

  const testimonials = locale.testimonials as LocalizedTestimonial[];
  const ketzia = testimonials.find((item) => /Ketzia/i.test(item.author));
  const testimonialImage = ketzia?.imageTitle
    ? weddingImages.find((img) => normalizeTitle(img.title) === normalizeTitle(ketzia.imageTitle))
    : null;

  const pricingFaqs = (services.pricingFaqs as LocalizedFaq[] | undefined) ?? [];

  return (
    <div className="flex flex-col w-full">
      <section className="mb-10 md:mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 h-[22rem] md:h-[30rem] overflow-hidden">
          <div className="relative col-span-2 row-span-2">
            {galleryTop[0] ? (
              <Image src={getImageUrl(galleryTop[0].image, 1200)} alt={galleryTop[0].title || String(services.galleryAltStory || "")} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-secondary/15" />
            )}
          </div>
          {galleryTop.slice(1, 5).map((img) => (
            <div key={img._id} className="relative">
              <Image src={getImageUrl(img.image, 800)} alt={img.title || String(services.galleryAltFrame || "")} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 text-center px-3">
        <h1 className="font-serif text-4xl md:text-6xl text-secondary leading-tight max-w-4xl mx-auto mb-4">
          {String(services.title || "")}
        </h1>
        <p className="font-sans text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          <InlineBoldText text={String(services.introLead || "")} />
        </p>
      </section>

      <section id="collections" className="w-full mb-12">
        <PackagesShowcase imageOverrides={packageImageOverrides} />
      </section>

      {ketzia && (
        <section className="mb-14 border border-gray-200 bg-white overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr]">
            <div className="relative min-h-[16rem] md:min-h-full">
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
            <div className="p-6 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-4">
                {String(services.clientStoryLabel || "")}
              </p>
              <p className="font-serif text-2xl md:text-3xl text-secondary leading-relaxed mb-5">
                "{ketzia.highlight}"
              </p>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                {ketzia.text}
              </p>
              <p className="font-medium text-secondary">{ketzia.author}</p>
            </div>
          </div>
        </section>
      )}

      {pricingFaqs.length > 0 && (
        <section className="mb-12 border border-gray-200 bg-gray-50 px-8 md:px-12 py-10">
          <h2 className="font-serif text-3xl text-secondary mb-3 text-center">
            {String(services.faqTitle || "")}
          </h2>
          <p className="text-sm text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            {String(services.faqIntro || "")}
          </p>
          <div className="max-w-4xl mx-auto space-y-4">
            {pricingFaqs.map((faq, idx) => (
              <details key={idx} className="bg-white border border-gray-200 p-4">
                <summary className="cursor-pointer font-semibold text-secondary">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="bg-secondary text-dominant px-8 py-10 text-center border border-secondary">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          {String(services.finalCtaTitle || "")}
        </h2>
        <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto mb-7">
          <InlineBoldText text={String(services.finalCtaBody || "")} boldClassName="font-semibold text-dominant" />
        </p>
        <Link
          href="/contact"
          className="inline-block bg-accent text-secondary px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-accent/90 transition-colors"
        >
          {String(services.ctaPrimary || "")}
        </Link>
      </section>
    </div>
  );
}

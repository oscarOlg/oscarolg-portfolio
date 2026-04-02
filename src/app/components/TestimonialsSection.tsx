/**
 * TestimonialsSection Component
 * Homepage single-proof block aligned with services proof-card style.
 */

"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import AnimatedSection from "./AnimatedSection";
import type { PortfolioImage } from "@/types/sanity";
import { getImageUrl } from "@/lib/sanity";

interface TestimonialsSectionProps {
  weddingImages?: PortfolioImage[];
}

type TestimonialLocaleItem = {
  author: string;
  text: string;
  highlight: string;
  date: string;
  imageAlt: string;
};

export default function TestimonialsSection({
  weddingImages = [],
}: TestimonialsSectionProps) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const allTestimonials = locale.testimonials as TestimonialLocaleItem[];
  const preferred = allTestimonials.filter((item) => /Analaura\s*&\s*Job/i.test(item.author));
  const testimonials = preferred.length > 0 ? preferred : allTestimonials.slice(0, 1);
  const testimonial = testimonials[0];
  const testimonialImage = weddingImages[0] || null;

  return (
    <AnimatedSection className="w-full py-14 md:py-16 px-6 md:px-12 bg-dominant">
      <div className="max-w-7xl mx-auto">
        {testimonial && (
          <div className="border border-gray-200 bg-white overflow-hidden">
            <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr]">
              <div className="relative min-h-[16rem] md:min-h-full">
                {testimonialImage ? (
                  <Image
                    src={getImageUrl(testimonialImage.image, 900)}
                    alt={testimonial.imageAlt}
                    fill
                    className="object-cover"
                    priority
                  />
                ) : (
                  <div className="w-full h-full bg-secondary/10" />
                )}
              </div>

              <div className="p-6 md:p-10">
                <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-4">
                  {locale.services.clientStoryLabel}
                </p>
                <p className="font-serif text-2xl md:text-3xl text-secondary leading-relaxed mb-5">
                  "{testimonial.highlight}"
                </p>
                <p className="font-sans text-gray-700 leading-relaxed mb-6">
                  {testimonial.text}
                </p>
                <p className="font-medium text-secondary">{testimonial.author}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </AnimatedSection>
  );
}

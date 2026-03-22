"use client";

import Image from "next/image";
import { useLanguage } from "@/contexts/LanguageContext";
import { getImageUrl } from "@/lib/sanity";
import type { Testimonial } from "@/types/sanity";

interface TestimonialsSectionProps {
  testimonials: Testimonial[];
}

export default function TestimonialsSection({ testimonials }: TestimonialsSectionProps) {
  const { lang } = useLanguage();

  if (!testimonials || testimonials.length === 0) return null;

  return (
    <section className="w-full bg-accent/5 py-20 px-6 md:px-12">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-4xl text-center mb-4">
          {lang === "en" ? "What Our Clients Say" : "Lo Que Dicen Nuestros Clientes"}
        </h2>
        <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
          {lang === "en"
            ? "Real stories from clients we've had the honor to photograph."
            : "Historias reales de clientes que hemos tenido el honor de fotografiar."}
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.slice(0, 3).map((testimonial) => (
            <div key={testimonial._id} className="bg-white p-8 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1 mb-4" aria-label={`${testimonial.rating || 5} star rating`}>
                {Array.from({ length: testimonial.rating || 5 }).map((_, i) => (
                  <span key={i} className="text-accent text-lg">★</span>
                ))}
              </div>

              <p className="text-gray-700 mb-6 italic leading-relaxed">&quot;{testimonial.text}&quot;</p>

              <div className="flex items-center gap-3">
                {testimonial.image && (
                  <div className="w-12 h-12 rounded-full overflow-hidden flex-shrink-0 bg-gray-100">
                    <Image
                      src={getImageUrl(testimonial.image, 100, 100)}
                      alt={testimonial.author}
                      width={48}
                      height={48}
                      className="object-cover"
                    />
                  </div>
                )}
                <div>
                  <p className="font-sans font-semibold text-sm">{testimonial.author}</p>
                  {testimonial.role && (
                    <p className="font-sans text-xs text-gray-500">{testimonial.role}</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

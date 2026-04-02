/**
 * Testimonials Schema - Provides AI systems with verified client feedback
 * High-value trust signal for AI search visibility
 */
import { getSiteLocale } from "@/i18n/locales";
import type { Language } from "@/contexts/LanguageContext";

export function TestimonialsSchema({ lang = "es" }: { lang?: Language }) {
  const locale = getSiteLocale(lang);
  const testimonials = locale.testimonials;

  const schema = {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    "name": "Fotografía Editorial de Bodas en Ciudad Juárez",
    "creator": {
      "@type": "Person",
      "name": "Oscar Olg",
      "image": "https://oscarolg.com/oscar-profile.jpg"
    },
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "bestRating": "5",
      "worstRating": "1",
      "ratingCount": testimonials.length,
      "reviewCount": testimonials.length
    },
    "review": testimonials.map((t: any) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": t.author
      },
      "datePublished": t.date,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      },
      "reviewBody": t.text
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

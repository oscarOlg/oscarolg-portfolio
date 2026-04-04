/**
 * FAQ Schema - Helps AI systems answer common questions about your services
 * Improves relevance in AI-powered search results
 */
import { getSiteLocale } from "@/i18n/locales";
import type { Language } from "@/contexts/LanguageContext";

export function FAQSchema({ lang = "es" }: { lang?: Language }) {
  const locale = getSiteLocale(lang);
  const faqs = locale.faqs;

  const schema = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqs.map((faq: any) => ({
      "@type": "Question",
      "name": faq.question,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.answer
      }
    }))
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

/**
 * Schema Markup Components for SEO and AI Search Visibility
 * These help AI systems (ChatGPT, Claude, Perplexity) understand your business
 * Uses environment variables for accuracy across all environments
 */

export function LocalBusinessSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oscarolgphoto.com';
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+52 656 293 2374';
  const ogImageUrl = `${siteUrl}/og-image.jpg`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "ProfessionalService",
    "name": "Oscar Sanchez | Fotógrafo de Bodas",
    "alternateName": "Oscar Sanchez Photography",
    "description": "Fotografía editorial de bodas en Ciudad Juárez con enfoque narrativo. Cobertura auténtica para historias que merecen perdurar.",
    "url": siteUrl,
    "telephone": whatsappPhone,
    "areaServed": {
      "@type": "City",
      "name": "Ciudad Juárez, Chihuahua, México"
    },
    "image": ogImageUrl,
    "priceRange": "$$",
    "knowsAbout": [
      "Fotografía de bodas",
      "Fotografía editorial",
      "Fotografía narrativa",
      "Cobertura cinematográfica"
    ],
    "sameAs": [
      "https://www.instagram.com/oscar.olg/",
      "https://www.facebook.com/profile.php?id=100088045982178",
      "mailto:oscar.olg.photo@gmail.com"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5",
      "reviewCount": "2"
    },
    "contact": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": whatsappPhone,
      "availableLanguage": "Spanish"
    }
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function CreatorSchema() {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://oscarolgphoto.com';
  const whatsappPhone = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER || '+52 656 293 2374';
  const profileImageUrl = `${siteUrl}/oscar-profile.jpg`;

  const schema = {
    "@context": "https://schema.org",
    "@type": "Person",
    "name": "Oscar Sanchez",
    "jobTitle": "Fotógrafo de Bodas",
    "image": profileImageUrl,
    "knowsLanguage": ["Spanish", "English"],
    "workLocation": {
      "@type": "City",
      "name": "Ciudad Juárez, Chihuahua, México"
    },
    "contactPoint": {
      "@type": "ContactPoint",
      "contactType": "Customer Service",
      "telephone": whatsappPhone,
      "availableLanguage": "Spanish"
    },
    "sameAs": [
      "https://www.instagram.com/oscar.olg/",
      "https://www.facebook.com/profile.php?id=100088045982178",
      "mailto:oscar.olg.photo@gmail.com"
    ],
    "url": siteUrl
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

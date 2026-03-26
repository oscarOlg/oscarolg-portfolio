import Image from "next/image";
import type { Metadata } from "next";
import { getPortfolioImages, getImageUrl } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import HeroContent from "./components/HeroContent";
import ProblemValidationSection from "./components/ProblemValidationSection";
import SolutionShowcaseSection from "./components/SolutionShowcaseSection";
import ServicePathsSection from "./components/ServicePathsSection";
import SocialProofSection from "./components/SocialProofSection";
import LeadMagnetSection from "./components/LeadMagnetSection";
import HomepageFinalCta from "./components/HomepageFinalCta";
import HomepageTracker from "./components/HomepageTracker";

export const metadata: Metadata = {
  title: 'Oscar Sánchez | Fotógrafo Editorial en Ciudad Juárez',
  description: 'Especializado en retratos y bodas. Te enseño a verte cómodo, confiado y editorial. Sin poses incómodas. Confianza garantizada. Fotógrafo en Juárez.',
  openGraph: {
    title: 'Oscar Sánchez | Fotógrafo Editorial en Ciudad Juárez',
    description: 'Retratos y bodas. Comodidad, confianza, momentos reales. Fotógrafo especializado en transformar inseguridades en belleza.',
    url: '/',
  },
};

export const revalidate = 60;

export default async function Home() {
  // Fetch portfolio images for hero background (wedding photo preferred)
  const allImages = await getPortfolioImages();
  const heroImage =
    allImages.find((i) => i.category === "weddings") ?? allImages[0] ?? null;

  return (
    <div className="flex flex-col w-full">
      {/* Pixel Tracking */}
      <HomepageTracker />

      {/* ── 1. HERO: "No eres modelo" ── */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {heroImage && (
            <Image
              src={getImageUrl(heroImage.image, 1800)}
              alt={heroImage.title}
              fill
              className="object-cover"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <HeroContent
          heading="No eres modelo"
          headingEn="You're not a model"
          headingItalic="aquí no necesitas serlo"
          headingItalicEn="here, you don't need to be"
          cta1Text="Ver portafolio"
          cta1TextEn="View portfolio"
          cta2Text="Consultar precio"
          cta2TextEn="Get quote"
        />
      </section>

      {/* ── 2. PROBLEM VALIDATION: Pain point acknowledgement ── */}
      <ProblemValidationSection />

      {/* ── 3. SOLUTION SHOWCASE: How Oscar helps ── */}
      <SolutionShowcaseSection />

      {/* ── 4. SERVICE PATHS: Two clear choices ── */}
      <ServicePathsSection />

      {/* ── 5. SOCIAL PROOF: Testimonials + FAQ ── */}
      <SocialProofSection />

      {/* ── 6. LEAD MAGNET: Free guide + WhatsApp CTA ── */}
      <LeadMagnetSection />

      {/* ── 7. FINAL CTA: Action buttons ── */}
      <HomepageFinalCta
        headingEs="Listo para tu sesión? Escríbeme"
        headingEn="Ready for your session? Message me"
        locationEs="Ciudad Juárez & México"
        locationEn="Juárez & Mexico"
        buttonTextEs="Contactar por WhatsApp"
        buttonTextEn="Contact on WhatsApp"
      />
    </div>
  );
}

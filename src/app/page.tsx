import type { Metadata } from "next";
import { getImageUrl, getPortfolioImagesByUsage } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import InvestmentSection from "./components/InvestmentSection";
import HeroContent from "./components/HeroContent";
import HeroCarousel from "./components/HeroCarousel";
import TestimonialsSection from "./components/TestimonialsSection";
import AnimatedSection from "./components/AnimatedSection";
import WorkSection from "./components/WorkSection";
import HomepageFinalCta from "./components/HomepageFinalCta";

export const metadata: Metadata = {
  title: 'Oscar Olg Photography | Fotógrafo en Ciudad Juárez',
  description: 'Fotografía de bodas editorial en Ciudad Juárez para parejas que quieren una experiencia elegante, clara y sin estrés.',
  openGraph: {
    title: 'Oscar Olg Photography | Fotógrafo en Ciudad Juárez',
    description: 'Fotografía editorial de bodas en Ciudad Juárez para parejas que valoran una experiencia premium.',
    url: '/',
  },
};

export const revalidate = 60;

export default async function Home() {
  const homepageImages: PortfolioImage[] = await getPortfolioImagesByUsage('homepage');
  
  const homeCarouselImages = homepageImages.filter((img) => img.usageSection === 'carousel').slice(0, 6);
  const homeGridImages = homepageImages.filter((img) => img.usageSection === 'grid').slice(0, 6);
  const homeTestimonialImages = homepageImages.filter((img) => img.usageSection === 'testimonial').slice(0, 1);
  const homeInvestmentImages = homepageImages.filter((img) => img.usageSection === 'investment').slice(0, 2);

  const weddingGallery = homeGridImages.map((img: PortfolioImage) => ({
    imageUrl: getImageUrl(img.image, 900),
    alt: img.title || 'Fotografia de boda',
  }));

  const heroSlides = homeCarouselImages
    .map((img) => ({
      src: getImageUrl(img.image, 1800),
      alt: img.title || 'Wedding photography by Oscar Olg Photography',
    }));

  const testimonialImages = homeTestimonialImages;
  const investLeft = homeInvestmentImages[0] ?? null;
  const investRight = homeInvestmentImages[1] ?? null;

  return (
    <div className="flex flex-col w-full">

      {/* ── 1. HERO ── */}
      <section className="relative w-full min-h-[calc(100vh+4rem)] flex items-center justify-center overflow-hidden -mt-16">
        <HeroCarousel slides={heroSlides} />
        {/* Overlay for readability and scroll stability */}
        <div className="absolute inset-0 bg-black/[0.45] pointer-events-none z-0" />
        <HeroContent />
      </section>

      {/* ── 2. PORTFOLIO CATEGORIES GRID ── */}
      <WorkSection
        categoryCover={{}}
        weddingGallery={weddingGallery}
      />

      {/* ── 2.5 CLIENT TESTIMONIALS ── */}
      <TestimonialsSection weddingImages={testimonialImages} />

      {/* ── 3. INVESTMENT / TRUST SECTION ── */}
      <AnimatedSection>
        <InvestmentSection
          leftImageUrl={investLeft ? getImageUrl(investLeft.image, 900) : undefined}
          rightImageUrl={investRight ? getImageUrl(investRight.image, 900) : undefined}
        />
      </AnimatedSection>

      {/* ── 4. FINAL CTA ── */}
      <HomepageFinalCta />

    </div>
  );
}

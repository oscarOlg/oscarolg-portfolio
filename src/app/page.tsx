import type { Metadata } from "next";
import { getPortfolioImageBySlug, getPortfolioImagesByCategory, getImageUrl, getHomepageContent } from "@/lib/sanity";
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

const HOME_IMAGE_SLUGS = {
  investmentLeft: "weddings-dscf1937",
  investmentRight: "weddings-dscf1937",
} as const;

// Optional: set exact Sanity image titles to control homepage order/content.
// If a title does not match, fallback images are used automatically.
const HOME_HERO_IMAGE_TITLES: string[] = [
  "Weddings - DSCF0128",
  "Weddings - DSCF7956",
  "Weddings - P&E_8CA09067DSCF3244",
  "Weddings - DSCF2556",
  "Weddings - DSCF1958",
  "Weddings - DSCF8204"
];

function normalizeTitle(value: string) {
  return value.trim().toLowerCase();
}

function selectImagesByTitle(
  images: PortfolioImage[],
  preferredTitles: string[],
  fallbackCount: number,
) {
  if (preferredTitles.length === 0) {
    return images.slice(0, fallbackCount);
  }

  const byTitle = new Map(images.map((img) => [normalizeTitle(img.title || ''), img]));
  const selected = preferredTitles
    .map((title) => byTitle.get(normalizeTitle(title)))
    .filter((img): img is PortfolioImage => Boolean(img));

  const unique = Array.from(new Map(selected.map((img) => [img._id, img])).values());
  return unique.length > 0 ? unique.slice(0, fallbackCount) : images.slice(0, fallbackCount);
}

export const revalidate = 60;

export default async function Home() {
  const [allImages, pinnedInvestmentLeft, pinnedInvestmentRight, homepageContent] = await Promise.all([
    getPortfolioImagesByCategory('weddings'),
    getPortfolioImageBySlug(HOME_IMAGE_SLUGS.investmentLeft),
    getPortfolioImageBySlug(HOME_IMAGE_SLUGS.investmentRight),
    getHomepageContent(),
  ]);

  const cmsHeroImages = (homepageContent?.heroImages ?? []).filter((img) => img?.image?.asset?.url);
  const selectedHeroImages =
    cmsHeroImages.length > 0
      ? cmsHeroImages.slice(0, 8)
      : selectImagesByTitle(allImages, HOME_HERO_IMAGE_TITLES, 8);

  const weddingGallery = allImages.map((img: PortfolioImage) => ({
    imageUrl: getImageUrl(img.image, 900),
    alt: img.title || 'Fotografia de boda',
  }));

  const heroSlides = selectedHeroImages
    .map((img) => ({
      src: getImageUrl(img.image, 1800),
      alt: img.title || 'Wedding photography by Oscar Olg Photography',
    }));

  const fallbackInvestLeft = allImages[0] ?? null;
  const fallbackInvestRight = allImages[1] ?? allImages[0] ?? null;

  const investLeft = pinnedInvestmentLeft ?? fallbackInvestLeft;
  const investRight = pinnedInvestmentRight ?? fallbackInvestRight;

  return (
    <div className="flex flex-col w-full">

      {/* ── 1. HERO ── */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center">
        <HeroCarousel slides={heroSlides} />
        <HeroContent />
      </section>

      {/* ── 2. PORTFOLIO CATEGORIES GRID ── */}
      <WorkSection
        categoryCover={{}}
        weddingGallery={weddingGallery}
      />

      {/* ── 2.5 CLIENT TESTIMONIALS ── */}
      <TestimonialsSection weddingImages={allImages} />

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

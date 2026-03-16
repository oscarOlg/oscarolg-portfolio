import Image from "next/image";
import type { Metadata } from "next";
import { getPortfolioImageBySlug, getPortfolioImages, getImageUrl, getHomepageContent } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import InvestmentSection from "./components/InvestmentSection";
import HeroContent from "./components/HeroContent";
import AnimatedSection from "./components/AnimatedSection";
import WorkSection from "./components/WorkSection";
import HomepageFinalCta from "./components/HomepageFinalCta";

export const metadata: Metadata = {
  title: 'Oscar Sanchez | Fotógrafo en Ciudad Juárez',
  description: 'Fotógrafo profesional en Ciudad Juárez. Bodas, retratos, parejas y maternidad capturados con sensibilidad editorial. Tu historia merece perdurar.',
  openGraph: {
    title: 'Oscar Sanchez | Fotógrafo en Ciudad Juárez',
    description: 'Bodas, retratos, parejas y maternidad. Fotografía editorial en Ciudad Juárez.',
    url: '/',
  },
};

const HOME_IMAGE_SLUGS = {
  investmentLeft: "maternity-dscf0179",
  investmentRight: "weddings-dscf1937",
} as const;

export const revalidate = 60;

export default async function Home() {
  const [allImages, pinnedInvestmentLeft, pinnedInvestmentRight, homepageContent] = await Promise.all([
    getPortfolioImages(),
    getPortfolioImageBySlug(HOME_IMAGE_SLUGS.investmentLeft),
    getPortfolioImageBySlug(HOME_IMAGE_SLUGS.investmentRight),
    getHomepageContent(),
  ]);

  // First image per category for the cards
  const rawCoverMap: Partial<Record<string, PortfolioImage>> = {};
  for (const img of allImages) {
    if (!rawCoverMap[img.category]) rawCoverMap[img.category] = img;
  }

  // Build categoryCover for WorkSection (pre-compute image URLs server-side)
  const categoryCover: Record<string, { imageUrl: string }> = {};
  for (const [cat, img] of Object.entries(rawCoverMap)) {
    if (img) categoryCover[cat] = { imageUrl: getImageUrl(img.image, 800) };
  }

  // Hero: prefer a wedding photo, fallback to first image
  const heroImage =
    allImages.find((i) => i.category === "weddings") ?? allImages[0] ?? null;

  // Investment section: one portrait + one couple image
  const fallbackInvestLeft =
    allImages.find((i) => i.category === "portraits") ??
    allImages.find((i) => i.category === "couples");
  const fallbackInvestRight =
    allImages.find((i) => i.category === "couples") ??
    allImages.find((i) => i.category === "maternity");

  const investLeft = pinnedInvestmentLeft ?? fallbackInvestLeft;
  const investRight = pinnedInvestmentRight ?? fallbackInvestRight;

  const hp = homepageContent;

  return (
    <div className="flex flex-col w-full">

      {/* ── 1. HERO ── */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
            <Image
              src={getImageUrl(heroImage.image, 1800)}
              alt={heroImage.title}
              fill
              className="object-cover"
              priority
            />
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <HeroContent
          heading={hp?.heroHeading}
          headingEn={hp?.heroHeadingEn}
          headingItalic={hp?.heroHeadingItalic}
          headingItalicEn={hp?.heroHeadingItalicEn}
          cta1Text={hp?.heroCta1Text}
          cta1TextEn={hp?.heroCta1TextEn}
          cta2Text={hp?.heroCta2Text}
          cta2TextEn={hp?.heroCta2TextEn}
        />
      </section>

      {/* ── 2. PORTFOLIO CATEGORIES GRID ── */}
      <WorkSection
        categoryCover={categoryCover}
        headingEs={hp?.workSectionHeading}
        headingEn={hp?.workSectionHeadingEn}
        subtitleEs={hp?.workSectionSubtitle}
        subtitleEn={hp?.workSectionSubtitleEn}
        viewMoreEs={hp?.workSectionViewMoreText}
        viewMoreEn={hp?.workSectionViewMoreTextEn}
        viewAllEs={hp?.workSectionViewAllText}
        viewAllEn={hp?.workSectionViewAllTextEn}
      />

      {/* ── 3. INVESTMENT / TRUST SECTION ── */}
      <AnimatedSection>
        <InvestmentSection
          leftImageUrl={investLeft ? getImageUrl(investLeft.image, 900) : undefined}
          rightImageUrl={investRight ? getImageUrl(investRight.image, 900) : undefined}
          heading={hp?.investmentHeading}
          headingEn={hp?.investmentHeadingEn}
          paragraph1={hp?.investmentParagraph1}
          paragraph1En={hp?.investmentParagraph1En}
          paragraph2={hp?.investmentParagraph2}
          paragraph2En={hp?.investmentParagraph2En}
          ctaText={hp?.investmentCtaText}
          ctaTextEn={hp?.investmentCtaTextEn}
        />
      </AnimatedSection>

      {/* ── 4. FINAL CTA ── */}
      <HomepageFinalCta
        headingEs={hp?.finalCtaHeading}
        headingEn={hp?.finalCtaHeadingEn}
        locationEs={hp?.finalCtaLocation}
        locationEn={hp?.finalCtaLocationEn}
        buttonTextEs={hp?.finalCtaButtonText}
        buttonTextEn={hp?.finalCtaButtonTextEn}
      />

    </div>
  );
}

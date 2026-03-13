import Image from "next/image";
import Link from "next/link";
import { getPortfolioImageBySlug, getPortfolioImages, getImageUrl } from "@/lib/sanity";
import type { PortfolioImage } from "@/types/sanity";
import InvestmentSection from "./components/InvestmentSection";
import HeroContent from "./components/HeroContent";
import AnimatedSection from "./components/AnimatedSection";
import { PORTFOLIO_CATEGORIES } from "./portfolio/components/PortfolioNav";

const HOME_IMAGE_SLUGS = {
  investmentLeft: "maternity-dscf0179",
  investmentRight: "weddings-dscf1937",
} as const;

export default async function Home() {
  const [allImages, pinnedInvestmentLeft, pinnedInvestmentRight] = await Promise.all([
    getPortfolioImages(),
    getPortfolioImageBySlug(HOME_IMAGE_SLUGS.investmentLeft),
    getPortfolioImageBySlug(HOME_IMAGE_SLUGS.investmentRight),
  ]);

  // First image per category for the cards
  const categoryCover: Partial<Record<string, PortfolioImage>> = {};
  for (const img of allImages) {
    if (!categoryCover[img.category]) categoryCover[img.category] = img;
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

  return (
    <div className="flex flex-col w-full">

      {/* ── 1. HERO ── */}
      <section className="relative w-full h-[100dvh] flex items-center justify-center">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          {heroImage ? (
            <Image
              src={getImageUrl(heroImage.image, 1800)}
              alt={heroImage.title}
              fill
              className="object-cover"
              priority
            />
          ) : (
            <Image
              src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
              alt="Fotografía de boda"
              fill
              className="object-cover grayscale"
              priority
            />
          )}
          <div className="absolute inset-0 bg-black/45" />
          <div className="absolute inset-x-0 bottom-0 h-1/3 bg-gradient-to-t from-black/60 to-transparent" />
        </div>
        <HeroContent />
      </section>

      {/* ── 2. PORTFOLIO CATEGORIES GRID ── */}
      <section className="w-full bg-secondary py-24 px-6 md:px-12">
        <AnimatedSection>
          <div className="max-w-7xl mx-auto">
            <h2 className="font-serif text-3xl md:text-4xl text-dominant text-center mb-3">
              Mi Trabajo
            </h2>
            <p className="font-sans text-xs text-dominant/60 text-center tracking-widest uppercase mb-16">
              Explora por tipo de sesión
            </p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4">
              {PORTFOLIO_CATEGORIES.map(({ key, label }, i) => {
                const img = categoryCover[key];
                const imgUrl = img ? getImageUrl(img.image, 800) : "";
                return (
                  <AnimatedSection key={key} delay={i * 0.07}>
                    <Link
                      href={`/portfolio/${key}`}
                      className="group relative block aspect-[3/4] overflow-hidden"
                    >
                      {imgUrl ? (
                        <Image
                          src={imgUrl}
                          alt={label}
                          fill
                          className="object-cover object-top transition-transform duration-700 group-hover:scale-105"
                          sizes="(max-width: 768px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="w-full h-full bg-secondary/40" />
                      )}
                      <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-colors duration-300" />
                      <div className="absolute inset-0 flex flex-col items-center justify-center gap-2">
                        <span className="font-serif text-xl md:text-2xl text-white tracking-wide drop-shadow">
                          {label}
                        </span>
                        <span className="font-sans text-xs text-white/0 group-hover:text-white/80 uppercase tracking-widest translate-y-1 group-hover:translate-y-0 transition-all duration-300">
                          Ver más →
                        </span>
                      </div>
                    </Link>
                  </AnimatedSection>
                );
              })}
            </div>
            <div className="text-center mt-14">
              <Link
                href="/portfolio"
                className="font-sans text-xs text-dominant/70 uppercase tracking-widest border-b border-dominant/40 pb-1 hover:text-dominant hover:border-dominant transition-colors"
              >
                Ver todo el portafolio →
              </Link>
            </div>
          </div>
        </AnimatedSection>
      </section>

      {/* ── 3. INVESTMENT / TRUST SECTION ── */}
      <AnimatedSection>
        <InvestmentSection
          leftImageUrl={investLeft ? getImageUrl(investLeft.image, 900) : undefined}
          rightImageUrl={investRight ? getImageUrl(investRight.image, 900) : undefined}
        />
      </AnimatedSection>

      {/* ── 4. FINAL CTA ── */}
      <AnimatedSection>
        <section className="w-full bg-accent py-28 px-6 text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-5 max-w-xl mx-auto leading-tight">
            ¿Listo para crear algo hermoso e irrepetible?
          </h2>
          <p className="font-sans text-xs text-secondary/60 uppercase tracking-widest mb-12">
            Ciudad Juárez &amp; México
          </p>
          <Link
            href="/contact"
            className="inline-block bg-secondary text-dominant font-sans uppercase tracking-widest text-sm py-4 px-12 hover:bg-white hover:text-secondary transition-all duration-300 font-semibold"
          >
            Reservar fecha
          </Link>
        </section>
      </AnimatedSection>

    </div>
  );
}

import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageClient from "./components/LandingPageClient";
import { getLeadMagnetBySlug, getLeadMagnetSlugs } from "@/config/lead-magnets";
import { getAboutContent, getImageUrl, getPortfolioImagesByUsage } from "@/lib/sanity";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export const revalidate = 60;

export async function generateStaticParams() {
  return getLeadMagnetSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const campaign = getLeadMagnetBySlug(slug);

  if (!campaign) {
    return {
      title: "Landing",
      description: "Landing page",
    };
  }

  return {
    title: 'Giveaway Sesión de Compromiso Gratis',
    description: 'Participa en el giveaway de sesión de compromiso gratis y recibe una experiencia editorial guiada con contacto rápido por WhatsApp.',
    openGraph: {
      title: 'Giveaway Sesión de Compromiso Gratis',
      description: 'Participa en el giveaway de sesión de compromiso gratis y recibe una experiencia editorial guiada con contacto rápido por WhatsApp.',
      url: `/landing/${campaign.slug}`,
    },
  };
}

export default async function LandingPage({ params }: PageProps) {
  const { slug } = await params;
  const campaign = getLeadMagnetBySlug(slug);

  if (!campaign) {
    notFound();
  }

  const [aboutContent, landingImages, aboutImages] = await Promise.all([
    getAboutContent(),
    getPortfolioImagesByUsage("landing"),
    getPortfolioImagesByUsage("about", "profile"),
  ]);

  const heroSource = landingImages.filter((item) => item.usageSection === `${campaign.slug}_hero`);
  const aboutSource = landingImages.filter((item) => item.usageSection === `${campaign.slug}_about`);
  const stripSource = landingImages.filter((item) => item.usageSection === `${campaign.slug}_strip`);
  const packageSource = landingImages.filter((item) => item.usageSection === `${campaign.slug}_package`);

  const heroImageUrl = heroSource.length > 0 ? getImageUrl(heroSource[0].image) : "";
  const aboutImageUrl = aboutImages.length > 0 ? getImageUrl(aboutImages[0].image) : "";
  const stripImageUrls = stripSource.slice(0, 6).map((item) => getImageUrl(item.image)).filter(Boolean);
  const packageImageUrl = packageSource.length > 0 ? getImageUrl(packageSource[0].image) : "";

  return (
    <LandingPageClient
      campaign={campaign}
      heroImageUrl={heroImageUrl}
      aboutImageUrl={aboutImageUrl}
      aboutContent={aboutContent}
      stripImageUrls={stripImageUrls}
      packageImageUrl={packageImageUrl}
    />
  );
}
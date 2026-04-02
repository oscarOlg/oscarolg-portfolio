import type { Metadata } from "next";
import { notFound } from "next/navigation";
import LandingPageClient from "./components/LandingPageClient";
import { getLeadMagnetBySlug, getLeadMagnetSlugs } from "@/config/lead-magnets";
import { getAboutContent, getImageUrl, getPortfolioImagesByCategory, getPortfolioImagesByUsage } from "@/lib/sanity";

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

  const titleMap: Record<string, string> = {
    'engagementGiveaway': 'Giveaway Sesión de Compromiso Gratis',
  };

  const descriptionMap: Record<string, string> = {
    'engagementGiveaway': 'Participa en el giveaway de sesión de compromiso gratis y recibe una experiencia editorial guiada con contacto rápido por WhatsApp.',
  };

  const campaignTitle = titleMap[campaign.i18nKey] || 'Landing Page';
  const campaignDesc = descriptionMap[campaign.i18nKey] || 'Exclusive giveaway landing page';

  return {
    title: campaignTitle,
    description: campaignDesc,
    openGraph: {
      title: campaignTitle,
      description: campaignDesc,
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

  const [aboutContent, stripByUsage, fallbackWeddingImages] = await Promise.all([
    getAboutContent(),
    getPortfolioImagesByUsage("landing", `${campaign.slug}_strip`),
    getPortfolioImagesByCategory("weddings"),
  ]);

  const stripSource = stripByUsage.length > 0 ? stripByUsage : fallbackWeddingImages;
  const stripImageUrls = stripSource.slice(0, 6).map((item) => getImageUrl(item.image, 1200)).filter(Boolean);

  const heroImageUrl = stripImageUrls[0] || getImageUrl(fallbackWeddingImages[0]?.image, 1400);
  const aboutImageUrl = getImageUrl(aboutContent?.mainImage, 1000) || heroImageUrl;

  return (
    <LandingPageClient
      campaign={campaign}
      heroImageUrl={heroImageUrl}
      aboutImageUrl={aboutImageUrl}
      stripImageUrls={stripImageUrls}
    />
  );
}

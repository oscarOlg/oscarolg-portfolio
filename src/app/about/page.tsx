import type { Metadata } from "next";
import { getAboutContent } from "@/lib/sanity";
import AboutPageContent from "./components/AboutPageContent";

export const metadata: Metadata = {
  title: 'Acerca de',
  description: 'Conoce a Oscar Sanchez, fotógrafo en Ciudad Juárez especializado en bodas, retratos y parejas. Su promesa: confianza y tranquilidad absoluta durante todo el proceso.',
  openGraph: {
    title: 'Acerca de | Oscar Sanchez Fotógrafo',
    description: 'Fotógrafo radicado en Ciudad Juárez. Documentando momentos que merecen perdurar.',
    url: '/about',
  },
};

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <AboutPageContent
      heading={about?.heading}
      headingEn={about?.headingEn}
      paragraphs={about?.paragraphs}
      paragraphsEn={about?.paragraphsEn}
      ctaText={about?.ctaText}
      ctaTextEn={about?.ctaTextEn}
      imageUrl={about?.mainImage?.asset?.url ?? null}
    />
  );
}

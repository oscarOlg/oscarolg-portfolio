import type { Metadata } from "next";
import { getAboutContent } from "@/lib/sanity";
import AboutPageContent from "./components/AboutPageContent";

export const metadata: Metadata = {
  title: 'Acerca de | Fotógrafo de Bodas en Ciudad Juárez',
  description: 'Fotógrafo de bodas en Ciudad Juárez con enfoque editorial. Conoce el proceso detrás de cada cobertura pensado para que disfrutes tu boda sin estrés.',
  openGraph: {
    title: 'Acerca de | Fotógrafo de Bodas en Ciudad Juárez',
    description: 'Cobertura editorial de bodas en Ciudad Juárez para parejas que quieren disfrutar su día y recordarlo con estilo.',
    url: '/about',
  },
};

export const revalidate = 60;

export default async function AboutPage() {
  const about = await getAboutContent();

  return (
    <AboutPageContent
      imageUrl={about?.mainImage?.asset?.url ?? null}
    />
  );
}

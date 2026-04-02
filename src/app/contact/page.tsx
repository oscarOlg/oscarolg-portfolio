import type { Metadata } from "next";
import { getImageUrl, getPortfolioImageBySlug, getPortfolioImagesByCategory } from "@/lib/sanity";
import ContactPageClient from "./components/ContactPageClient";

export const metadata: Metadata = {
  title: 'Contacto | Fotógrafo de Bodas en Ciudad Juárez',
  description: 'Consulta disponibilidad para cobertura editorial de bodas en Ciudad Juárez. Respuesta rápida por WhatsApp con proceso claro y sin fricción.',
  openGraph: {
    title: 'Contacto | Fotógrafo de Bodas en Ciudad Juárez',
    description: 'Consulta disponibilidad para cobertura editorial de bodas en Ciudad Juárez.',
    url: '/contact',
  },
};

// Revalidate every 60 seconds (ISR with fresh Sanity data)
export const revalidate = 60;

export default async function ContactPage() {
  // Prefer pinned hero image, then fallback to first weddings image.
  const [contactImage, weddingImages] = await Promise.all([
    getPortfolioImageBySlug("weddings-p-e-8ca09067dscf3244"),
    getPortfolioImagesByCategory("weddings"),
  ]);
  const fallbackContactImage = contactImage ?? weddingImages[0] ?? null;
  const contactImageUrl = getImageUrl(fallbackContactImage?.image);

  return <ContactPageClient contactImageUrl={contactImageUrl} />;
}
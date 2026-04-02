import type { Metadata } from "next";
import { getImageUrl, getPortfolioImageBySlug } from "@/lib/sanity";
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
  // Fetch the contact page image from Sanity
  const contactImage = await getPortfolioImageBySlug("weddings-p-e-8ca09067dscf3244");
  const contactImageUrl = getImageUrl(contactImage?.image);

  return <ContactPageClient contactImageUrl={contactImageUrl} />;
}
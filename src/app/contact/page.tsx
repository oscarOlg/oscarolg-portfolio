import type { Metadata } from "next";
import { getServicePackages, getImageUrl, getPortfolioImageBySlug } from "@/lib/sanity";
import ContactPageClient from "./components/ContactPageClient";

export const metadata: Metadata = {
  title: 'Contacto | Oscar Olg Fotógrafo Juárez',
  description: 'Contacta a Oscar Olg, fotógrafo en Juárez. Reserva tu sesión de retratos o bodas por WhatsApp. Respondo en 2 horas.',
  keywords: 'fotógrafo Juárez, contacto fotógrafo, sesiones fotos, bodas Juárez',
  openGraph: {
    title: 'Contacto | Oscar Olg Fotógrafo en Juárez',
    description: 'Agenda tu sesión fotográfica en Juárez. Envíame un mensaje en WhatsApp y hablaremos de tu sesión perfecta.',
    url: '/contact',
  },
};

// Revalidate every 60 seconds (ISR with fresh Sanity data)
export const revalidate = 60;

export default async function ContactPage() {
  // Fetch all service packages for the dynamic form
  const packages = await getServicePackages();

  // Fetch the contact page image from Sanity
  const contactImage = await getPortfolioImageBySlug("weddings-p-e-8ca09067dscf3244");
  const contactImageUrl = getImageUrl(contactImage?.image);

  return <ContactPageClient packages={packages} contactImageUrl={contactImageUrl} />;
}
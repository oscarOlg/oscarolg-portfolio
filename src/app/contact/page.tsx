import type { Metadata } from "next";
import { getServicePackages, getImageUrl, getPortfolioImageBySlug } from "@/lib/sanity";
import ContactPageClient from "./components/ContactPageClient";

export const metadata: Metadata = {
  title: 'Contacto',
  description: 'Reserva tu sesión fotográfica con Oscar Sanchez en Ciudad Juárez. Bodas, retratos, parejas y más. Cotiza ahora y recibe respuesta en 24 horas.',
  openGraph: {
    title: 'Contacto | Oscar Sanchez Fotógrafo',
    description: 'Agenda tu sesión. Bodas, retratos y más en Ciudad Juárez.',
    url: '/contact',
  },
};

export default async function ContactPage() {
  // Fetch all service packages for the dynamic form
  const packages = await getServicePackages();

  // Fetch the contact page image from Sanity
  const contactImage = await getPortfolioImageBySlug("weddings-p-e-8ca09067dscf3244");
  const contactImageUrl = getImageUrl(contactImage?.image);

  return <ContactPageClient packages={packages} contactImageUrl={contactImageUrl} />;
}
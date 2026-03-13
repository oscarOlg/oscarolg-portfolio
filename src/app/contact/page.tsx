import { getServicePackages, getImageUrl, getPortfolioImageBySlug } from "@/lib/sanity";
import type { ServicePackage, PortfolioImage } from "@/types/sanity";
import ContactPageClient from "./components/ContactPageClient";

export default async function ContactPage() {
  // Fetch all service packages for the dynamic form
  const packages = await getServicePackages();

  // Fetch the contact page image from Sanity
  const contactImage = await getPortfolioImageBySlug("weddings-p-e-8ca09067dscf3244");
  const contactImageUrl = getImageUrl(contactImage?.image);

  return <ContactPageClient packages={packages} contactImageUrl={contactImageUrl} />;
}
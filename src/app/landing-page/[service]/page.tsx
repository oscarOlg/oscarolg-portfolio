import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { SERVICES, getServiceByKey } from "@/config/services";
import {
  getPortfolioImagesByCategory,
  getServicePackagesByCategory,
  getTestimonials,
} from "@/lib/sanity";
import type { Testimonial } from "@/types/sanity";
import LandingPageClient from "./LandingPageClient";

export const revalidate = 60;

interface PageProps {
  params: Promise<{ service: string }>;
}

function getServiceScopedTestimonials(serviceKey: string, testimonials: Testimonial[]) {
  const serviceMap: Record<string, string[]> = {
    weddings: ["boda", "wedding"],
    portrait: ["retrato", "portrait"],
    couples: ["pareja", "couple", "grupal"],
    maternity: ["maternidad", "maternity"],
    commercial: ["comercial", "commercial", "marca", "brand"],
    editorial: ["editorial"],
  };

  const keywords = serviceMap[serviceKey] ?? [];
  const scoped = testimonials.filter((item) => {
    const haystack = `${item.role ?? ""} ${item.text}`.toLowerCase();
    return keywords.some((k) => haystack.includes(k));
  });

  if (scoped.length > 0) return scoped;
  return testimonials.filter((item) => item.featured).slice(0, 3);
}

export async function generateStaticParams() {
  return SERVICES.map((service) => ({ service: service.key }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { service } = await params;
  const cfg = getServiceByKey(service);

  if (!cfg) {
    return {
      title: "Landing",
      description: "Service landing page",
    };
  }

  return {
    title: `${cfg.name} | Landing`,
    description: `Landing page de ${cfg.name} en Ciudad Juarez. Paquetes, ejemplos y contacto rapido.`,
    openGraph: {
      title: `${cfg.name} | Landing`,
      description: `Conoce paquetes y agenda tu sesion de ${cfg.name}.`,
      url: `/landing-page/${service}`,
    },
  };
}

export default async function ServiceLandingPage({ params }: PageProps) {
  const { service } = await params;
  const serviceCfg = getServiceByKey(service);

  if (!serviceCfg) notFound();

  const [packages, images, testimonials] = await Promise.all([
    getServicePackagesByCategory(service),
    getPortfolioImagesByCategory(serviceCfg.portfolio_category),
    getTestimonials(),
  ]);

  const landingTestimonials = getServiceScopedTestimonials(service, testimonials).slice(0, 3);
  return (
    <LandingPageClient
      serviceKey={service}
      serviceCfg={serviceCfg}
      packages={packages}
      images={images}
      testimonials={landingTestimonials}
    />
  );
}

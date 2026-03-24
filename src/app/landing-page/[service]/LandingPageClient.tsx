"use client";

import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect, useMemo, useRef } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { ServiceTypeConfig } from "@/config/services";
import { getImageUrl } from "@/lib/sanity";
import { getLandingContent } from "@/lib/landing-content";
import { event as gaEvent, fbEvent } from "@/lib/analytics";
import ServiceLandingHero from "@/components/landing/ServiceLandingHero";
import ServiceBenefits from "@/components/landing/ServiceBenefits";
import ServiceFAQ from "@/components/landing/ServiceFAQ";
import type { PortfolioImage, ServicePackage, Testimonial } from "@/types/sanity";

interface LandingPageClientProps {
  serviceKey: string;
  serviceCfg: ServiceTypeConfig;
  packages: ServicePackage[];
  images: PortfolioImage[];
  testimonials: Testimonial[];
}

const WA_NUMBER = "526562932374";

function formatPrice(price: number) {
  return `$${price.toLocaleString("es-MX")} MXN`;
}

export default function LandingPageClient({
  serviceKey,
  serviceCfg,
  packages,
  images,
  testimonials,
}: LandingPageClientProps) {
  const searchParams = useSearchParams();
  const { lang } = useLanguage();
  const content = getLandingContent(serviceKey, lang);
  const trackedViewRef = useRef<string>("");

  const utmData = useMemo(() => {
    const source = searchParams.get("utm_source") || "";
    const medium = searchParams.get("utm_medium") || "";
    const campaign = searchParams.get("utm_campaign") || "";
    const contentParam = searchParams.get("utm_content") || "";
    const term = searchParams.get("utm_term") || "";

    return {
      source,
      medium,
      campaign,
      content: contentParam,
      term,
    };
  }, [searchParams]);

  const appendUtmToHref = (baseHref: string) => {
    const [path, queryString] = baseHref.split("?");
    const params = new URLSearchParams(queryString || "");

    if (utmData.source) params.set("utm_source", utmData.source);
    if (utmData.medium) params.set("utm_medium", utmData.medium);
    if (utmData.campaign) params.set("utm_campaign", utmData.campaign);
    if (utmData.content) params.set("utm_content", utmData.content);
    if (utmData.term) params.set("utm_term", utmData.term);

    const qs = params.toString();
    return qs ? `${path}?${qs}` : path;
  };

  const trackCtaClick = (ctaName: string) => {
    gaEvent({
      action: "landing_cta_click",
      category: "Landing",
      label: `${serviceKey}:${ctaName}`,
      params: {
        service_key: serviceKey,
        cta_name: ctaName,
        utm_source: utmData.source,
        utm_medium: utmData.medium,
        utm_campaign: utmData.campaign,
        utm_content: utmData.content,
      },
    });

    fbEvent("Lead", {
      content_name: serviceKey,
      content_category: "landing_cta",
      cta_name: ctaName,
      utm_source: utmData.source,
      utm_medium: utmData.medium,
      utm_campaign: utmData.campaign,
    });
  };

  useEffect(() => {
    const trackingKey = [
      serviceKey,
      utmData.source,
      utmData.medium,
      utmData.campaign,
      utmData.content,
      utmData.term,
    ].join("|");

    if (trackedViewRef.current === trackingKey) return;
    trackedViewRef.current = trackingKey;

    gaEvent({
      action: "landing_page_view",
      category: "Landing",
      label: serviceKey,
      params: {
        service_key: serviceKey,
        utm_source: utmData.source,
        utm_medium: utmData.medium,
        utm_campaign: utmData.campaign,
        utm_content: utmData.content,
        utm_term: utmData.term,
      },
    });

    fbEvent("ViewContent", {
      content_name: serviceKey,
      content_category: "landing_page",
      utm_source: utmData.source,
      utm_medium: utmData.medium,
      utm_campaign: utmData.campaign,
    });
  }, [serviceKey, utmData]);

  const galleryImages = images.slice(0, 8);
  const landingTestimonials = testimonials.slice(0, 3);
  const popularPackage = packages.find((pkg) => pkg.popular) ?? packages[0] ?? null;

  const message = encodeURIComponent(
    lang === "en"
      ? `Hi Oscar, I am interested in a ${serviceCfg.nameEn} session. Can you share package details and availability?`
      : `Hola Oscar, me interesa una sesion de ${serviceCfg.name}. Quiero mas informacion de paquetes y disponibilidad.`
  );
  const whatsappLink = `https://wa.me/${WA_NUMBER}?text=${message}`;

  return (
    <div className="w-full">
      <ServiceLandingHero
        serviceKey={serviceKey}
        content={content}
        heroImageUrl={images[0] ? getImageUrl(images[0].image, 1800) : undefined}
        heroImageAlt={images[0]?.title ?? serviceCfg.name}
      />

      <section className="w-full px-6 md:px-12 py-10 bg-secondary text-dominant">
        <div className="max-w-6xl mx-auto text-center font-sans tracking-wide text-sm md:text-base">
          {content.socialProof}
        </div>
      </section>

      <ServiceBenefits
        title={lang === "en" ? "Why choose this session" : "Por que elegir esta sesion"}
        subtitle={
          lang === "en"
            ? "A clear process for a calm experience and share-ready results."
            : "Proceso claro. Experiencia sin estres. Fotos que veras toda la vida."
        }
        benefits={content.benefits}
      />

      <section className="w-full px-6 md:px-12 py-20 bg-dominant">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-secondary text-center mb-10">
            {lang === "en" ? "Featured gallery" : "Galeria de trabajos"}
          </h2>
          {galleryImages.length > 0 ? (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              {galleryImages.map((image) => (
                <div key={image._id} className="relative aspect-[3/4] overflow-hidden">
                  <Image
                    src={getImageUrl(image.image, 700, 900)}
                    alt={image.title}
                    fill
                    className="object-cover hover:scale-[1.03] transition-transform duration-500"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 font-sans">
              {lang === "en"
                ? "Gallery for this service will be published soon."
                : "Muy pronto agregaremos galeria para este servicio."}
            </p>
          )}
        </div>
      </section>

      {landingTestimonials.length > 0 && (
        <section className="w-full px-6 md:px-12 py-20 bg-[#f8f7f4]">
          <div className="max-w-6xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl text-secondary text-center mb-10">
              {lang === "en" ? "Testimonials" : "Testimonios"}
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {landingTestimonials.map((item) => (
                <article key={item._id} className="bg-dominant border border-gray-200 p-7">
                  <p className="font-sans text-accent mb-3">★★★★★</p>
                  <p className="font-sans text-gray-700 italic leading-relaxed">&quot;{item.text}&quot;</p>
                  <p className="font-sans text-sm text-secondary mt-5 font-semibold">{item.author}</p>
                  {item.role && <p className="font-sans text-xs text-gray-500">{item.role}</p>}
                </article>
              ))}
            </div>
          </div>
        </section>
      )}

      <section id="service-packages" className="w-full px-6 md:px-12 py-20 bg-dominant">
        <div className="max-w-6xl mx-auto">
          <h2 className="font-serif text-3xl md:text-5xl text-secondary text-center mb-10">
            {lang === "en" ? "Packages" : "Paquetes"}
          </h2>
          {packages.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {packages
                .filter((pkg) => !pkg.isSpecialVariant)
                .slice(0, 3)
                .map((pkg) => (
                  <article
                    key={pkg._id}
                    className={`border p-7 flex flex-col ${pkg.popular ? "border-accent shadow-md" : "border-gray-200"}`}
                  >
                    <h3 className="font-serif text-2xl text-secondary mb-3">{lang === "en" && pkg.nameEn ? pkg.nameEn : pkg.name}</h3>
                    <p className="font-sans text-xs uppercase tracking-widest text-gray-500 mb-5">
                      {lang === "en" && pkg.descriptionEn ? pkg.descriptionEn : pkg.description}
                    </p>
                    {((lang === "en" && pkg.featuresEn?.length ? pkg.featuresEn : pkg.features) ?? []).length > 0 && (
                      <ul className="font-sans text-sm text-gray-700 space-y-2 mb-7 flex-grow">
                        {((lang === "en" && pkg.featuresEn?.length ? pkg.featuresEn : pkg.features) ?? [])
                          .slice(0, 5)
                          .map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <span className="text-accent mt-0.5">•</span>
                              <span>{feature}</span>
                            </li>
                          ))}
                      </ul>
                    )}
                    <p className="font-serif text-3xl text-secondary mt-auto mb-6">{formatPrice(pkg.price)}</p>
                    <Link
                      href={appendUtmToHref(`/contact?service=${serviceKey}&packageId=${pkg._id}`)}
                      onClick={() => trackCtaClick(`package_${pkg._id}`)}
                      className="text-center bg-secondary text-dominant uppercase tracking-widest text-xs py-4 font-bold hover:bg-accent hover:text-secondary transition-colors"
                    >
                      {lang === "en" ? "Book consultation" : "Reservar consulta"}
                    </Link>
                  </article>
                ))}
            </div>
          ) : (
            <p className="text-center text-gray-600 font-sans">
              {lang === "en" ? "No packages published for this service yet." : "No hay paquetes publicados para este servicio aun."}
            </p>
          )}
        </div>
      </section>

      <section className="w-full px-6 md:px-12 py-16 bg-accent/10 border-y border-accent/30">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-4">{content.urgency.headline}</h2>
          <p className="font-sans text-gray-700 mb-8 leading-relaxed">{content.urgency.description}</p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={appendUtmToHref(`/contact?service=${serviceKey}${popularPackage ? `&packageId=${popularPackage._id}` : ""}`)}
              onClick={() => trackCtaClick("urgency_contact")}
              className="bg-secondary text-dominant uppercase tracking-widest text-xs md:text-sm px-8 py-4 font-bold hover:bg-accent hover:text-secondary transition-colors"
            >
              {content.urgency.cta}
            </Link>
            <a
              href={whatsappLink}
              onClick={() => trackCtaClick("urgency_whatsapp")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-secondary text-secondary uppercase tracking-widest text-xs md:text-sm px-8 py-4 font-bold hover:bg-secondary hover:text-dominant transition-colors"
            >
              {lang === "en" ? "Direct WhatsApp" : "WhatsApp directo"}
            </a>
          </div>
        </div>
      </section>

      <section className="w-full px-6 md:px-12 py-14 bg-[#f6f3ee] border-b border-accent/30">
        <div className="max-w-4xl mx-auto text-center">
          <h3 className="font-serif text-2xl md:text-3xl text-secondary mb-3">
            {lang === "en"
              ? "Still deciding?"
              : "¿Aun no decides?"}
          </h3>
          <p className="font-sans text-gray-700 mb-7 leading-relaxed">
            {lang === "en"
              ? "Get our free wedding planning guide and continue the conversation on WhatsApp."
              : "Descarga nuestra guia gratuita para planear tu boda y continua por WhatsApp."}
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link
              href={appendUtmToHref("/recursos/guia-bodas")}
              onClick={() => trackCtaClick("guide_page")}
              className="bg-secondary text-dominant uppercase tracking-widest text-xs md:text-sm px-8 py-4 font-bold hover:bg-accent hover:text-secondary transition-colors"
            >
              {lang === "en" ? "View free guide" : "Ver guia gratis"}
            </Link>
            <a
              href={`https://wa.me/${WA_NUMBER}?text=${encodeURIComponent(
                lang === "en"
                  ? "Hi Oscar, I want the free wedding photography guide."
                  : "Hola Oscar, quiero la guia gratuita de fotografia de bodas."
              )}`}
              onClick={() => trackCtaClick("guide_whatsapp")}
              target="_blank"
              rel="noopener noreferrer"
              className="border border-secondary text-secondary uppercase tracking-widest text-xs md:text-sm px-8 py-4 font-bold hover:bg-secondary hover:text-dominant transition-colors"
            >
              {lang === "en" ? "Request by WhatsApp" : "Pedir por WhatsApp"}
            </a>
          </div>
        </div>
      </section>

      <ServiceFAQ title={lang === "en" ? "Frequently asked questions" : "Preguntas frecuentes"} faqs={content.faq} />
    </div>
  );
}

// src/app/services/ServicesContent.tsx
"use client";

import Image from "next/image";
import Link from "next/link";

import PackagesShowcase from "./components/PackagesShowcase";
import { getImageUrl } from "@/lib/sanity";
import type { ServiceConfig, ServicePackage, PortfolioImage } from "@/types/sanity";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";

interface Props {
  config: ServiceConfig;
  packages: ServicePackage[];
  heroImage: PortfolioImage | null;
  weddingImages: PortfolioImage[];
}
type LocalizedTestimonial = {
  author: string;
  text: string;
  highlight: string;
  imageTitle?: string;
  imageAlt: string;
};

function normalizeTitle(value?: string) {
  return (value ?? "").trim().toLowerCase();
}

export default function ServicesContent({ config, packages, heroImage, weddingImages }: Props) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const services = locale.services as Record<string, unknown>;
  const heroImageUrl = heroImage ? getImageUrl(heroImage.image, 1200) : null;
  const galleryTop = weddingImages.slice(0, 6);

  const testimonials = locale.testimonials as LocalizedTestimonial[];
  const ketzia = testimonials.find((item) => /Ketzia/i.test(item.author));
  const testimonialImage = ketzia?.imageTitle
    ? weddingImages.find((img) => normalizeTitle(img.title) === normalizeTitle(ketzia.imageTitle))
    : null;

  const pricingFaqs =
    lang === "en"
      ? [
          {
            question: "What if we do not know how to pose? We feel shy in front of the camera.",
            answer:
              "This is the most common concern, so do not worry. My approach is not to force awkward poses, but to guide you subtly so interaction feels natural. The Save the Date session works as a relaxed rehearsal to break the ice and help you discover how easy it is to look incredible.",
          },
          {
            question: "We do not want to spend hours taking photos on the wedding day. We want to enjoy the party. How do you handle timing?",
            answer:
              "Completely agree. We keep the formal couple session agile so you can return to your event quickly. The rest of the day is documentary coverage: my priority is capturing spontaneous moments, laughter, and real action without you needing to worry about the camera.",
          },
          {
            question: "How long does it take to deliver our photos?",
            answer:
              "With Signature Collection, you receive a 30-photo Sneak Peek the next day so you can share immediately. The complete gallery with cinematic editing is delivered in approximately 4 to 6 weeks.",
          },
          {
            question: "Are there hidden costs? What if the party is amazing and we want you to stay longer?",
            answer:
              "Zero hidden costs. Transparency is a priority. If the dance floor is on fire and you decide to extend coverage, extra hours are available at $2,000 MXN each. You always control that decision.",
          },
          {
            question: "Do you deliver all raw files, or how does your cinematic style work?",
            answer:
              "I do not deliver raw files. I carefully curate the strongest moments and every delivered image includes our cinematic treatment: intentional color and light work that gives your memories a film-like finish.",
          },
          {
            question: "Do you help us choose locations in Ciudad Juarez for our Save the Date session?",
            answer:
              "Absolutely. I share great location recommendations in the city and nearby areas, plus a quick guide on color palettes and outfits so everything stays aligned with the editorial style.",
          },
          {
            question: "We love the experience. What is the next step to reserve our date?",
            answer:
              "Simple: we schedule a short video call, choose the collection that fits your day, and secure your date with a 30% retainer and digital contract. After that, I take care of the rest.",
          },
        ]
      : [
          {
            question: "Que pasa si no sabemos posar? Somos super penosos frente a la camara.",
            answer:
              "Es lo mas comun, no se preocupen. Mi enfoque no es forzar poses incomodas, sino guiarlos sutilmente para que interactuen natural. La sesion previa Save the Date funciona como un ensayo relajado para romper el hielo y descubrir lo facil que es salir increibles.",
          },
          {
            question: "No queremos pasarnos horas tomandonos fotos el dia de la boda. Queremos disfrutar la fiesta. Como manejas los tiempos?",
            answer:
              "Totalmente de acuerdo. Haremos la sesion formal de pareja de forma agil para que regresen a su evento. El resto del dia hago fotografia documental: mi prioridad es capturar momentos espontaneos, risas y accion real, sin que ustedes esten pendientes de la camara.",
          },
          {
            question: "Cuanto tiempo tardas en entregarnos nuestras fotografias?",
            answer:
              "Con Signature reciben un Sneak Peek de 30 fotos al dia siguiente para compartir de inmediato. La galeria completa con edicion cinematografica se entrega en un plazo aproximado de 4 a 6 semanas.",
          },
          {
            question: "Hay costos ocultos? Que pasa si la fiesta esta increible y queremos que te quedes mas tiempo?",
            answer:
              "Cero costos ocultos. La transparencia es prioridad. Si el dia de la boda la pista esta a tope y deciden extender cobertura, pueden solicitar horas extra por $2,000 MXN cada una. Ustedes siempre tienen el control de esa decision.",
          },
          {
            question: "Entregas todas las fotos crudas o como funciona el estilo cinematografico?",
            answer:
              "No entrego archivos crudos RAW. Hago una curaduria cuidadosa de los mejores momentos y cada fotografia incluye nuestra edicion cinematografica: tratamiento de color e iluminacion que le da acabado de pelicula a sus recuerdos.",
          },
          {
            question: "Tu nos ayudas a decidir lugares en Ciudad Juarez para la sesion previa?",
            answer:
              "Claro. Les comparto recomendaciones de locaciones increibles en la ciudad y alrededores, ademas de una guia rapida de colores y outfits para que todo armonice con el estilo fotografico.",
          },
          {
            question: "Nos encanta la experiencia. Cual es el siguiente paso para apartar fecha?",
            answer:
              "Es sencillo. Agendamos una videollamada corta, eligen la coleccion ideal para su dia, y apartamos fecha con un anticipo del 30% y contrato digital. Despues de eso, yo me encargo del resto.",
          },
        ];

  return (
    <div className="flex flex-col w-full">
      <section className="mb-10 md:mb-12">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3 h-[22rem] md:h-[30rem] overflow-hidden">
          <div className="relative col-span-2 row-span-2">
            {galleryTop[0] ? (
              <Image src={getImageUrl(galleryTop[0].image, 1200)} alt={galleryTop[0].title || "Wedding story"} fill className="object-cover" priority />
            ) : (
              <div className="w-full h-full bg-secondary/15" />
            )}
          </div>
          {galleryTop.slice(1, 5).map((img) => (
            <div key={img._id} className="relative">
              <Image src={getImageUrl(img.image, 800)} alt={img.title || "Wedding frame"} fill className="object-cover" />
            </div>
          ))}
        </div>
      </section>

      <section className="mb-14 text-center px-3">
        <p className="text-xs uppercase tracking-[0.22em] text-gray-500 font-semibold mb-3">
          {(services.eyebrow as string | undefined) ?? "Inversion para bodas"}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-secondary leading-tight max-w-4xl mx-auto mb-4">
          {(services.title as string | undefined) ?? "No es solo un dia, es una vida"}
        </h1>
        <p className="font-sans text-base md:text-lg text-gray-700 max-w-3xl mx-auto leading-relaxed">
          {lang === "en"
            ? "Your wedding goes by fast. What stays for decades is your visual legacy. This page is designed to guide you clearly from value to action."
            : "Tu boda pasa rapido. Lo que se queda por decadas es su legado visual. Esta pagina esta disenada para guiarlos con claridad del valor a la accion."}
        </p>
      </section>

      <section id="collections" className="w-full mb-12">
        <PackagesShowcase />
      </section>

      {ketzia && (
        <section className="mb-14 border border-gray-200 bg-white overflow-hidden">
          <div className="grid grid-cols-1 md:grid-cols-[0.75fr_1.25fr]">
            <div className="relative min-h-[16rem] md:min-h-full">
              {testimonialImage ? (
                <Image
                  src={getImageUrl(testimonialImage.image, 900)}
                  alt={ketzia.imageAlt}
                  fill
                  className="object-cover"
                />
              ) : heroImageUrl ? (
                <Image
                  src={heroImageUrl}
                  alt={ketzia.imageAlt}
                  fill
                  className="object-cover"
                />
              ) : (
                <div className="w-full h-full bg-secondary/10" />
              )}
            </div>
            <div className="p-6 md:p-10">
              <p className="text-xs uppercase tracking-[0.2em] text-gray-500 font-semibold mb-4">
                {lang === "en" ? "Client Story" : "Prueba Real"}
              </p>
              <p className="font-serif text-2xl md:text-3xl text-secondary leading-relaxed mb-5">
                "{ketzia.highlight}"
              </p>
              <p className="font-sans text-gray-700 leading-relaxed mb-6">
                {ketzia.text}
              </p>
              <p className="font-medium text-secondary">{ketzia.author}</p>
            </div>
          </div>
        </section>
      )}

      {pricingFaqs.length > 0 && (
        <section className="mb-12 border border-gray-200 bg-gray-50 px-8 md:px-12 py-10">
          <h2 className="font-serif text-3xl text-secondary mb-3 text-center">
            {(services.faqTitle as string | undefined) ?? "Preguntas frecuentes"}
          </h2>
          <p className="text-sm text-gray-600 text-center mb-8 max-w-3xl mx-auto">
            {(services.faqIntro as string | undefined) ?? "Resolvemos dudas comunes antes de reservar."}
          </p>
          <div className="max-w-4xl mx-auto space-y-4">
            {pricingFaqs.map((faq, idx) => (
              <details key={idx} className="bg-white border border-gray-200 p-4">
                <summary className="cursor-pointer font-semibold text-secondary">
                  {faq.question}
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-gray-700">{faq.answer}</p>
              </details>
            ))}
          </div>
        </section>
      )}

      <section className="bg-secondary text-dominant px-8 py-10 text-center border border-secondary">
        <h2 className="font-serif text-3xl md:text-4xl mb-4">
          {(services.finalCtaTitle as string | undefined) ?? "Si su fecha es importante, asegurala hoy"}
        </h2>
        <p className="text-sm md:text-base text-gray-300 max-w-3xl mx-auto mb-7">
          {(services.finalCtaBody as string | undefined) ?? "Trabajo fechas limitadas para mantener calidad y acompanamiento."}
        </p>
        <Link
          href="/contact"
          className="inline-block bg-accent text-secondary px-8 py-3 uppercase tracking-widest text-xs font-bold hover:bg-accent/90 transition-colors"
        >
          {(services.ctaPrimary as string | undefined) ?? "Consultar disponibilidad"}
        </Link>
      </section>
    </div>
  );
}

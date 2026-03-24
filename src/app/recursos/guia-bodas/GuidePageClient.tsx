"use client";

import { useLanguage } from "@/contexts/LanguageContext";

const WA_NUMBER = "526562932374";

const GUIDE_TOPICS_ES = [
  "Cuando contratar a tu fotografo",
  "Preguntas clave antes de reservar",
  "Timeline recomendado para tu boda",
  "Locaciones sugeridas en Ciudad Juarez",
  "Checklist de fotos esenciales",
  "Errores comunes que debes evitar",
];

const GUIDE_TOPICS_EN = [
  "When to book your photographer",
  "Key questions before you reserve",
  "Recommended wedding day timeline",
  "Suggested locations in Ciudad Juarez",
  "Essential photo checklist",
  "Common mistakes to avoid",
];

export default function GuidePageClient() {
  const { lang } = useLanguage();

  const whatsappMessage = encodeURIComponent(
    lang === "en"
      ? "Hi Oscar, I would like to receive the free wedding photography guide."
      : "Hola Oscar, me gustaria recibir la guia gratuita de fotografia de bodas."
  );

  const topics = lang === "en" ? GUIDE_TOPICS_EN : GUIDE_TOPICS_ES;

  return (
    <main className="min-h-screen bg-[#f8f7f4] px-6 md:px-12 py-20">
      <section className="max-w-4xl mx-auto text-center">
        <p className="font-sans text-xs uppercase tracking-[0.24em] text-secondary/60 mb-4">
          {lang === "en" ? "Free Download" : "Descarga Gratuita"}
        </p>
        <h1 className="font-serif text-4xl md:text-6xl text-secondary leading-tight mb-6">
          {lang === "en"
            ? "The Wedding Photography Planning Guide"
            : "La Guia para Planear tu Fotografia de Boda"}
        </h1>
        <p className="font-sans text-base md:text-lg text-gray-700 max-w-3xl mx-auto mb-12 leading-relaxed">
          {lang === "en"
            ? "A practical guide to organize your wedding photos, plan your timeline, and book with confidence."
            : "Una guia practica para organizar tus fotos de boda, planear tu timeline y reservar con confianza."}
        </p>
      </section>

      <section className="max-w-4xl mx-auto bg-dominant border border-accent/30 p-8 md:p-12 shadow-sm">
        <h2 className="font-serif text-2xl md:text-3xl text-secondary mb-6">
          {lang === "en" ? "What you will get" : "Lo que vas a recibir"}
        </h2>
        <ul className="space-y-3 mb-10">
          {topics.map((topic) => (
            <li key={topic} className="font-sans text-gray-700 flex gap-3">
              <span className="text-accent font-semibold">•</span>
              <span>{topic}</span>
            </li>
          ))}
        </ul>

        <div className="bg-[#f6f3ee] border-l-4 border-accent p-5 mb-8">
          <p className="font-sans text-sm text-gray-700">
            {lang === "en"
              ? "Delivery expectation: we send the guide through WhatsApp in under 5 minutes during business hours."
              : "Entrega estimada: enviamos la guia por WhatsApp en menos de 5 minutos en horario laboral."}
          </p>
        </div>

        <a
          href={`https://wa.me/${WA_NUMBER}?text=${whatsappMessage}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block w-full md:w-auto bg-[#25D366] text-white uppercase tracking-widest text-xs md:text-sm px-8 py-4 font-bold hover:brightness-95 transition-all"
        >
          {lang === "en" ? "Request guide by WhatsApp" : "Solicitar guia por WhatsApp"}
        </a>
      </section>
    </main>
  );
}
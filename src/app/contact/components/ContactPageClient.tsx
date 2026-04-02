"use client";

import React from "react";
import Image from "next/image";
import ContactFormClient from "@/app/contact/components/ContactFormClient";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";

interface ContactPageClientProps {
  contactImageUrl: string;
}

export default function ContactPageClient({
  contactImageUrl,
}: ContactPageClientProps) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const contact = locale.contact;

  return (
    <div className="w-full max-w-6xl mx-auto pt-8 px-4 md:px-8 pb-12">
      <div className="w-full flex flex-col">
        <section className="relative w-full h-[24rem] md:h-[30rem] mb-12 overflow-hidden rounded-2xl border border-gray-200 shadow-[0_14px_36px_rgba(15,23,42,0.12)]">
          <Image
            src={contactImageUrl}
            alt={contact.imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 pb-8 md:pb-10">
            <p className="text-xs uppercase tracking-[0.22em] text-accent font-semibold mb-3">
              {lang === "en" ? "Let us craft your story" : "Construyamos su historia"}
            </p>
            <h1 className="font-serif text-4xl md:text-6xl text-dominant leading-tight max-w-3xl">
              {contact.heading}
            </h1>
            <p className="font-sans text-sm md:text-base text-gray-200 leading-relaxed mt-4 max-w-3xl">
              {contact.intro}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <ContactFormClient />

          <aside className="border border-gray-200 rounded-xl p-6 bg-gradient-to-b from-white to-gray-50/70 shadow-[0_10px_24px_rgba(15,23,42,0.08)] lg:sticky lg:top-24">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500 font-semibold mb-3">
              {lang === "en" ? "What happens next" : "Que sigue despues"}
            </p>
            <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
              <li>{lang === "en" ? "1. We review your event details." : "1. Revisamos los detalles de su evento."}</li>
              <li>{lang === "en" ? "2. We confirm availability and best-fit collection." : "2. Confirmamos disponibilidad y la coleccion ideal."}</li>
              <li>{lang === "en" ? "3. You receive a clear next step to reserve your date." : "3. Reciben un siguiente paso claro para reservar su fecha."}</li>
            </ul>

            <div className="mt-6 pt-5 border-t border-gray-200">
              <p className="font-serif text-xl text-secondary leading-tight">
                {lang === "en" ? "Prefer to see real stories first?" : "Prefieren ver historias reales primero?"}
              </p>
              <a
                href="/portfolio"
                className="inline-block mt-4 border border-secondary px-6 py-2.5 uppercase tracking-widest text-xs font-bold text-secondary hover:bg-secondary hover:text-dominant transition-colors"
              >
                {lang === "en" ? "View Portfolio" : "Ver Portafolio"}
              </a>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

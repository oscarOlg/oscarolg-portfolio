"use client";

import React from "react";
import Image from "next/image";
import ContactFormClient from "@/app/contact/components/ContactFormClient";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";

interface ContactPageClientProps {
  contactImageUrl?: string;
}

export default function ContactPageClient({
  contactImageUrl,
}: ContactPageClientProps) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const contact = locale.contact;
  const safeContactImageUrl =
    contactImageUrl ||
    "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=2070&auto=format&fit=crop";

  return (
    <div className="w-full max-w-6xl mx-auto pt-8 px-4 md:px-8 pb-12">
      <div className="w-full flex flex-col">
        <section className="relative w-full h-[24rem] md:h-[30rem] mb-12 overflow-hidden rounded-2xl border border-gray-200 shadow-[0_14px_36px_rgba(15,23,42,0.12)]">
          <Image
            src={safeContactImageUrl}
            alt={contact.imageAlt}
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/35 to-transparent" />
          <div className="absolute inset-0 flex flex-col justify-end px-6 md:px-10 pb-8 md:pb-10">
            <h1 className="font-serif text-4xl md:text-6xl text-dominant leading-tight max-w-3xl">
              {contact.heading}
            </h1>
            <p className="font-sans text-sm md:text-base text-accent leading-relaxed mt-4 max-w-3xl">
              {contact.intro}
            </p>
          </div>
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-[1.2fr_0.8fr] gap-8 items-start">
          <ContactFormClient />

          <aside className="border border-gray-200 rounded-xl p-6 bg-gradient-to-b from-white to-gray-50/70 shadow-[0_10px_24px_rgba(15,23,42,0.08)]">
            <p className="text-xs uppercase tracking-[0.18em] text-gray-500 font-semibold mb-3">
              {contact.nextStepsTitle}
            </p>
            <ul className="space-y-3 text-sm text-gray-700 leading-relaxed">
              {contact.nextStepsItems.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>

            <div className="mt-6 pt-5 border-t border-gray-200">
              <p className="font-serif text-xl text-secondary leading-tight">
                {contact.sidebarQuestion}
              </p>
              <a
                href="/portfolio"
                className="inline-block mt-4 border border-secondary px-6 py-2.5 uppercase tracking-widest text-xs font-bold text-secondary hover:bg-secondary hover:text-dominant transition-colors"
              >
                {contact.sidebarPortfolioCta}
              </a>
            </div>
          </aside>
        </section>
      </div>
    </div>
  );
}

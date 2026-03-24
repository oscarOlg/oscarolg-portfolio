"use client";

import type { LandingFaq } from "@/lib/landing-content";

interface ServiceFAQProps {
  title: string;
  faqs: LandingFaq[];
}

export default function ServiceFAQ({ title, faqs }: ServiceFAQProps) {
  return (
    <section className="w-full px-6 md:px-12 py-20 bg-dominant">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl text-secondary text-center mb-10">{title}</h2>
        <div className="space-y-4">
          {faqs.map((item) => (
            <details key={item.q} className="group border border-gray-200 p-5 md:p-6 bg-gray-50">
              <summary className="font-sans text-sm md:text-base font-semibold text-secondary cursor-pointer list-none flex justify-between gap-6">
                <span>{item.q}</span>
                <span className="text-accent transition-transform group-open:rotate-45">+</span>
              </summary>
              <p className="mt-4 text-sm md:text-base text-gray-700 leading-relaxed">{item.a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

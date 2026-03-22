"use client";

import type { LandingBenefit } from "@/lib/landing-content";

interface ServiceBenefitsProps {
  title: string;
  subtitle: string;
  benefits: LandingBenefit[];
}

export default function ServiceBenefits({ title, subtitle, benefits }: ServiceBenefitsProps) {
  return (
    <section className="w-full px-6 md:px-12 py-20 bg-[#f7f3eb]">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-serif text-3xl md:text-5xl text-center mb-4 text-secondary">{title}</h2>
        <p className="font-sans text-gray-600 text-center max-w-2xl mx-auto mb-12">{subtitle}</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {benefits.map((benefit) => (
            <article
              key={benefit.title}
              className="bg-dominant border border-gray-200 p-6 md:p-7 shadow-[0_6px_22px_rgba(0,0,0,0.05)]"
            >
              <div className="h-1 w-12 bg-accent mb-4" />
              <h3 className="font-serif text-xl text-secondary mb-3">{benefit.title}</h3>
              <p className="font-sans text-sm text-gray-700 leading-relaxed">{benefit.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

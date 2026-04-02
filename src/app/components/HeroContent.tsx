"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";

/**
 * Client component for above-the-fold hero animations.
 * Uses mount-time animation (not scroll-triggered) so it plays on initial load.
 */
export default function HeroContent() {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const hero = locale.homepage.hero;

  const displayHeading = hero.title;
  const displayHeadingItalic = hero.titleAccent;
  const displayCtaPrimary = hero.ctaPrimary;
  const displayCtaSecondary = hero.ctaSecondary;
  const promiseLine = hero.subtitle;
  const urgencyLine = hero.urgency;

  return (
    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-6 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-lg mb-8"
      >
        {displayHeading}{" "}
        <span className="italic text-accent">{displayHeadingItalic}</span>
      </motion.h1>

      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.55, ease: [0.22, 1, 0.36, 1] }}
        className="font-sans text-sm md:text-base text-white/90 max-w-2xl leading-relaxed mb-8"
      >
        {promiseLine}
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/contact"
          className="inline-block bg-accent text-secondary font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-white hover:-translate-y-1 transition-all duration-300 font-bold border border-accent"
        >
          {displayCtaPrimary}
        </Link>
        <Link
          href="/portfolio"
          className="inline-block bg-transparent text-white font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 font-semibold border border-white/60"
        >
          {displayCtaSecondary}
        </Link>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.55, delay: 0.88, ease: [0.22, 1, 0.36, 1] }}
        className="mt-6 flex items-center gap-3"
      >
        <span className="h-px w-8 bg-white/40" aria-hidden="true" />
        <span className="font-serif italic text-sm md:text-base text-accent/95 tracking-[0.02em]">
          {urgencyLine}
        </span>
        <span className="h-px w-8 bg-white/40" aria-hidden="true" />
      </motion.div>
    </div>
  );
}

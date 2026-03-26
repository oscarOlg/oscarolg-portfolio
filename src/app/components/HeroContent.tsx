"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useLanguage, pickLang } from "@/contexts/LanguageContext";

interface Props {
  heading?: string;
  headingEn?: string;
  headingItalic?: string;
  headingItalicEn?: string;
  cta1Text?: string;
  cta1TextEn?: string;
  cta2Text?: string;
  cta2TextEn?: string;
}

/**
 * Client component for above-the-fold hero animations.
 * Uses mount-time animation (not scroll-triggered) so it plays on initial load.
 */
export default function HeroContent({
  heading = "No eres modelo",
  headingEn = "You're not a model",
  headingItalic = "aquí no necesitas serlo",
  headingItalicEn = "here, you don't need to be",
  cta1Text = "Ver mi portafolio",
  cta1TextEn,
  cta2Text = "Cotizar sesión",
  cta2TextEn,
}: Props) {
  const { lang } = useLanguage();

  const displayHeading = pickLang(lang, heading, headingEn) ?? heading;
  const displayHeadingItalic = pickLang(lang, headingItalic, headingItalicEn) ?? headingItalic;
  const displayCta1 = pickLang(lang, cta1Text, cta1TextEn) ?? cta1Text;
  const displayCta2 = pickLang(lang, cta2Text, cta2TextEn) ?? cta2Text;

  return (
    <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center px-6 text-center">
      <motion.h2
        initial={{ opacity: 0, y: 28 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className="font-serif text-4xl md:text-5xl lg:text-6xl text-white leading-tight drop-shadow-lg mb-8"
      >
        {displayHeading}{" "}
        <span className="italic text-accent">{displayHeadingItalic}</span>
      </motion.h2>

      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, delay: 0.75, ease: [0.22, 1, 0.36, 1] }}
        className="flex flex-col sm:flex-row items-center gap-4"
      >
        <Link
          href="/portfolio"
          className="inline-block bg-accent text-secondary font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-white hover:-translate-y-1 transition-all duration-300 font-bold border border-accent"
        >
          {displayCta1}
        </Link>
        <Link
          href="/contact"
          className="inline-block bg-transparent text-white font-sans uppercase tracking-widest text-sm py-4 px-10 hover:bg-white/10 hover:-translate-y-1 transition-all duration-300 font-semibold border border-white/60"
        >
          {displayCta2}
        </Link>
      </motion.div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Socials from "./Socials";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

function HamburgerIcon({ isOpen }: { isOpen: boolean }) {
  return (
    <motion.svg
      width="22"
      height="14"
      viewBox="0 0 22 14"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <motion.line
        x1="0" y1="1" x2="22" y2="1"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
        animate={isOpen ? { x1: 2, y1: 0, x2: 20, y2: 14 } : { x1: 0, y1: 1, x2: 22, y2: 1 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
      />
      <motion.line
        x1="0" y1="7" x2="22" y2="7"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
        style={{ transformOrigin: "11px 7px" }}
        animate={isOpen ? { opacity: 0, scaleX: 0 } : { opacity: 1, scaleX: 1 }}
        transition={{ duration: 0.15, ease: "easeInOut" }}
      />
      <motion.line
        x1="0" y1="13" x2="22" y2="13"
        stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"
        animate={isOpen ? { x1: 2, y1: 14, x2: 20, y2: 0 } : { x1: 0, y1: 13, x2: 22, y2: 13 }}
        transition={{ duration: 0.28, ease: "easeInOut" }}
      />
    </motion.svg>
  );
}

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { lang, setLang } = useLanguage();

  const tr = (obj: { es: string; en: string }) => (lang === "en" ? obj.en : obj.es);

  const navLinks = [
    { href: "/portfolio", label: tr(t.nav.portfolio) },
    { href: "/services",  label: tr(t.nav.services) },
    { href: "/about",     label: tr(t.nav.about) },
    { href: "/contact",   label: tr(t.nav.contact) },
  ];

  const isActive = (href: string) =>
    href !== "/" && href !== "/#about" && pathname.startsWith(href);

  return (
    <header className="fixed top-0 left-0 w-full z-50 bg-secondary/90 backdrop-blur-md text-dominant border-b border-white/10 shadow-md">
      {/* ── Main bar ── */}
      <div className="h-16 px-6 md:px-12 flex items-center justify-between md:grid md:grid-cols-[1fr_auto_1fr] max-w-7xl mx-auto w-full">

        {/* LEFT — Brand */}
        <Link href="/" className="flex flex-col leading-none">
          <span className="font-serif text-xl md:text-2xl tracking-widest uppercase drop-shadow-sm">
            Oscar Olg
          </span>
          <span className="font-sans font-light text-[9px] tracking-[0.28em] uppercase mt-0.5 opacity-70">
            Photography
          </span>
        </Link>

        {/* CENTER — Nav links (desktop only) */}
        <nav className="hidden md:flex items-center gap-8" aria-label={lang === "en" ? "Main navigation" : "Navegación principal"}>
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-xs uppercase tracking-widest transition-colors pb-0.5 border-b ${
                isActive(href)
                  ? "border-accent text-accent"
                  : "border-transparent hover:text-accent hover:border-accent"
              }`}
            >
              {label}
            </Link>
          ))}
        </nav>

        {/* RIGHT — Language toggle + Socials (desktop) | Hamburger (mobile) */}
        <div className="hidden md:flex items-center justify-end gap-5">
          {/* Language toggle */}
          <div className="flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.2em] pr-5 border-r border-white/20">
            <button
              onClick={() => setLang("es")}
              className={`transition-opacity ${lang === "es" ? "opacity-100" : "opacity-35 hover:opacity-65"}`}
              aria-label="Cambiar a Español"
            >
              ES
            </button>
            <span className="opacity-25">/</span>
            <button
              onClick={() => setLang("en")}
              className={`transition-opacity ${lang === "en" ? "opacity-100" : "opacity-35 hover:opacity-65"}`}
              aria-label="Switch to English"
            >
              EN
            </button>
          </div>
          <Socials
            containerClassName="flex gap-5"
            itemClassName="hover:text-accent transition-colors"
          />
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="md:hidden p-2 -mr-2 hover:text-accent transition-colors"
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          aria-label="Toggle menu"
          aria-expanded={isMobileMenuOpen}
        >
          <HamburgerIcon isOpen={isMobileMenuOpen} />
        </button>
      </div>

      {/* ── Mobile dropdown ── */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className="md:hidden bg-secondary text-dominant border-t border-white/10 shadow-lg overflow-hidden"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="flex flex-col px-6 py-6 gap-0">
              {navLinks.map(({ href, label }, i) => (
                <motion.div
                  key={href}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.22, ease: "easeOut" }}
                >
                  <Link
                    href={href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={`block font-sans text-sm uppercase tracking-widest border-b border-white/10 py-4 transition-colors ${
                      isActive(href) ? "text-accent" : "hover:text-accent"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Language toggle — mobile */}
              <motion.div
                className="flex items-center gap-3 py-4 border-b border-white/10"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: navLinks.length * 0.055, duration: 0.22, ease: "easeOut" }}
              >
                <button
                  onClick={() => setLang("es")}
                  className={`font-sans text-sm uppercase tracking-widest transition-colors ${
                    lang === "es" ? "text-accent" : "opacity-40 hover:opacity-75"
                  }`}
                  aria-label="Cambiar a Español"
                >
                  ES
                </button>
                <span className="opacity-25 text-sm">/</span>
                <button
                  onClick={() => setLang("en")}
                  className={`font-sans text-sm uppercase tracking-widest transition-colors ${
                    lang === "en" ? "text-accent" : "opacity-40 hover:opacity-75"
                  }`}
                  aria-label="Switch to English"
                >
                  EN
                </button>
              </motion.div>

              <motion.div
                className="pt-6 pb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.055 + 0.055 + 0.08, duration: 0.2 }}
              >
                <Socials
                  containerClassName="flex gap-6"
                  itemClassName="hover:text-accent transition-colors text-dominant/60"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


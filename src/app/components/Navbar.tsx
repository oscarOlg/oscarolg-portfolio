"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useRef, useEffect, useLayoutEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Socials from "./Socials";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";

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
  const TOP_TRANSPARENCY_THRESHOLD = 96;
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isAtTop, setIsAtTop] = useState(true);
  const [isHydrated, setIsHydrated] = useState(false);
  const { lang, setLang } = useLanguage();
  const locale = getSiteLocale(lang);
  const headerRef = useRef<HTMLElement>(null);
  const isHomepage = pathname === "/";
  const isPrivateGuide = pathname.includes('/private-investment-guide');
  
  useEffect(() => {
    if (!isMobileMenuOpen) return;
    function handleClickOutside(e: MouseEvent) {
      if (headerRef.current && !headerRef.current.contains(e.target as Node)) {
        setIsMobileMenuOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [isMobileMenuOpen]);

  // Mark hydration complete immediately
  useLayoutEffect(() => {
    setIsHydrated(true);
  }, []);

  // Initialize nav state BEFORE paint based on current scroll
  useLayoutEffect(() => {
    if (!isHomepage && !isPrivateGuide) {
      setIsAtTop(false);
      return;
    }
    
    const currentScrollY = typeof window !== 'undefined' ? window.scrollY : 0;
    setIsAtTop(currentScrollY < TOP_TRANSPARENCY_THRESHOLD);
  }, [isHomepage, isPrivateGuide, TOP_TRANSPARENCY_THRESHOLD]);

  useEffect(() => {
    if (!isHomepage && !isPrivateGuide) {
      setIsAtTop(false);
      return;
    }

    const handleScroll = () => {
      setIsAtTop(window.scrollY < TOP_TRANSPARENCY_THRESHOLD);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHomepage, isPrivateGuide]);

  const navLinks = [
    { href: "/portfolio", label: locale.nav.portfolio },
    { href: "/services",  label: locale.nav.services },
    { href: "/about",     label: locale.nav.about },
    { href: "/contact",   label: locale.nav.contact },
  ];

  const isActive = (href: string) =>
    href !== "/" && href !== "/#about" && pathname.startsWith(href);

  // Only two states: transparent at top, or solid background
  const isTransparent = (isHomepage || isPrivateGuide) && isAtTop && !isMobileMenuOpen;

  return (
    <header
      ref={headerRef}
      className={`fixed top-0 left-0 w-full z-50 border-b transition-all duration-300 ${
        !isHydrated || isTransparent
          ? "bg-transparent border-transparent shadow-none backdrop-blur-0 text-dominant"
          : "bg-white/85 backdrop-blur-md border-white/20 shadow-sm text-secondary"
      }`}
    >
      {/* ── Main bar ── */}
      <div className="h-16 px-6 lg:px-12 flex items-center justify-between lg:grid lg:grid-cols-[1fr_auto_1fr] max-w-7xl mx-auto w-full">

        {/* LEFT — Brand */}
        <Link href="/" onClick={() => setIsMobileMenuOpen(false)} className="flex flex-col leading-none">
          <span className="font-serif text-xl md:text-2xl tracking-widest uppercase drop-shadow-sm">
            Oscar Olg
          </span>
          <span className="font-sans font-light text-[9px] tracking-[0.28em] uppercase mt-0.5 opacity-70">
            Photography
          </span>
        </Link>

        {/* CENTER — Nav links (desktop only) */}
        <nav className="hidden lg:flex items-center gap-8" aria-label={locale.nav.mainAria}>
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
        <div className="hidden lg:flex items-center justify-end gap-5">
          {/* Language toggle */}
          <div className={`flex items-center gap-1.5 font-sans text-[10px] uppercase tracking-[0.2em] pr-5 border-r ${
            isTransparent ? "border-white/20" : "border-black/15"
          }`}>
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
            itemClassName={`transition-colors ${
              isTransparent 
                ? "hover:text-accent" 
                : "text-secondary hover:text-accent"
            }`}
          />
        </div>

        {/* Hamburger (mobile) */}
        <button
          className="lg:hidden p-2 -mr-2 hover:text-accent transition-colors"
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
            className={`lg:hidden border-t shadow-lg overflow-hidden ${
              isTransparent
                ? "bg-white/85 text-secondary border-white/20"
                : "bg-white/85 text-secondary border-white/20"
            }`}
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
                    className={`block font-sans text-sm uppercase tracking-widest border-b border-black/10 py-4 transition-colors ${
                      isActive(href) ? "text-accent" : "hover:text-accent"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}

              {/* Language toggle — mobile */}
              <motion.div
                className="flex items-center gap-3 py-4 border-b border-black/10"
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
                  itemClassName="hover:text-accent transition-colors text-secondary"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}


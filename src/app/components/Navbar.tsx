"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Socials from "./Socials";

const navLinks = [
  { href: "/portfolio", label: "Portafolio" },
  { href: "/services", label: "Servicios y precios" },
  { href: "/about", label: "Acerca de" },
  { href: "/contact", label: "Contacto" },
];

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
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  useEffect(() => {
    // Use IntersectionObserver instead of scroll events.
    //
    // Why: scroll events are unreliable after momentum/fling gestures on iOS and
    // Android — the browser may never fire a final event once the position settles.
    // scrollend helps on newer browsers but still has gaps.
    // Next.js soft navigation resets scrollY to 0 without firing any scroll event,
    // so a scroll-listener approach permanently breaks transparency after nav changes.
    //
    // IntersectionObserver fires whenever the sentinel's intersection with the
    // viewport changes — via user scroll, momentum settle, programmatic reset,
    // or Next.js navigation — regardless of how it happened.

    // Sentinel: 1×60px block at document (0,0), absolutely positioned so it is
    // out of layout flow but still scrolls with the document.
    const sentinel = document.createElement("div");
    sentinel.setAttribute("aria-hidden", "true");
    sentinel.style.cssText =
      "position:absolute;top:0;left:0;width:1px;height:60px;pointer-events:none;";
    document.body.prepend(sentinel);

    const observer = new IntersectionObserver(
      ([entry]) => setScrolled(!entry.isIntersecting),
      { threshold: 0 }
    );
    observer.observe(sentinel);

    // Sync immediately — component may mount while page is already scrolled
    setScrolled(sentinel.getBoundingClientRect().bottom <= 0);

    return () => {
      observer.disconnect();
      sentinel.remove();
    };
  }, []);

  const isTransparent = isHome && !scrolled && !isMobileMenuOpen;

  const isActive = (href: string) =>
    href !== "/" && href !== "/#about" && pathname.startsWith(href);

  return (
    <header
      className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b ${
        isTransparent
          ? "bg-transparent text-white border-transparent"
          : "bg-dominant/85 backdrop-blur-md text-secondary border-gray-200/60 shadow-sm"
      }`}
    >
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
        <nav className="hidden md:flex items-center gap-8" aria-label="Navegación principal">
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

        {/* RIGHT — Socials (desktop) | Hamburger (mobile) */}
        <div className="hidden md:flex items-center justify-end">
          <Socials
            containerClassName="flex gap-5"
            itemClassName="hover:text-accent transition-colors"
          />
        </div>
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
            className="md:hidden bg-dominant text-secondary border-t border-gray-200/70 shadow-lg overflow-hidden"
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
                    className={`block font-sans text-sm uppercase tracking-widest border-b border-gray-200/70 py-4 transition-colors ${
                      isActive(href) ? "text-accent" : "hover:text-accent"
                    }`}
                  >
                    {label}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                className="pt-6 pb-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: navLinks.length * 0.055 + 0.08, duration: 0.2 }}
              >
                <Socials
                  containerClassName="flex gap-6"
                  itemClassName="hover:text-accent transition-colors text-secondary/50"
                />
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}

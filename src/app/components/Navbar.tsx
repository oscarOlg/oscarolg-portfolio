"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Socials from "./Socials";

const navLinks = [
  { href: "/portfolio", label: "Portafolio" },
  { href: "/services", label: "Servicios y precios" },
  { href: "/about", label: "Acerca de" },
  { href: "/contact", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const isHome = pathname === "/";

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  // Track scroll position for homepage transparency
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Transparent only on homepage when at the very top and menu is closed
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
      {/* ── Main bar: h-16, true 3-column grid so nav links are always centered ── */}
      <div className="h-16 px-6 md:px-12 grid grid-cols-[1fr_auto_1fr] items-center max-w-7xl mx-auto w-full">

        {/* COL 1 LEFT — Brand + hamburger */}
        <div className="flex items-center gap-4">
          <button
            className="md:hidden font-sans text-xs uppercase tracking-widest border border-current px-3 py-1.5 hover:bg-current hover:text-dominant transition-colors"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? "✕" : "≡"}
          </button>
          <Link href="/" className="flex flex-col leading-none">
            <span className="font-serif text-xl md:text-2xl tracking-widest uppercase drop-shadow-sm">
              Oscar Olg
            </span>
            <span className="font-sans font-light text-[9px] tracking-[0.28em] uppercase mt-0.5 opacity-70">
              Photography
            </span>
          </Link>
        </div>

        {/* COL 2 CENTER — Nav links (desktop only) */}
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

        {/* COL 3 RIGHT — Socials (desktop) | empty on mobile */}
        <div className="hidden md:flex items-center justify-end">
          <Socials
            containerClassName="flex gap-5"
            itemClassName="hover:text-accent transition-colors"
          />
        </div>
      </div>

      {/* ── Mobile dropdown ── */}
      <div
        className={`md:hidden overflow-hidden transition-all duration-300 ease-in-out bg-dominant text-secondary ${
          isMobileMenuOpen
            ? "max-h-96 opacity-100 border-t border-gray-200 shadow-lg"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="flex flex-col px-6 py-6 gap-0">
          {navLinks.map(({ href, label }) => (
            <Link
              key={href}
              href={href}
              className={`font-sans text-sm uppercase tracking-widest border-b border-gray-200 py-4 transition-colors ${
                isActive(href) ? "text-accent" : "hover:text-accent"
              }`}
            >
              {label}
            </Link>
          ))}
          <div className="pt-6 pb-2">
            <Socials
              containerClassName="flex gap-6"
              itemClassName="hover:text-accent transition-colors text-gray-500"
            />
          </div>
        </div>
      </div>
    </header>
  );
}
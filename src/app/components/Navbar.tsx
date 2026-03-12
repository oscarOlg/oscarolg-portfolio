"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import Socials from "./Socials"; 

export default function Navbar() {
  const pathname = usePathname();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isHome = pathname === "/";
  const isSolid = !isHome || isMobileMenuOpen;

  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [pathname]);

  return (
    <header
      className={`w-full transition-all duration-300 z-50 ${
        /* 1. Lógica de Posición: En el Home SIEMPRE flota por encima */
        isHome ? "absolute top-0 left-0" : "relative"
      } ${
        /* 2. Lógica de Color: Crema si es otra página o si el menú está abierto */
        isSolid
          ? "bg-dominant text-secondary border-b border-gray-200"
          : "text-white bg-transparent"
      }`}
    >
      <div className="py-6 px-6 md:px-12 flex flex-col items-center">
        
        <div className="w-full max-w-7xl flex justify-between items-center md:items-start">
          
          <div className="hidden md:block pt-2">
            <Socials containerClassName="flex gap-5" itemClassName="hover:text-accent transition-colors" />
          </div>

          <div className="flex-1 md:text-center text-left">
            <Link href="/">
              <h1 className="font-serif text-3xl md:text-5xl tracking-widest uppercase drop-shadow-sm">
                Oscar
              </h1>
            </Link>
          </div>

          <div className="block md:hidden">
            <button 
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="font-sans text-xs uppercase tracking-widest border border-current px-4 py-2 hover:bg-current hover:text-dominant transition-colors"
            >
              {isMobileMenuOpen ? "Cerrar" : "Menú"}
            </button>
          </div>

          <div className="hidden md:block w-32"></div>
        </div>

<nav className="hidden md:flex mt-8 gap-10 text-sm tracking-widest uppercase">
          <Link href="/portfolio" className="hover:text-accent transition-colors pb-1 border-b border-transparent hover:border-accent">Portafolio</Link>
          <Link href="/services" className="hover:text-accent transition-colors pb-1 border-b border-transparent hover:border-accent">Servicios y precios</Link>
          <Link href="/#about" className="hover:text-accent transition-colors pb-1 border-b border-transparent hover:border-accent">Acerca de</Link>
          <Link href="/contact" className="hover:text-accent transition-colors pb-1 border-b border-transparent hover:border-accent">Contacto</Link>
        </nav>
      </div>

      {/* MENÚ DESPLEGABLE MÓVIL (Ahora con absolute top-full) */}
      <div 
        className={`md:hidden absolute top-full left-0 w-full bg-dominant text-secondary overflow-hidden transition-all duration-300 ease-in-out shadow-lg ${
          isMobileMenuOpen ? "max-h-96 opacity-100 border-t border-b border-gray-200" : "max-h-0 opacity-0"
        }`}
      >
  <div className="flex flex-col items-end px-6 py-8 gap-6">
          <Link href="/portfolio" className="font-sans text-lg uppercase tracking-widest border-b border-gray-300 pb-1 w-full text-right hover:text-accent hover:border-accent">Portafolio</Link>
          <Link href="/services" className="font-sans text-lg uppercase tracking-widest border-b border-gray-300 pb-1 w-full text-right hover:text-accent hover:border-accent">Servicios y precios</Link>
          <Link href="/#about" className="font-sans text-lg uppercase tracking-widest border-b border-gray-300 pb-1 w-full text-right hover:text-accent hover:border-accent">Acerca de</Link>
          <Link href="/contact" className="font-sans text-lg uppercase tracking-widest border-b border-gray-300 pb-1 w-full text-right hover:text-accent hover:border-accent">Contacto</Link>
          
          <div className="mt-6 w-full flex justify-end">
            <Socials containerClassName="flex gap-6 text-gray-500" itemClassName="hover:text-accent transition-colors" />
          </div>
        </div>
      </div>
    </header>
  );
}
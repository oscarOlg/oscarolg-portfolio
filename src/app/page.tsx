import Image from "next/image";
import Link from "next/link";
import AboutSection from "./components/AboutSection";
import InvestmentSection from "./components/InvestmentSection";

export default function Home() {
  return (
    <div className="flex flex-col w-full">
      
      {/* 1. HERO SECTION */}
      <section className="relative w-full h-[100dvh] flex flex-col items-center justify-end pb-32 md:pb-32 text-center px-4">
        <div className="absolute top-0 left-0 w-full h-full -z-10 overflow-hidden">
          <Image 
            src="https://images.unsplash.com/photo-1511285560929-80b456fea0bc?q=80&w=2069&auto=format&fit=crop"
            alt="Pareja de bodas"
            fill
            className="object-cover grayscale"
            priority
          />
          <div className="absolute inset-0 bg-black/40 md:bg-black/30"></div>
          <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-black/70 to-transparent"></div>
        </div>

        <div className="relative z-10 max-w-4xl mx-auto flex flex-col items-center">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-5xl text-white leading-tight drop-shadow-lg mb-6">
            Fotografía que captura <span className="italic text-accent">la esencia de tu historia</span>
          </h2>
          
          <Link href="/services" className="bg-accent text-secondary font-sans uppercase tracking-widest text-sm md:py-4 py-8 px-10 hover:bg-white hover:-translate-y-1 transition-all duration-300 font-bold border border-accent">
            Cotizar sesión o evento
          </Link>
        </div>
      </section>

      {/* 2. INVERSIÓN Y SERVICIOS */}
      <InvestmentSection />

      {/* 3. SOBRE MÍ */}
      <AboutSection />

    </div>
  );
}
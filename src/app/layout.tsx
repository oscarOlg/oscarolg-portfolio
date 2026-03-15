// src/app/layout.tsx
import type { Metadata } from "next";
import Link from "next/link";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";
import Navbar from "./components/Navbar";
import NavbarSpacer from "./components/NavbarSpacer";
import Socials from "./components/Socials";

// Initialize fonts
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ["latin"], variable: '--font-lato' });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    template: '%s | Oscar Sanchez Fotógrafo',
    default: 'Oscar Sanchez | Fotógrafo en Ciudad Juárez',
  },
  description: 'Fotógrafo profesional en Ciudad Juárez. Especializado en bodas, retratos, parejas y maternidad. Capturando momentos que merecen perdurar.',
  openGraph: {
    siteName: 'Oscar Sanchez Fotógrafo',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Oscar Sanchez — Fotógrafo en Ciudad Juárez',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    images: ['/og-image.jpg'],
  },
};

const footerLinks = [
  { href: "/portfolio", label: "Portafolio" },
  { href: "/services", label: "Servicios" },
  { href: "/about", label: "Acerca de" },
  { href: "/contact", label: "Contacto" },
];

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${lato.variable} font-sans bg-dominant text-secondary antialiased min-h-screen flex flex-col relative`}>
        
        {/* Dynamic Navigation */}
        <Navbar />
        <NavbarSpacer />

        {/* Main Content */}
        <main className="flex-grow w-full">
          {children}
        </main>

        {/* Global Footer */}
        <footer className="w-full mt-auto border-t border-gray-200/80 bg-dominant">
          <div className="max-w-7xl mx-auto px-6 md:px-12 pt-20 pb-10 md:pt-24 md:pb-12">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-14 md:gap-8 items-start">
              <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-sm md:max-w-none">
                <Link href="/" className="flex flex-col leading-none mb-5">
                  <span className="font-serif text-2xl tracking-widest uppercase">
                    Oscar Olg
                  </span>
                  <span className="font-sans font-light text-[10px] tracking-[0.28em] uppercase mt-1 text-secondary/60">
                    Photography
                  </span>
                </Link>
                <p className="font-serif italic text-lg text-secondary/80 max-w-md mb-5">
                  Fotografía con sensibilidad editorial para bodas, retratos, pareja, maternidad y campañas visuales.
                </p>
                <a
                  href="mailto:oscar.olg.photo@gmail.com"
                  className="font-sans text-xs uppercase tracking-widest text-secondary/70 border-b border-secondary/30 pb-1 hover:text-accent hover:border-accent transition-colors"
                >
                  oscar.olg.photo@gmail.com
                </a>
              </div>

              <div className="flex flex-col items-center md:items-center text-center">
                <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-secondary/45 mb-5">
                  Navegación
                </p>
                <div className="flex flex-col gap-3 items-center">
                  {footerLinks.map(({ href, label }) => (
                    <Link
                      key={href}
                      href={href}
                      className="font-sans text-sm text-secondary/80 hover:text-accent transition-colors"
                    >
                      {label}
                    </Link>
                  ))}
                </div>
              </div>

              <div className="flex flex-col items-center md:items-end text-center md:text-right">
                <p className="font-sans text-[11px] uppercase tracking-[0.24em] text-secondary/45 mb-5">
                  Contacto
                </p>
                <p className="font-sans text-sm text-secondary/80 mb-2">
                  Ciudad Juárez, México
                </p>
                <a
                  href="https://wa.me/526566956875"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-sans text-sm text-secondary/80 hover:text-accent transition-colors mb-5"
                >
                  WhatsApp: +52 656 695 6875
                </a>
                <Socials
                  containerClassName="flex gap-5"
                  itemClassName="text-secondary/70 hover:text-accent transition-colors"
                />
              </div>
            </div>

            <div className="mt-16 pt-8 border-t border-gray-200/70 flex flex-col md:flex-row gap-3 items-center justify-between text-center md:text-left">
              <p className="font-sans text-[11px] uppercase tracking-[0.2em] text-secondary/45">
                Oscar Olg Photography
              </p>
              <p className="font-sans text-xs text-secondary/50">
                Imágenes para recordar. Experiencia para disfrutar.
              </p>
            </div>
          </div>
        </footer>

        <Analytics />
      </body>
    </html>
  );
}
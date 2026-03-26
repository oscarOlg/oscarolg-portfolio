// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import Navbar from "./components/Navbar";
import NavbarSpacer from "./components/NavbarSpacer";
import Footer from "./components/Footer";
import HtmlLangUpdater from "./components/HtmlLangUpdater";
import MetaPixel from "./components/MetaPixel";
import { LanguageProvider } from "@/contexts/LanguageContext";

// Initialize fonts
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair', display: 'optional' });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ["latin"], variable: '--font-lato', display: 'optional' });

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body className={`${playfair.variable} ${lato.variable} font-sans bg-dominant text-secondary antialiased min-h-screen flex flex-col relative`}>
        <LanguageProvider>
          {/* Meta Pixel Tracking */}
          <MetaPixel />

          {/* Dynamic Navigation */}
          <Navbar />
          <NavbarSpacer />
          <HtmlLangUpdater />

          {/* Main Content */}
          <main className="flex-grow w-full">
            {children}
          </main>

          {/* Global Footer */}
          <Footer />
        </LanguageProvider>

        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
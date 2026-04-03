// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SpeedInsights } from "@vercel/speed-insights/next";
import Script from "next/script";
import "./globals.css";
import Navbar from "./components/Navbar";
import NavbarSpacer from "./components/NavbarSpacer";
import Footer from "./components/Footer";
import HtmlLangUpdater from "./components/HtmlLangUpdater";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { LocalBusinessSchema, CreatorSchema } from "./components/SchemaMarkup";
import { TestimonialsSchema } from "./components/TestimonialsSchema";

// Initialize fonts
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair', display: 'optional' });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ["latin"], variable: '--font-lato', display: 'optional' });

// ─── Google Analytics 4 Script Component ───────────────────
function GoogleAnalytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID;
  
  if (!gaId) {
    console.warn('GA4 Measurement ID not configured');
    return null;
  }

  return (
    <>
      <Script
        strategy="afterInteractive"
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
      />
      <Script
        id="google-analytics"
        strategy="afterInteractive"
        dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', '${gaId}', {
              page_path: window.location.pathname,
              page_title: document.title,
            });
          `,
        }}
      />
    </>
  );
}

// ─── Meta Pixel Script Component ───────────────────────────
function MetaPixel() {
  const pixelId = process.env.NEXT_PUBLIC_FB_PIXEL_ID;
  
  if (!pixelId) {
    console.warn('Meta Pixel ID not configured');
    return null;
  }

  return (
    <Script
      id="meta-pixel"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          !function(f,b,e,v,n,t,s)
          {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
          n.callMethod.apply(n,arguments):n.queue.push(arguments)};
          if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
          n.queue=[];t=b.createElement(e);t.async=!0;
          t.src=v;s=b.getElementsByTagName(e)[0];
          s.parentNode.insertBefore(t,s)}(window, document,'script',
          'https://connect.facebook.net/en_US/fbevents.js');
          fbq('init', '${pixelId}');
          fbq('track', 'PageView');
        `,
      }}
    />
  );
}

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? 'http://localhost:3000'),
  title: {
    template: '%s | Oscar Olg Photography',
    default: 'Oscar Olg Photography | Fotógrafo en Ciudad Juárez',
  },
  description: 'Fotógrafo de bodas en Ciudad Juárez con enfoque editorial. Cobertura auténtica para historias que merecen perdurar.',
  openGraph: {
    siteName: 'Oscar Olg Photography',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Oscar Olg Photography — Fotógrafo en Ciudad Juárez',
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
      <head>
        {/* Analytics Scripts */}
        <GoogleAnalytics />
        <MetaPixel />
        
        {/* Schema Markup */}
        <LocalBusinessSchema />
        <CreatorSchema />
        <TestimonialsSchema lang="es" />
      </head>
      <body className={`${playfair.variable} ${lato.variable} font-sans bg-dominant text-secondary antialiased min-h-screen flex flex-col relative`}>
        <LanguageProvider>
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
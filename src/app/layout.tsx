// src/app/layout.tsx
import type { Metadata } from "next";
import { Playfair_Display, Lato } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar"; 
import WhatsAppButton from "./components/WhatsAppButton";

// Initialize fonts
const playfair = Playfair_Display({ subsets: ["latin"], variable: '--font-playfair' });
const lato = Lato({ weight: ['300', '400', '700'], subsets: ["latin"], variable: '--font-lato' });

export const metadata: Metadata = {
  title: "Oscar Sanchez | Fotógrafo",
  description: "Fotografía de Bodas, Eventos y Retrato en Ciudad Juárez",
};

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

        {/* Main Content */}
        <main className="flex-grow w-full">
          {children}
        </main>

        <WhatsAppButton />

        {/* Global Footer */}
        <footer className="w-full py-12 text-center text-sm flex flex-col items-center border-t border-gray-200 mt-auto">
          <p className="font-serif italic mb-4">Fotógrafo de bodas, eventos y retrato</p>
          <a href="mailto:oscar.olg.photo@gmail.com" className="hover:text-accent border-b border-secondary pb-1 mb-4 transition-colors">
            oscar.olg.photo@gmail.com
          </a>
        </footer>

      </body>
    </html>
  );
}
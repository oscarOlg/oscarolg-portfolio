// src/components/WhatsAppButton.tsx
import React from "react";
import { WhatsappIcon } from "./Icons";

export default function WhatsAppButton() {
  return (
    <a
      href="whatsapp://send?phone=+525519689471"
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 md:bottom-10 md:right-10 z-50 bg-secondary text-dominant p-4 rounded-full shadow-lg hover:bg-accent hover:text-secondary hover:-translate-y-1 transition-all duration-300 flex items-center justify-center"
      aria-label="Contactar por WhatsApp"
    >
      <WhatsappIcon width={32} height={32} />
    </a>
  );
}
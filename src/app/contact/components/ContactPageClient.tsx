"use client";

import React, { useState } from "react";
import Image from "next/image";
import type { ServicePackage } from "@/types/sanity";
import ContactFormClient from "./ContactFormClient";
import QuickMessageBox from "./QuickMessageBox";

interface ContactPageClientProps {
  packages: ServicePackage[];
  contactImageUrl: string;
}

export default function ContactPageClient({
  packages,
  contactImageUrl,
}: ContactPageClientProps) {
  const [generatedMessage, setGeneratedMessage] = useState(
    "¡Hola Oscar! Soy [Tu Nombre]. \n\nTe comparto más detalles:\nmi idea es sobre..."
  );

  return (
    <div className="flex flex-col lg:flex-row w-full max-w-7xl mx-auto gap-16 lg:gap-20 pt-8 pb-20 px-4 md:px-8">
      {/* ================= COLUMNA IZQUIERDA: IMAGEN E INFO ================= */}
      <div className="lg:w-5/12 flex flex-col">
        <h1 className="font-serif text-4xl md:text-5xl text-secondary mb-6">
          Hablemos de tu visión
        </h1>
        <p className="font-sans text-base text-gray-600 leading-relaxed mb-10">
          Me encantaría conocer los detalles de lo que estás planeando. Llena el formulario de la derecha o genera un mensaje rápido para enviármelo directamente por tus redes favoritas.
        </p>

        {/* Imagen Horizontal (aspect-video) */}
        <div className="relative w-full aspect-video mb-12 shadow-md">
          <Image
            src={contactImageUrl}
            alt="Fotografía de contacto"
            fill
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
            priority
          />
        </div>

        {/* Quick Message Box */}
        <QuickMessageBox message={generatedMessage} />
      </div>

      {/* ================= COLUMNA DERECHA: FORMULARIO ================= */}
      <div className="lg:w-7/12 flex flex-col gap-12">
        <ContactFormClient
          allPackages={packages}
          onMessageUpdate={setGeneratedMessage}
        />
      </div>
    </div>
  );
}

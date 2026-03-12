"use client";

import React, { useState, useEffect } from "react";
import Image from "next/image";
import Socials from "../components/Socials";

export default function ContactContent() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    pkg: "",
    complements: [] as string[],
    message: "",
  });

  const [generatedMessage, setGeneratedMessage] = useState("");

  useEffect(() => {
    const { name, date, service, pkg, complements, message } = formData;
    
    let text = `¡Hola Oscar! Soy ${name || "[Tu Nombre]"}. `;
    
    // Lógica inteligente para cuando eligen "Otro"
    if (service === "Otro") {
      text += `Me gustaría platicar contigo sobre un proyecto de fotografía distinto. `;
    } else {
      text += `Me gustaría cotizar un servicio de ${service || "[Tipo de Servicio]"} `;
      if (pkg) text += `con el paquete ${pkg}. `;
    }
    
    if (date) text += `La fecha tentativa sería el ${date}. `;
    
    if (complements.length > 0) {
      text += `También me interesaría agregar: ${complements.join(", ")}. `;
    }
    
    if (message) {
      text += `\n\nTe comparto más detalles sobre mi idea:\n${message}`;
    }

    setGeneratedMessage(text);
  }, [formData]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setFormData((prev) => {
      const newComplements = checked 
        ? [...prev.complements, value]
        : prev.complements.filter((c) => c !== value);
      return { ...prev, complements: newComplements };
    });
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      alert("¡Mensaje enviado con éxito! Me pondré en contacto contigo muy pronto.");
    }, 1500);
  };

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
            src="https://images.unsplash.com/photo-1606800052052-a08af7148866?q=80&w=1974&auto=format&fit=crop" 
            alt="Fotografía de contacto" 
            fill 
            className="object-cover grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
      </div>

      {/* ================= COLUMNA DERECHA: GENERADOR Y FORMULARIO ================= */}
      <div className="lg:w-7/12 flex flex-col gap-12">
        
        {/* === CAJA DE MENSAJE RÁPIDO (AHORA ARRIBA) === */}
        <div className="bg-accent/10 border border-accent/20 p-8 relative">
          <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
          <h3 className="font-serif text-2xl text-secondary mb-2">Envío Rápido por Redes</h3>
          <p className="font-sans text-sm text-gray-600 mb-6">
            ¿Prefieres contactarme por WhatsApp o Instagram? A medida que llenes el formulario de abajo, se generará un mensaje automático aquí. Solo cópialo y pégalo en nuestro chat.
          </p>
          
          <div className="bg-white p-4 font-mono text-sm text-gray-700 whitespace-pre-wrap border border-gray-200 shadow-inner mb-6 min-h-[120px]">
            {generatedMessage}
          </div>

          {/* Contenedor Flex para alinear Botón y Socials */}
          <div className="flex flex-col sm:flex-row items-center gap-6">
            <button 
              onClick={handleCopy}
              className="flex items-center justify-center gap-2 bg-accent text-secondary uppercase tracking-widest text-xs font-semibold py-4 px-8 hover:bg-opacity-80 transition-colors w-full sm:w-auto"
            >
              {copied ? (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                  ¡Copiado al Portapapeles!
                </>
              ) : (
                <>
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"></path></svg>
                  Copiar Mensaje
                </>
              )}
            </button>
            
            {/* Componente Socials integrado al lado del botón */}
            <Socials />
          </div>
        </div>

        {/* === TARJETA DEL FORMULARIO (AHORA ABAJO) === */}
        <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
          <form onSubmit={handleSubmit} className="flex flex-col gap-8">
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="name" className="font-sans uppercase tracking-widest text-xs text-gray-500">Nombre completo *</label>
                <input type="text" id="name" value={formData.name} onChange={handleChange} required className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="email" className="font-sans uppercase tracking-widest text-xs text-gray-500">Correo electrónico *</label>
                <input type="email" id="email" value={formData.email} onChange={handleChange} required className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="phone" className="font-sans uppercase tracking-widest text-xs text-gray-500">Teléfono (Opcional)</label>
                <input type="tel" id="phone" value={formData.phone} onChange={handleChange} className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans" />
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="date" className="font-sans uppercase tracking-widest text-xs text-gray-500">Fecha tentativa</label>
                <input type="date" id="date" value={formData.date} onChange={handleChange} className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700" />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="flex flex-col gap-2">
                <label htmlFor="service" className="font-sans uppercase tracking-widest text-xs text-gray-500">Tipo de Servicio *</label>
                <select id="service" value={formData.service} onChange={handleChange} required className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700 cursor-pointer appearance-none rounded-none">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Boda Completa">Boda Completa</option>
                  <option value="Boda Civil / Íntima">Boda Civil / Íntima</option>
                  <option value="Evento Social">Evento Social</option>
                  <option value="Retrato Individual">Retrato Individual</option>
                  <option value="Retrato de Pareja">Retrato de Pareja</option>
                  <option value="Retratos Familiares">Retratos Familiares</option>
                  <option value="Otro">Otro (Especificar abajo)</option>
                </select>
              </div>
              <div className="flex flex-col gap-2">
                <label htmlFor="pkg" className="font-sans uppercase tracking-widest text-xs text-gray-500">Paquete de interés</label>
                <select id="pkg" value={formData.pkg} onChange={handleChange} className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700 cursor-pointer appearance-none rounded-none">
                  <option value="" disabled>Selecciona una opción</option>
                  <option value="Esencial">Esencial</option>
                  <option value="Clásico">Clásico (Más popular)</option>
                  <option value="Premium">Premium</option>
                  <option value="Personalizado">Cotización personalizada</option>
                </select>
              </div>
            </div>

            <div className="flex flex-col gap-4 mt-2">
              <label className="font-sans uppercase tracking-widest text-xs text-gray-500">¿Te interesa algún complemento?</label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" value="Sesión en Estudio" onChange={handleCheckbox} className="w-4 h-4 accent-secondary cursor-pointer" />
                  <span className="font-sans text-sm text-gray-600 group-hover:text-secondary transition-colors">Sesión en Estudio</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" value="Sesión Pre-boda" onChange={handleCheckbox} className="w-4 h-4 accent-secondary cursor-pointer" />
                  <span className="font-sans text-sm text-gray-600 group-hover:text-secondary transition-colors">Sesión Pre-boda</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" value="Fotos Impresas" onChange={handleCheckbox} className="w-4 h-4 accent-secondary cursor-pointer" />
                  <span className="font-sans text-sm text-gray-600 group-hover:text-secondary transition-colors">Fotografías Impresas</span>
                </label>
                <label className="flex items-center gap-3 cursor-pointer group">
                  <input type="checkbox" value="Horas Extra" onChange={handleCheckbox} className="w-4 h-4 accent-secondary cursor-pointer" />
                  <span className="font-sans text-sm text-gray-600 group-hover:text-secondary transition-colors">Horas Extra</span>
                </label>
              </div>
            </div>

            <div className="flex flex-col gap-2 mt-4">
              <label htmlFor="message" className="font-sans uppercase tracking-widest text-xs text-gray-500">Cuéntame más sobre tu idea *</label>
              <textarea 
                id="message" 
                value={formData.message} 
                onChange={handleChange} 
                required 
                rows={4} 
                placeholder="Por favor comparte todos los detalles que gustes: ¿Tienes alguna locación en mente? ¿Cuántas personas participarán? ¿Qué estilo visual te inspira?" 
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans resize-none placeholder:text-gray-400"
              ></textarea>
            </div>

            <button 
              type="submit" 
              disabled={isSubmitting}
              className="mt-6 bg-secondary text-dominant uppercase tracking-widest text-xs py-4 px-8 hover:bg-opacity-90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed w-full md:w-auto self-start border border-secondary"
            >
              {isSubmitting ? "Enviando por Email..." : "Enviar por Email"}
            </button>
          </form>
        </div>

      </div>
    </div>
  );
}
"use client";

import { motion } from "framer-motion";
import { trackWhatsAppClick } from "@/lib/pixel";

export default function PortraitsGuideLanding() {
  const whatsappLink = "https://wa.me/526562932374?text=Hola%20Oscar%2C%20quiero%20descargar%20la%20Gu%C3%ADa%20de%20Retratos";

  const handleWhatsAppClick = () => {
    trackWhatsAppClick("portraits");
    window.open(whatsappLink, "_blank");
  };

  const benefits = [
    "10 posturas que te hacen verse confiado/a",
    "Qué ponerte (colores, telas, estilos)",
    "Cómo prepararte mentalmente",
    "Preguntas que hacer ANTES de la sesión",
    "Qué esperar el día de la sesión",
    "Secretos para fotos más naturales",
    "Cómo manejar los nervios",
    "Ángulos que favorecen (según tu tipo)",
    "Expresiones auténticas vs posadas",
    "Checklist final antes de llegar",
  ];

  const testimonials = [
    {
      quote:
        "Seguí los tips de la guía y fue increíble. Me sentí mucho más segura durante la sesión.",
      name: "Laura M.",
      context: "Cliente de sesión de retratos",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop",
    },
    {
      quote:
        "Nunca pensé que una guía así me ayudaría tanto. Las fotos resultaron hermosas.",
      name: "Diego G.",
      context: "Primer vez frente a cámara",
      photo: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop",
    },
  ];



  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 15 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="flex flex-col w-full bg-white">
      {/* Hero Section */}
      <section className="w-full py-20 px-6 md:px-12 bg-gradient-to-br from-secondary to-secondary/80 text-white">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <div className="text-5xl md:text-6xl mb-4">📸</div>
            <h1 className="font-serif text-4xl md:text-5xl mb-4 leading-tight">
              10 Tips para Verte Cómodo/a en Fotos de Retratos
            </h1>
            <p className="text-xl text-gray-200 mb-2">
              La guía completa que te preparará para tu mejor sesión
            </p>
            <p className="text-sm text-gray-300">
              Por Oscar Sánchez, fotógrafo especializado en transformar inseguridades en belleza
            </p>
          </motion.div>

          {/* Value Prop */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-6 md:p-8 mb-8"
          >
            <p className="text-lg font-semibold mb-4">
              En esta guía aprenderás:
            </p>
            <p className="text-gray-200 mb-6">
              Cómo verte confiado/a, natural y editorial en tu sesión. Desde qué ponerte hasta
              cómo manejar los nervios en el momento. Todo lo que necesitas saber para tener la
              mejor experiencia frente a la cámara.
            </p>
            <div className="text-sm text-gray-300 flex items-center gap-2 mb-6">
              <span>⏱️</span>
              <span>Lectura: 15-20 minutos | PDF de 8 páginas</span>
            </div>
            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-accent text-white font-sans font-bold uppercase tracking-widest text-sm py-4 px-8 hover:bg-white hover:text-secondary transition-all duration-300 rounded-lg"
            >
              Descargar Guía por WhatsApp
            </motion.button>
          </motion.div>
        </div>
      </section>

      {/* Two Column: Benefits + Image/CTA */}
      <section className="w-full py-20 px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
          {/* Left: Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl text-secondary mb-8">Incluye:</h2>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-4"
            >
              {benefits.map((benefit, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-4"
                >
                  <span className="text-2xl flex-shrink-0">✓</span>
                  <span className="text-gray-700 pt-1">{benefit}</span>
                </motion.li>
              ))}
            </motion.ul>

            {/* Additional Info */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5, duration: 0.6 }}
              className="mt-10 p-6 bg-accent/10 border-l-4 border-accent rounded-r-lg"
            >
              <p className="text-sm text-gray-700">
                <span className="font-bold text-accent">Bonus:</span> Al descargar, tendrás acceso a
                tips exclusivos y podrás hacer preguntas específicas sobre tu sesión.
              </p>
            </motion.div>
          </motion.div>

          {/* Right: CTA Card */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-br from-dominant to-dominant/95 rounded-xl p-8 md:p-10 text-center h-full flex flex-col justify-center"
          >
            <h3 className="font-serif text-3xl text-white mb-4">
              Guía Gratuita
            </h3>
            <p className="text-gray-300 text-base mb-4">
              10 Tips para verte cómodo/a, confiado/a y editorial
            </p>

            <div className="bg-white/10 backdrop-blur-sm border border-white/30 rounded-lg p-6 mb-8">
              <p className="text-sm text-gray-200 mb-4">
                Haz clic abajo y contáctame por WhatsApp. Enviaré la guía en PDF directamente.
              </p>
              <div className="flex items-center justify-center gap-2 text-accent mb-4">
                <span className="text-2xl">📄</span>
                <span className="font-semibold">8 páginas</span>
              </div>
              <div className="flex items-center justify-center gap-2 text-accent">
                <span className="text-2xl">⏱️</span>
                <span className="font-semibold">15-20 min lectura</span>
              </div>
            </div>

            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-accent text-white font-sans font-bold uppercase tracking-widest text-sm py-4 px-8 hover:bg-white hover:text-secondary transition-all duration-300 rounded-lg mb-4 w-full"
            >
              Enviar por WhatsApp
            </motion.button>

            {/* Trust Signals */}
            <motion.div
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="space-y-2 text-xs text-gray-400"
            >
              <p>✓ Respuesta garantizada</p>
              <p>✓ PDF se envía por WhatsApp</p>
              <p>✓ Contacto personal con Oscar</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="w-full py-20 px-6 md:px-12 bg-accent/5">
        <div className="max-w-5xl mx-auto">
          <motion.h2
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-serif text-3xl text-secondary text-center mb-12"
          >
            Qué dicen quienes descargaron la guía
          </motion.h2>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 gap-6"
          >
            {testimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="bg-white border border-accent/20 rounded-lg p-6 flex flex-col"
              >
                {/* Photo */}
                {testimonial.photo && (
                  <div className="mb-4 flex justify-center">
                    <img
                      src={testimonial.photo}
                      alt={testimonial.name}
                      className="w-14 h-14 rounded-full object-cover border-2 border-accent"
                    />
                  </div>
                )}

                <p className="text-gray-700 italic mb-4 flex-grow">
                  "{testimonial.quote}"
                </p>
                <div>
                  <p className="font-semibold text-secondary">
                    {testimonial.name}
                  </p>
                  <p className="text-sm text-gray-600">{testimonial.context}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-20 px-6 md:px-12 bg-dominant">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="font-serif text-3xl md:text-4xl text-white mb-6">
              Estás a un click de estar preparado/a
            </h2>
            <p className="text-lg text-gray-300 mb-10">
              Oscar responde en WhatsApp en máximo 2 horas
            </p>

            <motion.button
              onClick={handleWhatsAppClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-block bg-accent text-white font-sans font-bold uppercase tracking-widest text-sm py-4 px-10 hover:bg-white hover:text-secondary transition-all duration-300 rounded-lg"
            >
              Descargar Guía Gratis por WhatsApp →
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  );
}

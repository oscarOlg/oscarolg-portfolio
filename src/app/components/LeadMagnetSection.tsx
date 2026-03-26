"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function LeadMagnetSection() {
  const guideItems = [
    "10 posturas que te hacen verse confiado/a",
    "Qué ponerte (colores, telas, estilos)",
    "Cómo prepararte mentalmente",
    "Preguntas que hacer ANTES de sesión",
    "Qué esperar el día de la sesión",
    "Secretos para fotos más naturales",
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-dominant">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">
            Descarga tu guía gratuita
          </h2>
          <p className="text-base md:text-lg text-gray-300">
            10 tips para verte cómodo y confiado en tus fotos
          </p>
        </motion.div>

        {/* Two-Column Layout */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          {/* Left: Guide Benefits */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="md:pr-8"
          >
            <h3 className="font-serif text-2xl text-white mb-6">
              Aprenderás:
            </h3>

            <motion.ul
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              className="space-y-3 mb-8"
            >
              {guideItems.map((item, idx) => (
                <motion.li
                  key={idx}
                  variants={itemVariants}
                  className="flex items-start gap-3"
                >
                  <span className="text-accent font-bold text-lg flex-shrink-0">
                    ✓
                  </span>
                  <span className="text-gray-200">{item}</span>
                </motion.li>
              ))}
            </motion.ul>

            <p className="text-sm text-gray-400 italic">
              Guía completa + Email con tips exclusivos + Acceso a reservar directamente
            </p>
          </motion.div>

          {/* Right: CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-4"
          >
            {/* Portraits Guide */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 backdrop-blur-sm hover:bg-white/15 transition-colors duration-300">
              <h4 className="font-serif text-xl text-accent mb-2">
                📸 Guía de Retratos
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Para verte cómodo, confiado y editorial en tu sesión de retratos
              </p>
              <Link
                href="/guides/portraits"
                className="inline-block w-full bg-accent text-white font-sans font-semibold uppercase tracking-widest text-sm py-3 px-6 hover:bg-white hover:text-secondary transition-all duration-300 text-center rounded"
              >
                Descargar guía
              </Link>
            </div>

            {/* Weddings Guide */}
            <div className="bg-white/10 border border-white/20 rounded-lg p-6 backdrop-blur-sm hover:bg-white/15 transition-colors duration-300">
              <h4 className="font-serif text-xl text-accent mb-2">
                💍 Guía de Bodas
              </h4>
              <p className="text-gray-300 text-sm mb-4">
                Prepárate para tu boda con confianza y naturalidad
              </p>
              <Link
                href="/guides/weddings"
                className="inline-block w-full bg-accent text-white font-sans font-semibold uppercase tracking-widest text-sm py-3 px-6 hover:bg-white hover:text-secondary transition-all duration-300 text-center rounded"
              >
                Descargar guía
              </Link>
            </div>

            {/* Trust Message */}
            <p className="text-xs text-gray-400 text-center border-t border-white/20 pt-4">
              Respondo personalmente en WhatsApp. Sin spam, sin vendedores.
            </p>
          </motion.div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-300 mb-6">
            O si prefieres contactarme directamente
          </p>
          <a
            href="https://wa.me/526562932374?text=Hola%20Oscar%2C%20quiero%20conocer%20m%C3%A1s%20sobre%20tus%20servicios"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-white/20 text-white font-sans font-semibold uppercase tracking-widest text-sm py-4 px-8 hover:bg-white/30 transition-all duration-300 border border-white/40"
          >
            Escribir por WhatsApp
          </a>
        </motion.div>
      </div>
    </section>
  );
}

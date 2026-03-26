"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { getWhatsAppLink } from "@/config/contact";

interface LeadMagnetThankYouProps {
  name: string;
  guideType: "portraits" | "weddings";
}

export default function LeadMagnetThankYou({
  name,
  guideType,
}: LeadMagnetThankYouProps) {
  const whatsappLink =
    guideType === "portraits"
      ? getWhatsAppLink("portraits", "es")
      : getWhatsAppLink("weddings", "es");

  const guideName =
    guideType === "portraits"
      ? "Guía de Retratos"
      : "Guía de Bodas";

  const nextSteps =
    guideType === "portraits"
      ? [
          "✓ Descarga la guía (verificá tu email)",
          "✓ Lee los 10 tips y prepárate",
          "✓ Contáctame por WhatsApp para agendar",
        ]
      : [
          "✓ Descarga la guía (verificá tu email)",
          "✓ Prepárate leyendo los pasos clave",
          "✓ Contáctame por WhatsApp para consultar",
        ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <div className="w-full py-20 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        {/* Success Animation */}
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", stiffness: 100, damping: 15 }}
          className="text-6xl text-center mb-8"
        >
          ✨
        </motion.div>

        {/* Heading */}
        <motion.h1
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="font-serif text-4xl md:text-5xl text-secondary text-center mb-4"
        >
          ¡Listo, {name}! 🎉
        </motion.h1>

        {/* Subheading */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="text-lg md:text-xl text-gray-600 text-center mb-12"
        >
          Tu <span className="font-semibold text-accent">{guideName}</span> está en camino
        </motion.p>

        {/* Download Info Box */}
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="bg-accent/10 border-l-4 border-accent rounded-lg p-6 mb-12"
        >
          <p className="text-gray-700 mb-3">
            <span className="font-semibold">📧 Revisa tu email</span> (incluyendo spam) en los próximos 2 minutos.
          </p>
          <p className="text-gray-600 text-sm">
            La guía está lista para descargar. Si no ves nada,{" "}
            <button
              onClick={() => window.location.reload()}
              className="text-accent font-semibold hover:underline"
            >
              recarga esta página
            </button>
            .
          </p>
        </motion.div>

        {/* Next Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="mb-12"
        >
          <h2 className="font-serif text-2xl text-secondary mb-6 text-center">
            Próximos pasos:
          </h2>

          <div className="space-y-3">
            {nextSteps.map((step, idx) => (
              <motion.div
                key={idx}
                variants={itemVariants}
                className="flex items-start gap-4 p-4 bg-white border border-accent/20 rounded-lg"
              >
                <span className="font-bold text-accent text-lg flex-shrink-0">
                  {idx + 1}
                </span>
                <p className="text-gray-700 pt-1">{step}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* WhatsApp CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="bg-dominant rounded-lg p-8 text-center"
        >
          <h3 className="font-serif text-2xl text-white mb-3">
            ¿Preguntas sobre la sesión?
          </h3>
          <p className="text-gray-300 mb-6">
            Contáctame directamente por WhatsApp. Respondo en máximo 2 horas.
          </p>
          <a
            href={whatsappLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-block bg-accent text-white font-sans font-bold uppercase tracking-widest text-sm py-4 px-8 hover:bg-white hover:text-secondary transition-all duration-300 rounded-lg"
          >
            Hablar por WhatsApp
          </a>
        </motion.div>

        {/* Back to Home */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="text-center mt-12"
        >
          <Link
            href="/"
            className="text-gray-600 hover:text-secondary transition-colors duration-300"
          >
            ← Volver al inicio
          </Link>
        </motion.div>
      </div>
    </div>
  );
}

"use client";

import Link from "next/link";
import { motion } from "framer-motion";

interface ServicePath {
  icon: string;
  title: string;
  subtitle: string;
  forWho: string;
  href: string;
  ctaText: string;
}

export default function ServicePathsSection() {
  const paths: ServicePath[] = [
    {
      icon: "📸",
      title: "Retratos",
      subtitle: "Individuales, parejas, grupos, especiales",
      forWho:
        "Para ti que quieres verte cómodo/a, confiado/a, editorial. Sesión 1-2 horas. Retratos que capturan quién eres realmente.",
      href: "/services?service=portraits",
      ctaText: "Conocer más sobre retratos",
    },
    {
      icon: "💍",
      title: "Bodas",
      subtitle: "Sesión previa • Día completo • Paquetes flexibles",
      forWho:
        "Para parejas que quieren momentos naturales, cómodos, auténticos. Sin poses incómodas. Tu día, capturado así como es.",
      href: "/services?service=weddings",
      ctaText: "Conocer más sobre bodas",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
  };

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-white">
      <div className="max-w-6xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-4">
            ¿Cuál es tu tipo de sesión?
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Especializadas en comodidad y confianza para ambas
          </p>
        </motion.div>

        {/* Service Cards */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {paths.map((path, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-gradient-to-br from-white to-accent/5 border-2 border-accent/20 rounded-xl p-8 hover:border-accent/40 hover:shadow-lg transition-all duration-300 flex flex-col"
            >
              {/* Icon & Title */}
              <div className="mb-6">
                <div className="text-5xl mb-4">{path.icon}</div>
                <h3 className="font-serif text-3xl text-secondary mb-2">
                  {path.title}
                </h3>
                <p className="text-accent font-semibold text-sm">
                  {path.subtitle}
                </p>
              </div>

              {/* Description */}
              <p className="text-gray-700 leading-relaxed mb-6 flex-grow">
                {path.forWho}
              </p>

              {/* CTA */}
              <Link
                href={path.href}
                className="inline-block bg-accent text-white font-sans font-semibold uppercase tracking-widest text-sm py-3 px-6 hover:bg-secondary hover:-translate-y-1 transition-all duration-300 text-center"
              >
                {path.ctaText}
              </Link>
            </motion.div>
          ))}
        </motion.div>

        {/* Success Rate */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-16 text-center"
        >
          <p className="text-lg text-gray-600">
            <span className="font-bold text-secondary">95%+ de mis clientes</span> se van de la sesión pensando:
            <br />
            <span className="italic text-accent">"Es la mejor sesión de fotos que he tenido."</span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}

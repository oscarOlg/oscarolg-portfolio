"use client";

import { motion } from "framer-motion";

interface SolutionStep {
  number: string;
  title: string;
  description: string;
}

export default function SolutionShowcaseSection() {
  const steps: SolutionStep[] = [
    {
      number: "01",
      title: "Conversamos antes",
      description:
        "Te pregunto qué te hace sentir inseguro frente a la cámara. Así entiendo cómo trabajar contigo.",
    },
    {
      number: "02",
      title: "Yo posiciono, tú respiras",
      description:
        "Te guío en cada pose. No es sobre ser modelo—es sobre que te veas como te sientes: cómodo, confiado, tú.",
    },
    {
      number: "03",
      title: "El resultado: Fotos auténticas",
      description:
        "No poses incómodas. Momentos reales donde brillas. Editorial, profesional, pero naturales.",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.2, delayChildren: 0.15 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: { opacity: 1, x: 0, transition: { duration: 0.6 } },
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
          className="mb-16 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-4">
            Así transformo tu inseguridad en confianza
          </h2>
          <p className="text-base md:text-lg text-gray-200">
            Mi enfoque diferente al resto de fotógrafos
          </p>
        </motion.div>

        {/* Steps */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="space-y-8"
        >
          {steps.map((step, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="flex gap-6 md:gap-8 items-start"
            >
              {/* Number Circle */}
              <div className="flex-shrink-0 w-16 h-16 rounded-full bg-accent text-secondary font-serif text-2xl font-bold flex items-center justify-center">
                {step.number}
              </div>

              {/* Content */}
              <div className="flex-1 pt-2">
                <h3 className="font-serif text-xl md:text-2xl text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-base md:text-lg text-gray-200 leading-relaxed">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Final Message */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-16 p-8 bg-accent/10 border-l-4 border-accent rounded-r-lg"
        >
          <p className="text-lg md:text-xl text-white italic">
            "La cámara puede ser intimidante, pero yo hago que sea fácil. Tu trabajo es simplemente estar ahí y ser tú."
          </p>
          <p className="text-accent font-semibold mt-3">— Oscar Sánchez, Fotógrafo</p>
        </motion.div>
      </div>
    </section>
  );
}

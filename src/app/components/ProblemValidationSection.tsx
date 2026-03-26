"use client";

import { motion } from "framer-motion";

interface MiniTestimonial {
  before: string;
  after: string;
  icon: string;
}

export default function ProblemValidationSection() {
  const testimonials: MiniTestimonial[] = [
    {
      before: "Siempre salgo mal en fotos",
      after: "Ahora me veo confiada y segura",
      icon: "😟 → 😊",
    },
    {
      before: "La cámara me intimida",
      after: "Siento que puedo ser yo mismo",
      icon: "😰 → 😌",
    },
    {
      before: "No sé cómo posar",
      after: "Oscar me guía y me siento cómodo",
      icon: "❓ → ✨",
    },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section className="w-full py-16 px-6 md:px-12 bg-white">
      <div className="max-w-5xl mx-auto">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="mb-12 text-center"
        >
          <h2 className="font-serif text-3xl md:text-4xl text-secondary mb-4">
            ¿Te sientes así delante de la cámara?
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            No estás solo/a. Muchos de mis clientes comenzaron con miedo o inseguridad...
          </p>
        </motion.div>

        {/* Testimonial Cards Grid */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              variants={itemVariants}
              className="bg-accent/5 border border-accent/20 rounded-lg p-6 text-center hover:border-accent/40 transition-all duration-300"
            >
              {/* Icon */}
              <div className="text-4xl mb-4">{testimonial.icon}</div>

              {/* Before */}
              <p className="text-gray-600 text-sm mb-3 italic">
                "{testimonial.before}"
              </p>

              {/* Arrow */}
              <div className="text-accent font-bold mb-3">↓</div>

              {/* After */}
              <p className="text-secondary font-semibold text-sm">
                "{testimonial.after}"
              </p>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-base md:text-lg text-gray-700">
            Y lo hacen <span className="font-semibold text-secondary">sin ser modelos.</span>{" "}
            Sin poses incómodas. Sin nervios.
          </p>
        </motion.div>
      </div>
    </section>
  );
}

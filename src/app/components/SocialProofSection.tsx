"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface Testimonial {
  quote: string;
  name: string;
  sessionType: string;
  highlight: string;
  photo?: string;
}

interface FAQItem {
  question: string;
  answer: string;
}

export default function SocialProofSection() {
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const testimonials: Testimonial[] = [
    {
      quote:
        "Siempre salía mal en fotos. Pero con Oscar fue diferente. Se tomó tiempo para conocerme, me guió en las poses y... ¡las fotos salieron hermosas! Me veo confiada.",
      name: "María G.",
      sessionType: "Sesión de Retratos",
      highlight: "Confianza",
      photo: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=200&h=200&fit=crop",
    },
    {
      quote:
        "Para nuestra boda no queríamos fotos posadas. Oscar capturó nuestros momentos reales, naturales. Nos hizo sentir cómodos todo el día. ¡Las fotos son mágicas!",
      name: "Jorge & Sandra",
      sessionType: "Bodas",
      highlight: "Momentos reales",
      photo: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop",
    },
    {
      quote:
        "Es la primera vez que me ve bien en fotos. Oscar tienes don especial. No solo es fotógrafo—es psicólogo haha. Me hizo sentir hermosa sin esfuerzo.",
      name: "Lupita M.",
      sessionType: "Sesión especial (XV Años)",
      highlight: "Comodidad absoluta",
      photo: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=200&h=200&fit=crop",
    },
  ];

  const faqItems: FAQItem[] = [
    {
      question: "¿Y si no me gustan mis fotos?",
      answer:
        "Primero, probablemente te sorprenderá cómo te ves. Segundo, durante la sesión te daré retroalimentación honesta. Tercero, los retoques digitales aún afinarán más tus mejores ángulos.",
    },
    {
      question: "¿Qué pasa si me pongo nerviosa/o?",
      answer:
        "Es completamente normal. Hablamos antes, durante y después. Tengo técnicas para relajarte: música, bromas, pausas. Mi meta es que te diviertas y disfrutes el proceso.",
    },
    {
      question: "¿Realmente no tengo que saber posar?",
      answer:
        "No. Eso es mi trabajo. Tú solo tienes que estar ahí siendo tú mismo. Te guiaré en cada movimiento. Créeme, sale mejor cuando te dejas guiar.",
    },
    {
      question: "¿Cuánto cuesta y qué viene incluido?",
      answer:
        "Depende del paquete que elijas. Retratos desde $1,800 / Bodas desde $8,500. Todos incluyen sesión, edición profesional y fotos digitales. Puedes Ver opciones completas en Servicios.",
    },
  ];

  return (
    <section className="w-full py-20 px-6 md:px-12 bg-white">
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
            Lo que dicen mis clientes
          </h2>
          <p className="text-base md:text-lg text-gray-600">
            Sus historias, su transformación
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16"
        >
          {testimonials.map((testimonial, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.15, duration: 0.6 }}
              className="bg-accent/5 border-l-4 border-accent rounded-lg p-6 flex flex-col"
            >
              {/* Photo */}
              {testimonial.photo && (
                <div className="mb-4 flex justify-center">
                  <img
                    src={testimonial.photo}
                    alt={testimonial.name}
                    className="w-16 h-16 rounded-full object-cover border-2 border-accent"
                  />
                </div>
              )}

              {/* Quote */}
              <p className="text-gray-700 italic mb-4 flex-grow">
                "{testimonial.quote}"
              </p>

              {/* Name & Type */}
              <div className="border-t border-accent/20 pt-4">
                <p className="font-semibold text-secondary">{testimonial.name}</p>
                <p className="text-sm text-gray-600">{testimonial.sessionType}</p>
                <p className="text-xs text-accent font-bold mt-2 uppercase tracking-wide">
                  ✨ {testimonial.highlight}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="bg-gradient-to-r from-accent/5 to-secondary/5 rounded-xl p-8 border border-accent/20"
        >
          <h3 className="font-serif text-2xl md:text-3xl text-secondary mb-8 text-center">
            Preguntas frecuentes
          </h3>

          <div className="space-y-3">
            {faqItems.map((item, idx) => (
              <motion.div
                key={idx}
                initial={false}
                className="border border-accent/20 rounded-lg overflow-hidden"
              >
                {/* Question Button */}
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className={`w-full px-6 py-4 text-left font-semibold flex items-center justify-between transition-colors duration-200 ${
                    openFaq === idx
                      ? "bg-accent/20 text-secondary"
                      : "bg-white text-gray-800 hover:bg-accent/10"
                  }`}
                >
                  {item.question}
                  <span
                    className={`transition-transform duration-300 ${
                      openFaq === idx ? "rotate-180" : ""
                    }`}
                  >
                    ▼
                  </span>
                </button>

                {/* Answer */}
                <motion.div
                  initial={false}
                  animate={{
                    height: openFaq === idx ? "auto" : 0,
                    opacity: openFaq === idx ? 1 : 0,
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden bg-accent/5"
                >
                  <p className="px-6 py-4 text-gray-700 leading-relaxed">
                    {item.answer}
                  </p>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

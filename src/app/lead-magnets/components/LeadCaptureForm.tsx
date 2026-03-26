"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface LeadCaptureFormProps {
  guideType: "portraits" | "weddings";
  onSubmitSuccess: (data: { name: string; email: string }) => void;
}

export default function LeadCaptureForm({
  guideType,
  onSubmitSuccess,
}: LeadCaptureFormProps) {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Basic validation
    if (!name.trim() || !email.trim()) {
      setError("Por favor completa todos los campos.");
      return;
    }

    if (!email.includes("@")) {
      setError("Por favor ingresa un email válido.");
      return;
    }

    setLoading(true);

    try {
      // For now, just store in localStorage (no email service yet)
      // Later, this can be replaced with real API call
      const leadData = {
        name,
        email,
        guideType,
        timestamp: new Date().toISOString(),
      };

      // Store in localStorage for now (you can export later)
      const existingLeads = JSON.parse(
        localStorage.getItem("oscarolg_leads") || "[]"
      );
      existingLeads.push(leadData);
      localStorage.setItem("oscarolg_leads", JSON.stringify(existingLeads));

      // Trigger success callback
      onSubmitSuccess({ name, email });

      // Clear form
      setName("");
      setEmail("");
    } catch (err) {
      setError("Hubo un error. Por favor intenta de nuevo.");
      console.error("Lead capture error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="w-full max-w-md mx-auto space-y-4"
    >
      {/* Name Input */}
      <div>
        <label htmlFor="name" className="block text-sm font-semibold text-white mb-2">
          Tu nombre
        </label>
        <input
          id="name"
          type="text"
          placeholder="Ej: María García"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white/15 transition-all duration-300"
          disabled={loading}
        />
      </div>

      {/* Email Input */}
      <div>
        <label htmlFor="email" className="block text-sm font-semibold text-white mb-2">
          Tu email
        </label>
        <input
          id="email"
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full px-4 py-3 bg-white/10 border border-white/30 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-accent focus:bg-white/15 transition-all duration-300"
          disabled={loading}
        />
      </div>

      {/* Error Message */}
      {error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="p-3 bg-red-500/20 border border-red-500/50 rounded-lg text-red-200 text-sm"
        >
          {error}
        </motion.div>
      )}

      {/* Submit Button */}
      <motion.button
        type="submit"
        disabled={loading}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-accent text-white font-sans font-bold uppercase tracking-widest text-sm py-4 px-6 hover:bg-white hover:text-secondary transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed rounded-lg"
      >
        {loading ? "Enviando..." : "Descargar guía gratis →"}
      </motion.button>

      {/* Privacy Note */}
      <p className="text-xs text-gray-400 text-center">
        Tu email es privado. Recibirás la guía + tips exclusivos vía WhatsApp. Sin spam.
      </p>
    </motion.form>
  );
}

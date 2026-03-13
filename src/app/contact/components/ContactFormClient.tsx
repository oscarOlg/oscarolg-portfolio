"use client";

import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import type { ServicePackage } from "@/types/sanity";

// Initialize EmailJS
emailjs.init(process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY || "");

interface ContactFormProps {
  allPackages: ServicePackage[];
  onMessageUpdate?: (message: string) => void;
}

interface FormData {
  name: string;
  email: string;
  phone: string;
  date: string;
  service: string;
  packageId: string;
  selectedAddOns: string[]; // IDs of selected add-ons
  message: string;
}

export default function ContactFormClient({ allPackages, onMessageUpdate }: ContactFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    email: "",
    phone: "",
    date: "",
    service: "",
    packageId: "",
    selectedAddOns: [],
    message: "",
  });

  // Get services—map from Sanity category values to display names
  const services = useMemo(() => {
    const serviceMap: Record<string, string> = {
      weddings: "Bodas",
      portrait: "Retrato",
      couples: "Retrato de Pareja",
      maternity: "Maternidad",
      commercial: "Comercial / Branding",
      editorial: "Editorial / Moda",
    };
    
    const uniqueCategories = [...new Set(allPackages.map((p) => p.category))];
    return uniqueCategories.map((cat) => ({
      value: cat,
      label: serviceMap[cat] || cat,
    }));
  }, [allPackages]);

  // Get packages for selected service
  const availablePackages = useMemo(() => {
    if (!formData.service) return [];
    return allPackages
      .filter((p) => p.category === formData.service)
      .sort((a, b) => (a.displayOrder || 0) - (b.displayOrder || 0));
  }, [formData.service, allPackages]);

  // Get selected package details
  const selectedPackage = useMemo(() => {
    if (!formData.packageId) return null;
    return allPackages.find((p) => p._id === formData.packageId) || null;
  }, [formData.packageId, allPackages]);

  // Calculate total price
  const totalPrice = useMemo(() => {
    if (!selectedPackage) return 0;
    let total = selectedPackage.price || 0;

    // Add selected add-ons
    formData.selectedAddOns.forEach((addOnName) => {
      const addOn = selectedPackage.addOns?.find((a) => a.name === addOnName);
      if (addOn && addOn.price) {
        total += addOn.price;
      }
    });

    return total;
  }, [selectedPackage, formData.selectedAddOns]);

  // Generate message for social sharing
  const generatedMessage = useMemo(() => {
    const { name, date, service, message } = formData;

    let text = `¡Hola Oscar! Soy ${name || "[Tu Nombre]"}. `;

    if (service === "otro") {
      text += `Me interesa otro tipo de servicio. `;
    } else if (service && selectedPackage) {
      // Get the Spanish display name for the service
      const serviceLabel = services.find(s => s.value === service)?.label || service;
      text += `Me interesa el servicio de ${serviceLabel} con el paquete "${selectedPackage.name}" `;
      if (selectedPackage.price) {
        text += `($${selectedPackage.price.toLocaleString("es-MX")} MXN)`;
      }
      text += `. `;
    }

    if (formData.selectedAddOns.length > 0) {
      text += `También me interesa agregar: ${formData.selectedAddOns.join(", ")}. `;
    }

    if (date) text += `La fecha tentativa sería el ${date}. `;

    if (message) {
      text += `\n\nTe comparto más detalles:\n${message}`;
    }

    return text;
  }, [formData, selectedPackage, services]);

  // Notify parent component when message changes
  React.useEffect(() => {
    onMessageUpdate?.(generatedMessage);
  }, [generatedMessage, onMessageUpdate]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;

    // Reset package and add-ons when service changes
    if (id === "service") {
      setFormData((prev) => ({
        ...prev,
        [id]: value,
        packageId: "",
        selectedAddOns: [],
      }));
    } else {
      setFormData((prev) => ({ ...prev, [id]: value }));
    }
  };

  const handlePackageChange = (e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>) => {
    const { value } = e.target as HTMLSelectElement | HTMLInputElement;
    // Reset add-ons when package changes
    setFormData((prev) => ({
      ...prev,
      packageId: value,
      selectedAddOns: [],
    }));
  };

  const handleAddOnChange = (addOnName: string, checked: boolean) => {
    setFormData((prev) => {
      const newAddOns = checked
        ? [...prev.selectedAddOns, addOnName]
        : prev.selectedAddOns.filter((a) => a !== addOnName);
      return { ...prev, selectedAddOns: newAddOns };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Format add-ons with prices
      const addOnDetails = formData.selectedAddOns
        .map((name) => {
          const addOn = selectedPackage?.addOns?.find((a) => a.name === name);
          if (addOn?.price) {
            return `${name} ($${addOn.price.toLocaleString("es-MX")} MXN)`;
          }
          return name;
        })
        .join(", ");

      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID || "",
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID || "",
        {
          to_email: process.env.NEXT_PUBLIC_CONTACT_EMAIL || "oscar.olg.photo@gmail.com",
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || "(No proporcionado)",
          date: formData.date || "(No especificada)",
          service: formData.service,
          package: selectedPackage?.name || "(No seleccionado)",
          package_price: selectedPackage?.price ? `$${selectedPackage.price.toLocaleString("es-MX")} MXN` : "N/A",
          add_ons: addOnDetails || "(Ninguno)",
          total_estimated: `$${totalPrice.toLocaleString("es-MX")} MXN`,
          message: formData.message,
        }
      );

      setSubmitStatus("success");

      setTimeout(() => {
        setFormData({
          name: "",
          email: "",
          phone: "",
          date: "",
          service: "",
          packageId: "",
          selectedAddOns: [],
          message: "",
        });
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
      setErrorMessage(
        "Hubo un error al enviar el email. Por favor intenta de nuevo o contacta directamente por WhatsApp."
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full">
      {/* === TARJETA DEL FORMULARIO === */}
      <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          {/* Contact Info */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                Nombre completo *
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="email" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                Correo electrónico *
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                required
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                Teléfono (Opcional)
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans"
              />
            </div>
            <div className="flex flex-col gap-2">
              <label htmlFor="date" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                Fecha tentativa
              </label>
              <input
                type="date"
                id="date"
                value={formData.date}
                onChange={handleChange}
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700"
              />
            </div>
          </div>

          {/* Service Selection */}
          <div className="flex flex-col gap-2">
            <label htmlFor="service" className="font-sans uppercase tracking-widest text-xs text-gray-500">
              Tipo de Servicio *
            </label>
            <select
              id="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700 cursor-pointer appearance-none rounded-none"
            >
              <option value="">Selecciona un servicio</option>
              {services.map((svc) => (
                <option key={svc.value} value={svc.value}>
                  {svc.label}
                </option>
              ))}
              <option value="otro">Otro</option>
            </select>
          </div>

          {/* Package Selection */}
          {formData.service && availablePackages.length > 0 && (
            <div className="flex flex-col gap-4 p-4 bg-accent/5 border border-accent/20">
              <label className="font-sans uppercase tracking-widest text-xs text-gray-500">
                Paquete de interés *
              </label>
              <div className="grid grid-cols-1 gap-3">
                {availablePackages.map((pkg) => (
                  <label key={pkg._id} className="flex items-start gap-3 cursor-pointer group p-2 hover:bg-white/50 rounded transition-colors">
                    <input
                      type="radio"
                      name="package"
                      value={pkg._id}
                      checked={formData.packageId === pkg._id}
                      onChange={handlePackageChange}
                      className="mt-0.5 w-4 h-4 accent-secondary cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-grow min-w-0">
                      <div className="font-sans font-semibold text-sm text-gray-700">
                        {pkg.name}
                      </div>
                      <div className="font-sans text-xs text-gray-500 mt-0.5">
                        {pkg.description}
                      </div>
                      {pkg.features && pkg.features.length > 0 && (
                        <ul className="font-sans text-xs text-gray-600 mt-1 space-y-0.5">
                          {pkg.features.slice(0, 2).map((feat, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-accent">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                          {pkg.features.length > 2 && (
                            <li className="text-accent text-xs">
                              +{pkg.features.length - 2} más...
                            </li>
                          )}
                        </ul>
                      )}
                    </div>
                    {(pkg.price || 0) > 0 && (
                      <div className="whitespace-nowrap text-right flex-shrink-0">
                        <div className="font-serif text-sm font-bold text-secondary">
                          ${pkg.price?.toLocaleString("es-MX")} MXN
                        </div>
                      </div>
                    )}
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Add-ons Selection */}
          {selectedPackage && selectedPackage.addOns && selectedPackage.addOns.length > 0 && (
            <div className="flex flex-col gap-4">
              <label className="font-sans uppercase tracking-widest text-xs text-gray-500">
                Complementos
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {selectedPackage.addOns.map((addOn, idx) => (
                  <label key={idx} className="flex items-center gap-3 cursor-pointer group">
                    <input
                      type="checkbox"
                      checked={formData.selectedAddOns.includes(addOn.name)}
                      onChange={(e) => handleAddOnChange(addOn.name, e.target.checked)}
                      className="w-4 h-4 accent-secondary cursor-pointer flex-shrink-0"
                    />
                    <div className="flex-grow">
                      <span className="font-sans text-sm text-gray-600 group-hover:text-secondary transition-colors">
                        {addOn.name}
                      </span>
                      {addOn.price && addOn.price > 0 && (
                        <span className="font-sans text-xs text-accent ml-2">
                          +${addOn.price.toLocaleString("es-MX")} MXN
                        </span>
                      )}
                    </div>
                  </label>
                ))}
              </div>
            </div>
          )}

          {/* Total Price Display */}
          {selectedPackage && (
            <div className="bg-accent/10 border border-accent/20 p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="font-sans uppercase tracking-widest text-xs text-gray-600">
                  Inversión estimada
                </span>
                <span className="font-serif text-2xl font-bold text-secondary">
                  ${totalPrice.toLocaleString("es-MX")} MXN
                </span>
              </div>
            </div>
          )}

          {/* Message */}
          <div className="flex flex-col gap-2 mt-4">
            <label htmlFor="message" className="font-sans uppercase tracking-widest text-xs text-gray-500">
              Cuéntame más sobre tu idea *
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder="Por favor comparte todos los detalles que gustes..."
              className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans resize-none placeholder:text-gray-400"
            ></textarea>
          </div>

          {/* Success / Error Messages */}
          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 p-4 text-green-800 text-sm font-sans">
              ✓ ¡Mensaje enviado con éxito! Me pondré en contacto contigo muy pronto.
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-50 border border-red-200 p-4 text-red-800 text-sm font-sans">
              ✕ {errorMessage}
            </div>
          )}

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isSubmitting || submitStatus === "success"}
            className={`mt-6 uppercase tracking-widest text-xs py-4 px-8 transition-colors w-full md:w-auto self-start border ${
              submitStatus === "success"
                ? "bg-green-600 text-white border-green-600 cursor-not-allowed"
                : "bg-secondary text-dominant border-secondary hover:bg-opacity-90 disabled:opacity-50 disabled:cursor-not-allowed"
            }`}
          >
            {isSubmitting ? (
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <svg
                  className="animate-spin h-4 w-4"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                  ></path>
                </svg>
                Enviando...
              </span>
            ) : submitStatus === "success" ? (
              <span className="flex items-center gap-2 justify-center md:justify-start">
                <svg
                  className="h-4 w-4"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  ></path>
                </svg>
                ¡Enviado!
              </span>
            ) : (
              "Enviar por Email"
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

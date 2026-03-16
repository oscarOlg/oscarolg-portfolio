"use client";

import React, { useMemo, useState } from "react";
import emailjs from "@emailjs/browser";
import type { ServicePackage } from "@/types/sanity";
import { SERVICES } from "@/config/services";
import { calculateTotalPrice } from "@/lib/pricing";
import { useLanguage, pickLang } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

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
  selectedAddOns: Record<string, number>; // add-on name -> quantity
  message: string;
}

export default function ContactFormClient({ allPackages, onMessageUpdate }: ContactFormProps) {
  const { lang } = useLanguage();
  const tr = (obj: { es: string; en: string }) => lang === "en" ? obj.en : obj.es;

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
    selectedAddOns: {},
    message: "",
  });

  // Get services from centralized config
  const services = useMemo(() => {
    const uniqueCategories = [...new Set(allPackages.map((p) => p.category))];
    return uniqueCategories
      .map((cat) => {
        const config = SERVICES.find((s) => s.key === cat);
        return config
          ? { value: cat, label: lang === "en" ? config.nameEn : config.name }
          : { value: cat, label: cat };
      });
  }, [allPackages, lang]);

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
  const totalPrice = useMemo(
    () => calculateTotalPrice(selectedPackage, formData.selectedAddOns),
    [selectedPackage, formData.selectedAddOns],
  );

  // Generate message for social sharing
  const generatedMessage = useMemo(() => {
    const { name, date, service, message } = formData;

    let text = `${tr(t.contact.msgHello)} ${name || tr(t.contact.msgDefaultName)}. `;

    if (service === "otro") {
      text += `${tr(t.contact.msgOtherService)} `;
    } else if (service && selectedPackage) {
      const serviceLabel = services.find(s => s.value === service)?.label || service;
      const pkgName = pickLang(lang, selectedPackage.name, selectedPackage.nameEn) ?? selectedPackage.name;
      text += `${tr(t.contact.msgInterestedIn)} ${serviceLabel} ${tr(t.contact.msgWithPackage)} "${pkgName}" `;
      if (selectedPackage.price) {
        text += `($${selectedPackage.price.toLocaleString("es-MX")} MXN)`;
      }
      text += `. `;
    }

    if (Object.keys(formData.selectedAddOns).length > 0) {
      const addOnsText = Object.entries(formData.selectedAddOns)
        .map(([addOnName, qty]) => {
          const addOn = selectedPackage?.addOns?.find((a) => a.name === addOnName);
          const displayName = pickLang(lang, addOnName, addOn?.nameEn) ?? addOnName;
          if (addOn?.unit) {
            return `${displayName} (${qty} ${addOn.unit})`;
          }
          return displayName;
        })
        .join(", ");
      text += `${tr(t.contact.msgAddOns)} ${addOnsText}. `;
    }

    if (date) text += `${tr(t.contact.msgDate)} ${date}. `;

    if (message) {
      text += `\n\n${tr(t.contact.msgDetails)}\n${message}`;
    }

    return text;
  }, [formData, selectedPackage, services, lang]);

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
        selectedAddOns: {},
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
      selectedAddOns: {},
    }));
  };

  const handleAddOnChange = (addOnName: string, quantity: number) => {
    setFormData((prev) => {
      const newAddOns = { ...prev.selectedAddOns };
      if (quantity > 0) {
        newAddOns[addOnName] = quantity;
      } else {
        delete newAddOns[addOnName];
      }
      return { ...prev, selectedAddOns: newAddOns };
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      // Format add-ons with prices and quantities
      const addOnDetails = Object.entries(formData.selectedAddOns)
        .map(([name, quantity]) => {
          const addOn = selectedPackage?.addOns?.find((a) => a.name === name);
          if (addOn?.price) {
            const totalAddOnPrice = addOn.price * quantity;
            if (addOn.unit) {
              return `${name} x${quantity} (${quantity} ${addOn.unit} @ $${addOn.price.toLocaleString("es-MX")} = $${totalAddOnPrice.toLocaleString("es-MX")} MXN)`;
            }
            return `${name} ($${totalAddOnPrice.toLocaleString("es-MX")} MXN)`;
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
          selectedAddOns: {},
          message: "",
        });
        setSubmitStatus("idle");
      }, 3000);
    } catch (error) {
      console.error("Email send error:", error);
      setSubmitStatus("error");
      setErrorMessage(tr(t.contact.errorMsg));
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
                {tr(t.contact.nameLabel)}
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
                {tr(t.contact.emailLabel)}
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
                {tr(t.contact.phoneLabel)}
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
                {tr(t.contact.dateLabel)}
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
              {tr(t.contact.serviceLabel)}
            </label>
            <select
              id="service"
              value={formData.service}
              onChange={handleChange}
              required
              className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700 cursor-pointer appearance-none rounded-none"
            >
              <option value="">{tr(t.contact.serviceDefault)}</option>
              {services.map((svc) => (
                <option key={svc.value} value={svc.value}>
                  {svc.label}
                </option>
              ))}
              <option value="otro">{tr(t.contact.otherService)}</option>
            </select>
          </div>

          {/* Package Selection */}
          {formData.service && availablePackages.length > 0 && (
            <div className="flex flex-col gap-4 p-4 bg-accent/5 border border-accent/20">
              <label className="font-sans uppercase tracking-widest text-xs text-gray-500">
                {tr(t.contact.packageLabel)}
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
                        {pickLang(lang, pkg.name, pkg.nameEn) ?? pkg.name}
                      </div>
                      <div className="font-sans text-xs text-gray-500 mt-0.5">
                        {pickLang(lang, pkg.description, pkg.descriptionEn) ?? pkg.description}
                      </div>
                      {(lang === "en" && pkg.featuresEn && pkg.featuresEn.length > 0
                        ? pkg.featuresEn
                        : pkg.features
                      )?.length ? (
                        <ul className="font-sans text-xs text-gray-600 mt-1 space-y-0.5">
                          {(lang === "en" && pkg.featuresEn && pkg.featuresEn.length > 0
                            ? pkg.featuresEn
                            : pkg.features ?? []
                          ).map((feat, i) => (
                            <li key={i} className="flex items-start gap-1">
                              <span className="text-accent">•</span>
                              <span>{feat}</span>
                            </li>
                          ))}
                        </ul>
                      ) : null}
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
                {tr(t.contact.addOnsLabel)}
              </label>
              <div className="grid grid-cols-1 gap-4">
                {selectedPackage.addOns.map((addOn, idx) => {
                  const isSelected = addOn.name in formData.selectedAddOns;
                  const quantity = formData.selectedAddOns[addOn.name] || 0;
                  const hasUnit = !!addOn.unit;

                  return (
                    <div
                      key={idx}
                      className="flex items-center gap-3 p-3 border border-gray-200 rounded hover:bg-gray-50 transition-colors"
                    >
                      <input
                        type="checkbox"
                        checked={isSelected}
                        onChange={(e) =>
                          handleAddOnChange(addOn.name, e.target.checked ? 1 : 0)
                        }
                        className="w-4 h-4 accent-secondary cursor-pointer flex-shrink-0"
                      />
                      <div className="flex-grow min-w-0">
                        <span className="font-sans text-sm text-gray-700">
                          {pickLang(lang, addOn.name, addOn.nameEn) ?? addOn.name}
                        </span>
                        {addOn.price && addOn.price > 0 && (
                          <span className="font-sans text-xs text-accent ml-2">
                            ${addOn.price.toLocaleString("es-MX")} MXN
                            {hasUnit && ` / ${addOn.unit}`}
                          </span>
                        )}
                      </div>

                      {/* Quantity Input - Only show if selected and has unit */}
                      {isSelected && hasUnit && (
                        <div className="flex items-center gap-1 flex-shrink-0">
                          <button
                            type="button"
                            onClick={() =>
                              handleAddOnChange(addOn.name, Math.max(1, quantity - 1))
                            }
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                          >
                            −
                          </button>
                          <input
                            type="number"
                            min="1"
                            value={quantity}
                            onChange={(e) =>
                              handleAddOnChange(
                                addOn.name,
                                Math.max(1, parseInt(e.target.value) || 1)
                              )
                            }
                            className="w-10 text-center border border-gray-300 rounded py-1 text-sm"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              handleAddOnChange(addOn.name, quantity + 1)
                            }
                            className="px-2 py-1 bg-gray-200 rounded hover:bg-gray-300 text-sm"
                          >
                            +
                          </button>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Total Price Display */}
          {selectedPackage && (
            <div className="bg-accent/10 border border-accent/20 p-4 rounded">
              <div className="flex justify-between items-center">
                <span className="font-sans uppercase tracking-widest text-xs text-gray-600">
                  {tr(t.contact.investmentLabel)}
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
              {tr(t.contact.messageLabel)}
            </label>
            <textarea
              id="message"
              value={formData.message}
              onChange={handleChange}
              required
              rows={4}
              placeholder={tr(t.contact.messagePlaceholder)}
              className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans resize-none placeholder:text-gray-400"
            ></textarea>
          </div>

          {/* Success / Error Messages */}
          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 p-4 text-green-800 text-sm font-sans">
              {tr(t.contact.successMsg)}
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
                {tr(t.contact.sendingButton)}
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
                {tr(t.contact.sentButton)}
              </span>
            ) : (
              tr(t.contact.submitButton)
            )}
          </button>
        </form>
      </div>
    </div>
  );
}

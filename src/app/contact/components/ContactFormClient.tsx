"use client";

import React, { useMemo, useState, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import Socials from "@/app/components/Socials";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import {
  trackLeadFormView,
  trackLeadFormStarted,
  trackLeadFormFieldFilled,
  trackLeadFormCompleted,
  trackLeadFormSubmitted,
  trackLeadFormWhatsAppOpened,
  trackLeadFormError,
} from "@/lib/analytics";

interface FormData {
  name: string;
  fianceName: string;
  phone: string;
  date: string;
  venue: string;
  photoPriority: string;
  weddingDetails: string;
}

export default function ContactFormClient() {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const contact = locale.contact;

  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);

  const [formData, setFormData] = useState<FormData>({
    name: "",
    fianceName: "",
    phone: "",
    date: "",
    venue: "",
    photoPriority: "",
    weddingDetails: "",
  });

  const priorityOptions = contact.photoPriorityOptions;

  // Track form view on component mount
  useEffect(() => {
    trackLeadFormView("contact_wedding", lang);
  }, [lang]);

  const generatedMessage = useMemo(() => {
    const { name, fianceName, phone, date, venue, photoPriority, weddingDetails } = formData;

    const lines: string[] = [];
    const nameDisplay = fianceName ? `${name} & ${fianceName}` : name;
    lines.push(`${contact.msgHello} ${nameDisplay || contact.msgDefaultName}.`);
    lines.push(`${contact.msgInterestedIn}.`);
    if (date) lines.push(`${contact.msgDate} ${date}.`);
    if (venue) lines.push(`${contact.msgVenue} ${venue}.`);
    if (photoPriority) lines.push(`${contact.msgPhotoPriority} ${photoPriority}.`);
    if (phone) lines.push(`${contact.phoneLabel.replace(/\s*\(.*\)\s*/, "")}: ${phone}.`);

    if (weddingDetails) {
      lines.push("");
      lines.push(contact.msgDetails);
      lines.push(weddingDetails);
    }

    return lines.join("\n");
  }, [formData, contact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Track first field interaction (form start)
    if (!formStarted && value.length > 0) {
      setFormStarted(true);
      trackLeadFormStarted("contact_wedding", lang);
    }

    // Track field completion
    if (value.length > 0) {
      trackLeadFormFieldFilled("contact_wedding", id, value, lang);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Track form completion (all fields filled)
      const fieldsCount = Object.values(formData).filter((val) => val.length > 0).length;
      trackLeadFormCompleted("contact_wedding", fieldsCount, lang);

      // Track form submission (primary conversion) BEFORE opening WhatsApp
      trackLeadFormSubmitted(
        "contact_wedding",
        formData.phone || formData.name,
        formData.date,
        formData.weddingDetails,
        lang
      );

      const whatsappUrl = getWhatsAppUrl(generatedMessage);
      if (!whatsappUrl) {
        throw new Error("Missing NEXT_PUBLIC_WHATSAPP_NUMBER");
      }
      const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!popup) {
        throw new Error("Popup blocked");
      }

      // Track WhatsApp window opened (confirmed conversion)
      setTimeout(() => {
        trackLeadFormWhatsAppOpened("contact_wedding", lang);
      }, 500);

      setSubmitStatus("success");
    } catch (error) {
      console.error("WhatsApp open error:", error);
      trackLeadFormError("contact_wedding", "whatsapp_failed", lang);
      setSubmitStatus("error");
      setErrorMessage(contact.errorMsg);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="w-full">
      <div className="bg-white p-8 md:p-12 border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.06)]">
        <form onSubmit={handleSubmit} className="flex flex-col gap-8">
          <div className="border border-accent/50 bg-accent/15 p-5 md:p-6 shadow-sm">
            <p className="font-sans text-base md:text-lg text-secondary font-medium leading-relaxed">
              {contact.quickLead}
            </p>
            <p className="font-sans text-sm md:text-base text-secondary/80 mt-3 leading-relaxed">
              {contact.quickBody}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="name" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                Nombre *
              </label>
              <input
                type="text"
                id="name"
                placeholder="Tu nombre"
                value={formData.name}
                onChange={handleChange}
                required
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="fianceName" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                Nombre de tu pareja
              </label>
              <input
                type="text"
                id="fianceName"
                placeholder="El Nombre de tu pareja"
                value={formData.fianceName}
                onChange={handleChange}
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col gap-2">
              <label htmlFor="phone" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                {contact.phoneLabel}
              </label>
              <input
                type="tel"
                id="phone"
                placeholder="Ej.: 656 999 9999"
                value={formData.phone}
                onChange={handleChange}
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans placeholder:text-gray-400"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="venue" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                {contact.venueLabel}
              </label>
              <input
                type="text"
                id="venue"
                placeholder="Ej.: Iglesia Santa Rita, Salon Las Fuentes"
                value={formData.venue}
                onChange={handleChange}
                required
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans placeholder:text-gray-400"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="date" className="font-sans uppercase tracking-widest text-xs text-gray-500">
              {contact.dateLabel}
            </label>
            <input
              type="date"
              id="date"
              value={formData.date}
              onChange={handleChange}
              required
              className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700 placeholder:text-gray-400"
            />
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="photoPriority" className="font-sans uppercase tracking-widest text-xs text-gray-500">
              {contact.photoPriorityLabel}
            </label>
            <textarea
              id="photoPriority"
              value={formData.photoPriority}
              onChange={handleChange}
              rows={3}
              placeholder="Cuéntanos qué es lo más importante para ustedes, que estilo les gustaria, que les preocupa..."
              required
              className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans resize-none placeholder:text-gray-400"
            ></textarea>
          </div>

          <div className="flex flex-col gap-2 mt-2">
            <label htmlFor="weddingDetails" className="font-sans uppercase tracking-widest text-xs text-gray-500">
              {contact.weddingDetailsLabel}
            </label>
            <textarea
              id="weddingDetails"
              value={formData.weddingDetails}
              onChange={handleChange}
              rows={4}
              placeholder={contact.weddingDetailsPlaceholder}
              className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans resize-none placeholder:text-gray-400"
            ></textarea>
          </div>

          <div className="hidden md:block border border-accent/40 bg-accent/10 p-5 md:p-6 shadow-sm">
            <p className="font-sans text-sm uppercase tracking-widest text-secondary/80 mb-3 font-semibold">
              {contact.quickHeading}
            </p>
            <pre className="whitespace-pre-wrap font-sans text-base text-secondary leading-relaxed">
              {generatedMessage}
            </pre>
          </div>

          {submitStatus === "success" && (
            <div className="bg-green-50 border border-green-200 p-4 text-green-800 text-sm font-sans">
              {contact.successMsg}
            </div>
          )}

          {submitStatus === "error" && (
            <div className="bg-red-50 border border-red-200 p-4 text-red-800 text-sm font-sans">
              ✕ {errorMessage}
            </div>
          )}

          <div className="flex flex-col sm:flex-row gap-3 mt-8">
            <button
              type="submit"
              disabled={submitStatus === "success"}
              className={`uppercase tracking-widest text-xs py-4 px-8 transition-colors w-full sm:w-auto border ${
                submitStatus === "success"
                  ? "bg-green-600 text-white border-green-600 cursor-not-allowed"
                  : "bg-accent text-secondary border-accent hover:bg-accent/90 disabled:opacity-50 disabled:cursor-not-allowed"
              }`}
            >
              {submitStatus === "success" ? contact.sentButton : contact.submitButton}
            </button>

            <button
              type="button"
              onClick={handleCopy}
              className="uppercase tracking-widest text-xs py-4 px-8 border border-secondary bg-secondary text-dominant hover:bg-secondary/90 transition-colors w-full sm:w-auto"
            >
              {copied ? contact.copiedButton : contact.copyButton}
            </button>
          </div>

          <div className="pt-6">
            <Socials containerClassName="flex gap-5" itemClassName="hover:text-accent transition-colors text-gray-600" />
          </div>
        </form>
      </div>
    </div>
  );
}

"use client";

import React, { useMemo, useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import Socials from "@/app/components/Socials";
import { getWhatsAppUrl } from "@/lib/whatsapp";

interface FormData {
  name: string;
  phone: string;
  date: string;
  venue: string;
  budgetRange: string;
  weddingDetails: string;
}

export default function ContactFormClient() {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const contact = locale.contact;

  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState<FormData>({
    name: "",
    phone: "",
    date: "",
    venue: "",
    budgetRange: "",
    weddingDetails: "",
  });

  const budgetOptions = contact.budgetOptions;

  const generatedMessage = useMemo(() => {
    const { name, phone, date, venue, budgetRange, weddingDetails } = formData;

    const lines: string[] = [];
    lines.push(`${contact.msgHello} ${name || contact.msgDefaultName}.`);
    lines.push(`${contact.msgInterestedIn}.`);
    if (date) lines.push(`${contact.msgDate} ${date}.`);
    if (venue) lines.push(`${contact.msgVenue} ${venue}.`);
    if (budgetRange) lines.push(`${contact.msgBudget} ${budgetRange}.`);
    if (phone) lines.push(`${contact.phoneLabel.replace(" (Opcional)", "")}: ${phone}.`);

    if (weddingDetails) {
      lines.push("");
      lines.push(contact.msgDetails);
      lines.push(weddingDetails);
    }

    return lines.join("\n");
  }, [formData, contact]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({ ...prev, [id]: value }));
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setSubmitStatus("idle");
    setErrorMessage("");

    try {
      const whatsappUrl = getWhatsAppUrl(generatedMessage);
      if (!whatsappUrl) {
        throw new Error("Missing NEXT_PUBLIC_WHATSAPP_NUMBER");
      }
      const popup = window.open(whatsappUrl, "_blank", "noopener,noreferrer");
      if (!popup) {
        throw new Error("Popup blocked");
      }
      setSubmitStatus("success");
    } catch (error) {
      console.error("WhatsApp open error:", error);
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
        <form onSubmit={handleSubmit} className="flex flex-col gap-8 pb-24 md:pb-0">
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
                {contact.nameLabel}
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
              <label htmlFor="phone" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                {contact.phoneLabel}
              </label>
              <input
                type="tel"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
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
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label htmlFor="venue" className="font-sans uppercase tracking-widest text-xs text-gray-500">
                {contact.venueLabel}
              </label>
              <input
                type="text"
                id="venue"
                value={formData.venue}
                onChange={handleChange}
                required
                className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans"
              />
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label htmlFor="budgetRange" className="font-sans uppercase tracking-widest text-xs text-gray-500">
              {contact.budgetLabel}
            </label>
            <select
              id="budgetRange"
              value={formData.budgetRange}
              onChange={handleChange}
              required
              className="border-b border-gray-300 bg-transparent py-2 focus:outline-none focus:border-secondary transition-colors font-sans text-gray-700 cursor-pointer appearance-none rounded-none"
            >
              <option value="">{contact.budgetSelectPlaceholder}</option>
              {budgetOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </select>
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

          <div className="sticky bottom-0 -mx-8 md:mx-0 px-4 md:px-0 py-3 bg-white/95 backdrop-blur border-t border-gray-200 md:border-0 md:bg-transparent md:backdrop-blur-none md:py-0">
            <div className="md:hidden border border-accent/40 bg-accent/10 p-3 mb-3 shadow-sm">
              <p className="font-sans text-xs uppercase tracking-widest text-secondary/80 mb-2 font-semibold">
                {contact.quickHeading}
              </p>
              <pre className="whitespace-pre-wrap font-sans text-sm text-secondary leading-relaxed max-h-28 overflow-y-auto">
                {generatedMessage}
              </pre>
            </div>

            <div className="flex flex-col sm:flex-row gap-3">
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
          </div>
        </form>
      </div>
    </div>
  );
}

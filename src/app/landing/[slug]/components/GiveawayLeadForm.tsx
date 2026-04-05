"use client";

import React, { useMemo, useState, useEffect } from "react";
import { getWhatsAppUrl } from "@/lib/whatsapp";
import { useLanguage } from "@/contexts/LanguageContext";
import { getSiteLocale } from "@/i18n/locales";
import { getLeadMagnetBySlug } from "@/config/lead-magnets";
import Socials from "@/app/components/Socials";
import {
  trackCampaignLandingView,
  trackLeadFormView,
  trackLeadFormStarted,
  trackLeadFormFieldFilled,
  trackLeadFormCompleted,
  trackLeadFormSubmitted,
  trackCampaignSignup,
  trackLeadFormError,
} from "@/lib/analytics";

interface GiveawayLeadFormProps {
  campaignSlug: string;
}

interface GiveawayFormData {
  name: string;
  fianceName: string;
  phone: string;
  weddingDateAndVenue: string;
  story: string;
  hasPhotographer: string;
  considerOscar: string;
  budget: string;
}

export default function GiveawayLeadForm({ campaignSlug }: GiveawayLeadFormProps) {
  const { lang } = useLanguage();
  const locale = getSiteLocale(lang);
  const campaign = getLeadMagnetBySlug(campaignSlug);
  const campaignKey = campaign?.i18nKey || 'engagementGiveaway';
  const content = (locale.landing as any)?.[campaignKey];

  const [formData, setFormData] = useState<GiveawayFormData>({
    name: "",
    fianceName: "",
    phone: "",
    weddingDateAndVenue: "",
    story: "",
    hasPhotographer: "",
    considerOscar: "",
    budget: "",
  });

  const [copied, setCopied] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<"idle" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [formStarted, setFormStarted] = useState(false);

  // Track campaign landing page view on component mount
  useEffect(() => {
    trackCampaignLandingView(campaignSlug, lang);
    trackLeadFormView("giveaway_engagement", lang);
  }, [campaignSlug, lang]);

  if (!content) {
    return <div className="text-center py-12">{locale.landing.loadingForm}</div>;
  }

  const generatedMessage = useMemo(() => {
    const lines: string[] = [];
    lines.push(content.form.msgIntro);
    lines.push("");
    const nameDisplay = formData.fianceName ? `${formData.name} & ${formData.fianceName}` : formData.name;
    lines.push(`${content.form.msgName} ${nameDisplay || content.form.msgNoData}`);
    lines.push(`${content.form.msgPhone} ${formData.phone || content.form.msgNoData}`);
    lines.push(`${content.form.msgDateVenue} ${formData.weddingDateAndVenue || content.form.msgNoData}`);
    lines.push("");
    lines.push(content.form.msgStoryHeading);
    lines.push(formData.story || content.form.msgNoStory);
    lines.push("");
    if (formData.hasPhotographer) {
      lines.push(`${content.form.msgHasPhotographer} ${formData.hasPhotographer}`);
    }
    if (formData.considerOscar) {
      lines.push(`${content.form.msgConsiderOscar} ${formData.considerOscar}`);
    }
    if (formData.budget) {
      lines.push(`${content.form.msgBudget} ${formData.budget}`);
    }

    return lines.join("\n");
  }, [formData, content]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));

    // Track first field interaction (form start)
    if (!formStarted && value.length > 0) {
      setFormStarted(true);
      trackLeadFormStarted("giveaway_engagement", lang);
    }

    // Track field completion
    if (value.length > 0) {
      trackLeadFormFieldFilled("giveaway_engagement", id, value, lang);
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    try {
      // Track form completion (all fields filled) - don't let analytics errors block submission
      try {
        const fieldsCount = Object.values(formData).filter((val) => val.length > 0).length;
        trackLeadFormCompleted("giveaway_engagement", fieldsCount, lang);
      } catch (analyticsError) {
        console.error("Analytics tracking error (non-blocking):", analyticsError);
      }

      // Track campaign signup (primary conversion for campaign)
      try {
        trackCampaignSignup(
          campaignSlug,
          formData.phone || formData.name,
          lang
        );
      } catch (analyticsError) {
        console.error("Analytics tracking error (non-blocking):", analyticsError);
      }

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
        try {
          trackLeadFormSubmitted("giveaway_engagement", formData.phone || formData.name, formData.weddingDateAndVenue, formData.story, lang);
        } catch (analyticsError) {
          console.error("Analytics tracking error (non-blocking):", analyticsError);
        }
      }, 500);

      setSubmitStatus("success");

    } catch (error) {
      console.error("WhatsApp open error:", error);
      try {
        trackLeadFormError("giveaway_engagement", "whatsapp_failed", lang);
      } catch (analyticsError) {
        console.error("Analytics error tracking failed:", analyticsError);
      }
      setSubmitStatus("error");
      setErrorMessage(content.form.errorMsg);
    }
  };

  const handleCopy = async () => {
    await navigator.clipboard.writeText(generatedMessage);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="space-y-6">
      <form onSubmit={handleSubmit} className="space-y-6 min-w-0">
        <div className="border border-gray-200 bg-white p-8 rounded-2xl shadow-lg min-w-0 overflow-x-hidden">

        <div className="space-y-6">
          {/* Full Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="name" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              {content.form.nameLabel}
            </label>
            <input
              id="name"
              type="text"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder={content.form.namePlaceholder}
              className="border-b border-gray-300 bg-transparent py-3 text-sm md:text-base focus:outline-none focus:border-secondary transition-colors placeholder:text-xs md:placeholder:text-sm"
            />
          </div>

          {/* Partner Name */}
          <div className="flex flex-col gap-2">
            <label htmlFor="fianceName" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              Nombre de tu pareja
            </label>
            <input
              id="fianceName"
              type="text"
              value={formData.fianceName}
              onChange={handleChange}
              placeholder="Escribe el nombre de tu pareja"
              className="border-b border-gray-300 bg-transparent py-3 text-sm md:text-base focus:outline-none focus:border-secondary transition-colors placeholder:text-xs md:placeholder:text-sm placeholder:text-gray-400"
            />
          </div>

          {/* Phone Number */}
          <div className="flex flex-col gap-2">
            <label htmlFor="phone" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              {content.form.phoneLabel}
            </label>
            <input
              id="phone"
              type="text"
              value={formData.phone}
              onChange={handleChange}
              required
              placeholder={content.form.phonePlaceholder}
              className="border-b border-gray-300 bg-transparent py-3 text-sm md:text-base placeholder:text-gray-300 placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Wedding Date & Venue - Combined */}
          <div className="flex flex-col gap-2">
            <label htmlFor="weddingDateAndVenue" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              {content.form.weddingDateVenueLabel}
            </label>
            <input
              id="weddingDateAndVenue"
              type="text"
              value={formData.weddingDateAndVenue}
              onChange={handleChange}
              required
              placeholder={content.form.weddingDateVenuePlaceholder}
              className="border-b border-gray-300 bg-transparent py-3 text-sm md:text-base placeholder:text-gray-300 placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Love Story */}
          <div className="flex flex-col gap-2">
            <label htmlFor="story" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              {content.form.storyLabel}
            </label>
            <textarea
              id="story"
              value={formData.story}
              onChange={handleChange}
              rows={5}
              required
              placeholder={content.form.storyPlaceholder}
              className="border-b border-gray-300 bg-transparent py-3 text-sm md:text-base resize-none placeholder:text-gray-300 placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Have Wedding Photographer? */}
          <div className="flex flex-col gap-2">
            <label htmlFor="hasPhotographer" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              {content.form.photographerLabel}
            </label>
            <input
              id="hasPhotographer"
              type="text"
              value={formData.hasPhotographer}
              onChange={handleChange}
              required
              placeholder={content.form.photographerPlaceholder}
              className="border-b border-gray-300 bg-transparent py-3 text-sm md:text-base placeholder:text-gray-300 placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Consider Oscar as Photographer? */}
          <div className="flex flex-col gap-2">
            <label htmlFor="considerOscar" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              {content.form.considerOscarLabel}
            </label>
            <textarea
              id="considerOscar"
              value={formData.considerOscar}
              onChange={handleChange}
              required
              rows={2}
              placeholder={content.form.considerOscarPlaceholder}
              className="border-b border-gray-300 bg-transparent py-3 text-base md:text-lg resize-none placeholder:text-gray-300 placeholder:text-sm md:placeholder:text-base focus:outline-none focus:border-secondary transition-colors"
            />
          </div>

          {/* Budget - Open Ended */}
          <div className="flex flex-col gap-2">
            <label htmlFor="budget" className="text-xs uppercase tracking-widest text-gray-500 font-semibold">
              {content.form.budgetLabel}
            </label>
            <input
              id="budget"
              type="text"
              value={formData.budget}
              onChange={handleChange}
              required
              placeholder={content.form.budgetPlaceholder}
              className="border-b border-gray-300 bg-transparent py-3 text-sm md:text-base placeholder:text-gray-300 placeholder:text-xs md:placeholder:text-sm focus:outline-none focus:border-secondary transition-colors\"
            />
          </div>

          {/* Message Preview */}
          <div className="border border-gray-200 bg-gray-50 p-4 rounded">
            <p className="text-xs uppercase tracking-widest text-gray-500 font-semibold mb-3">{content.form.messagePreview}</p>
            <pre className="whitespace-pre-wrap break-words text-sm text-secondary leading-relaxed max-h-48 overflow-y-auto overflow-x-hidden font-sans w-full max-w-full">
              {generatedMessage}
            </pre>
          </div>

          {/* Submit Buttons */}
          <div className="flex flex-col sm:flex-row gap-4">
            <button
              type="submit"
              disabled={submitStatus === "success"}
              className="bg-accent text-secondary border border-accent py-4 px-8 uppercase tracking-widest text-xs font-bold hover:bg-accent/90 transition-colors disabled:opacity-50 flex-1"
            >
              {submitStatus === "success" ? content.form.submitSuccess : content.form.submitButton}
            </button>
            <button
              type="button"
              onClick={handleCopy}
              className="border border-secondary text-secondary py-4 px-8 uppercase tracking-widest text-xs font-bold hover:bg-secondary hover:text-dominant transition-colors flex-1"
            >
              {copied ? content.form.copiedButton : content.form.copyButton}
            </button>
          </div>
            <Socials />
        </div>
        </div>
      </form>
    </div>
  );
}

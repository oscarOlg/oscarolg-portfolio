"use client";

import React, { useState } from "react";
import Socials from "../../components/Socials";
import { useLanguage } from "@/contexts/LanguageContext";
import { t } from "@/lib/translations";

interface QuickMessageBoxProps {
  message: string;
}

export default function QuickMessageBox({ message }: QuickMessageBoxProps) {
  const [copied, setCopied] = useState(false);
  const { lang } = useLanguage();
  const tr = (obj: { es: string; en: string }) => lang === 'en' ? obj.en : obj.es;

  const handleCopy = () => {
    navigator.clipboard.writeText(message);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-accent/10 border border-accent/20 p-8 relative">
      <div className="absolute top-0 left-0 w-1 h-full bg-accent"></div>
      <h3 className="font-serif text-2xl text-secondary mb-2">{tr(t.contact.quickBoxHeading)}</h3>
      <p className="font-sans text-sm text-gray-600 mb-6">
        <span className="hidden lg:inline">
          {tr(t.contact.quickBoxDescDesktop)}
        </span>
        <span className="lg:hidden">
          {tr(t.contact.quickBoxDescMobile)}
        </span>
      </p>

      <div className="bg-white p-4 font-mono text-sm text-gray-700 whitespace-pre-wrap border border-gray-200 shadow-inner mb-6 min-h-[120px]">
        {message}
      </div>

      <div className="flex flex-col sm:flex-row items-center gap-6">
        <button
          onClick={handleCopy}
          className="flex items-center justify-center gap-2 bg-accent text-secondary uppercase tracking-widest text-xs font-semibold py-4 px-8 hover:bg-opacity-80 transition-colors w-full sm:w-auto"
        >
          {copied ? (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                ></path>
              </svg>
              {tr(t.contact.copiedButton)}
            </>
          ) : (
            <>
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M8 16H6a2 2 0 01-2-2V6a2 2 0 012-2h8a2 2 0 012 2v2m-6 12h8a2 2 0 002-2v-8a2 2 0 00-2-2h-8a2 2 0 00-2 2v8a2 2 0 002 2z"
                ></path>
              </svg>
              {tr(t.contact.copyButton)}
            </>
          )}
        </button>

        <Socials />
      </div>
    </div>
  );
}

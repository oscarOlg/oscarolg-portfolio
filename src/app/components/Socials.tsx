// src/components/Socials.tsx
import React from "react";
import { InstagramIcon, WhatsappIcon, FacebookIcon } from "./Icons";
import { getWhatsAppUrl } from "@/lib/whatsapp";

const whatsappUrl = getWhatsAppUrl();

const socialsData = [
    { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100088045982178", icon: <FacebookIcon /> },
    { name: "Instagram", url: "https://www.instagram.com/oscar.olg.ph/", icon: <InstagramIcon /> },
  ...(whatsappUrl ? [{ name: "WhatsApp", url: whatsappUrl, icon: <WhatsappIcon /> }] : []),
];

interface SocialsProps {
  containerClassName?: string;
  itemClassName?: string;
}

export default function Socials({ 
  containerClassName = "flex gap-5",
  itemClassName = "hover:text-accent transition-colors" 
}: SocialsProps) {
  return (
    <div className={containerClassName}>
      {socialsData.map((social) => (
        <a
          key={social.name}
          href={social.url}
          target="_blank"
          rel="noopener noreferrer"
          className={itemClassName}
          aria-label={`Visitar ${social.name}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
// src/components/Socials.tsx
import React from "react";
import { InstagramIcon, WhatsappIcon, EmailIcon } from "./Icons";

const socialsData = [
    { name: "Email", url: "mailto:oscar.olg.photo@gmail.com", icon: <EmailIcon /> },
    //   { name: "Facebook", url: "https://www.facebook.com/profile.php?id=100088045982178", icon: <FacebookIcon /> },
    { name: "Instagram", url: "https://www.instagram.com/oscar.olg/", icon: <InstagramIcon /> },
    { name: "WhatsApp", url: "whatsapp://send?phone=+525519689471", icon: <WhatsappIcon /> },
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
          target={social.name === "Email" ? "_self" : "_blank"}
          rel={social.name === "Email" ? "" : "noopener noreferrer"}
          className={itemClassName}
          aria-label={`Visitar ${social.name}`}
        >
          {social.icon}
        </a>
      ))}
    </div>
  );
}
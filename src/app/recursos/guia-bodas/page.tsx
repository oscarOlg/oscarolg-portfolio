import type { Metadata } from "next";
import GuidePageClient from "./GuidePageClient";

export const metadata: Metadata = {
  title: "Guia de Fotografia de Bodas | Oscar Sanchez",
  description:
    "Descarga la guia gratuita para planear la fotografia de tu boda en Ciudad Juarez y solicita tu copia por WhatsApp.",
  openGraph: {
    title: "Guia de Fotografia de Bodas | Oscar Sanchez",
    description:
      "Checklist, timeline y recomendaciones para planear tu fotografia de boda.",
    url: "/recursos/guia-bodas",
  },
};

export default function WeddingGuidePage() {
  return <GuidePageClient />;
}
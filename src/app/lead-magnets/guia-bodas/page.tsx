import type { Metadata } from "next";
import WeddingsGuideLanding from "./components/WeddingsGuideLanding";

export const metadata: Metadata = {
  title: "Guía Gratis: Cómo Prepararte para Fotos de Boda sin Nervios",
  description:
    "Guía completa de Oscar Sánchez para parejas. Aprende qué esperar, cómo prepararte mentalmente y cómo verse cómodo/a en fotos de boda.",
  openGraph: {
    title: "Guía Gratis: Cómo Prepararte para Fotos de Boda sin Nervios",
    description:
      "Guía exclusiva para parejas. Pasos para prepararse para fotos de boda. Descarga gratis.",
    url: "/lead-magnets/guia-bodas",
  },
};

export default function WeddingsGuideRoot() {
  return <WeddingsGuideLanding />;
}

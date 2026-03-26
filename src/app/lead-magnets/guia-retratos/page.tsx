import type { Metadata } from "next";
import PortraitsGuideLanding from "./components/PortraitsGuideLanding";

export const metadata: Metadata = {
  title: "Guía Gratis: 10 Tips para Verte Cómodo/a en Fotos de Retratos",
  description:
    "Descarga la guía completa de Oscar Sánchez. Aprende posturas, qué ponerte, cómo prepararte mentalmente y más. Perfecto antes de tu sesión de retratos.",
  openGraph: {
    title: "Guía Gratis: 10 Tips para Verte Cómodo/a en Fotos de Retratos",
    description:
      "Guía exclusiva de fotografía. Tips para verte confiado y natural en tu sesión de retratos. Descarga gratis.",
    url: "/lead-magnets/guia-retratos",
  },
};

export default function PortraitsGuideRoot() {
  return <PortraitsGuideLanding />;
}

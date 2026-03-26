"use client";

import { useEffect } from "react";
import { trackGuideView } from "@/lib/pixel";
import PortraitsGuideLanding from "./components/PortraitsGuideLanding";

export default function PortraitsGuidePage() {
  useEffect(() => {
    trackGuideView("Portraits Guide");
  }, []);

  return <PortraitsGuideLanding />;
}

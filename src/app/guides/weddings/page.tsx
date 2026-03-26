"use client";

import { useEffect } from "react";
import { trackGuideView } from "@/lib/pixel";
import WeddingsGuideLanding from "./components/WeddingsGuideLanding";

export default function WeddingsGuidePage() {
  useEffect(() => {
    trackGuideView("Weddings Guide");
  }, []);

  return <WeddingsGuideLanding />;
}

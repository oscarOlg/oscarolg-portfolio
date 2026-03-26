"use client";

import { useEffect } from "react";
import { trackServicesView } from "@/lib/pixel";

export default function ServicesTracker() {
  useEffect(() => {
    trackServicesView();
  }, []);

  return null;
}

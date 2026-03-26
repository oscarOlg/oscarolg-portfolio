"use client";

import { useEffect } from "react";
import { trackHomepageView } from "@/lib/pixel";

export default function HomepageTracker() {
  useEffect(() => {
    trackHomepageView();
  }, []);

  return null;
}

"use client";

import { useEffect } from "react";
import { trackAboutView } from "@/lib/pixel";

export default function AboutTracker() {
  useEffect(() => {
    trackAboutView();
  }, []);

  return null;
}

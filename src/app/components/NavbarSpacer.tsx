"use client";

import { usePathname } from "next/navigation";

/**
 * Injects a h-16 spacer below the fixed navbar on every page except the
 * homepage, where the hero image intentionally extends to the very top
 * of the viewport under the transparent navbar.
 */
export default function NavbarSpacer() {
  const pathname = usePathname();
  if (pathname === "/") return null;
  return <div className="h-16" aria-hidden="true" />;
}

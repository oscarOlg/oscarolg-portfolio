export interface UTMParams {
  source?: string;
  medium?: string;
  campaign?: string;
  content?: string;
  term?: string;
}

function cleanValue(value?: string) {
  return (value || "").trim();
}

export function appendUtmToPath(path: string, utm: UTMParams) {
  const [pathname, queryString] = path.split("?");
  const params = new URLSearchParams(queryString || "");

  const source = cleanValue(utm.source);
  const medium = cleanValue(utm.medium);
  const campaign = cleanValue(utm.campaign);
  const content = cleanValue(utm.content);
  const term = cleanValue(utm.term);

  if (source) params.set("utm_source", source);
  if (medium) params.set("utm_medium", medium);
  if (campaign) params.set("utm_campaign", campaign);
  if (content) params.set("utm_content", content);
  if (term) params.set("utm_term", term);

  const qs = params.toString();
  return qs ? `${pathname}?${qs}` : pathname;
}

export function toAbsoluteUrl(path: string) {
  const base = (process.env.NEXT_PUBLIC_SITE_URL || "https://oscarolg.com").replace(/\/$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${base}${cleanPath}`;
}

export const socialLeadMagnetLinks = {
  instagramBio: toAbsoluteUrl(
    appendUtmToPath("/recursos/guia-bodas", {
      source: "instagram",
      medium: "bio",
      campaign: "lead_magnet",
      content: "profile_link",
    })
  ),
  facebookPinnedPost: toAbsoluteUrl(
    appendUtmToPath("/recursos/guia-bodas", {
      source: "facebook",
      medium: "social",
      campaign: "lead_magnet",
      content: "pinned_post",
    })
  ),
};
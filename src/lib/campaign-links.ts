import { appendUtmToPath, toAbsoluteUrl } from "@/lib/utm";

export interface CampaignLinkOptions {
  campaign?: string;
  source?: string;
  medium?: string;
}

export interface CampaignLinkVariant {
  key: string;
  label: string;
  url: string;
}

const WEDDINGS_LANDING_PATH = "/landing-page/weddings";

function buildWeddingCampaignLink(content: string, options?: CampaignLinkOptions) {
  return toAbsoluteUrl(
    appendUtmToPath(WEDDINGS_LANDING_PATH, {
      source: options?.source || "facebook",
      medium: options?.medium || "cpc",
      campaign: options?.campaign || "bodas_2026_launch",
      content,
    })
  );
}

export function getWeddingCampaignLinks(options?: CampaignLinkOptions): CampaignLinkVariant[] {
  return [
    {
      key: "creative_a",
      label: "Creative A - Carousel",
      url: buildWeddingCampaignLink("creative_a", options),
    },
    {
      key: "creative_b",
      label: "Creative B - Reel",
      url: buildWeddingCampaignLink("creative_b", options),
    },
    {
      key: "creative_c",
      label: "Creative C - Hero Image",
      url: buildWeddingCampaignLink("creative_c", options),
    },
  ];
}

export const weddingCampaignLinks = getWeddingCampaignLinks();

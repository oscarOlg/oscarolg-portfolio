export interface LeadMagnetConfig {
  slug: string
  i18nKey: string
}

const leadMagnets: LeadMagnetConfig[] = [
  {
    slug: 'engagement-giveaway',
    i18nKey: 'engagementGiveaway',
  },
]

export function getLeadMagnetBySlug(slug: string): LeadMagnetConfig | null {
  return leadMagnets.find((item) => item.slug === slug) || null
}

export function getLeadMagnetSlugs(): string[] {
  return leadMagnets.map((item) => item.slug)
}

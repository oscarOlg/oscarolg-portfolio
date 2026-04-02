/**
 * Centralized service types configuration
 * This is the single source of truth for all photography service categories
 * Add/remove/reorder services here and everything else updates automatically
 */

export interface ServiceTypeConfig {
  /** Internal identifier (used in URLs, Sanity, database) */
  key: string;
  /** Display name in Spanish */
  name: string;
  /** Display name in English */
  nameEn: string;
  /** Component file name (without .tsx) in src/app/services/components/ */
  component: string;
  /** Portfolio category key for filtering */
  portfolio_category: string;
  /** Display order (lower = earlier) */
  order: number;
}

export const SERVICES: ServiceTypeConfig[] = [
  {
    key: 'weddings',
    name: 'Bodas',
    nameEn: 'Weddings',
    component: 'WeddingPackages',
    portfolio_category: 'weddings',
    order: 1,
  },
];

// Helper: Get service config by key
export function getServiceByKey(key: string): ServiceTypeConfig | undefined {
  return SERVICES.find((s) => s.key === key);
}

// Helper: Get service config by portfolio category
export function getServiceByPortfolioCategory(
  category: string
): ServiceTypeConfig | undefined {
  return SERVICES.find((s) => s.portfolio_category === category);
}

// Helper: Get all service keys (for Sanity schema validation)
export function getServiceKeys(): string[] {
  return SERVICES.map((s) => s.key);
}

// Helper: Generate Sanity category options from config
export function getSanityCategoryOptions() {
  return SERVICES.map((s) => ({
    title: s.name,
    value: s.key,
  }));
}

// Helper: Generate Sanity portfolio category options from config
export function getSanityPortfolioCategoryOptions() {
  return SERVICES.map((s) => ({
    title: s.name,
    value: s.portfolio_category,
  }));
}

// Type for tab enum - can be generated from config
export type ServiceKey = (typeof SERVICES)[number]['key'];

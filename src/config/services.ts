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
    component: 'WeddingPackages',
    portfolio_category: 'weddings',
    order: 1,
  },
  {
    key: 'portrait',
    name: 'Retratos',
    component: 'IndividualPackages',
    portfolio_category: 'portraits',
    order: 2,
  },
  {
    key: 'couples',
    name: 'Parejas y Grupales',
    component: 'CouplePackages',
    portfolio_category: 'couples',
    order: 3,
  },
  {
    key: 'maternity',
    name: 'Maternidad',
    component: 'MaternityPackages',
    portfolio_category: 'maternity',
    order: 4,
  },
  {
    key: 'commercial',
    name: 'Comercial y Branding',
    component: 'CommercialPackages',
    portfolio_category: 'commercial',
    order: 5,
  },
  {
    key: 'editorial',
    name: 'Moda y Editorial',
    component: 'EditorialPackages',
    portfolio_category: 'editorial',
    order: 6,
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

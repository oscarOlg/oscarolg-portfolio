import { SERVICES } from "@/config/services";

export const PORTFOLIO_CATEGORIES = SERVICES.map((service) => ({
  key: service.portfolio_category,
  label: service.name,
}));

export type PortfolioCategoryKey = typeof SERVICES[number]['portfolio_category'];

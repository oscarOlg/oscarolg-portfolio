import { getVisibleServices } from "@/config/services";

export const PORTFOLIO_CATEGORIES = getVisibleServices().map((service) => ({
  key: service.portfolio_category,
  label: service.name,
}));

export type PortfolioCategoryKey = ReturnType<typeof getVisibleServices>[number]['portfolio_category'];

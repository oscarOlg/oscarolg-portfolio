import { describe, it, expect } from 'vitest';
import {
  SERVICES,
  getServiceByKey,
  getServiceByPortfolioCategory,
  getServiceKeys,
  getSanityCategoryOptions,
  getSanityPortfolioCategoryOptions,
} from '@/config/services';

describe('SERVICES config', () => {
  it('contains 6 services', () => {
    expect(SERVICES).toHaveLength(6);
  });

  it('each service has required fields', () => {
    for (const service of SERVICES) {
      expect(service.key).toBeTruthy();
      expect(service.name).toBeTruthy();
      expect(service.component).toBeTruthy();
      expect(service.portfolio_category).toBeTruthy();
      expect(typeof service.order).toBe('number');
    }
  });

  it('service keys are unique', () => {
    const keys = SERVICES.map((s) => s.key);
    expect(new Set(keys).size).toBe(keys.length);
  });

  it('portfolio_category values are unique', () => {
    const cats = SERVICES.map((s) => s.portfolio_category);
    expect(new Set(cats).size).toBe(cats.length);
  });
});

describe('getServiceByKey', () => {
  it('returns the correct service for a known key', () => {
    const service = getServiceByKey('weddings');
    expect(service?.name).toBe('Bodas');
  });

  it('returns undefined for an unknown key', () => {
    expect(getServiceByKey('nonexistent')).toBeUndefined();
  });

  it('finds all six service keys', () => {
    const keys = ['weddings', 'portrait', 'couples', 'maternity', 'commercial', 'editorial'];
    for (const key of keys) {
      expect(getServiceByKey(key)).toBeDefined();
    }
  });
});

describe('getServiceByPortfolioCategory', () => {
  it('returns the correct service for a portfolio category', () => {
    const service = getServiceByPortfolioCategory('portraits');
    expect(service?.key).toBe('portrait');
  });

  it('returns undefined for an unknown category', () => {
    expect(getServiceByPortfolioCategory('nonexistent')).toBeUndefined();
  });
});

describe('getServiceKeys', () => {
  it('returns an array of all service keys', () => {
    const keys = getServiceKeys();
    expect(keys).toEqual(SERVICES.map((s) => s.key));
  });

  it('includes all expected service types', () => {
    const keys = getServiceKeys();
    expect(keys).toContain('weddings');
    expect(keys).toContain('editorial');
  });
});

describe('getSanityCategoryOptions', () => {
  it('returns one option per service', () => {
    const opts = getSanityCategoryOptions();
    expect(opts).toHaveLength(SERVICES.length);
  });

  it('options have title and value', () => {
    for (const opt of getSanityCategoryOptions()) {
      expect(opt.title).toBeTruthy();
      expect(opt.value).toBeTruthy();
    }
  });
});

describe('getSanityPortfolioCategoryOptions', () => {
  it('returns one option per service', () => {
    const opts = getSanityPortfolioCategoryOptions();
    expect(opts).toHaveLength(SERVICES.length);
  });

  it('values match portfolio_category fields', () => {
    const opts = getSanityPortfolioCategoryOptions();
    const portfolioCategories = SERVICES.map((s) => s.portfolio_category);
    for (const opt of opts) {
      expect(portfolioCategories).toContain(opt.value);
    }
  });
});

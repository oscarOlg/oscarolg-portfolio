import { describe, it, expect } from 'vitest';
import { calculateTotalPrice } from '@/lib/pricing';
import type { ServicePackage } from '@/types/sanity';

const basePackage: ServicePackage = {
  _id: 'pkg-1',
  _type: 'servicePackage',
  name: 'Esencial',
  category: 'weddings',
  price: 8000,
  description: 'Paquete básico de boda',
  addOns: [
    { _key: 'ao-1', name: 'Álbum Impreso', price: 1500, unit: undefined },
    { _key: 'ao-2', name: 'Hora Extra', price: 800, unit: 'hora' },
    { _key: 'ao-3', name: 'USB Personalizada', price: 500, unit: undefined },
  ],
};

describe('calculateTotalPrice', () => {
  it('returns 0 when no package is selected', () => {
    expect(calculateTotalPrice(null, {})).toBe(0);
  });

  it('returns base package price when no add-ons selected', () => {
    expect(calculateTotalPrice(basePackage, {})).toBe(8000);
  });

  it('adds a single add-on (quantity 1)', () => {
    expect(calculateTotalPrice(basePackage, { 'Álbum Impreso': 1 })).toBe(9500);
  });

  it('multiplies add-on price by quantity', () => {
    expect(calculateTotalPrice(basePackage, { 'Hora Extra': 3 })).toBe(8000 + 800 * 3);
  });

  it('adds multiple add-ons correctly', () => {
    const addOns = { 'Álbum Impreso': 1, 'USB Personalizada': 1 };
    expect(calculateTotalPrice(basePackage, addOns)).toBe(8000 + 1500 + 500);
  });

  it('ignores add-ons not present on the package', () => {
    expect(calculateTotalPrice(basePackage, { 'Servicio Inexistente': 2 })).toBe(8000);
  });

  it('handles package with no addOns field', () => {
    const pkg: ServicePackage = { ...basePackage, addOns: undefined };
    expect(calculateTotalPrice(pkg, { 'Álbum Impreso': 1 })).toBe(8000);
  });

  it('handles package with price 0', () => {
    const pkg: ServicePackage = { ...basePackage, price: 0 };
    expect(calculateTotalPrice(pkg, { 'Álbum Impreso': 1 })).toBe(1500);
  });

  it('does not count add-ons with quantity 0 (caller responsibility)', () => {
    // quantity 0 means the add-on wasn't selected; price * 0 = 0 extra
    expect(calculateTotalPrice(basePackage, { 'Álbum Impreso': 0 })).toBe(8000);
  });
});

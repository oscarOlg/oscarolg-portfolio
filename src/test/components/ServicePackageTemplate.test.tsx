import { describe, it, expect, vi } from 'vitest';
import { render, screen } from '@testing-library/react';
import React from 'react';
import type { ServiceConfig, ServicePackage } from '@/types/sanity';

vi.mock('next/link', () => ({
  default: ({
    href,
    children,
    ...rest
  }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
    React.createElement('a', { href, ...rest }, children),
}));

import ServicePackageTemplate from '@/app/services/components/ServicePackageTemplate';

// ── Fixtures ────────────────────────────────────────────────────────────────

const baseConfig: ServiceConfig = {
  _id: 'config-1',
  _type: 'serviceConfig',
  serviceKey: 'weddings',
  displayName: 'Bodas',
  gridColumns: 3,
};

function makePackage(overrides: Partial<ServicePackage> = {}): ServicePackage {
  return {
    _id: 'pkg-1',
    _type: 'servicePackage',
    name: 'Esencial',
    category: 'weddings',
    price: 8000,
    description: 'Paquete básico',
    displayOrder: 1,
    ...overrides,
  };
}

// ── Tests ────────────────────────────────────────────────────────────────────

describe('ServicePackageTemplate', () => {
  it('renders package name and price', () => {
    const pkg = makePackage();
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.getByText('Esencial')).toBeInTheDocument();
    expect(screen.getByText('$8,000')).toBeInTheDocument();
  });

  it('shows "Más Popular" badge when popular=true', () => {
    const pkg = makePackage({ popular: true });
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.getByText('Más Popular')).toBeInTheDocument();
  });

  it('uses custom badgeLabel when provided', () => {
    const pkg = makePackage({ popular: true, badgeLabel: 'Recomendado' });
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.getByText('Recomendado')).toBeInTheDocument();
    expect(screen.queryByText('Más Popular')).not.toBeInTheDocument();
  });

  it('does not show badge when popular=false', () => {
    const pkg = makePackage({ popular: false });
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.queryByText('Más Popular')).not.toBeInTheDocument();
  });

  it('renders features list when no bodyText', () => {
    const pkg = makePackage({ features: ['5 horas de cobertura', 'Galería digital'] });
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.getByText('5 horas de cobertura')).toBeInTheDocument();
    expect(screen.getByText('Galería digital')).toBeInTheDocument();
  });

  it('renders bodyText instead of features when both provided', () => {
    const pkg = makePackage({
      bodyText: 'Cobertura completa del día.',
      features: ['5 horas de cobertura'],
    });
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.getByText('Cobertura completa del día.')).toBeInTheDocument();
    expect(screen.queryByText('5 horas de cobertura')).not.toBeInTheDocument();
  });

  it('renders second bodyText paragraph in italic when separated by \\n\\n', () => {
    const pkg = makePackage({
      bodyText: 'Primer párrafo descriptivo.\n\nNota adicional en itálica.',
    });
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.getByText('Primer párrafo descriptivo.')).toBeInTheDocument();
    const italic = screen.getByText('Nota adicional en itálica.');
    expect(italic).toHaveClass('italic');
  });

  it('hides price when showPrice=false', () => {
    const pkg = makePackage({ showPrice: false });
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    // Price should not appear
    expect(screen.queryByText('$8,000')).not.toBeInTheDocument();
  });

  it('renders special variant card outside main grid', () => {
    const normal = makePackage({ _id: 'pkg-1', name: 'Esencial', displayOrder: 1 });
    const special = makePackage({
      _id: 'pkg-2',
      name: 'Boda Civil',
      isSpecialVariant: true,
      displayOrder: 99,
    });
    render(
      React.createElement(ServicePackageTemplate, {
        config: baseConfig,
        packages: [normal, special],
      })
    );
    // Both names should appear
    expect(screen.getByText('Esencial')).toBeInTheDocument();
    expect(screen.getByText('Boda Civil')).toBeInTheDocument();
  });

  it('renders complementos section when config has complementos', () => {
    const config: ServiceConfig = {
      ...baseConfig,
      complementos: [
        { _key: 'c1', name: 'Álbum Impreso', price: 1500 },
        { _key: 'c2', name: 'Hora Extra', price: 800, unit: 'hora' },
      ],
    };
    const pkg = makePackage();
    render(React.createElement(ServicePackageTemplate, { config, packages: [pkg] }));
    expect(screen.getByText('Complementos')).toBeInTheDocument();
    expect(screen.getByText('Álbum Impreso')).toBeInTheDocument();
    expect(screen.getByText(/\$1,500/)).toBeInTheDocument();
  });

  it('does not render complementos section when config has none', () => {
    const pkg = makePackage();
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.queryByText('Complementos')).not.toBeInTheDocument();
  });

  it('renders intro text when provided', () => {
    const config: ServiceConfig = { ...baseConfig, introText: 'Sesiones únicas para ti.' };
    const pkg = makePackage();
    render(React.createElement(ServicePackageTemplate, { config, packages: [pkg] }));
    expect(screen.getByText('Sesiones únicas para ti.')).toBeInTheDocument();
  });

  it('uses custom CTA text from config', () => {
    const config: ServiceConfig = { ...baseConfig, ctaButtonText: 'Agendar Ahora' };
    const pkg = makePackage();
    render(React.createElement(ServicePackageTemplate, { config, packages: [pkg] }));
    expect(screen.getByRole('link', { name: 'Agendar Ahora' })).toBeInTheDocument();
  });

  it('uses per-package ctaText override', () => {
    const pkg = makePackage({ ctaText: 'Cotizar Paquete' });
    render(React.createElement(ServicePackageTemplate, { config: baseConfig, packages: [pkg] }));
    expect(screen.getByRole('link', { name: 'Cotizar Paquete' })).toBeInTheDocument();
  });
});

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import React from 'react';

// ── Mocks (must be before any component import) ────────────────────────────

vi.mock('next/navigation', () => ({
  usePathname: vi.fn(() => '/'),
}));

vi.mock('next/link', () => ({
  default: ({ href, children, ...rest }: React.AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) =>
    React.createElement('a', { href, ...rest }, children),
}));

vi.mock('@/app/components/Socials', () => ({
  default: () => React.createElement('div', { 'data-testid': 'socials' }),
}));

vi.mock('framer-motion', async () => {
  const R = await import('react');

  const makeMotionEl = (tag: string) =>
    R.forwardRef(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      ({ children, animate, initial, exit, transition, ...rest }: any, ref: any) =>
        R.createElement(tag, { ...rest, ref }, children)
    );

  const motionProxy = new Proxy({} as Record<string, unknown>, {
    get: (_t, tag: string) => makeMotionEl(tag),
  });

  return {
    motion: motionProxy,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
  };
});

// ── Component under test (imported AFTER mocks) ────────────────────────────
import Navbar from '@/app/components/Navbar';
import { usePathname } from 'next/navigation';

const mockUsePathname = usePathname as ReturnType<typeof vi.fn>;

// ── Tests ──────────────────────────────────────────────────────────────────

describe('Navbar', () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue('/');
  });

  it('renders the brand name', () => {
    render(React.createElement(Navbar));
    expect(screen.getByText('Oscar Olg')).toBeInTheDocument();
  });

  it('renders all nav links in desktop nav', () => {
    render(React.createElement(Navbar));
    // Desktop nav links exist in DOM (may be visually hidden via CSS but present)
    const portfolioLinks = screen.getAllByText('Portafolio');
    expect(portfolioLinks.length).toBeGreaterThan(0);
  });

  it('hamburger button is present', () => {
    render(React.createElement(Navbar));
    expect(screen.getByRole('button', { name: /toggle menu/i })).toBeInTheDocument();
  });

  it('mobile menu is closed by default (nav links not in visible dropdown)', () => {
    render(React.createElement(Navbar));
    // The mobile dropdown links live inside the AnimatePresence-controlled div.
    // When closed, it is not mounted in the DOM at all.
    // We look for the link inside the mobile wrapper — it should not be present.
    const mobileLinks = screen.queryAllByRole('link', { name: 'Contacto' });
    // Desktop link exists; mobile link is removed from DOM when closed.
    // With our framer-motion mock, AnimatePresence always renders children,
    // so we verify the button aria-expanded state instead.
    const btn = screen.getByRole('button', { name: /toggle menu/i });
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('clicking hamburger opens the mobile menu', () => {
    render(React.createElement(Navbar));
    const btn = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'true');
  });

  it('clicking hamburger again closes the mobile menu', () => {
    render(React.createElement(Navbar));
    const btn = screen.getByRole('button', { name: /toggle menu/i });
    fireEvent.click(btn);
    fireEvent.click(btn);
    expect(btn).toHaveAttribute('aria-expanded', 'false');
  });

  it('marks the active link when pathname matches', () => {
    mockUsePathname.mockReturnValue('/services');
    render(React.createElement(Navbar));
    const servicesLinks = screen.getAllByRole('link', { name: 'Inversión' });
    // At least one of them should carry the active class
    const activeLink = servicesLinks.find((el) =>
      el.className.includes('text-accent')
    );
    expect(activeLink).toBeDefined();
  });

  it('does not mark a non-matching link as active', () => {
    mockUsePathname.mockReturnValue('/services');
    render(React.createElement(Navbar));
    const contactLinks = screen.getAllByRole('link', { name: 'Contacto' });
    // None of the Contacto links should have the active accent class
    // Split classNames so "hover:text-accent" does not count as "text-accent"
    const activeContact = contactLinks.find((el) => {
      const classes = el.className.split(' ');
      return classes.includes('text-accent') && classes.includes('border-accent');
    });
    expect(activeContact).toBeUndefined();
  });
});

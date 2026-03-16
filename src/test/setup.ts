import '@testing-library/jest-dom';

// ── Sanity env vars ───────────────────────────────────────────────────────────
// src/lib/sanity.ts throws at module load time if these are missing.
// Set them here so any test file that imports from sanity.ts won't throw.
process.env.NEXT_PUBLIC_SANITY_PROJECT_ID = 'test-project-id';
process.env.NEXT_PUBLIC_SANITY_DATASET = 'production';

// ── IntersectionObserver mock ─────────────────────────────────────────────────
// jsdom doesn't implement IntersectionObserver. Kept as a stub in case any
// component or future test relies on it.

class MockIntersectionObserver implements IntersectionObserver {
  readonly root: Element | Document | null = null;
  readonly rootMargin = '';
  readonly thresholds: ReadonlyArray<number> = [];
  observe() {}
  unobserve() {}
  disconnect() {}
  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

Object.defineProperty(window, 'IntersectionObserver', {
  writable: true,
  configurable: true,
  value: MockIntersectionObserver,
});

// ── getBoundingClientRect mock ────────────────────────────────────────────────
// jsdom returns all-zero rects. Kept as a stub for any component that reads
// element dimensions during tests.

Element.prototype.getBoundingClientRect = function () {
  return {
    top: 0,
    bottom: 60,
    left: 0,
    right: 0,
    width: 1,
    height: 60,
    x: 0,
    y: 0,
    toJSON: () => ({}),
  } as DOMRect;
};

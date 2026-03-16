import { vi, describe, it, expect, beforeEach } from 'vitest';

// ── Mocks (hoisted above imports by Vitest) ───────────────────────────────────

// mockFetch must be created with vi.hoisted so it's available inside vi.mock factories
const mockFetch = vi.hoisted(() => vi.fn());

vi.mock('next-sanity', () => ({
  createClient: vi.fn().mockReturnValue({ fetch: mockFetch }),
}));

vi.mock('@sanity/image-url', () => {
  // Build a chainable builder stub; every method returns the same chain object
  const chain: Record<string, ReturnType<typeof vi.fn>> = {};
  chain.image = vi.fn().mockReturnValue(chain);
  chain.auto = vi.fn().mockReturnValue(chain);
  chain.quality = vi.fn().mockReturnValue(chain);
  chain.url = vi.fn().mockReturnValue('https://cdn.sanity.io/test.jpg');
  return { default: vi.fn().mockReturnValue(chain) };
});

// ── Imports under test ────────────────────────────────────────────────────────

import {
  formatPrice,
  getImageUrl,
  getPortfolioImages,
  getPortfolioImageBySlug,
  getPortfolioImageByOrder,
  getPortfolioImagesByCategory,
  getFeaturedPortfolioImages,
  getServicePackages,
  getServicePackagesByCategory,
  getServiceConfigs,
  getServiceConfigByKey,
  getAboutContent,
  getHomepageContent,
  getTestimonials,
  getFeaturedTestimonials,
  getServiceThumbnails,
} from '@/lib/sanity';

// ── Fixtures ──────────────────────────────────────────────────────────────────

const mockImage = {
  _id: 'img-1',
  title: 'Test Image',
  slug: { current: 'test-image' },
  category: 'weddings',
  featured: false,
  image: {
    asset: { _id: 'asset-1', url: 'https://cdn.sanity.io/img.jpg' },
  },
  displayOrder: 1,
  publishedAt: '2024-01-01',
};

const mockPackage = {
  _id: 'pkg-1',
  name: 'Básico',
  category: 'weddings',
  price: 8000,
  popular: false,
  features: ['Feature A'],
  displayOrder: 1,
};

const mockConfig = {
  _id: 'cfg-1',
  serviceKey: 'weddings',
  displayName: 'Bodas',
  introText: 'Intro text',
};

// ── formatPrice ───────────────────────────────────────────────────────────────

describe('formatPrice', () => {
  it('returns "Consultar precio" for null', () => {
    expect(formatPrice(null)).toBe('Consultar precio');
  });

  it('returns "Gratis" for 0', () => {
    expect(formatPrice(0)).toBe('Gratis');
  });

  it('formats 8000 as "$8,000 MXN"', () => {
    expect(formatPrice(8000)).toBe('$8,000 MXN');
  });

  it('formats 1500 as "$1,500 MXN"', () => {
    expect(formatPrice(1500)).toBe('$1,500 MXN');
  });

  it('formats 500 as "$500 MXN"', () => {
    expect(formatPrice(500)).toBe('$500 MXN');
  });
});

// ── getImageUrl ───────────────────────────────────────────────────────────────

describe('getImageUrl', () => {
  it('returns "" for undefined image', () => {
    expect(getImageUrl(undefined)).toBe('');
  });

  it('returns "" for image without asset', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getImageUrl({} as any)).toBe('');
  });

  it('returns URL when image has an asset', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    expect(getImageUrl(mockImage.image as any)).toBe('https://cdn.sanity.io/test.jpg');
  });
});

// ── getPortfolioImages ────────────────────────────────────────────────────────

describe('getPortfolioImages', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns images array from Sanity', async () => {
    mockFetch.mockResolvedValue([mockImage]);
    const result = await getPortfolioImages();
    expect(result).toEqual([mockImage]);
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('returns [] when Sanity returns null', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getPortfolioImages()).toEqual([]);
  });
});

// ── getPortfolioImageBySlug ───────────────────────────────────────────────────

describe('getPortfolioImageBySlug', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns image when found', async () => {
    mockFetch.mockResolvedValue(mockImage);
    expect(await getPortfolioImageBySlug('test-slug')).toEqual(mockImage);
  });

  it('passes slug as a GROQ query parameter', async () => {
    mockFetch.mockResolvedValue(mockImage);
    await getPortfolioImageBySlug('my-slug');
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ slug: 'my-slug' }),
    );
  });

  it('returns null when image is not found', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getPortfolioImageBySlug('missing')).toBeNull();
  });
});

// ── getPortfolioImageByOrder ──────────────────────────────────────────────────

describe('getPortfolioImageByOrder', () => {
  beforeEach(() => mockFetch.mockReset());

  it('passes category and order as GROQ query parameters', async () => {
    mockFetch.mockResolvedValue(mockImage);
    await getPortfolioImageByOrder('weddings', 1);
    expect(mockFetch).toHaveBeenCalledWith(
      expect.any(String),
      expect.objectContaining({ category: 'weddings', order: 1 }),
    );
  });

  it('returns null when image is not found', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getPortfolioImageByOrder('weddings', 99)).toBeNull();
  });
});

// ── getPortfolioImagesByCategory ──────────────────────────────────────────────

describe('getPortfolioImagesByCategory', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns images for the given category', async () => {
    mockFetch.mockResolvedValue([mockImage]);
    expect(await getPortfolioImagesByCategory('weddings')).toEqual([mockImage]);
  });

  it('includes the category in the GROQ query', async () => {
    mockFetch.mockResolvedValue([]);
    await getPortfolioImagesByCategory('portraits');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('portraits'));
  });
});

// ── getFeaturedPortfolioImages ────────────────────────────────────────────────

describe('getFeaturedPortfolioImages', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns featured images', async () => {
    mockFetch.mockResolvedValue([mockImage]);
    expect(await getFeaturedPortfolioImages()).toEqual([mockImage]);
  });

  it('returns [] when Sanity returns null', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getFeaturedPortfolioImages()).toEqual([]);
  });
});

// ── getServicePackages ────────────────────────────────────────────────────────

describe('getServicePackages', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns all packages', async () => {
    mockFetch.mockResolvedValue([mockPackage]);
    expect(await getServicePackages()).toEqual([mockPackage]);
  });

  it('returns [] when Sanity returns null', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getServicePackages()).toEqual([]);
  });
});

// ── getServicePackagesByCategory ──────────────────────────────────────────────

describe('getServicePackagesByCategory', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns packages for the given category', async () => {
    mockFetch.mockResolvedValue([mockPackage]);
    expect(await getServicePackagesByCategory('weddings')).toEqual([mockPackage]);
  });

  it('includes the category in the GROQ query', async () => {
    mockFetch.mockResolvedValue([]);
    await getServicePackagesByCategory('portrait');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('portrait'));
  });
});

// ── getServiceConfigs ─────────────────────────────────────────────────────────

describe('getServiceConfigs', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns all service configs', async () => {
    mockFetch.mockResolvedValue([mockConfig]);
    expect(await getServiceConfigs()).toEqual([mockConfig]);
  });

  it('returns [] when Sanity returns null', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getServiceConfigs()).toEqual([]);
  });
});

// ── getServiceConfigByKey ─────────────────────────────────────────────────────

describe('getServiceConfigByKey', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns config when found', async () => {
    mockFetch.mockResolvedValue(mockConfig);
    expect(await getServiceConfigByKey('weddings')).toEqual(mockConfig);
  });

  it('includes the service key in the GROQ query', async () => {
    mockFetch.mockResolvedValue(mockConfig);
    await getServiceConfigByKey('portrait');
    expect(mockFetch).toHaveBeenCalledWith(expect.stringContaining('portrait'));
  });

  it('returns null when not found', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getServiceConfigByKey('unknown')).toBeNull();
  });
});

// ── getAboutContent ───────────────────────────────────────────────────────────

describe('getAboutContent', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns about content when found', async () => {
    const about = { heading: 'About', paragraphs: ['Para 1'], ctaText: 'CTA' };
    mockFetch.mockResolvedValue(about);
    expect(await getAboutContent()).toEqual(about);
  });

  it('returns null when not found', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getAboutContent()).toBeNull();
  });
});

// ── getHomepageContent ────────────────────────────────────────────────────────

describe('getHomepageContent', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns homepage content', async () => {
    const content = { heroHeading: 'Hero' };
    mockFetch.mockResolvedValue(content);
    expect(await getHomepageContent()).toEqual(content);
  });

  it('returns null when not found', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getHomepageContent()).toBeNull();
  });
});

// ── getTestimonials ───────────────────────────────────────────────────────────

describe('getTestimonials', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns all testimonials', async () => {
    const testimonials = [{ _id: 't1', author: 'Ana', text: 'Great!', rating: 5 }];
    mockFetch.mockResolvedValue(testimonials);
    expect(await getTestimonials()).toEqual(testimonials);
  });

  it('returns [] when Sanity returns null', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getTestimonials()).toEqual([]);
  });
});

// ── getFeaturedTestimonials ───────────────────────────────────────────────────

describe('getFeaturedTestimonials', () => {
  beforeEach(() => mockFetch.mockReset());

  it('returns featured testimonials', async () => {
    const featured = [{ _id: 't2', author: 'Luis', text: 'Excellent!', featured: true }];
    mockFetch.mockResolvedValue(featured);
    expect(await getFeaturedTestimonials()).toEqual(featured);
  });

  it('returns [] when Sanity returns null', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getFeaturedTestimonials()).toEqual([]);
  });
});

// ── getServiceThumbnails ──────────────────────────────────────────────────────

describe('getServiceThumbnails', () => {
  beforeEach(() => mockFetch.mockReset());

  const services = [
    { key: 'weddings', portfolio_category: 'weddings' },
    { key: 'portrait', portfolio_category: 'portraits' },
  ];

  it('calls client.fetch exactly once for all services', async () => {
    mockFetch.mockResolvedValue({ weddings: mockImage, portrait: null });
    await getServiceThumbnails(services);
    expect(mockFetch).toHaveBeenCalledOnce();
  });

  it('includes all service keys in the single GROQ query', async () => {
    mockFetch.mockResolvedValue({});
    await getServiceThumbnails(services);
    const query: string = mockFetch.mock.calls[0][0];
    expect(query).toContain('"weddings"');
    expect(query).toContain('"portrait"');
  });

  it('returns the result map from Sanity', async () => {
    const result = { weddings: mockImage, portrait: null };
    mockFetch.mockResolvedValue(result);
    expect(await getServiceThumbnails(services)).toEqual(result);
  });

  it('returns {} when Sanity returns null', async () => {
    mockFetch.mockResolvedValue(null);
    expect(await getServiceThumbnails(services)).toEqual({});
  });
});

import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { PortfolioImage, ServicePackage, AboutContent, Testimonial } from '@/types/sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET
const apiVersion = process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-03-01'

if (!projectId || !dataset) {
  throw new Error('Missing Sanity environment variables')
}

export const client = createClient({
  projectId,
  dataset,
  apiVersion,
  useCdn: true,
})

// GROQ queries for different content types

export const portfolioImagesQuery = `
  *[_type == "portfolioImage"] | order(displayOrder, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    location,
    featured,
    image {
      asset {
        _id,
        url
      },
      hotspot,
    },
    photographyDetails,
    displayOrder,
    publishedAt
  }
`

export const portfolioImagesByCategoryQuery = (category: string) => `
  *[_type == "portfolioImage" && category == "${category}"] | order(displayOrder, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    location,
    featured,
    image {
      asset {
        _id,
        url
      },
      hotspot,
    },
    photographyDetails,
    displayOrder,
    publishedAt
  }
`

export const featuredPortfolioImagesQuery = `
  *[_type == "portfolioImage" && featured == true] | order(displayOrder, publishedAt desc) {
    _id,
    title,
    slug,
    description,
    category,
    location,
    image {
      asset {
        _id,
        url
      },
      hotspot,
    },
    photographyDetails,
    displayOrder,
    publishedAt
  }
`

export const servicePackagesQuery = `
  *[_type == "servicePackage"] | order(displayOrder) {
    _id,
    name,
    category,
    tier,
    price,
    description,
    features,
    addOns,
    duration,
    deliverables,
    popular,
    displayOrder
  }
`

export const servicePackagesByCategoryQuery = (category: string) => `
  *[_type == "servicePackage" && category == "${category}"] | order(displayOrder) {
    _id,
    name,
    category,
    tier,
    price,
    description,
    features,
    addOns,
    duration,
    deliverables,
    popular,
    displayOrder
  }
`

export const testimonialsQuery = `
  *[_type == "testimonial"] | order(displayOrder, publishedAt desc) {
    _id,
    author,
    role,
    text,
    rating,
    featured,
    image {
      asset {
        _id,
        url
      },
      hotspot,
    },
    displayOrder,
    publishedAt
  }
`

export const featuredTestimonialsQuery = `
  *[_type == "testimonial" && featured == true] | order(displayOrder) {
    _id,
    author,
    role,
    text,
    rating,
    image {
      asset {
        _id,
        url
      },
      hotspot,
    },
    displayOrder
  }
`

export const aboutContentQuery = `
  *[_type == "aboutContent"][0] {
    title,
    subtitle,
    mainImage {
      asset {
        _id,
        url
      },
      hotspot,
    },
    bio,
    yearsExperience,
    specializations,
    cta
  }
`

// ============================================================================
// FETCH UTILITY FUNCTIONS
// ============================================================================

/**
 * Convert Sanity image asset to a usable image URL
 * @param image - The Sanity image object
 * @returns URL string for the image
 */
export function getImageUrl(image: PortfolioImage['image'] | undefined): string {
  if (!image?.asset) return ''
  try {
    return imageUrlBuilder(client).image(image).url()
  } catch (error) {
    console.error('Error building image URL:', error)
    return ''
  }
}

/**
 * Format price for display
 * @param price - The price as a number
 * @returns Formatted price string (e.g., "$8,000 MXN")
 */
export function formatPrice(price: number | null): string {
  if (price === null || price === undefined) return 'Consultar precio'
  if (price === 0) return 'Gratis'
  return `$${price.toLocaleString('es-MX')} MXN`
}

/**
 * Fetch all portfolio images from Sanity
 * Returns images sorted by displayOrder and publish date
 */
export async function getPortfolioImages(): Promise<PortfolioImage[]> {
  try {
    const images = await client.fetch<PortfolioImage[]>(portfolioImagesQuery)
    return images || []
  } catch (error) {
    console.error('Error fetching portfolio images:', error)
    return []
  }
}

/**
 * Fetch portfolio images filtered by category
 * @param category - The photography category (weddings, commercial, etc.)
 */
export async function getPortfolioImagesByCategory(category: string): Promise<PortfolioImage[]> {
  try {
    const query = portfolioImagesByCategoryQuery(category)
    const images = await client.fetch<PortfolioImage[]>(query)
    return images || []
  } catch (error) {
    console.error(`Error fetching portfolio images for category ${category}:`, error)
    return []
  }
}

/**
 * Fetch featured portfolio images only
 * Used for homepage or hero sections
 */
export async function getFeaturedPortfolioImages(): Promise<PortfolioImage[]> {
  try {
    const images = await client.fetch<PortfolioImage[]>(featuredPortfolioImagesQuery)
    return images || []
  } catch (error) {
    console.error('Error fetching featured portfolio images:', error)
    return []
  }
}

/**
 * Fetch all service packages from Sanity
 * Returns all packages grouped by category through Sanity
 */
export async function getServicePackages(): Promise<ServicePackage[]> {
  try {
    const packages = await client.fetch<ServicePackage[]>(servicePackagesQuery)
    return packages || []
  } catch (error) {
    console.error('Error fetching service packages:', error)
    return []
  }
}

/**
 * Fetch service packages filtered by category
 * @param category - The service category (wedding, commercial, maternity, etc.)
 */
export async function getServicePackagesByCategory(category: string): Promise<ServicePackage[]> {
  try {
    const query = servicePackagesByCategoryQuery(category)
    const packages = await client.fetch<ServicePackage[]>(query)
    return packages || []
  } catch (error) {
    console.error(`Error fetching service packages for category ${category}:`, error)
    return []
  }
}

/**
 * Fetch about page content
 * Returns single document with photographer bio and information
 */
export async function getAboutContent(): Promise<AboutContent | null> {
  try {
    const about = await client.fetch<AboutContent>(aboutContentQuery)
    return about || null
  } catch (error) {
    console.error('Error fetching about content:', error)
    return null
  }
}

/**
 * Fetch all testimonials from Sanity
 */
export async function getTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await client.fetch<Testimonial[]>(testimonialsQuery)
    return testimonials || []
  } catch (error) {
    console.error('Error fetching testimonials:', error)
    return []
  }
}

/**
 * Fetch featured testimonials only
 * Used for homepage or highlight sections
 */
export async function getFeaturedTestimonials(): Promise<Testimonial[]> {
  try {
    const testimonials = await client.fetch<Testimonial[]>(featuredTestimonialsQuery)
    return testimonials || []
  } catch (error) {
    console.error('Error fetching featured testimonials:', error)
    return []
  }
}

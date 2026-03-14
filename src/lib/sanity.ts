import {createClient} from 'next-sanity'
import imageUrlBuilder from '@sanity/image-url'
import type { PortfolioImage, ServicePackage, ServiceConfig, AboutContent, Testimonial } from '@/types/sanity'

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
  useCdn: false,
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
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
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
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
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
      asset-> {
        _id,
        url,
        metadata {
          dimensions {
            width,
            height,
            aspectRatio
          }
        }
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
    showPrice,
    pricePrefix,
    description,
    features,
    bodyText,
    popular,
    badgeLabel,
    ctaText,
    ctaVariant,
    isSpecialVariant,
    variantType,
    addOns,
    duration,
    deliverables,
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
    showPrice,
    pricePrefix,
    description,
    features,
    bodyText,
    popular,
    badgeLabel,
    ctaText,
    ctaVariant,
    isSpecialVariant,
    variantType,
    addOns,
    duration,
    deliverables,
    displayOrder
  }
`

export const serviceConfigsQuery = `
  *[_type == "serviceConfig"] | order(serviceKey) {
    _id,
    serviceKey,
    displayName,
    introText,
    gridColumns,
    hasAddOns,
    complementos,
    infoCardVariant,
    infoCardHeading,
    infoCardContent,
    customBlockHeading,
    customBlockContent,
    hasGlobalBenefits,
    globalBenefitsHeading,
    globalBenefitsText,
    hasProcess,
    processTitle,
    processSteps,
    ctaButtonText
  }
`

export const serviceConfigByKeyQuery = (serviceKey: string) => `
  *[_type == "serviceConfig" && serviceKey == "${serviceKey}"][0] {
    _id,
    serviceKey,
    displayName,
    introText,
    gridColumns,
    hasAddOns,
    complementos,
    infoCardVariant,
    infoCardHeading,
    infoCardContent,
    customBlockHeading,
    customBlockContent,
    hasGlobalBenefits,
    globalBenefitsHeading,
    globalBenefitsText,
    hasProcess,
    processTitle,
    processSteps,
    ctaButtonText
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
      asset-> {
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
      asset-> {
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
      asset-> {
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
export function getImageUrl(image: PortfolioImage['image'] | undefined, width?: number, height?: number): string {
  if (!image?.asset) return ''
  try {
    const builder = imageUrlBuilder(client).image(image)

    // Add width and height if provided
    if (width) builder.width(width)
    if (height) builder.height(height)

    // Add auto format and quality optimization
    return builder.auto('format').quality(90).url()
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
 * Fetch a single portfolio image by its slug.
 * Use this to pin a specific photo anywhere on the site.
 * @example getPortfolioImageBySlug('couples-dscf0721')
 */
export async function getPortfolioImageBySlug(slug: string): Promise<PortfolioImage | null> {
  try {
    const query = `*[_type == "portfolioImage" && slug.current == $slug][0] {
      _id, title, slug, description, category, location, featured,
      image { asset-> { _id, url, metadata { dimensions { width, height, aspectRatio } } }, hotspot },
      displayOrder, publishedAt
    }`
    const image = await client.fetch<PortfolioImage>(query, { slug })
    return image || null
  } catch (error) {
    console.error(`Error fetching portfolio image by slug "${slug}":`, error)
    return null
  }
}

/**
 * Fetch photos that have a specific displayOrder value within a category.
 * Use this to pick exactly which photo shows as a cover/hero for a category.
 * @example getPortfolioImageByOrder('weddings', 1)  → hero wedding photo
 */
export async function getPortfolioImageByOrder(
  category: string,
  order: number
): Promise<PortfolioImage | null> {
  try {
    const query = `*[_type == "portfolioImage" && category == $category && displayOrder == $order][0] {
      _id, title, slug, description, category, location, featured,
      image { asset-> { _id, url, metadata { dimensions { width, height, aspectRatio } } }, hotspot },
      displayOrder, publishedAt
    }`
    const image = await client.fetch<PortfolioImage>(query, { category, order })
    return image || null
  } catch (error) {
    console.error(`Error fetching portfolio image for ${category} order ${order}:`, error)
    return null
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
 * @param category - The service category (weddings, commercial, maternity, etc.)
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
 * Fetch all service configurations
 */
export async function getServiceConfigs(): Promise<ServiceConfig[]> {
  try {
    const configs = await client.fetch<ServiceConfig[]>(serviceConfigsQuery)
    return configs || []
  } catch (error) {
    console.error('Error fetching service configs:', error)
    return []
  }
}

/**
 * Fetch a service configuration by its service key
 * @param serviceKey - e.g., 'weddings', 'portrait', 'couples'
 */
export async function getServiceConfigByKey(serviceKey: string): Promise<ServiceConfig | null> {
  try {
    const query = serviceConfigByKeyQuery(serviceKey)
    const config = await client.fetch<ServiceConfig>(query)
    return config || null
  } catch (error) {
    console.error(`Error fetching service config for key "${serviceKey}":`, error)
    return null
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

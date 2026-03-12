/**
 * TypeScript Interfaces for Sanity CMS Data
 * Generated from sanity/schemaTypes definitions
 */

/**
 * Sanity Image Asset with hotspot data
 */
export interface SanityImageAsset {
  _type: 'image'
  asset: {
    _id: string
    url: string
  }
  hotspot?: {
    x: number
    y: number
    height: number
    width: number
  }
  crop?: {
    top: number
    bottom: number
    left: number
    right: number
  }
}

/**
 * Block content used in rich text fields
 */
export interface BlockContent {
  _type: 'block' | string
  _key?: string
  style?: 'normal' | 'h1' | 'h2' | 'h3' | 'blockquote'
  text?: string
  children?: Array<{
    _type: 'span'
    _key?: string
    text: string
    marks?: string[]
  }>
  markDefs?: Array<{
    _type: string
    _key?: string
    [key: string]: any
  }>
  level?: number
  listItem?: 'bullet' | 'number'
}

/**
 * Portfolio Image Document
 * Represents a single photograph in the portfolio
 */
export interface PortfolioImage {
  _id: string
  _type: 'portfolioImage'
  title: string
  slug: {
    _type: 'slug'
    current: string
  }
  description?: string
  category: 'weddings' | 'portraits' | 'events' | 'quinceaneras' | 'couples' | 'commercial' | 'editorial' | 'maternity'
  location?: string
  image: SanityImageAsset
  featured: boolean
  displayOrder?: number
  photographyDetails?: {
    _type: 'object'
    camera?: string
    lens?: string
    iso?: string
    aperture?: string
    shutterSpeed?: string
  }
  publishedAt: string
}

/**
 * Service Package Document
 * Represents a pricing tier for a service offering
 */
export interface ServicePackage {
  _id: string
  _type: 'servicePackage'
  name: string
  category: 'wedding' | 'individual' | 'couples' | 'maternity' | 'commercial' | 'editorial' | 'event'
  tier?: 'essential' | 'premium' | 'deluxe'
  price: number | null
  duration?: number | null
  description: string
  features: string[]
  deliverables: string
  addOns?: Array<{
    _key: string
    _type?: 'object'
    name: string
    price: number
  }>
  popular: boolean
  displayOrder?: number
}

/**
 * About Content Document
 * Single document containing photographer bio and information
 */
export interface AboutContent {
  _id: string
  _type: 'aboutContent'
  title: string
  subtitle?: string
  mainImage?: SanityImageAsset
  bio: BlockContent[]
  yearsExperience?: number
  specializations?: string[]
  cta?: string
}

/**
 * Testimonial Document
 * Client review or testimonial
 */
export interface Testimonial {
  _id: string
  _type: 'testimonial'
  author: string
  role?: string
  text: string
  image?: SanityImageAsset
  rating: 5 | 4 | 3
  featured: boolean
  displayOrder?: number
  publishedAt: string
}

/**
 * Grouped service packages by category
 * Useful for rendering service sections
 */
export interface ServiceCategory {
  name: string
  slug: string
  displayName: string
  packages: ServicePackage[]
}

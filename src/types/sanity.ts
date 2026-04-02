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
    metadata?: {
      dimensions?: {
        width: number
        height: number
        aspectRatio: number
      }
    }
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
    [key: string]: unknown
  }>
  level?: number
  listItem?: 'bullet' | 'number'
}

/**
 * Portfolio Image Document
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
  usageScope?: 'portfolio' | 'services' | 'testimonials' | 'homepage' | 'contact' | 'about' | 'landing' | 'general'
  usageSection?: string
  usageTags?: string[]
  category: 'weddings' | 'portraits' | 'couples' | 'commercial' | 'editorial' | 'maternity'
  sourcePath?: string
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
  nameEn?: string
  category: string
  tier?: 'essential' | 'premium' | 'deluxe'
  price: number
  /** Original / crossed-out price shown before the current price */
  originalPrice?: number
  /** Set false to hide the price on the services page (e.g., editorial) */
  showPrice?: boolean
  /** Text before the price, e.g., "A partir de" */
  pricePrefix?: string
  pricePrefixEn?: string
  /** Subtitle shown under the package name */
  description: string
  descriptionEn?: string
  /** Bullet-point feature list */
  features?: string[]
  featuresEn?: string[]
  /** Paragraph body text instead of bullet list (TFP / narrative cards).
   *  Separate two paragraphs with a blank line — the second renders in italics. */
  bodyText?: string
  bodyTextEn?: string
  popular?: boolean
  /** Custom badge label — defaults to "Más Popular" when popular=true */
  badgeLabel?: string
  badgeLabelEn?: string
  /** Per-package CTA override — falls back to serviceConfig.ctaButtonText */
  ctaText?: string
  ctaTextEn?: string
  /** 'filled' (default) or 'outline' (border-only button) */
  ctaVariant?: 'filled' | 'outline'
  /** When true, renders as a special highlight card outside the main grid */
  isSpecialVariant?: boolean
  variantType?: 'wedding_civil' | 'editorial_tfp' | 'other'
  addOns?: Array<{
    _key: string
    name: string
    nameEn?: string
    price: number
    unit?: string
    description?: string
  }>
  duration?: number | null
  deliverables?: string
  deliverablesEn?: string
  /** Included gift description (e.g., printed photos, photobook) */
  gift?: string
  giftEn?: string
  displayOrder?: number
}

/**
 * Service Configuration Document
 * One per service — controls all content shown in that service's accordion panel
 */
export interface ServiceConfig {
  _id: string
  _type: 'serviceConfig'
  serviceKey: string
  displayName: string
  displayNameEn?: string
  /** Intro paragraph above the package grid */
  introText?: string
  introTextEn?: string
  gridColumns: 2 | 3
  hasAddOns?: boolean
  /** Items listed in the Complementos section */
  complementos?: Array<{
    _key: string
    name: string
    nameEn?: string
    price: number
    unit?: string
    note?: string
    noteEn?: string
  }>
  /** 'none' | 'right_panel' | 'full_width_centered' */
  infoCardVariant?: 'none' | 'right_panel' | 'full_width_centered'
  infoCardHeading?: string
  infoCardHeadingEn?: string
  infoCardContent?: string
  infoCardContentEn?: string
  /** Optional accent block (e.g., "Presupuestos a la Medida" in commercial) */
  customBlockHeading?: string
  customBlockHeadingEn?: string
  customBlockContent?: string
  customBlockContentEn?: string
  hasGlobalBenefits?: boolean
  globalBenefitsHeading?: string
  globalBenefitsHeadingEn?: string
  globalBenefitsText?: string
  globalBenefitsTextEn?: string
  hasProcess?: boolean
  processTitle?: string
  processTitleEn?: string
  processSteps?: Array<{
    _key: string
    number: number
    heading: string
    headingEn?: string
    description: string
    descriptionEn?: string
  }>
  /** Default CTA for packages without a per-package override */
  ctaButtonText?: string
  ctaButtonTextEn?: string
}

/**
 * About Content Document
 */
export interface AboutContent {
  _id: string
  _type: 'aboutContent'
  heading: string
  headingEn?: string
  mainImage?: SanityImageAsset
  paragraphs?: string[]
  paragraphsEn?: string[]
  ctaText?: string
  ctaTextEn?: string
}

/**
 * Testimonial Document
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
 */
export interface ServiceCategory {
  name: string
  slug: string
  displayName: string
  packages: ServicePackage[]
}

/**
 * Homepage Content Document
 */
export interface HomepageContent {
  _id: string
  _type: 'homepageContent'
  heroImages?: PortfolioImage[]
}

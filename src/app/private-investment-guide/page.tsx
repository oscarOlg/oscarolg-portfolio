import type { Metadata } from 'next'
import { getImageUrl, getPortfolioImagesByUsage, getPortfolioImagesBySlugs } from '@/lib/sanity'
import type { PortfolioImage } from '@/types/sanity'
import PrivateHero from './components/PrivateHero'
import AboutPhotographer from './components/AboutPhotographer'
import WelcomeExperience from './components/WelcomeExperience'
import EditorialPackages from './components/EditorialPackages'
import SessionSection from './components/SessionSection'
import ComplementsGrid from './components/ComplementsGrid'
import ClosingCTA from './components/ClosingCTA'

export const metadata: Metadata = {
  title: 'Guía de Inversión Privada | Oscar OLG Photography',
  description: 'Tu guía de inversión privada para bodas de película. Colecciones diseñadas para parejas que viven cada momento sin estrés.',
  robots: {
    index: false,
    follow: false,
  },
}

export const revalidate = 60

// Configuration: Add your 6 image slugs here
// Index 0: Hero background
// Index 1-4: Package images (Signature, Clásica, Esencial, Civil)
// Index 5: (Reserved for future use)
const PRIVATE_GUIDE_IMAGE_SLUGS = [
  'portfolio-weddings-p-e-8ca09067dscf3229-jpg-p-e-8ca09067dscf3229', // Hero - REPLACE WITH ACTUAL SLUG
  'portfolio-weddings-dscf8204-jpg-dscf8204', // Signature package - REPLACE WITH ACTUAL SLUG
  'portfolio-weddings-dscf2343-jpg-dscf2343', // Clásica package - REPLACE WITH ACTUAL SLUG
  'portfolio-weddings-p-e-8ca09067dscf3850-jpg-p-e-8ca09067dscf3850', // Esencial package - REPLACE WITH ACTUAL SLUG
  'portfolio-weddings-ost30818-jpg-ost30818', // Civil e Íntima package - REPLACE WITH ACTUAL SLUG
  'portfolio-weddings-dscf0128-jpg-dscf0128', // Extra - REPLACE WITH ACTUAL SLUG
]

export default async function PrivateInvestmentGuidePage() {
  const profileImages = await getPortfolioImagesByUsage('about', 'profile')
  const profileImageUrl = getImageUrl(profileImages[0]?.image) || null
  
  // Fetch the 6 specific guide images
  const guideImages: PortfolioImage[] = await getPortfolioImagesBySlugs(PRIVATE_GUIDE_IMAGE_SLUGS)
  
  // Extract individual images
  const heroImage = guideImages[0] || null
  const packageImages = guideImages.slice(1, 5) // [Signature, Clásica, Esencial, Civil]
  const sessionImage = guideImages[5] || null // Extra slot for session image
  
  return (
    <main className="w-full">
      {/* Hero Section */}
      <PrivateHero heroImage={heroImage} />

      {/* About the Photographer */}
      <AboutPhotographer imageUrl={profileImageUrl} />

      {/* Philosophy & Experience */}
      <WelcomeExperience />

      {/* Editorial Packages */}
      <EditorialPackages packageImages={packageImages} />

      {/* Save the Date Session */}
      <SessionSection sessionImage={sessionImage} />

      {/* Add-ons & Complements */}
      <ComplementsGrid />

      {/* Closing Call-to-Action */}
      <ClosingCTA />
    </main>
  )
}

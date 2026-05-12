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

// Configuration: Package images in order (Signature, Clásica, Esencial, Civil e Íntima)
const PACKAGE_IMAGE_SLUGS = [
  'portfolio-weddings-dscf8204-jpg-dscf8204', // Signature
  'portfolio-weddings-dscf2343-jpg-dscf2343', // Clásica
  'portfolio-weddings-p-e-8ca09067dscf3850-jpg-p-e-8ca09067dscf3850', // Esencial
  'portfolio-weddings-ost30818-jpg-ost30818', // Civil e Íntima
]

export default async function PrivateInvestmentGuidePage() {
  const profileImages = await getPortfolioImagesByUsage('about', 'profile')
  const profileImageUrl = getImageUrl(profileImages[0]?.image) || null
  
  // Fetch the specific package images in the correct order
  const packageImages: PortfolioImage[] = await getPortfolioImagesBySlugs(PACKAGE_IMAGE_SLUGS)
  
  return (
    <main className="w-full">
      {/* Hero Section */}
      <PrivateHero heroImage={null} />

      {/* About the Photographer */}
      <AboutPhotographer imageUrl={profileImageUrl} />

      {/* Philosophy & Experience */}
      <WelcomeExperience />

      {/* Editorial Packages */}
      <EditorialPackages packageImages={packageImages} />

      {/* Save the Date Session */}
      <SessionSection sessionImage={null} />

      {/* Add-ons & Complements */}
      <ComplementsGrid />

      {/* Closing Call-to-Action */}
      <ClosingCTA />
    </main>
  )
}

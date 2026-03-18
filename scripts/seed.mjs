import { createClient } from '@sanity/client'
import fs from 'fs'
import path from 'path'

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8')
  env.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=')
    if (key && !key.startsWith('#')) {
      const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '')
      process.env[key.trim()] = value
    }
  })
}

const client = createClient({
  projectId: 'qmeztasz',
  dataset: 'production',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-03-01',
})

// Helper function to generate unique keys for array items
function generateKey() {
  return Math.random().toString(36).substr(2, 9)
}

// Helper to add keys to array items
function sanitizePackage(pkg) {
  return {
    ...pkg,
    addOns: pkg.addOns.map((addon) => ({
      _key: generateKey(),
      ...addon,
    })),
  }
}

// WEDDING PACKAGES
const weddingPackages = [
  {
    _type: 'servicePackage',
    name: 'Esencial',
    category: 'wedding',
    tier: 'essential',
    price: 8000,
    duration: 6,
    description: 'Cobertura de 6 horas incluye ceremonia y recepción',
    features: [
      'Cobertura de la Ceremonia',
      'Cobertura de la Recepción',
    ],
    deliverables: '50-60 fotos editadas por hora de cobertura',
    addOns: [],
    popular: false,
    displayOrder: 1,
  },
  {
    _type: 'servicePackage',
    name: 'Clásico',
    category: 'wedding',
    tier: 'premium',
    price: 10000,
    duration: 8,
    description: 'Cobertura de 8 horas con sesión de retratos incluida',
    features: [
      'Cobertura de la Ceremonia',
      'Cobertura de la Recepción',
      'Sesión de retratos (mismo día de la boda)',
    ],
    deliverables: '50-60 fotos editadas por hora',
    addOns: [
      {
        name: 'Sesión de Compromiso (Pre-boda / Save the Date)',
        price: 2500,
      },
      {
        name: 'Set de 50 fotos impresas + 2 ampliaciones',
        price: 1500,
      },
      {
        name: 'Horas extra de cobertura',
        price: 1500,
      },
    ],
    popular: true,
    displayOrder: 2,
  },
  {
    _type: 'servicePackage',
    name: 'Premium',
    category: 'wedding',
    tier: 'deluxe',
    price: 12000,
    duration: 10,
    description: 'Cobertura completa de 10 horas con sesión de compromiso y getting ready',
    features: [
      'Sesión de Compromiso incluida en locación',
      'Getting Ready: Momentos previos íntimos',
      'Ceremonia y Recepción',
      'Sesión de retratos (mismo día de la boda)',
    ],
    deliverables: '50-60 fotos editadas por hora',
    addOns: [],
    popular: false,
    displayOrder: 3,
  },
  {
    _type: 'servicePackage',
    name: 'Boda Civil / Íntima',
    category: 'wedding',
    tier: 'essential',
    price: 3500,
    duration: 3,
    description: 'Documentación de ceremonia civil, firmas, fotos familiares y sesión de pareja',
    features: [
      'Documentación de ceremonia',
      'Fotografías familiares',
      'Sesión de retratos de pareja',
    ],
    deliverables: 'Galería digital completa',
    addOns: [],
    popular: false,
    displayOrder: 4,
  },
]

// INDIVIDUAL/PORTRAIT PACKAGES
const individualPackages = [
  {
    _type: 'servicePackage',
    name: 'Esencial',
    category: 'individual',
    tier: 'essential',
    price: 1500,
    duration: 1,
    description: 'Sesión express de 1 hora con 10 fotos editadas',
    features: [
      'Sesión de 1 hora en locación',
      '1 cambio de vestuario',
      '10 fotografías editadas profesionalmente',
    ],
    deliverables: '10 fotos editadas',
    addOns: [
      {
        name: 'Fotografía extra editada',
        price: 150,
      },
      {
        name: 'Hora extra de sesión',
        price: 1000,
      },
    ],
    popular: false,
    displayOrder: 5,
  },
  {
    _type: 'servicePackage',
    name: 'Clásico',
    category: 'individual',
    tier: 'premium',
    price: 1800,
    duration: 1,
    description: 'Experiencia completa con 15 fotos editadas y 2 cambios de vestuario',
    features: [
      'Sesión de 1 hora en locación',
      'Hasta 2 cambios de vestuario',
      '15 fotografías editadas profesionalmente',
    ],
    deliverables: '15 fotos editadas',
    addOns: [
      {
        name: 'Fotografía extra editada',
        price: 150,
      },
      {
        name: 'Hora extra de sesión',
        price: 1000,
      },
    ],
    popular: true,
    displayOrder: 6,
  },
  {
    _type: 'servicePackage',
    name: 'Premium',
    category: 'individual',
    tier: 'deluxe',
    price: 2000,
    duration: 2,
    description: 'Sesión editorial de 2 horas con 20 fotos y hasta 3 cambios',
    features: [
      'Sesión de 2 horas en locación',
      'Hasta 3 cambios de vestuario',
      '20 fotografías editadas profesionalmente',
    ],
    deliverables: '20 fotos editadas',
    addOns: [],
    popular: false,
    displayOrder: 7,
  },
]

// PAREJAS Y GRUPALES PACKAGES
const couplesPackages = [
  {
    _type: 'servicePackage',
    name: 'Esencial',
    category: 'couples',
    tier: 'essential',
    price: 1800,
    duration: 1,
    description: 'Sesión casual de 1 hora para parejas con 15 fotos',
    features: [
      'Sesión de 1 hora en locación',
      '1 cambio de vestuario',
      '15 fotografías editadas profesionalmente',
    ],
    deliverables: '15 fotos editadas',
    addOns: [
      {
        name: 'Fotografía extra editada',
        price: 150,
      },
      {
        name: 'Hora extra de sesión',
        price: 1000,
      },
    ],
    popular: false,
    displayOrder: 8,
  },
  {
    _type: 'servicePackage',
    name: 'Clásico',
    category: 'couples',
    tier: 'premium',
    price: 2200,
    duration: 2,
    description: 'La experiencia completa: 2 horas con 20 fotos profesionalmente editadas',
    features: [
      'Sesión de 2 horas en locación',
      'Hasta 2 cambios de vestuario',
      '20 fotografías editadas profesionalmente',
    ],
    deliverables: '20 fotos editadas',
    addOns: [
      {
        name: 'Fotografía extra editada',
        price: 150,
      },
      {
        name: 'Hora extra de sesión',
        price: 1000,
      },
    ],
    popular: true,
    displayOrder: 9,
  },
  {
    _type: 'servicePackage',
    name: 'Premium',
    category: 'couples',
    tier: 'deluxe',
    price: 2500,
    duration: 2,
    description: 'Sesión cinematográfica de 2 horas con 30 fotos y 3 cambios',
    features: [
      'Sesión de 2 horas en locación',
      'Hasta 3 cambios de vestuario',
      '30 fotografías editadas profesionalmente',
    ],
    deliverables: '30 fotos editadas',
    addOns: [],
    popular: false,
    displayOrder: 10,
  },
]

// MATERNITY PACKAGES
const maternityPackages = [
  {
    _type: 'servicePackage',
    name: 'Esencial',
    category: 'maternity',
    tier: 'essential',
    price: 1800,
    duration: 1,
    description: 'El brillo de la espera: Sesión de 1 hora con 15 fotos editadas',
    features: [
      'Sesión de 1 hora en locación',
      '15 fotografías editadas profesionalmente',
    ],
    deliverables: '15 fotos editadas',
    addOns: [],
    popular: false,
    displayOrder: 1,
  },
  {
    _type: 'servicePackage',
    name: 'Documental de Vida',
    category: 'maternity',
    tier: 'premium',
    price: 2500,
    duration: 2,
    description: 'Maternidad y Familia: Sesión extendida de 2 horas con pareja e hijos',
    features: [
      'Sesión extendida de 2 horas en locación',
      'Participación de pareja e hijos',
      'Hasta 2 cambios de vestuario',
      '30 fotografías editadas profesionalmente',
    ],
    deliverables: '30 fotos editadas',
    addOns: [],
    popular: true,
    displayOrder: 2,
  },
]

// COMMERCIAL PACKAGES
const commercialPackages = [
  {
    _type: 'servicePackage',
    name: 'Retrato Corporativo',
    category: 'commercial',
    tier: 'essential',
    price: 2000,
    duration: 1,
    description: 'Headshots / Marca Personal: Sesión de 1 hora para perfiles profesionales',
    features: [
      'Sesión de 1 hora en locación u oficina',
      'Ideal para LinkedIn, perfiles médicos o ejecutivos',
      '10 fotografías con retoque de alta gama',
    ],
    deliverables: '10 fotos retocadas',
    addOns: [],
    popular: false,
    displayOrder: 1,
  },
  {
    _type: 'servicePackage',
    name: 'Negocio Local',
    category: 'commercial',
    tier: 'premium',
    price: 4500,
    duration: 2.5,
    description: 'Contenido para Redes y Web: Hasta 2.5 horas en tus instalaciones',
    features: [
      'Hasta 2.5 horas de sesión en tus instalaciones',
      'Cobertura de espacios, equipo de trabajo y producto o servicio en acción',
      '30 fotografías en Alta Resolución',
    ],
    deliverables: '30 fotos en Alta Resolución',
    addOns: [],
    popular: true,
    displayOrder: 2,
  },
  {
    _type: 'servicePackage',
    name: 'Producción Mayor',
    category: 'commercial',
    tier: 'deluxe',
    price: 8000,
    duration: 4,
    description: 'Corporativo / Industrial: Producción de Medio Día a Día Completo (4 a 8 hrs)',
    features: [
      'Producción de Medio Día a Día Completo (4 a 8 hrs)',
      'Múltiples locaciones, áreas industriales o campañas publicitarias amplias',
      '50+ fotografías en Alta Resolución',
    ],
    deliverables: '50+ fotos en Alta Resolución',
    addOns: [],
    popular: false,
    displayOrder: 3,
  },
]

// EDITORIAL PACKAGES
const editorialPackages = [
  {
    _type: 'servicePackage',
    name: 'Colaboraciones (TFP)',
    category: 'editorial',
    tier: 'essential',
    price: 0,
    duration: null,
    description: 'Sinergia Creativa: Colaboraciones e intercambios creativos con talentos emergentes',
    features: [
      'Para modelos, maquillistas, estilistas y diseñadores',
      'Colaboraciones TFP (Trade For Pictures)',
      'Creación de contenido colaborativo',
    ],
    deliverables: 'Intercambio creativo',
    addOns: [],
    popular: false,
    displayOrder: 1,
  },
  {
    _type: 'servicePackage',
    name: 'Lookbook / Campaña',
    category: 'editorial',
    tier: 'premium',
    price: null,
    duration: null,
    description: 'Para marcas y diseñadores: Dirección de arte y fotografía de producto',
    features: [
      'Dirección de modelos y fotografía de producto puesto',
      'Licencia de uso comercial y retoque editorial en piezas clave',
      'Presupuesto Adaptable según necesidades',
    ],
    deliverables: 'Banco de imágenes editorial',
    addOns: [],
    popular: false,
    displayOrder: 2,
  },
]

// ABOUT CONTENT
const aboutContent = {
  _type: 'aboutContent',
  title: 'El enfoque detrás del lente',
  subtitle: 'Fotografía con técnica, sensibilidad y profesionalismo',
  yearsExperience: 7,
  specializations: [
    'Bodas',
    'Retratos Individual y de Parejas',
    'Maternidad',
    'Comercial y Branding',
    'Moda y Editorial',
  ],
  bio: [
    {
      _type: 'block',
      style: 'normal',
      _key: '1',
      markDefs: [
        {
          _type: 'strong',
          _key: 'strong1',
        },
      ],
      children: [
        {
          _type: 'span',
          text: 'Soy Oscar Sanchez, fotógrafo e ingeniero radicado en Ciudad Juárez. Mi trabajo visual combina la técnica y atención al detalle de mi formación, con la sensibilidad artística necesaria para documentar la esencia humana.',
          marks: [],
          _key: 'text1',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: '2',
      markDefs: [
        {
          _type: 'strong',
          _key: 'strong2',
        },
      ],
      children: [
        {
          _type: 'span',
          text: 'Me especializo en la fotografía de bodas, eventos y retrato. Entiendo que elegir a la persona que documentará tus memorias es un acto de fe. Por eso, mi promesa principal no es solo entregarte imágenes con calidad estética, sino brindarte confianza y tranquilidad absoluta durante todo el proceso.',
          marks: [],
          _key: 'text2',
        },
      ],
    },
    {
      _type: 'block',
      style: 'normal',
      _key: '3',
      markDefs: [],
      children: [
        {
          _type: 'span',
          text: 'Quiero que disfrutes tu evento sabiendo que cada instante irrepetible está en manos seguras. Mi objetivo es simple: transformar la emoción de hoy en un legado visual tangible que te permita volver a vivir el momento.',
          marks: [],
          _key: 'text3',
        },
      ],
    },
  ],
  cta: 'Hablemos de tu evento y creemos algo hermoso juntos.',
}

// SAMPLE TESTIMONIALS (optional, you can add real ones later)
const testimonials = [
  {
    _type: 'testimonial',
    author: 'María & Juan',
    role: 'Novia y Novio',
    text: 'Oscar capturó la magia de nuestro día de una manera que nunca esperamos. Cada foto cuenta una historia. ¡Altamente recomendado!',
    rating: 5,
    featured: true,
    displayOrder: 1,
  },
  {
    _type: 'testimonial',
    author: 'Sofia García',
    role: 'Sesión de Retratos',
    text: 'Profesional, creativo y muy atento a los detalles. Mi sesión fue una experiencia increíble. Las fotos superaron todas mis expectativas.',
    rating: 5,
    featured: true,
    displayOrder: 2,
  },
  {
    _type: 'testimonial',
    author: 'Los Hernández',
    role: 'Sesión Familiar',
    text: 'Oscar tiene la cualidad de hacer que todos se sientan cómodos frente a la cámara. Nuestras fotos familiares son un tesoro.',
    rating: 5,
    featured: true,
    displayOrder: 3,
  },
]

async function seed() {
  try {
    // Check for API token
    if (!process.env.SANITY_API_TOKEN) {
      console.error('❌ SANITY_API_TOKEN not found in environment variables')
      console.error('Make sure you have set the token in .env.local')
      process.exit(1)
    }

    console.log('🌱 Starting seed process...\n')

    // Clean up existing data first
    console.log('🗑️  Cleaning up existing data...')
    try {
      await client.delete({ query: '*[_type == "servicePackage"]' })
      await client.delete({ query: '*[_type == "aboutContent"]' })
      await client.delete({ query: '*[_type == "testimonial"]' })
      console.log('✅ Cleaned up existing data\n')
    } catch {
      // Ignore errors if there's no data to delete
    }

    // Combine all packages
    const allPackages = [
      ...weddingPackages,
      ...individualPackages,
      ...couplesPackages,
      ...maternityPackages,
      ...commercialPackages,
      ...editorialPackages,
    ]

    // Create packages
    console.log(`📦 Creating ${allPackages.length} service packages...`)
    for (const pkg of allPackages) {
      const sanitized = sanitizePackage(pkg)
      await client.create(sanitized)
    }
    console.log(`✅ Created ${allPackages.length} service packages\n`)

    // Create about content
    console.log('📝 Creating about content...')
    await client.create(aboutContent)
    console.log('✅ Created about content\n')

    // Create testimonials
    console.log(`⭐ Creating ${testimonials.length} sample testimonials...`)
    for (const testimonial of testimonials) {
      await client.create(testimonial)
    }
    console.log(`✅ Created ${testimonials.length} testimonials\n`)

    console.log('🎉 Seed complete! All data has been created.')
    console.log('\n📋 Summary:')
    console.log(`   • ${allPackages.length} Service Packages`)
    console.log(`   • 1 About Content`)
    console.log(`   • ${testimonials.length} Testimonials (sample)\n`)
    console.log('Next steps:')
    console.log('   1. Visit http://localhost:3000/studio')
    console.log('   2. Add your portfolio images')
    console.log('   3. Review and edit testimonials with real client reviews\n')
  } catch (error) {
    console.error('❌ Seed failed:', error.message)
    process.exit(1)
  }
}

seed()

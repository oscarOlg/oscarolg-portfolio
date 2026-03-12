#!/usr/bin/env node

/**
 * Sanity Seed Script
 * Populates service packages, about content, and testimonials into Sanity
 * Run: npm run seed
 */

const { createClient } = require("next-sanity");
require("dotenv").config({ path: ".env.local" });

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET;
const apiToken = process.env.SANITY_API_TOKEN;

if (!projectId || !dataset || !apiToken) {
  console.error(
    "❌ Missing environment variables. Check .env.local for SANITY_API_TOKEN"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-01",
  useCdn: false,
  token: apiToken,
});

// Service Packages Data
const servicePackages = [
  // WEDDINGS
  {
    _type: "servicePackage",
    name: "Esencial",
    category: "wedding",
    tier: "essential",
    price: 8000,
    description: "Cobertura de 6 horas incluye ceremonia y recepción",
    features: ["Cobertura de la Ceremonia", "Cobertura de la Recepción"],
    duration: 6,
    deliverables: "50-60 fotos editadas por hora de cobertura",
    popular: false,
    displayOrder: 1,
  },
  {
    _type: "servicePackage",
    name: "Clásico",
    category: "wedding",
    tier: "premium",
    price: 10000,
    description: "Cobertura de 8 horas con sesión de retratos incluida",
    features: [
      "Cobertura de la Ceremonia",
      "Cobertura de la Recepción",
      "Sesión de retratos (mismo día de la boda)",
    ],
    duration: 8,
    deliverables: "50-60 fotos editadas por hora",
    popular: true,
    displayOrder: 2,
  },
  {
    _type: "servicePackage",
    name: "Premium",
    category: "wedding",
    tier: "deluxe",
    price: 12000,
    description:
      "Cobertura completa de 10 horas con sesión de compromiso y getting ready",
    features: [
      "Sesión de Compromiso incluida en locación",
      "Getting Ready: Momentos previos íntimos",
      "Ceremonia y Recepción",
      "Sesión de retratos (mismo día de la boda)",
    ],
    addOns: [
      { name: "Sesión de Compromiso (Pre-boda)", price: 2500 },
      { name: "Set de 50 fotos impresas + 2 ampliaciones", price: 1500 },
      { name: "Horas extra de cobertura", price: 1500 },
    ],
    duration: 10,
    deliverables: "50-60 fotos editadas por hora",
    popular: false,
    displayOrder: 3,
  },
  {
    _type: "servicePackage",
    name: "Boda Civil / Íntima",
    category: "wedding",
    tier: "essential",
    price: 3500,
    description:
      "Documentación de ceremonia civil, firmas, fotos familiares y sesión de pareja",
    features: [
      "Documentación de ceremonia",
      "Fotografías familiares",
      "Sesión de retratos de pareja",
    ],
    duration: 3,
    deliverables: "30-40 fotos editadas",
    popular: false,
    displayOrder: 4,
  },

  // INDIVIDUAL/PORTRAIT
  {
    _type: "servicePackage",
    name: "Esencial",
    category: "individual",
    tier: "essential",
    price: 1500,
    description: "Sesión express de 1 hora con 10 fotos editadas",
    features: [
      "Sesión de 1 hora en locación",
      "1 cambio de vestuario",
      "10 fotografías editadas profesionalmente",
    ],
    duration: 1,
    deliverables: "10 fotos editadas",
    popular: false,
    displayOrder: 1,
  },
  {
    _type: "servicePackage",
    name: "Clásico",
    category: "individual",
    tier: "premium",
    price: 1800,
    description:
      "Experiencia completa con 15 fotos editadas y 2 cambios de vestuario",
    features: [
      "Sesión de 1 hora en locación",
      "Hasta 2 cambios de vestuario",
      "15 fotografías editadas profesionalmente",
    ],
    duration: 1,
    deliverables: "15 fotos editadas",
    popular: true,
    displayOrder: 2,
  },
  {
    _type: "servicePackage",
    name: "Premium",
    category: "individual",
    tier: "deluxe",
    price: 2000,
    description: "Sesión editorial de 2 horas con 20 fotos y hasta 3 cambios",
    features: [
      "Sesión de 2 horas en locación",
      "Hasta 3 cambios de vestuario",
      "20 fotografías editadas profesionalmente",
    ],
    duration: 2,
    deliverables: "20 fotos editadas",
    popular: false,
    displayOrder: 3,
  },

  // COUPLES
  {
    _type: "servicePackage",
    name: "Esencial",
    category: "couples",
    tier: "essential",
    price: 1800,
    description: "Sesión casual de 1 hora para parejas con 15 fotos",
    features: [
      "Sesión de 1 hora en locación",
      "1 cambio de vestuario",
      "15 fotografías editadas profesionalmente",
    ],
    duration: 1,
    deliverables: "15 fotos editadas",
    popular: false,
    displayOrder: 1,
  },
  {
    _type: "servicePackage",
    name: "Clásico",
    category: "couples",
    tier: "premium",
    price: 2200,
    description:
      "La experiencia completa: 2 horas con 20 fotos professionalmente editadas",
    features: [
      "Sesión de 2 horas en locación",
      "Hasta 2 cambios de vestuario",
      "20 fotografías editadas profesionalmente",
    ],
    duration: 2,
    deliverables: "20 fotos editadas",
    popular: true,
    displayOrder: 2,
  },
  {
    _type: "servicePackage",
    name: "Premium",
    category: "couples",
    tier: "deluxe",
    price: 2500,
    description:
      "Sesión cinematográfica de 2 horas con 30 fotos y 3 cambios",
    features: [
      "Sesión de 2 horas en locación",
      "Hasta 3 cambios de vestuario",
      "30 fotografías editadas profesionalmente",
    ],
    duration: 2,
    deliverables: "30 fotos editadas",
    popular: false,
    displayOrder: 3,
  },

  // FAMILY
  {
    _type: "servicePackage",
    name: "Esencial",
    category: "family",
    tier: "essential",
    price: 2000,
    description: "Memoria Familiar: 1 hora con 15 fotos para hasta 5 personas",
    features: [
      "Sesión de 1 hora en locación",
      "Hasta 5 personas",
      "15 fotografías editadas profesionalmente",
    ],
    duration: 1,
    deliverables: "15 fotos editadas",
    popular: false,
    displayOrder: 1,
  },
  {
    _type: "servicePackage",
    name: "Clásico",
    category: "family",
    tier: "premium",
    price: 2500,
    description: "Legado Generacional: 2 horas con fotos de grupo y subgrupos",
    features: [
      "Sesión de 2 horas en locación",
      "Hasta 5 personas",
      "Fotos de grupo completo y subgrupos",
      "20 fotografías editadas profesionalmente",
    ],
    duration: 2,
    deliverables: "20 fotos editadas",
    popular: true,
    displayOrder: 2,
  },
  {
    _type: "servicePackage",
    name: "Premium",
    category: "family",
    tier: "deluxe",
    price: 3000,
    description:
      "Día en Familia: 3 horas con combinaciones múltiples y 30 fotos",
    features: [
      "Sesión de 3 horas en locación",
      "Hasta 5 personas (1 cambio de vestuario opcional)",
      "Combinaciones múltiples (abuelos, niños, padres)",
      "30 fotografías editadas profesionalmente",
    ],
    duration: 3,
    deliverables: "30 fotos editadas",
    popular: false,
    displayOrder: 3,
  },

  // EVENTS
  {
    _type: "servicePackage",
    name: "Cobertura Básica",
    category: "event",
    tier: "essential",
    price: 5000,
    description: "Documentación de evento de 4-6 horas",
    features: [
      "Cobertura fotográfica del evento",
      "50-60 fotos editadas por hora",
      "Galería digital en Alta Resolución",
    ],
    duration: 4,
    deliverables: "200-240 fotos editadas",
    popular: false,
    displayOrder: 1,
  },
];

// About Content
const aboutContent = {
  _type: "aboutContent",
  title: "El enfoque detrás del lente",
  subtitle: "Fotografía con técnica, sensibilidad y profesionalismo",
  yearsExperience: 7,
  specializations: [
    "Bodas",
    "Eventos",
    "Retratos",
    "Sesiones de parejas",
    "Fotografía familiar",
  ],
  bio: [
    {
      _type: "block",
      style: "normal",
      text: "Soy Oscar Sanchez, fotógrafo e ingeniero radicado en Ciudad Juárez. Mi trabajo visual combina la técnica y atención al detalle de mi formación, con la sensibilidad artística necesaria para documentar la esencia humana.",
      children: [{ _type: "span", text: "Soy Oscar Sanchez, fotógrafo e ingeniero radicado en Ciudad Juárez. Mi trabajo visual combina la técnica y atención al detalle de mi formación, con la sensibilidad artística necesaria para documentar la esencia humana." }],
      markDefs: [],
    },
    {
      _type: "block",
      style: "normal",
      text: "Me especializo en la fotografía de bodas, eventos y retrato. Entiendo que elegir a la persona que documentará tus memorias es un acto de fe. Por eso, mi promesa principal no es solo entregarte imágenes con calidad estética, sino brindarte confianza y tranquilidad absoluta durante todo el proceso.",
      children: [{ _type: "span", text: "Me especializo en la fotografía de bodas, eventos y retrato. Entiendo que elegir a la persona que documentará tus memorias es un acto de fe. Por eso, mi promesa principal no es solo entregarte imágenes con calidad estética, sino brindarte confianza y tranquilidad absoluta durante todo el proceso." }],
      markDefs: [],
    },
    {
      _type: "block",
      style: "normal",
      text: "Quiero que disfrutes tu evento sabiendo que cada instante irrepetible está en manos seguras. Mi objetivo es simple: transformar la emoción de hoy en un legado visual tangible que te permita volver a vivir el momento.",
      children: [{ _type: "span", text: "Quiero que disfrutes tu evento sabiendo que cada instante irrepetible está en manos seguras. Mi objetivo es simple: transformar la emoción de hoy en un legado visual tangible que te permita volver a vivir el momento." }],
      markDefs: [],
    },
  ],
  cta: "Hablemos de tu evento y creemos algo hermoso juntos.",
};

// Sample Testimonials (simplified for now)
const testimonials = [
  {
    _type: "testimonial",
    author: "María & Juan",
    role: "Novios",
    text: "Oscar capturó cada momento de nuestra boda de una forma tan natural y hermosa. Sus fotos nos permiten revivir ese día una y otra vez. ¡Totalmente recomendado!",
    rating: 5,
    featured: true,
    displayOrder: 1,
  },
  {
    _type: "testimonial",
    author: "Laura Rodríguez",
    role: "Cliente de Retratos",
    text: "Las fotos de mi sesión de retratos fueron increíbles. Oscar tiene un talento especial para hacer que te sientas cómodo y captar tu esencia auténtica.",
    rating: 5,
    featured: true,
    displayOrder: 2,
  },
  {
    _type: "testimonial",
    author: "Familia González",
    role: "Sesión Familiar",
    text: "Fue una experiencia maravillosa. Oscar logró que toda la familia se relajara y disfrutara el momento. Las fotos son un tesoro para nosotros.",
    rating: 5,
    featured: true,
    displayOrder: 3,
  },
];

async function seed() {
  console.log("🌱 Starting Sanity seed...\n");

  try {
    // Delete existing service packages and about content
    console.log("🗑️  Cleaning up existing data...");
    await client.delete({ query: '*[_type == "servicePackage"]' });
    await client.delete({ query: '*[_type == "aboutContent"]' });
    await client.delete({ query: '*[_type == "testimonial"]' });
    console.log("✅ Cleaned up existing data\n");

    // Create service packages
    console.log("📦 Creating service packages...");
    for (const pkg of servicePackages) {
      const created = await client.create(pkg);
      console.log(`  ✓ ${pkg.category} - ${pkg.name}`);
    }
    console.log(`✅ Created ${servicePackages.length} service packages\n`);

    // Create about content
    console.log("📝 Creating about content...");
    const aboutCreated = await client.create(aboutContent);
    console.log("✅ Created about page content\n");

    // Create testimonials
    console.log("⭐ Creating testimonials...");
    for (const testimonial of testimonials) {
      await client.create(testimonial);
      console.log(`  ✓ ${testimonial.author} - ${testimonial.role}`);
    }
    console.log(`✅ Created ${testimonials.length} testimonials\n`);

    console.log("🎉 Seed completed successfully!");
    console.log("\n📋 Summary:");
    console.log(`   - Service Packages: ${servicePackages.length}`);
    console.log(`   - About Content: 1`);
    console.log(`   - Testimonials: ${testimonials.length}`);
    console.log("\n💡 Next steps:");
    console.log("   1. Visit http://localhost:3000/studio");
    console.log("   2. Upload your portfolio images");
    console.log("   3. Integrate Sanity data into your website");
  } catch (error) {
    console.error("❌ Seed failed:", error.message);
    process.exit(1);
  }
}

seed();

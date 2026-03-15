import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  fs.readFileSync(envPath, 'utf8').split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      process.env[key.trim()] = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
    }
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  apiVersion: '2024-03-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
});

let keyCounter = 0;
function key() { return `k${++keyCounter}`; }

// ─── All service packages — content matches the services page UI exactly ──────
const packages = [

  // ══════════════════════════════════════════════════════════════════════════
  // BODAS
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Esencial',
    category: 'weddings',
    tier: 'essential',
    price: 8000,
    showPrice: true,
    description: 'Cobertura de 6 horas',
    features: [
      'Cobertura de la Ceremonia',
      'Cobertura de la Recepción',
    ],
    popular: false,
    displayOrder: 1,
    duration: 6,
    deliverables: '50-60 fotos editadas por hora de cobertura',
    addOns: [
      { name: 'Sesión de Compromiso (Pre-boda)', price: 2500 },
      { name: 'Set de 50 fotografías impresas (4x6") + 2 ampliaciones (8x10")', price: 1500 },
      { name: 'Horas extra de cobertura', price: 1500, unit: 'por hora' },
    ],
  },
  {
    name: 'Clásico',
    category: 'weddings',
    tier: 'premium',
    price: 10000,
    showPrice: true,
    description: 'Cobertura de 8 horas',
    features: [
      'Cobertura de la Ceremonia',
      'Cobertura de la Recepción',
      'Sesión de retratos (mismo día de la boda)',
    ],
    popular: true,
    badgeLabel: 'Más Popular',
    displayOrder: 2,
    duration: 8,
    deliverables: '50-60 fotos editadas por hora de cobertura',
    addOns: [
      { name: 'Sesión de Compromiso (Pre-boda)', price: 2500 },
      { name: 'Set de 50 fotografías impresas (4x6") + 2 ampliaciones (8x10")', price: 1500 },
      { name: 'Horas extra de cobertura', price: 1500, unit: 'por hora' },
    ],
  },
  {
    name: 'Premium',
    category: 'weddings',
    tier: 'deluxe',
    price: 12000,
    showPrice: true,
    description: 'Cobertura de 10 horas',
    features: [
      'Sesión de Compromiso pre-boda en locación',
      'Getting Ready: Momentos previos íntimos',
      'Sesión de retratos (mismo día de la boda)',
      'Cobertura de la Ceremonia y Recepción',
    ],
    popular: false,
    displayOrder: 3,
    duration: 10,
    deliverables: '50-60 fotos editadas por hora de cobertura',
    addOns: [
      { name: 'Set de 50 fotografías impresas (4x6") + 2 ampliaciones (8x10")', price: 1500 },
      { name: 'Horas extra de cobertura', price: 1500, unit: 'por hora' },
    ],
  },
  // Special variant — renders as a card alongside "Complementos", not in the main grid
  {
    name: 'Boda Civil / Íntima',
    category: 'weddings',
    tier: 'essential',
    price: 4000,
    showPrice: true,
    description: 'Hasta 3 horas de cobertura',
    bodyText:
      'Documentación de la ceremonia, firmas, fotografías familiares y una sesión de retratos de pareja.',
    popular: false,
    isSpecialVariant: true,
    variantType: 'wedding_civil',
    ctaText: 'Cotizar Civil',
    displayOrder: 4,
    duration: 3,
    deliverables: 'Galería digital',
    addOns: [
      { name: 'Set de 50 fotografías impresas (4x6") + 2 ampliaciones (8x10")', price: 1500 },
      { name: 'Horas extra de cobertura', price: 1500, unit: 'por hora' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RETRATOS
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Esencial',
    category: 'portrait',
    tier: 'essential',
    price: 1500,
    showPrice: true,
    description: 'Sesión Express',
    features: [
      'Hasta 45 minutos de sesión en locación',
      '1 solo vestuario (Sin cambios durante la sesión)',
      '10 fotografías editadas profesionalmente',
    ],
    popular: false,
    displayOrder: 1,
    duration: 1,
    deliverables: '10 fotos editadas',
    addOns: [
      { name: 'Sesión en Estudio', price: 600, description: 'Costo de renta del estudio' },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },
  {
    name: 'Clásico',
    category: 'portrait',
    tier: 'premium',
    price: 1800,
    showPrice: true,
    description: 'La experiencia completa',
    features: [
      'Hasta 1 hora de sesión en locación',
      'Hasta 2 cambios de vestuario',
      '20 fotografías editadas profesionalmente',
    ],
    popular: true,
    badgeLabel: 'Más Popular',
    displayOrder: 2,
    duration: 1,
    deliverables: '20 fotos editadas',
    addOns: [
      { name: 'Sesión en Estudio', price: 600, description: 'Costo de renta del estudio' },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },
  {
    name: 'Premium',
    category: 'portrait',
    tier: 'deluxe',
    price: 2000,
    showPrice: true,
    description: 'Sesión Editorial',
    features: [
      'Hasta 2 horas de sesión creativa',
      'Hasta 3 cambios de vestuario',
      '30 fotografías editadas profesionalmente',
    ],
    popular: false,
    displayOrder: 3,
    duration: 2,
    deliverables: '30 fotos editadas',
    addOns: [
      { name: 'Sesión en Estudio', price: 1200, description: 'Costo de renta del estudio (sesión de 2h)' },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PAREJAS Y GRUPALES
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Esencial',
    category: 'couples',
    tier: 'essential',
    price: 1800,
    showPrice: true,
    description: 'Sesión Casual',
    features: [
      'Base de 2 personas (+ $250 MXN por integrante extra)',
      'Sesión de 1 hora en locación',
      '1 solo vestuario (Sin cambios durante la sesión)',
      '15 fotografías editadas profesionalmente',
    ],
    popular: false,
    displayOrder: 1,
    duration: 1,
    deliverables: '15 fotos editadas',
    addOns: [
      { name: 'Sesión en Estudio', price: 600, description: 'Costo de renta del estudio' },
      { name: 'Persona o mascota extra', price: 250, unit: 'c.u.' },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },
  {
    name: 'Clásico',
    category: 'couples',
    tier: 'premium',
    price: 2200,
    showPrice: true,
    description: 'La experiencia completa',
    features: [
      'Base de 2 personas (+ $250 MXN por integrante extra)',
      'Sesión de 2 horas en locación',
      'Hasta 2 cambios de vestuario',
      '20 fotografías editadas profesionalmente',
    ],
    popular: true,
    badgeLabel: 'Más Popular',
    displayOrder: 2,
    duration: 2,
    deliverables: '20 fotos editadas',
    addOns: [
      { name: 'Sesión en Estudio', price: 1200, description: 'Costo de renta del estudio (sesión de 2h)' },
      { name: 'Persona o mascota extra', price: 250, unit: 'c.u.' },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },
  {
    name: 'Premium',
    category: 'couples',
    tier: 'deluxe',
    price: 2500,
    showPrice: true,
    description: 'Memoria Documental',
    features: [
      'Base de 2 personas (+ $250 MXN por integrante extra)',
      'Sesión de 2 horas en locación',
      'Hasta 3 cambios de vestuario',
      '30 fotografías editadas profesionalmente',
    ],
    popular: false,
    displayOrder: 3,
    duration: 2,
    deliverables: '30 fotos editadas',
    addOns: [
      { name: 'Sesión en Estudio', price: 1200, description: 'Costo de renta del estudio (sesión de 2h)' },
      { name: 'Persona o mascota extra', price: 250, unit: 'c.u.' },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MATERNIDAD
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Esencial',
    category: 'maternity',
    tier: 'essential',
    price: 1800,
    showPrice: true,
    description: 'El brillo de la espera',
    features: [
      'Sesión de 1 hora en locación',
      'Participación de pareja o un familiar(opcional)',
      '1 solo vestuario (Sin cambios durante la sesión)',
      '15 fotografías editadas profesionalmente',
    ],
  },
  {
    name: 'Documental de Vida',
    category: 'maternity',
    tier: 'premium',
    price: 2500,
    showPrice: true,
    description: 'Maternidad y Familia',
    features: [
      'Sesión extendida de 2 horas en locación',
      'Participación de pareja e hijos(hasta 3 familiares)',
      'Hasta 2 cambios de vestuario',
      '25 fotografías editadas profesionalmente',
    ],
    popular: true,
    badgeLabel: 'Experiencia Completa',
    displayOrder: 2,
    duration: 2,
    deliverables: '25 fotos editadas',
    addOns: [
      { name: 'Sesión en Estudio', price: 1200, description: 'Costo de renta del estudio (sesión de 2h)' },
    ],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // COMERCIAL
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Retrato Corporativo',
    category: 'commercial',
    tier: 'essential',
    price: 2000,
    showPrice: true,
    description: 'Headshots / Marca Personal',
    features: [
      'Sesión de 1 hora en locación u oficina',
      'Ideal para LinkedIn, perfiles médicos o ejecutivos',
      '10 fotografías con retoque de alta gama',
    ],
    popular: false,
    ctaText: 'Cotizar',
    displayOrder: 1,
    duration: 1,
    deliverables: '10 fotos editadas + retoques profesionales',
    addOns: [],
  },
  {
    name: 'Negocio Local',
    category: 'commercial',
    tier: 'premium',
    price: 4500,
    showPrice: true,
    description: 'Contenido para Redes y Web',
    features: [
      'Hasta 2.5 horas de sesión en tus instalaciones',
      'Cobertura de espacios, equipo de trabajo y producto o servicio en acción',
      '30 fotografías en Alta Resolución',
    ],
    popular: true,
    badgeLabel: 'Ideal para PyMEs',
    ctaText: 'Cotizar Proyecto',
    displayOrder: 2,
    duration: 2.5,
    deliverables: '30 fotos en Alta Resolución',
    addOns: [],
  },
  {
    name: 'Producción Mayor',
    category: 'commercial',
    tier: 'deluxe',
    price: 8000,
    showPrice: true,
    pricePrefix: 'A partir de',
    description: 'Corporativo / Industrial',
    features: [
      'Producción de Medio Día a Día Completo (4 a 8 hrs)',
      'Múltiples locaciones, áreas industriales o campañas publicitarias amplias',
      '50+ fotografías en Alta Resolución',
    ],
    popular: false,
    ctaText: 'Cotizar Proyecto',
    displayOrder: 3,
    duration: 8,
    deliverables: '50+ fotos en Alta Resolución',
    addOns: [],
  },

  // ══════════════════════════════════════════════════════════════════════════
  // EDITORIAL
  // ══════════════════════════════════════════════════════════════════════════
  {
    name: 'Colaboraciones (TFP)',
    category: 'editorial',
    tier: 'essential',
    price: 0,
    showPrice: false,
    description: 'Sinergia Creativa',
    // Second paragraph (after the blank line) renders in italic in the card
    bodyText:
      'Creo fuertemente en hacer sinergia. Si eres modelo armando tu book, maquillista, estilista, o diseñador emergente con una propuesta creativa vanguardista, estoy siempre abierto a colaboraciones e intercambios creativos (TFP).\n\nEnvía tu moodboard o idea y hagamos arte juntos.',
    popular: false,
    ctaText: 'Proponer Colaboración',
    ctaVariant: 'outline',
    displayOrder: 1,
    duration: 0,
    deliverables: 'Negociable según proyecto',
    addOns: [],
  },
  {
    name: 'Lookbook / Campaña',
    category: 'editorial',
    tier: 'premium',
    price: 3000,
    showPrice: false,
    description: 'Para marcas y diseñadores',
    features: [
      'Dirección de modelos y fotografía de producto puesto (E-commerce/Social)',
      'Licencia de uso comercial y retoque editorial en piezas clave',
      'Presupuesto Adaptable: El costo final se ajusta de acuerdo a las necesidades y presupuesto de tu campaña.',
    ],
    popular: false,
    ctaText: 'Cotizar Campaña',
    displayOrder: 2,
    duration: 4,
    deliverables: 'Fotografías editadas + licencia comercial',
    addOns: [],
  },
];

// ─── Seed function ─────────────────────────────────────────────────────────────
async function seedPackages() {
  console.log('🌱 Iniciando seed de paquetes de servicios...\n');

  try {
    // Delete all existing packages
    const existing = await client.fetch('*[_type == "servicePackage"]{ _id, name, category }');
    if (existing.length > 0) {
      console.log(`🗑  Eliminando ${existing.length} paquetes existentes...`);
      const tx = client.transaction();
      existing.forEach((doc) => tx.delete(doc._id));
      await tx.commit();
      console.log('   ✓ Eliminados\n');
    }

    // Create all packages
    console.log('📝 Creando paquetes...\n');
    const tx = client.transaction();

    for (const pkg of packages) {
      const doc = {
        _type: 'servicePackage',
        ...pkg,
        addOns: (pkg.addOns || []).map((a) => ({ _key: key(), ...a })),
      };
      // Remove null/undefined fields to keep documents clean
      Object.keys(doc).forEach((k) => { if (doc[k] == null) delete doc[k]; });
      tx.create(doc);
    }

    await tx.commit();
    console.log(`✅ ${packages.length} paquetes creados.\n`);

    // Summary by category
    const byCat = {};
    packages.forEach((p) => { byCat[p.category] = (byCat[p.category] || 0) + 1; });
    console.log('📊 Resumen por categoría:');
    Object.entries(byCat).forEach(([cat, n]) => console.log(`   • ${cat}: ${n}`));
    console.log('\n✨ Listo!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedPackages();

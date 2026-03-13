import { createClient } from '@sanity/client';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), '.env.local');
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, 'utf8');
  env.split('\n').forEach((line) => {
    const [key, ...valueParts] = line.split('=');
    if (key && !key.startsWith('#')) {
      const value = valueParts.join('=').trim().replace(/^['"]|['"]$/g, '');
      process.env[key.trim()] = value;
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

// Helper function to generate unique keys
function generateKey(str) {
  return Math.random().toString(36).substr(2, 9);
}

// All service packages data
const packages = [
  // ==================== BODAS ====================
  {
    name: 'Esencial',
    category: 'weddings',
    tier: 'essential',
    price: 8000,
    description: 'Cobertura de 6 horas',
    features: [
      'Cobertura de la Ceremonia',
      'Cobertura de la Recepción',
    ],
    duration: 6,
    deliverables: '50-60 fotos editadas por hora de cobertura',
    popular: false,
    displayOrder: 1,
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
    description: 'Cobertura de 8 horas',
    features: [
      'Cobertura de la Ceremonia',
      'Cobertura de la Recepción',
      'Sesión de retratos (mismo día de la boda)',
    ],
    duration: 8,
    deliverables: '50-60 fotos editadas por hora de cobertura',
    popular: true,
    displayOrder: 2,
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
    description: 'Cobertura de 10 horas',
    features: [
      'Sesión de Compromiso pre-boda en locación',
      'Getting Ready: Momentos previos íntimos',
      'Sesión de retratos (mismo día de la boda)',
      'Cobertura de la Ceremonia',
      'Cobertura de la Recepción',
    ],
    duration: 10,
    deliverables: '50-60 fotos editadas por hora de cobertura',
    popular: false,
    displayOrder: 3,
    addOns: [
      { name: 'Set de 50 fotografías impresas (4x6") + 2 ampliaciones (8x10")', price: 1500 },
      { name: 'Horas extra de cobertura', price: 1500, unit: 'por hora' },
    ],
  },
  {
    name: 'Boda Civil / Íntima',
    category: 'weddings',
    tier: 'essential',
    price: 3500,
    description: 'Hasta 3 horas de cobertura',
    features: [
      'Documentación de la ceremonia',
      'Fotografías familiares',
      'Sesión de retratos de pareja',
    ],
    duration: 3,
    deliverables: 'Galería digital',
    popular: false,
    displayOrder: 4,
    addOns: [
      { name: 'Set de 50 fotografías impresas (4x6") + 2 ampliaciones (8x10")', price: 1500 },
      { name: 'Horas extra de cobertura', price: 1500, unit: 'por hora' },
    ],
  },

  // ==================== RETRATOS ====================
  {
    name: 'Esencial',
    category: 'portrait',
    tier: 'essential',
    price: 1500,
    description: 'Sesión Express',
    features: [
      'Sesión de 1 hora en locación',
      '1 cambio de vestuario',
      '10 fotografías editadas profesionalmente',
    ],
    duration: 1,
    deliverables: '10 fotos editadas',
    popular: false,
    displayOrder: 1,
    addOns: [
      { name: 'Sesión en Estudio', price: 600 },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },
  {
    name: 'Clásico',
    category: 'portrait',
    tier: 'premium',
    price: 1800,
    description: 'Experiencia completa',
    features: [
      'Sesión de 1 hora en locación',
      'Hasta 2 cambios de vestuario',
      '15 fotografías editadas profesionalmente',
    ],
    duration: 1,
    deliverables: '15 fotos editadas',
    popular: true,
    displayOrder: 2,
    addOns: [
      { name: 'Sesión en Estudio', price: 600 },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },
  {
    name: 'Premium',
    category: 'portrait',
    tier: 'deluxe',
    price: 2000,
    description: 'Sesión Editorial',
    features: [
      'Sesión de 2 horas en locación',
      'Hasta 3 cambios de vestuario',
      '20 fotografías editadas profesionalmente',
    ],
    duration: 2,
    deliverables: '20 fotos editadas',
    popular: false,
    displayOrder: 3,
    addOns: [
      { name: 'Sesión en Estudio', price: 1200 },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },

  // ==================== PAREJAS ====================
  {
    name: 'Esencial',
    category: 'couples',
    tier: 'essential',
    price: 1800,
    description: 'Sesión Casual',
    features: [
      'Sesión de 1 hora en locación',
      '1 cambio de vestuario',
      '15 fotografías editadas profesionalmente',
    ],
    duration: 1,
    deliverables: '15 fotos editadas',
    popular: false,
    displayOrder: 1,
    addOns: [
      { name: 'Sesión en Estudio', price: 600 },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },
  {
    name: 'Clásico',
    category: 'couples',
    tier: 'premium',
    price: 2200,
    description: 'La experiencia completa',
    features: [
      'Sesión de 2 horas en locación',
      'Hasta 2 cambios de vestuario',
      '20 fotografías editadas profesionalmente',
    ],
    duration: 2,
    deliverables: '20 fotos editadas',
    popular: true,
    displayOrder: 2,
    addOns: [
      { name: 'Sesión en Estudio', price: 1200 },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },
  {
    name: 'Premium',
    category: 'couples',
    tier: 'deluxe',
    price: 2500,
    description: 'Sesión Cinematográfica',
    features: [
      'Sesión de 2 horas en locación',
      'Hasta 3 cambios de vestuario',
      '30 fotografías editadas profesionalmente',
    ],
    duration: 2,
    deliverables: '30 fotos editadas',
    popular: false,
    displayOrder: 3,
    addOns: [
      { name: 'Sesión en Estudio', price: 1200 },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
  },

  // ==================== MATERNIDAD ====================
  {
    name: 'Esencial',
    category: 'maternity',
    tier: 'essential',
    price: 1800,
    description: 'El brillo de la espera',
    features: [
      'Sesión de 1 hora en locación',
      '15 fotografías editadas profesionalmente',
    ],
    duration: 1,
    deliverables: '15 fotos editadas',
    popular: false,
    displayOrder: 1,
    addOns: [
      { name: 'Sesión en Estudio', price: 600 },
    ],
  },
  {
    name: 'Documental de Vida',
    category: 'maternity',
    tier: 'premium',
    price: 2500,
    description: 'Maternidad y Familia',
    features: [
      'Sesión extendida de 2 horas en locación',
      'Participación de pareja e hijos',
      'Hasta 2 cambios de vestuario',
      '30 fotografías editadas profesionalmente',
    ],
    duration: 2,
    deliverables: '30 fotos editadas',
    popular: true,
    displayOrder: 2,
    addOns: [
      { name: 'Sesión en Estudio', price: 1200 },
    ],
  },

  // ==================== COMERCIAL ====================
  {
    name: 'Retrato Corporativo',
    category: 'commercial',
    tier: 'essential',
    price: 2000,
    description: 'Headshots / Marca Personal',
    features: [
      'Sesión de 1 hora en locación u oficina',
      'Ideal para LinkedIn, perfiles médicos o ejecutivos',
      '10 fotografías con retoque de alta gama',
    ],
    duration: 1,
    deliverables: '10 fotos editadas + retoques profesionales',
    popular: false,
    displayOrder: 1,
    addOns: [],
  },
  {
    name: 'Negocio Local',
    category: 'commercial',
    tier: 'premium',
    price: 4500,
    description: 'Contenido para Redes y Web',
    features: [
      'Hasta 2.5 horas de sesión en tus instalaciones',
      'Cobertura de espacios, equipo de trabajo y producto o servicio en acción',
      '30 fotografías en Alta Resolución',
    ],
    duration: 2.5,
    deliverables: '30 fotos en Alta Resolución',
    popular: true,
    displayOrder: 2,
    addOns: [],
  },
  {
    name: 'Producción Mayor',
    category: 'commercial',
    tier: 'deluxe',
    price: 8000,
    description: 'Corporativo / Industrial',
    features: [
      'Producción de Medio Día a Día Completo (4 a 8 hrs)',
      'Múltiples locaciones, áreas industriales o campañas publicitarias amplias',
      '50+ fotografías en Alta Resolución',
    ],
    duration: 8,
    deliverables: '50+ fotos en Alta Resolución',
    popular: false,
    displayOrder: 3,
    addOns: [],
  },

  // ==================== EDITORIAL ====================
  {
    name: 'Colaboraciones (TFP)',
    category: 'editorial',
    tier: 'essential',
    price: 0,
    description: 'Sinergia Creativa',
    features: [
      'Colaboraciones e intercambios creativos',
      'Para modelos en book, maquillistas, estilistas, diseñadores emergentes',
      'Sujeto a aprobación de propuesta creativa',
    ],
    duration: 0,
    deliverables: 'Negociable según proyecto',
    popular: false,
    displayOrder: 1,
    addOns: [],
  },
  {
    name: 'Lookbook / Campaña',
    category: 'editorial',
    tier: 'premium',
    price: 3000,
    description: 'Para marcas y diseñadores',
    features: [
      'Dirección de modelos y fotografía de producto puesto',
      'Licencia de uso comercial y retoque editorial en piezas clave',
      'Presupuesto Adaptable según necesidades de campaña',
    ],
    duration: 4,
    deliverables: 'Fotograf ías editadas + licencia comercial',
    popular: true,
    displayOrder: 2,
    addOns: [],
  },
];

async function seedPackages() {
  console.log('🌱 Starting to seed service packages...\n');

  try {
    // Get all existing packages
    const existingPackages = await client.fetch(
      `*[_type == "servicePackage"] { _id, name, category, tier }`
    );

    console.log(`Found ${existingPackages.length} existing packages\n`);

    // Delete all existing packages
    if (existingPackages.length > 0) {
      console.log('🗑️  Deleting existing packages...');
      const deleteTransaction = client.transaction();
      existingPackages.forEach((pkg) => {
        deleteTransaction.delete(pkg._id);
      });
      await deleteTransaction.commit();
      console.log(`✓ Deleted ${existingPackages.length} packages\n`);
    }

    // Seed all new packages
    console.log('📝 Creating new packages...\n');
    const createTransaction = client.transaction();
    let count = 0;

    packages.forEach((pkg) => {
      // Add _key to each add-on
      const packageWithKeys = {
        ...pkg,
        addOns: pkg.addOns?.map((addOn) => ({
          ...addOn,
          _key: generateKey(),
        })) || [],
      };

      createTransaction.create({
        _type: 'servicePackage',
        ...packageWithKeys,
      });
      count++;
    });

    await createTransaction.commit();
    console.log(`✅ Successfully created ${count} service packages!\n`);

    // Summary by category
    const categories = [...new Set(packages.map((p) => p.category))];
    console.log('📊 Summary by category:');
    categories.forEach((cat) => {
      const count = packages.filter((p) => p.category === cat).length;
      console.log(`   • ${cat}: ${count} packages`);
    });

    console.log('\n✨ Seeding complete!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error seeding packages:', error.message);
    process.exit(1);
  }
}

seedPackages();

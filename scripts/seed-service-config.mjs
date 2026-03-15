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

// ─── Service configs — content matches the services page UI exactly ────────────
const configs = [

  // ══════════════════════════════════════════════════════════════════════════
  // BODAS
  // ══════════════════════════════════════════════════════════════════════════
  {
    serviceKey: 'weddings',
    displayName: 'Bodas',
    introText: 'Tu boda es el reflejo de tu historia. Documentamos cada momento con sensibilidad editorial, enfocándonos en las emociones genuinas, los detalles que brillan y la magia de celebrar el amor en tu día.',
    gridColumns: 3,
    hasAddOns: true,
    complementos: [
      {
        name: 'Sesión de Compromiso (Pre-boda)',
        price: 2500,
        note: 'Incluida en el paquete Premium',
      },
      {
        name: 'Set de 50 fotografías impresas (4x6") + 2 ampliaciones (8x10")',
        price: 1500,
      },
      {
        name: 'Horas extra de cobertura el día del evento',
        price: 1500,
        unit: 'hr',
      },
    ],
    infoCardVariant: 'none',
    hasGlobalBenefits: true,
    globalBenefitsHeading: 'Inclusiones en todos los paquetes',
    globalBenefitsText:
      'Entrega garantizada de galería digital amplia (aprox. 50 a 60 fotos por hora de cobertura). Todas las fotografías son editadas profesionalmente y entregadas en Alta Resolución (para impresión) y optimizadas para Redes Sociales. Respaldadas en la nube de forma gratuita por 6 meses.',
    hasProcess: true,
    processTitle: 'El proceso hacia tu Gran Día',
    processSteps: [
      { number: 1, heading: 'Contacto', description: 'Envíame un mensaje para verificar disponibilidad de tu fecha.' },
      { number: 2, heading: 'Reserva', description: 'Aseguramos tu fecha con un anticipo y firmamos contrato para tu tranquilidad.' },
      { number: 3, heading: 'El Evento', description: 'Capturo la magia de tu boda de forma discreta, profesional y con calidez.' },
      { number: 4, heading: 'Entrega', description: 'Recibe tu galería digital privada y editada en un lapso de 3 a 4 semanas.' },
    ],
    ctaButtonText: 'Reservar',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // RETRATOS
  // ══════════════════════════════════════════════════════════════════════════
  {
    serviceKey: 'portrait',
    displayName: 'Retratos',
    introText:
      'Ya sea que busques celebrar tu cumpleaños, documentar tu graduación, renovar tu marca personal o un proyecto personal. Estas colecciones están diseñadas para adaptarse a tu visión.',
    gridColumns: 3,
    hasAddOns: true,
    complementos: [
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
    infoCardVariant: 'right_panel',
    infoCardHeading: '¿Deseas tu sesión en estudio fotográfico?',
    infoCardContent: 'Cualquiera de nuestras sesiones puede realizarse en estudio fotográfico profesional. Contamos con diferentes opciones en la ciudad. El costo de renta se cotiza por separado según disponibilidad (inversión promedio de $600 MXN por hora).',
    hasGlobalBenefits: true,
    globalBenefitsHeading: 'Inclusiones en todas las sesiones',
    globalBenefitsText:
      'Galería digital privada entregada en Alta Resolución (lista para imprimir) y optimizada para uso en Redes Sociales. Tus memorias estarán respaldadas en la nube de forma gratuita por 3 meses.',
    hasProcess: true,
    processTitle: 'Cómo funciona la sesión',
    processSteps: [
      { number: 1, heading: 'Idea', description: 'Platicamos sobre el estilo, vestuario y la vibra que buscas para tus fotos.' },
      { number: 2, heading: 'Planeación', description: 'Agendamos la fecha con un anticipo y elegimos la locación perfecta.' },
      { number: 3, heading: 'La Sesión', description: 'Te guiaré con dirección de pose natural para que te sientas auténtico(a).' },
      { number: 4, heading: 'Entrega', description: 'Selección y edición final de tus mejores fotografías en 1 a 2 semanas.' },
    ],
    ctaButtonText: 'Reservar',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // PAREJAS Y GRUPALES
  // ══════════════════════════════════════════════════════════════════════════
  {
    serviceKey: 'couples',
    displayName: 'Parejas y Grupales',
    // Lines starting with * render as italic disclaimer in the template
    introText:
      'Diseñado para celebrar la conexión con tus personas favoritas. Ya sea un retrato de pareja, memorias familiares o una sesión con tu grupo de amigos, creamos un ambiente relajado para capturar la dinámica y esencia genuina que los une.\n*Todos los paquetes incluyen cobertura base para 2 personas. Aplica costo extra a partir del tercer integrante.',
    gridColumns: 3,
    hasAddOns: true,
    complementos: [
      { name: 'Persona o mascota extra', price: 250, unit: 'c.u.' },
      { name: 'Fotografía extra editada', price: 150, unit: 'c.u.' },
      { name: 'Hora extra de sesión', price: 1000 },
    ],
    infoCardVariant: 'right_panel',
    infoCardHeading: '¿Deseas tu sesión en estudio fotográfico?',
    infoCardContent: 'Cualquiera de nuestras sesiones puede realizarse en estudio fotográfico profesional. Contamos con diferentes opciones en la ciudad. El costo de renta se cotiza por separado según disponibilidad (inversión promedio de $600 MXN por hora).',
    hasGlobalBenefits: true,
    globalBenefitsHeading: 'Inclusiones en todas las sesiones',
    globalBenefitsText:
      'Galería digital privada entregada en Alta Resolución (lista para imprimir) y optimizada para uso en Redes Sociales. Tus memorias estarán respaldadas en la nube de forma gratuita por 3 meses.',
    hasProcess: true,
    processTitle: 'Cómo funciona la sesión',
    processSteps: [
      { number: 1, heading: 'Idea', description: 'Platicamos sobre su estilo, dinámica y la vibra que buscan para sus fotos.' },
      { number: 2, heading: 'Planeación', description: 'Agendamos la fecha con un anticipo y elegimos la locación perfecta.' },
      { number: 3, heading: 'La Sesión', description: 'Dirección de pose natural para documentar su conexión de forma auténtica.' },
      { number: 4, heading: 'Entrega', description: 'Selección y edición final de sus mejores fotografías en 1 a 2 semanas.' },
    ],
    ctaButtonText: 'Reservar',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // MATERNIDAD
  // ══════════════════════════════════════════════════════════════════════════
  {
    serviceKey: 'maternity',
    displayName: 'Maternidad',
    introText:
      'Documentamos la belleza, la fuerza y la dulce espera de esta etapa irrepetible. Sesiones diseñadas para que te sientas cómoda, hermosa y en confianza, ya sea sola o acompañada de tu pareja y familia.',
    gridColumns: 2,
    hasAddOns: false,
    infoCardVariant: 'full_width_centered',
    infoCardHeading: '¿Deseas tu sesión en estudio fotográfico?',
    infoCardContent: 'Cualquiera de nuestras sesiones puede realizarse en estudio fotográfico profesional. Contamos con diferentes opciones en la ciudad. El costo de renta se cotiza por separado según disponibilidad (inversión promedio de $600 MXN por hora).',
    hasGlobalBenefits: true,
    globalBenefitsHeading: 'Inclusiones en todas las sesiones',
    globalBenefitsText:
      'Galería digital privada entregada en Alta Resolución (lista para imprimir) y optimizada para uso en Redes Sociales. Tus memorias estarán respaldadas en la nube de forma gratuita por 3 meses.',
    hasProcess: true,
    processTitle: 'Cómo funciona la sesión',
    processSteps: [
      { number: 1, heading: 'Idea', description: 'Platicamos sobre el estilo, vestuario y la vibra que buscas para tus fotos.' },
      { number: 2, heading: 'Planeación', description: 'Agendamos la fecha (idealmente entre la semana 28 y 34) con un anticipo.' },
      { number: 3, heading: 'La Sesión', description: 'Te guiaré con dirección de pose natural para que te sientas cómoda y hermosa.' },
      { number: 4, heading: 'Entrega', description: 'Selección y edición final de tus mejores fotografías en 1 a 2 semanas.' },
    ],
    ctaButtonText: 'Reservar',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // COMERCIAL
  // ══════════════════════════════════════════════════════════════════════════
  {
    serviceKey: 'commercial',
    displayName: 'Comercial',
    introText:
      'Eleva la percepción de tu marca. Creamos bancos de imágenes a la medida para empresas, emprendedores y negocios que buscan transmitir profesionalismo y conectar con su audiencia.',
    gridColumns: 3,
    hasAddOns: false,
    infoCardVariant: 'none',
    customBlockHeading: 'Presupuestos a la Medida',
    customBlockContent:
      'Entiendo que las necesidades de una cafetería emergente no son las mismas que las de una planta industrial. Estoy completamente abierto a escuchar la visión de tu proyecto y hacer ajustes o negociar estos paquetes para crear una propuesta que empate perfectamente con los requerimientos y el presupuesto de tu empresa.',
    hasGlobalBenefits: true,
    globalBenefitsHeading: 'Inclusiones en todos los proyectos',
    globalBenefitsText:
      'Galería digital privada entregada en Alta Resolución (para impresión y espectaculares) y optimizada para uso en plataformas digitales y Redes Sociales. Sus archivos estarán respaldados en la nube de forma gratuita por 3 meses.',
    hasProcess: true,
    processTitle: 'Cómo funciona nuestro proceso',
    processSteps: [
      { number: 1, heading: 'Briefing', description: 'Platicamos sobre los objetivos comerciales de tu marca y la estética visual que buscas proyectar.' },
      { number: 2, heading: 'Planeación', description: 'Definimos fechas, locaciones y cronograma de actividades asegurando la fecha con un anticipo.' },
      { number: 3, heading: 'Producción', description: 'Ejecutamos la sesión fotográfica de manera ágil, profesional y sin interrumpir tu operación.' },
      { number: 4, heading: 'Entrega', description: 'Recibes tu banco de imágenes editado, clasificado y en Alta Resolución en 1 a 2 semanas.' },
    ],
    ctaButtonText: 'Cotizar',
  },

  // ══════════════════════════════════════════════════════════════════════════
  // EDITORIAL
  // ══════════════════════════════════════════════════════════════════════════
  {
    serviceKey: 'editorial',
    displayName: 'Editorial',
    introText:
      'Creación visual sin límites. Desde la dirección de arte para campañas de moda (Lookbooks) hasta la sinergia creativa con nuevos talentos.',
    gridColumns: 2,
    hasAddOns: false,
    infoCardVariant: 'none',
    hasGlobalBenefits: false,
    hasProcess: false,
    ctaButtonText: 'Cotizar',
  },
];

// ─── Seed function ─────────────────────────────────────────────────────────────
async function seedConfigs() {
  console.log('🌱 Iniciando seed de configuraciones de servicios...\n');

  try {
    // Delete existing configs
    const existing = await client.fetch('*[_type == "serviceConfig"]{ _id, serviceKey }');
    if (existing.length > 0) {
      console.log(`🗑  Eliminando ${existing.length} configuraciones existentes...`);
      const tx = client.transaction();
      existing.forEach((doc) => tx.delete(doc._id));
      await tx.commit();
      console.log('   ✓ Eliminadas\n');
    }

    // Create all configs
    console.log('📝 Creando configuraciones...\n');
    const tx = client.transaction();

    for (const cfg of configs) {
      const doc = {
        _type: 'serviceConfig',
        ...cfg,
        // Add _key to complementos and processSteps arrays
        complementos: (cfg.complementos || []).map((c) => ({ _key: key(), ...c })),
        processSteps: (cfg.processSteps || []).map((s) => ({ _key: key(), ...s })),
      };
      // Remove undefined/null fields
      Object.keys(doc).forEach((k) => { if (doc[k] == null) delete doc[k]; });
      tx.create(doc);
    }

    await tx.commit();
    console.log(`✅ ${configs.length} configuraciones creadas.\n`);

    console.log('📊 Resumen:');
    configs.forEach((c) => console.log(`   • ${c.serviceKey}: ${c.displayName}`));
    console.log('\n✨ Listo!');
    process.exit(0);
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  }
}

seedConfigs();

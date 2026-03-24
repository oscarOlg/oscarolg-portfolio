#!/usr/bin/env node

/**
 * Seed featured testimonials in Sanity.
 * Run: node scripts/seed-testimonials.mjs
 */

import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

// Load environment variables from .env.local
const envPath = path.join(process.cwd(), ".env.local");
if (fs.existsSync(envPath)) {
  const env = fs.readFileSync(envPath, "utf8");
  env.split("\n").forEach((line) => {
    const [key, ...valueParts] = line.split("=");
    if (key && !key.startsWith("#")) {
      const value = valueParts.join("=").trim().replace(/^['"]|['"]$/g, "");
      process.env[key.trim()] = value;
    }
  });
}

const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET,
  token: process.env.SANITY_API_TOKEN,
  apiVersion: "2024-03-01",
  useCdn: false,
});

const testimonials = [
  {
    _type: "testimonial",
    author: "María & Carlos González",
    role: "Boda - Junio 2024",
    text: "Oscar capturó cada momento de nuestra boda de forma mágica. Las fotos son hermosas y la entrega fue súper rápida. ¡100% recomendado!",
    rating: 5,
    featured: true,
    displayOrder: 1,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: "testimonial",
    author: "Ana Pérez",
    role: "Sesión de Pareja",
    text: "Nos hizo sentir súper cómodos durante toda la sesión. El resultado fue natural, elegante y exactamente lo que queríamos.",
    rating: 5,
    featured: true,
    displayOrder: 2,
    publishedAt: new Date().toISOString(),
  },
  {
    _type: "testimonial",
    author: "Sofía Ramírez",
    role: "Sesión de Maternidad",
    text: "La experiencia fue muy bonita y profesional. Oscar cuidó cada detalle y las fotos quedaron increíbles.",
    rating: 5,
    featured: true,
    displayOrder: 3,
    publishedAt: new Date().toISOString(),
  },
];

async function seedTestimonials() {
  try {
    for (const testimonial of testimonials) {
      const result = await client.create(testimonial);
      console.log(`Created testimonial: ${result.author}`);
    }
    console.log("All testimonials seeded successfully.");
  } catch (error) {
    console.error("Error seeding testimonials:", error);
    process.exit(1);
  }
}

seedTestimonials();

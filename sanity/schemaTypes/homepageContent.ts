import {defineField, defineType} from 'sanity'

export const homepageContentType = defineType({
  name: 'homepageContent',
  title: 'Página Principal',
  type: 'document',
  fields: [
    // ── Hero ──────────────────────────────────────────────
    defineField({
      name: 'heroHeading',
      title: 'Hero — Título (parte normal)',
      type: 'string',
      description: 'Ej.: "Fotografía que captura"',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroHeadingItalic',
      title: 'Hero — Título (parte en cursiva/acento)',
      type: 'string',
      description: 'Ej.: "la esencia de tu historia" — se muestra en cursiva con color acento',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroCta1Text',
      title: 'Hero — Botón principal (relleno)',
      type: 'string',
      description: 'Ej.: "Ver mi portafolio"',
    }),
    defineField({
      name: 'heroCta2Text',
      title: 'Hero — Botón secundario (contorno)',
      type: 'string',
      description: 'Ej.: "Cotizar sesión"',
    }),

    // ── Sección Mi Trabajo ────────────────────────────────
    defineField({
      name: 'workSectionHeading',
      title: 'Mi Trabajo — Título de sección',
      type: 'string',
      description: 'Ej.: "Mi Trabajo"',
    }),
    defineField({
      name: 'workSectionSubtitle',
      title: 'Mi Trabajo — Subtítulo',
      type: 'string',
      description: 'Ej.: "Explora por tipo de sesión"',
    }),
    defineField({
      name: 'workSectionViewMoreText',
      title: 'Mi Trabajo — Texto hover en tarjetas',
      type: 'string',
      description: 'Ej.: "Ver más →"',
    }),
    defineField({
      name: 'workSectionViewAllText',
      title: 'Mi Trabajo — Enlace "ver todo"',
      type: 'string',
      description: 'Ej.: "Ver todo el portafolio →"',
    }),

    // ── Sección Inversión ─────────────────────────────────
    defineField({
      name: 'investmentHeading',
      title: 'Inversión — Título',
      type: 'string',
      description: 'Ej.: "La tranquilidad de estar en buenas manos."',
    }),
    defineField({
      name: 'investmentParagraph1',
      title: 'Inversión — Párrafo 1',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'investmentParagraph2',
      title: 'Inversión — Párrafo 2',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'investmentCtaText',
      title: 'Inversión — Texto del botón',
      type: 'string',
      description: 'Ej.: "Conocer paquetes y precios"',
    }),

    // ── CTA Final ─────────────────────────────────────────
    defineField({
      name: 'finalCtaHeading',
      title: 'CTA Final — Título',
      type: 'string',
      description: 'Ej.: "¿Listo para crear algo hermoso e irrepetible?"',
    }),
    defineField({
      name: 'finalCtaLocation',
      title: 'CTA Final — Texto de ubicación',
      type: 'string',
      description: 'Ej.: "Ciudad Juárez & México"',
    }),
    defineField({
      name: 'finalCtaButtonText',
      title: 'CTA Final — Texto del botón',
      type: 'string',
      description: 'Ej.: "Reservar fecha"',
    }),
  ],
})

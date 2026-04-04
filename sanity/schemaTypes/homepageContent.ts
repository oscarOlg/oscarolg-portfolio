import {defineField, defineType} from 'sanity'

export const homepageContentType = defineType({
  name: 'homepageContent',
  title: 'Página Principal',
  type: 'document',
  fields: [
    // ── Hero Images (managed from CMS) ───────────────────
    defineField({
      name: 'heroImages',
      title: 'Hero — Imágenes del carrusel (ordenadas)',
      type: 'array',
      description: 'Selecciona y ordena las imágenes de portada para el hero. El orden aquí será el orden del carrusel.',
      of: [
        {
          type: 'reference',
          to: [{type: 'portfolioImage'}],
          options: {
            disableNew: true,
          },
        },
      ],
      options: {
        sortable: true,
      },
      validation: (Rule) => Rule.max(12),
    }),
  ],
})

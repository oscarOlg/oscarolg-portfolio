import {defineField, defineType} from 'sanity'

export const aboutContentType = defineType({
  name: 'aboutContent',
  title: 'Página Acerca De',
  type: 'document',
  fields: [
    defineField({
      name: 'heading',
      title: 'Título Principal (H1)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'headingEn',
      title: 'Título Principal H1 (EN)',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Fotografía de Perfil',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'paragraphs',
      title: 'Párrafos del Cuerpo',
      type: 'array',
      of: [{type: 'text'}],
      description: 'Cada entrada es un párrafo separado. El orden aquí es el orden en pantalla.',
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'paragraphsEn',
      title: 'Párrafos del Cuerpo (EN)',
      type: 'array',
      of: [{type: 'text'}],
      description: 'English translation of body paragraphs. Same order as Spanish.',
    }),
    defineField({
      name: 'ctaText',
      title: 'Texto del Botón CTA',
      type: 'string',
      description: 'Ej.: "Hablemos de tu proyecto"',
    }),
    defineField({
      name: 'ctaTextEn',
      title: 'Texto del Botón CTA (EN)',
      type: 'string',
    }),
  ],
})

import {defineField, defineType} from 'sanity'

export const portfolioImageType = defineType({
  name: 'portfolioImage',
  title: 'Portfolio Image',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'image',
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      options: {
        list: [
          {title: 'Bodas', value: 'weddings'},
          {title: 'Retratos', value: 'portraits'},
          {title: 'Parejas', value: 'couples'},
          {title: 'Comercial', value: 'commercial'},
          {title: 'Editorial', value: 'editorial'},
          {title: 'Maternidad', value: 'maternity'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      description: 'Where the photo was taken (e.g., Ciudad Juárez, Mexico)',
    }),
    defineField({
      name: 'photographyDetails',
      title: 'Photography Details',
      type: 'object',
      fields: [
        {name: 'camera', type: 'string', title: 'Camera Model'},
        {name: 'lens', type: 'string', title: 'Lens'},
        {name: 'iso', type: 'string', title: 'ISO'},
        {name: 'aperture', type: 'string', title: 'Aperture'},
        {name: 'shutterSpeed', type: 'string', title: 'Shutter Speed'},
      ],
      collapsed: false,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Image',
      type: 'boolean',
      description: 'Show on homepage gallery',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
      description: 'Lower numbers appear first',
    }),
    defineField({
      name: 'publishedAt',
      title: 'Published At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'image',
      category: 'category',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.category,
        media: selection.media,
      }
    },
  },
})

import {defineField, defineType} from 'sanity'

export const testimonialType = defineType({
  name: 'testimonial',
  title: 'Testimonial',
  type: 'document',
  fields: [
    defineField({
      name: 'author',
      title: 'Client Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'role',
      title: 'Role/Event Type',
      type: 'string',
      description: 'e.g., "Bride", "Event Organizer", "Portrait Client"',
    }),
    defineField({
      name: 'text',
      title: 'Testimonial Text',
      type: 'text',
      rows: 5,
      validation: (Rule) => Rule.required().max(500),
    }),
    defineField({
      name: 'image',
      title: 'Client Photo',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'rating',
      title: 'Rating',
      type: 'number',
      options: {
        list: [
          {title: '⭐ 5 Stars', value: 5},
          {title: '⭐⭐⭐⭐ 4 Stars', value: 4},
          {title: '⭐⭐⭐ 3 Stars', value: 3},
        ],
      },
      initialValue: 5,
    }),
    defineField({
      name: 'featured',
      title: 'Featured Testimonial',
      type: 'boolean',
      description: 'Show on homepage',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
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
      title: 'author',
      subtitle: 'role',
      media: 'image',
    },
  },
})

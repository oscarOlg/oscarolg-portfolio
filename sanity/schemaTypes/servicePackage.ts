import {defineField, defineType} from 'sanity'

export const servicePackageType = defineType({
  name: 'servicePackage',
  title: 'Service Package',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Package Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Service Category',
      type: 'string',
      options: {
        list: [
          {title: 'Wedding Packages', value: 'wedding'},
          {title: 'Individual/Portrait', value: 'individual'},
          {title: 'Couples', value: 'couples'},
          {title: 'Family', value: 'family'},
          {title: 'Event', value: 'event'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tier',
      title: 'Package Tier',
      type: 'string',
      options: {
        list: [
          {title: 'Essential', value: 'essential'},
          {title: 'Premium', value: 'premium'},
          {title: 'Deluxe', value: 'deluxe'},
        ],
      },
      description: 'For wedding packages: Essential/Premium/Deluxe',
    }),
    defineField({
      name: 'price',
      title: 'Price (USD)',
      type: 'number',
      validation: (Rule) => Rule.required().min(0),
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 4,
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'features',
      title: 'Features/Includes',
      type: 'array',
      of: [{type: 'string'}],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'addOns',
      title: 'Add-Ons',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            {name: 'name', type: 'string', title: 'Add-On Name'},
            {name: 'price', type: 'number', title: 'Additional Price'},
          ],
        },
      ],
    }),
    defineField({
      name: 'duration',
      title: 'Session Duration (hours)',
      type: 'number',
    }),
    defineField({
      name: 'deliverables',
      title: 'Deliverables',
      type: 'string',
      description: 'e.g., "50-75 edited photos", "8x10 prints", "Digital gallery access"',
    }),
    defineField({
      name: 'popular',
      title: 'Popular Package',
      type: 'boolean',
      description: 'Highlight as most popular',
      initialValue: false,
    }),
    defineField({
      name: 'displayOrder',
      title: 'Display Order',
      type: 'number',
    }),
  ],
  preview: {
    select: {
      title: 'name',
      category: 'category',
      price: 'price',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: `${selection.category} - $${selection.price}`,
      }
    },
  },
})

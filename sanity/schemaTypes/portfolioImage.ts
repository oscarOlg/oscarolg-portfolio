import {defineField, defineType} from 'sanity'
import { getSanityPortfolioCategoryOptions } from '../../src/config/services'

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
      name: 'usageScope',
      title: 'Usage Scope',
      type: 'string',
      description: 'Where this image is intended to be used.',
      options: {
        list: [
          {title: 'Portfolio Gallery', value: 'portfolio'},
          {title: 'Services Page', value: 'services'},
          {title: 'Testimonials', value: 'testimonials'},
          {title: 'Homepage', value: 'homepage'},
          {title: 'Contact Page', value: 'contact'},
          {title: 'About Page', value: 'about'},
          {title: 'Landing Page', value: 'landing'},
          {title: 'General / Reusable', value: 'general'},
        ],
      },
      initialValue: 'portfolio',
    }),
    defineField({
      name: 'usageSection',
      title: 'Usage Section',
      type: 'string',
      description: 'Optional fine-grained section identifier (e.g., services_featured_package, homepage_hero).',
    }),
    defineField({
      name: 'usageTags',
      title: 'Usage Tags',
      type: 'array',
      of: [{type: 'string'}],
      description: 'Optional tags to group and query images by section intent.',
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
        list: getSanityPortfolioCategoryOptions(),
      },
      validation: (Rule) =>
        Rule.custom((value, context) => {
          const usageScope = (context.document as {usageScope?: string} | undefined)?.usageScope
          if (!usageScope || usageScope === 'portfolio') {
            return value ? true : 'Category is required for portfolio gallery images.'
          }
          return true
        }),
    }),
    defineField({
      name: 'sourcePath',
      title: 'Source Path',
      type: 'string',
      description: 'Original local path used during scripted upload.',
      readOnly: true,
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
      usageScope: 'usageScope',
    },
    prepare(selection) {
      return {
        title: selection.title,
        subtitle: selection.category || selection.usageScope || 'general',
        media: selection.media,
      }
    },
  },
})

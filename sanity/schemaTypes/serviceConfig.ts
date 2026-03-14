import {defineField, defineType} from 'sanity'
import { getSanityCategoryOptions } from '../../src/config/services'

/**
 * SERVICE CONFIGURATION TYPE
 * Defines metadata for each service (weddings, portrait, couples, etc.)
 * Controls which sections appear, layout variations, and service-specific content
 */
export const serviceConfigType = defineType({
  name: 'serviceConfig',
  title: 'Service Configuration',
  type: 'document',
  fields: [
    defineField({
      name: 'serviceKey',
      title: 'Service Key',
      type: 'string',
      description: 'Must match key in src/config/services.ts (weddings, portrait, couples, etc.)',
      options: {
        list: [
          {title: 'Weddings', value: 'weddings'},
          {title: 'Portrait', value: 'portrait'},
          {title: 'Couples', value: 'couples'},
          {title: 'Maternity', value: 'maternity'},
          {title: 'Commercial', value: 'commercial'},
          {title: 'Editorial', value: 'editorial'},
        ],
      },
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'displayName',
      title: 'Display Name (Spanish)',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),

    defineField({
      name: 'hasAddOns',
      title: 'Has Add-ons Section',
      type: 'boolean',
      description: 'Show add-ons section in service page',
      initialValue: true,
    }),

    defineField({
      name: 'hasProcess',
      title: 'Has Process Section',
      type: 'boolean',
      description: 'Show numbered workflow/process section',
      initialValue: true,
    }),

    defineField({
      name: 'hasGlobalBenefits',
      title: 'Has Global Benefits Section',
      type: 'boolean',
      description: 'Show inclusions/benefits for all packages',
      initialValue: true,
    }),

    defineField({
      name: 'gridColumns',
      title: 'Package Grid Columns',
      type: 'number',
      options: {
        list: [
          {title: '2 Columns', value: 2},
          {title: '3 Columns', value: 3},
        ],
      },
      initialValue: 3,
    }),

    defineField({
      name: 'globalBenefitsHeading',
      title: 'Global Benefits Heading',
      type: 'string',
      initialValue: 'Inclusiones en todos los paquetes',
    }),

    defineField({
      name: 'globalBenefitsText',
      title: 'Global Benefits Text',
      type: 'text',
      rows: 4,
      description: 'Shared benefits across all packages in this service',
    }),

    defineField({
      name: 'processTitle',
      title: 'Process Section Title',
      type: 'string',
      initialValue: 'Cómo funciona',
    }),

    defineField({
      name: 'processSteps',
      title: 'Process Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'processStep',
          title: 'Process Step',
          fields: [
            {
              name: 'number',
              title: 'Step Number',
              type: 'number',
            },
            {
              name: 'heading',
              title: 'Heading',
              type: 'string',
            },
            {
              name: 'description',
              title: 'Description',
              type: 'text',
              rows: 2,
            },
          ],
        },
      ],
      description: 'Leave empty to hide process section',
    }),

    defineField({
      name: 'specialSections',
      title: 'Special Sections',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'specialSection',
          title: 'Special Section',
          fields: [
            {
              name: 'title',
              title: 'Title',
              type: 'string',
            },
            {
              name: 'position',
              title: 'Position',
              type: 'string',
              options: {
                list: [
                  {title: 'After Packages', value: 'after_packages'},
                  {title: 'After Add-ons', value: 'after_addons'},
                  {title: 'After Benefits', value: 'after_benefits'},
                ],
              },
            },
            {
              name: 'content',
              title: 'Content (HTML)',
              type: 'text',
              rows: 6,
            },
          ],
        },
      ],
      description: 'E.g., Wedding civil variant, commercial custom pricing card',
    }),

    defineField({
      name: 'ctaButtonText',
      title: 'CTA Button Text',
      type: 'string',
      description: 'E.g., "Reservar" or "Cotizar" or "Proponer Colaboración"',
      initialValue: 'Reservar',
    }),

    defineField({
      name: 'infoCardHeading',
      title: 'Info Card Heading (Optional)',
      type: 'string',
      description: 'For services with studio info or custom pricing explanation (Couples, Maternity, Commercial)',
    }),

    defineField({
      name: 'infoCardContent',
      title: 'Info Card Content',
      type: 'text',
      rows: 3,
      description: 'Content for right-side info box',
    }),
  ],

  preview: {
    select: {
      title: 'displayName',
      subtitle: 'serviceKey',
    },
  },
})

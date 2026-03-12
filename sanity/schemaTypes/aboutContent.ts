import {defineField, defineType} from 'sanity'

export const aboutContentType = defineType({
  name: 'aboutContent',
  title: 'About Page Content',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Page Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'string',
    }),
    defineField({
      name: 'mainImage',
      title: 'Main Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'bio',
      title: 'Photographer Bio',
      type: 'blockContent',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'yearsExperience',
      title: 'Years of Experience',
      type: 'number',
    }),
    defineField({
      name: 'specializations',
      title: 'Specializations',
      type: 'array',
      of: [{type: 'string'}],
      description: 'e.g., Weddings, Portraits, Events',
    }),
    defineField({
      name: 'cta',
      title: 'Call to Action Text',
      type: 'string',
      description: 'Button/closing text (e.g., "Let\'s create something beautiful together")',
    }),
  ],
})

// Block content for rich text
export const blockContentType = defineType({
  name: 'blockContent',
  title: 'Block Content',
  type: 'array',
  of: [
    {
      title: 'Block',
      type: 'block',
      styles: [
        {title: 'Normal', value: 'normal'},
        {title: 'H1', value: 'h1'},
        {title: 'H2', value: 'h2'},
        {title: 'H3', value: 'h3'},
        {title: 'Quote', value: 'blockquote'},
      ],
      lists: [{title: 'Bullet', value: 'bullet'}],
    },
    {
      title: 'Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    },
  ],
})

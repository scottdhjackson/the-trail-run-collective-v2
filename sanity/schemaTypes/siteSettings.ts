import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'siteSettings',
  title: 'Site Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'brandName',
      title: 'Brand Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'contactEmail',
      title: 'Contact Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'socialLinks',
      title: 'Social Links',
      type: 'object',
      fields: [
        { name: 'instagram', title: 'Instagram', type: 'url' },
        { name: 'facebook', title: 'Facebook', type: 'url' },
        { name: 'twitter', title: 'Twitter', type: 'url' },
      ],
    }),
    defineField({
      name: 'seoTitle',
      title: 'SEO Title',
      type: 'string',
      validation: (Rule) => Rule.required().max(60),
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      validation: (Rule) => Rule.required().max(160),
    }),
    defineField({
      name: 'aboutHeading',
      title: 'About Section — Heading',
      type: 'string',
      initialValue: 'About The Trail Run Collective',
      group: undefined,
    }),
    defineField({
      name: 'aboutBody',
      title: 'About Section — Body Text',
      type: 'text',
      rows: 6,
    }),
    defineField({
      name: 'aboutCtaLabel',
      title: 'About Section — CTA Button Label',
      type: 'string',
      initialValue: 'Learn More About Us',
    }),
    defineField({
      name: 'aboutBackgroundImage',
      title: 'About Section — Background Image',
      type: 'image',
      description: 'Replaces the default background photo. Recommended: wide landscape image.',
      options: { hotspot: true },
    }),
  ],
})

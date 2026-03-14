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
      name: 'logo',
      title: 'Logo',
      type: 'image',
      description: 'Upload a custom logo. SVG or PNG with a transparent background recommended.',
      options: { hotspot: false },
    }),
    defineField({
      name: 'logoWidth',
      title: 'Logo Width (px)',
      type: 'number',
      description: 'Display width of the logo in pixels. Default: 160',
      validation: (Rule) => Rule.min(40).max(600).integer(),
    }),
    defineField({
      name: 'heroBannerImage',
      title: 'Homepage — Banner Image',
      type: 'image',
      description: 'The main banner image at the top of the homepage. Recommended: wide landscape image.',
      options: { hotspot: true },
    }),
    defineField({
      name: 'aboutBackgroundImage',
      title: 'About Section — Images',
      type: 'array',
      of: [{ type: 'image', options: { hotspot: true } }],
      description: 'Up to 3 images shown in the about section collage. Add them in the order you want them to appear.',
      validation: (Rule) => Rule.max(3),
    }),

    // ── Colours ──────────────────────────────────────────────────────────────
    defineField({
      name: 'colours',
      title: 'Colours',
      type: 'object',
      description: 'Override the default colours for key site sections. Use hex codes (e.g. #ffffff) or rgba values (e.g. rgba(0,0,0,0.5)).',
      fields: [
        {
          name: 'navBackground',
          title: 'Navigation — Background',
          type: 'string',
          description: 'Background colour of the top nav bar. Default: #000000',
          placeholder: '#000000',
        },
        {
          name: 'navText',
          title: 'Navigation — Text',
          type: 'string',
          description: 'Link and icon colour in the top nav. Default: #ffffff',
          placeholder: '#ffffff',
        },
        {
          name: 'bannerOverlay',
          title: 'Banner — Overlay Colour',
          type: 'string',
          description: 'Colour overlay on the hero banner image. Use rgba for transparency, e.g. rgba(0,0,0,0.45). Default: rgba(0,0,0,0.45)',
          placeholder: 'rgba(0,0,0,0.45)',
        },
        {
          name: 'footerBackground',
          title: 'Footer — Background',
          type: 'string',
          description: 'Background colour of the footer. Default: transparent (inherits muted tone)',
          placeholder: '#f5f5f5',
        },
        {
          name: 'footerText',
          title: 'Footer — Text',
          type: 'string',
          description: 'Text colour in the footer. Default: inherits muted foreground',
          placeholder: '#6b7280',
        },
      ],
    }),
  ],
})

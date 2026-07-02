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
      name: 'heroBannerMediaType',
      title: 'Homepage — Banner Media Type',
      type: 'string',
      description: 'Choose whether the banner shows a static image or a video.',
      options: {
        list: [
          { title: 'Image', value: 'image' },
          { title: 'Video', value: 'video' },
        ],
        layout: 'radio',
      },
      initialValue: 'image',
    }),
    defineField({
      name: 'heroBannerImage',
      title: 'Homepage — Banner Image',
      type: 'image',
      description: 'The main banner image. Used when Banner Media Type is set to Image.',
      options: { hotspot: true },
      hidden: ({ document }) => document?.heroBannerMediaType === 'video',
    }),
    defineField({
      name: 'heroBannerVideoDesktop',
      title: 'Homepage — Banner Video (Desktop)',
      type: 'file',
      description: 'MP4 video for desktop screens. Used when Banner Media Type is set to Video.',
      options: { accept: 'video/mp4,video/*' },
      hidden: ({ document }) => document?.heroBannerMediaType !== 'video',
    }),
    defineField({
      name: 'heroBannerVideoMobile',
      title: 'Homepage — Banner Video (Mobile)',
      type: 'file',
      description: 'MP4 video for mobile screens. If not provided, the desktop video is used on all screen sizes.',
      options: { accept: 'video/mp4,video/*' },
      hidden: ({ document }) => document?.heroBannerMediaType !== 'video',
    }),

    // ── Typography ───────────────────────────────────────────────────────────
    defineField({
      name: 'typography',
      title: 'Typography',
      type: 'object',
      description: 'Override the site typeface. Changes apply site-wide.',
      fields: [
        {
          name: 'fontPreset',
          title: 'Font Preset',
          type: 'string',
          description: 'Select the typeface used across the site.',
          options: {
            list: [
              { title: 'Bell MT (current)', value: 'bell-mt' },
              { title: 'Default (Montserrat / Lato)', value: 'default' },
            ],
            layout: 'radio',
          },
          initialValue: 'bell-mt',
        },
      ],
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

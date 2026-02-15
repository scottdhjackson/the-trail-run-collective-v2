import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'event',
  title: 'Event',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'Event Title',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'Slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'shortDescription',
      title: 'Short Description',
      type: 'text',
      rows: 2,
      validation: (Rule) => Rule.required().max(120),
    }),
    defineField({
      name: 'longDescription',
      title: 'Long Description',
      type: 'text',
      rows: 4,
      description: 'Detailed description shown in the "Read more" section on event cards',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'date',
      title: 'Event Date',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'heroImage',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'cardImage',
      title: 'Card Image Path',
      type: 'string',
      description: 'Path to card image, e.g., /images/shortest-day-header.png',
    }),
    defineField({
      name: 'distances',
      title: 'Distances',
      type: 'array',
      of: [{ type: 'distance' }],
      validation: (Rule) => Rule.required().min(1),
    }),
    defineField({
      name: 'isPublished',
      title: 'Published',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'comingSoon',
      title: 'Coming Soon',
      type: 'boolean',
      description: 'Enable this to show a "Coming Soon" badge and hide booking/info buttons',
      initialValue: false,
    }),
    defineField({
      name: 'kitList',
      title: 'Kit List',
      type: 'reference',
      to: [{ type: 'kitList' }],
      description: 'Optional: Link to a kit list for this event',
    }),
    defineField({
      name: 'showKitListInline',
      title: 'Show Kit List Inline',
      type: 'boolean',
      description: 'If enabled, the kit list will be displayed on the event page. If disabled, it will show as a link.',
      initialValue: false,
    }),
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'location',
      media: 'heroImage',
    },
  },
})

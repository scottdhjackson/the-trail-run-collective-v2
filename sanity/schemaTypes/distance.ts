import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'distance',
  title: 'Distance',
  type: 'object',
  fields: [
    defineField({
      name: 'label',
      title: 'Distance Label',
      type: 'string',
      description: 'e.g., 25k, 50k, 100k',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'stripePriceId',
      title: 'Stripe Price ID',
      type: 'string',
      description: 'The Stripe Price ID for this distance (e.g., price_xxx)',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'isOpen',
      title: 'Is Open for Registration',
      type: 'boolean',
      initialValue: true,
    }),
    defineField({
      name: 'sortOrder',
      title: 'Sort Order',
      type: 'number',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'distanceValue',
      title: 'Distance',
      type: 'number',
      description: 'The numeric distance value (e.g., 10, 25, 50)',
    }),
    defineField({
      name: 'distanceUnit',
      title: 'Distance Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Kilometres (km)', value: 'km' },
          { title: 'Miles (mi)', value: 'mi' },
        ],
        layout: 'radio',
      },
      initialValue: 'km',
    }),
    defineField({
      name: 'elevationGain',
      title: 'Elevation Gain',
      type: 'number',
      description: 'Total elevation gain (enter the value in whichever unit you select below)',
    }),
    defineField({
      name: 'elevationUnit',
      title: 'Elevation Display Unit',
      type: 'string',
      options: {
        list: [
          { title: 'Feet (ft)', value: 'ft' },
          { title: 'Metres (m)', value: 'm' },
        ],
        layout: 'radio',
      },
      initialValue: 'ft',
    }),
    defineField({
      name: 'price',
      title: 'Price',
      type: 'number',
      description: 'Price in GBP (e.g., 25 for £25)',
    }),
    defineField({
      name: 'description',
      title: 'Route Description',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'gpxFile',
      title: 'GPX File',
      type: 'file',
      description: 'Upload GPX file for route download',
    }),
    defineField({
      name: 'routeMapImage',
      title: 'Route Map Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
  preview: {
    select: {
      label: 'label',
      isOpen: 'isOpen',
    },
    prepare({ label, isOpen }) {
      return {
        title: label,
        subtitle: isOpen ? 'Open' : 'Closed',
      }
    },
  },
})

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

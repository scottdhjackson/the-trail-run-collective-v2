import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'subscriber',
  title: 'Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Subscribed At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      email: 'email',
      date: 'subscribedAt',
    },
    prepare({ email, date }) {
      return {
        title: email,
        subtitle: new Date(date).toLocaleDateString(),
      }
    },
  },
})

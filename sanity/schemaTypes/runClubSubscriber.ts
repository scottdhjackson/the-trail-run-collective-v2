import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'runClubSubscriber',
  title: 'Run Club Subscriber',
  type: 'document',
  fields: [
    defineField({
      name: 'firstName',
      title: 'First Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'lastName',
      title: 'Last Name',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'email',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'subscribedAt',
      title: 'Signed Up At',
      type: 'datetime',
      initialValue: () => new Date().toISOString(),
      readOnly: true,
    }),
  ],
  preview: {
    select: {
      firstName: 'firstName',
      lastName: 'lastName',
      email: 'email',
      date: 'subscribedAt',
    },
    prepare({ firstName, lastName, email, date }) {
      return {
        title: firstName && lastName ? `${firstName} ${lastName}` : email,
        subtitle: date ? new Date(date).toLocaleDateString() : '',
      }
    },
  },
})

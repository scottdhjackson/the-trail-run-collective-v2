import { defineType, defineField } from 'sanity'

export default defineType({
  name: 'volunteer',
  title: 'Volunteer',
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
      name: 'phone',
      title: 'Phone Number',
      type: 'string',
    }),
    defineField({
      name: 'availability',
      title: 'Availability',
      type: 'string',
      options: {
        list: [
          { title: 'Weekends only', value: 'weekends' },
          { title: 'Weekdays only', value: 'weekdays' },
          { title: 'Both weekdays and weekends', value: 'both' },
          { title: 'Flexible', value: 'flexible' },
        ],
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'roles',
      title: 'Roles Interested In',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: [
          { title: 'Course Marshal', value: 'marshal' },
          { title: 'Registration / Check-in', value: 'registration' },
          { title: 'Aid Station Support', value: 'aid_station' },
          { title: 'Sweep / Tail Runner', value: 'sweep' },
          { title: 'Photography', value: 'photography' },
          { title: 'First Aid (qualified)', value: 'first_aid' },
          { title: 'General Support', value: 'general' },
        ],
        layout: 'grid',
      },
    }),
    defineField({
      name: 'experience',
      title: 'Relevant Experience',
      type: 'text',
      rows: 4,
      description: 'Any previous volunteering, first aid qualifications, trail running experience, etc.',
    }),
    defineField({
      name: 'whyVolunteer',
      title: 'Why Do You Want to Volunteer?',
      type: 'text',
      rows: 4,
    }),
    defineField({
      name: 'emergencyContactName',
      title: 'Emergency Contact Name',
      type: 'string',
    }),
    defineField({
      name: 'emergencyContactPhone',
      title: 'Emergency Contact Phone',
      type: 'string',
    }),
    defineField({
      name: 'status',
      title: 'Application Status',
      type: 'string',
      options: {
        list: [
          { title: 'Pending Review', value: 'pending' },
          { title: 'Approved', value: 'approved' },
          { title: 'Declined', value: 'declined' },
        ],
        layout: 'radio',
      },
      initialValue: 'pending',
    }),
    defineField({
      name: 'submittedAt',
      title: 'Submitted At',
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
      status: 'status',
      date: 'submittedAt',
    },
    prepare({ firstName, lastName, email, status, date }) {
      const statusEmoji = status === 'approved' ? '✅' : status === 'declined' ? '❌' : '🕐'
      return {
        title: `${statusEmoji} ${firstName} ${lastName}`,
        subtitle: `${email} — ${new Date(date).toLocaleDateString()}`,
      }
    },
  },
})

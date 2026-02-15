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
    defineField({
      name: 'venueName',
      title: 'Venue Name',
      type: 'string',
    }),
    defineField({
      name: 'town',
      title: 'Town/City',
      type: 'string',
    }),
    defineField({
      name: 'county',
      title: 'County',
      type: 'string',
    }),
    defineField({
      name: 'postcode',
      title: 'Postcode',
      type: 'string',
    }),
    defineField({
      name: 'googleMapsLink',
      title: 'Google Maps Link',
      type: 'url',
    }),
    defineField({
      name: 'what3words',
      title: 'What3Words Address',
      type: 'string',
    }),
    defineField({
      name: 'locationImage',
      title: 'Location Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
    defineField({
      name: 'registrationOpens',
      title: 'Registration Opens',
      type: 'datetime',
    }),
    defineField({
      name: 'registrationCloses',
      title: 'Registration Closes',
      type: 'datetime',
    }),
    defineField({
      name: 'startTime',
      title: 'Start Time',
      type: 'string',
      description: 'e.g., "9:00 AM" or "Various start times"',
    }),
    defineField({
      name: 'difficultyDescription',
      title: 'Difficulty Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'showPartnerPromo',
      title: 'Show Partner Promo',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'partnerName',
      title: 'Partner Name',
      type: 'string',
    }),
    defineField({
      name: 'partnerLogo',
      title: 'Partner Logo',
      type: 'image',
    }),
    defineField({
      name: 'partnerDescription',
      title: 'Partner Description',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'partnerLink',
      title: 'Partner Link',
      type: 'url',
    }),
    defineField({
      name: 'whatYouGet',
      title: 'What You Get',
      type: 'array',
      of: [{ type: 'string' }],
      description: 'Features included in the event (e.g., Free parking, Fully marked course)',
    }),
    defineField({
      name: 'showPhotoGallery',
      title: 'Show Photo Gallery',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'galleryImages',
      title: 'Gallery Images',
      type: 'array',
      of: [{ type: 'image' }],
    }),
    defineField({
      name: 'galleryLink',
      title: 'Full Gallery Link',
      type: 'url',
      description: 'Link to full photo gallery',
    }),
    defineField({
      name: 'showReviews',
      title: 'Show Reviews',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'reviews',
      title: 'Reviews',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'name', title: 'Name', type: 'string' },
            { name: 'quote', title: 'Quote', type: 'text', rows: 3 },
            { name: 'rating', title: 'Rating', type: 'number', validation: (Rule) => Rule.min(1).max(5) },
          ],
        },
      ],
    }),
    defineField({
      name: 'showGettingThere',
      title: 'Show Getting There Section',
      type: 'boolean',
      initialValue: false,
    }),
    defineField({
      name: 'gettingThereByCar',
      title: 'Getting There - By Car',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'gettingThereByTrainStation',
      title: 'Nearest Train Station',
      type: 'string',
    }),
    defineField({
      name: 'gettingThereByTrainRoute',
      title: 'Train Route Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'gettingThereByTrainTime',
      title: 'Journey Time from Station',
      type: 'string',
    }),
    defineField({
      name: 'gettingThereByTaxiCompany',
      title: 'Taxi Company Name',
      type: 'string',
    }),
    defineField({
      name: 'gettingThereByTaxiPhone',
      title: 'Taxi Company Phone',
      type: 'string',
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

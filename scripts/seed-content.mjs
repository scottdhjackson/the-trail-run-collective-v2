import { createClient } from '@sanity/client'
import { config } from 'dotenv'

// Load .env.local
config({ path: '.env.local' })

const token = process.env.SANITY_API_TOKEN

// Debug: Check if token is loaded
console.log('Token loaded:', token ? `${token.substring(0, 10)}...` : 'NOT FOUND')
console.log('Token length:', token?.length || 0)

if (!token) {
  console.error('❌ SANITY_API_TOKEN not found in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: 'x0eosm5j',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function seedContent() {
  console.log('🌱 Seeding Sanity content...\n')

  // 1. Create Site Settings
  console.log('Creating Site Settings...')
  await client.createOrReplace({
    _id: 'siteSettings',
    _type: 'siteSettings',
    brandName: 'The Trail Run Collective',
    tagline: 'UK trail & ultra events — Solstice specials at Box Hill, Surrey',
    contactEmail: 'hello@trailruncollective.com',
    seoTitle: 'The Trail Run Collective',
    seoDescription: 'UK trail & ultra events — Solstice specials at Box Hill, Surrey',
    socialLinks: {
      instagram: 'https://instagram.com/trailruncollective',
      facebook: '',
      twitter: '',
    },
  })
  console.log('✓ Site Settings created\n')

  // 2. Create Event 1: The Shortest Night
  console.log('Creating Event: The Shortest Night...')
  await client.createOrReplace({
    _id: 'event-shortest-night',
    _type: 'event',
    title: 'The Shortest Night',
    slug: { _type: 'slug', current: 'the-shortest-night' },
    shortDescription: 'Summer solstice ultra at Box Hill',
    location: 'Box Hill, Surrey',
    date: new Date('2025-06-21T06:00:00Z').toISOString(),
    cardImage: '/images/shortest-night-header.png',
    isPublished: true,
    distances: [
      {
        _type: 'distance',
        label: '25k',
        stripePriceId: 'price_placeholder_25k_night',
        isOpen: true,
        sortOrder: 1,
      },
      {
        _type: 'distance',
        label: '50k',
        stripePriceId: 'price_placeholder_50k_night',
        isOpen: true,
        sortOrder: 2,
      },
      {
        _type: 'distance',
        label: '100k',
        stripePriceId: 'price_placeholder_100k_night',
        isOpen: true,
        sortOrder: 3,
      },
    ],
  })
  console.log('✓ The Shortest Night created\n')

  // 3. Create Event 2: The Shortest Day
  console.log('Creating Event: The Shortest Day...')
  await client.createOrReplace({
    _id: 'event-shortest-day',
    _type: 'event',
    title: 'The Shortest Day',
    slug: { _type: 'slug', current: 'the-shortest-day' },
    shortDescription: 'Winter solstice ultra at Box Hill',
    location: 'Box Hill, Surrey',
    date: new Date('2025-12-21T06:00:00Z').toISOString(),
    cardImage: '/images/shortest-day-header.png',
    isPublished: true,
    distances: [
      {
        _type: 'distance',
        label: '25k',
        stripePriceId: 'price_placeholder_25k_day',
        isOpen: true,
        sortOrder: 1,
      },
      {
        _type: 'distance',
        label: '50k',
        stripePriceId: 'price_placeholder_50k_day',
        isOpen: true,
        sortOrder: 2,
      },
      {
        _type: 'distance',
        label: '100k',
        stripePriceId: 'price_placeholder_100k_day',
        isOpen: true,
        sortOrder: 3,
      },
    ],
  })
  console.log('✓ The Shortest Day created\n')

  console.log('🎉 All content seeded successfully!')
  console.log('\nVisit http://localhost:3000 to see your events!')
}

seedContent().catch(console.error)

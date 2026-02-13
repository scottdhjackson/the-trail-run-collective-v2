import * as dotenv from 'dotenv'
import { createClient } from 'next-sanity'

// Load environment variables
dotenv.config({ path: '.env.local' })

// Create client with environment variables
const client = createClient({
  projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID!,
  dataset: process.env.NEXT_PUBLIC_SANITY_DATASET!,
  apiVersion: process.env.NEXT_PUBLIC_SANITY_API_VERSION || '2024-01-01',
  useCdn: false,
  token: process.env.SANITY_API_TOKEN,
})

const dummyFAQs = [
  {
    _type: 'faq',
    question: 'What distances do you offer?',
    answer: 'We offer a range of distances from 10 miles up to 50 miles (ultra distance). Each event has multiple distance options to suit different experience levels and goals.',
    category: 'general',
    sortOrder: 1,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'Are your events suitable for beginners?',
    answer: 'Absolutely! Our events are designed to be inclusive and welcoming to runners of all abilities. Whether you\'re tackling your first trail run or aiming for a personal best, you\'ll find great support and a friendly atmosphere.',
    category: 'general',
    sortOrder: 2,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'Where are your events held?',
    answer: 'Our events take place in beautiful locations across the UK, with our signature Solstice events held at Box Hill in Surrey. We carefully select scenic routes that showcase the best of British trail running.',
    category: 'events',
    sortOrder: 3,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'How do I register for an event?',
    answer: 'Simply browse our events on the homepage, click on the event you\'re interested in, select your distance, and complete the online registration form. You\'ll receive a confirmation email with all the details you need.',
    category: 'registration',
    sortOrder: 4,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'What is included in my entry fee?',
    answer: 'Your entry includes: fully marked routes, on-course support and hydration stations, medical support, race number, timing chip, and post-race refreshments. You\'ll also receive detailed race information and course maps before the event.',
    category: 'registration',
    sortOrder: 5,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'Can I transfer my entry to another person?',
    answer: 'Yes, entry transfers are possible up to 7 days before the event. Please contact us at info@thetrailruncollective.co.uk with both the original registrant\'s and new participant\'s details.',
    category: 'registration',
    sortOrder: 6,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'What should I bring on race day?',
    answer: 'Essential items include: appropriate trail running shoes, weather-appropriate clothing, your race number, hydration (though we provide stations), energy snacks, and a positive attitude! We recommend checking the specific event page for any additional requirements.',
    category: 'race-day',
    sortOrder: 7,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'Are the routes marked?',
    answer: 'Yes! All our routes are fully marked with clear signage, and we have marshals at key points to ensure you stay on course. We also provide GPX files in advance for those who like to use GPS watches.',
    category: 'race-day',
    sortOrder: 8,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'What if I need to drop out during the race?',
    answer: 'Your safety is our priority. If you need to withdraw, notify the nearest marshal or aid station. We have sweep runners to ensure no one is left behind, and transport will be arranged if needed.',
    category: 'race-day',
    sortOrder: 9,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'Do I need to train differently for trail running?',
    answer: 'Trail running involves varied terrain, elevation changes, and technical sections. We recommend including hill work, strength training, and practicing on similar terrain to your event. Start with shorter trail runs if you\'re new to off-road running.',
    category: 'training',
    sortOrder: 10,
    isPublished: true,
  },
  {
    _type: 'faq',
    question: 'How long does it take to prepare for an ultra?',
    answer: 'Training time varies by individual, but generally we recommend 12-16 weeks of structured training for your first ultra. This should include gradually building your long runs, back-to-back training days, and practicing nutrition strategies.',
    category: 'training',
    sortOrder: 11,
    isPublished: true,
  },
]

async function seedFAQs() {
  console.log('Starting to seed FAQs...')

  // Check if required env vars are present
  if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_PROJECT_ID')
  }
  if (!process.env.NEXT_PUBLIC_SANITY_DATASET) {
    throw new Error('Missing NEXT_PUBLIC_SANITY_DATASET')
  }
  if (!process.env.SANITY_API_TOKEN) {
    throw new Error('Missing SANITY_API_TOKEN')
  }

  try {
    for (const faq of dummyFAQs) {
      const result = await client.create(faq)
      console.log(`✅ Created FAQ: ${result.question}`)
    }

    console.log('\n🎉 All FAQs seeded successfully!')
  } catch (error) {
    console.error('❌ Error seeding FAQs:', error)
    process.exit(1)
  }
}

seedFAQs()

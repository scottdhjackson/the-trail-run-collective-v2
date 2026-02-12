import { createClient } from '@sanity/client'
import { config } from 'dotenv'
import readline from 'readline'

config({ path: '.env.local' })

const client = createClient({
  projectId: 'x0eosm5j',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
})

const question = (prompt) => new Promise((resolve) => rl.question(prompt, resolve))

async function addEvent() {
  console.log('📝 Add New Event\n')

  const title = await question('Event title: ')
  const slug = title.toLowerCase().replace(/\s+/g, '-').replace(/[^a-z0-9-]/g, '')
  const description = await question('Short description: ')
  const location = await question('Location: ')
  const dateStr = await question('Date (YYYY-MM-DD): ')

  console.log('\nAdd 3 distances (25k, 50k, 100k):')
  const price25k = await question('Stripe Price ID for 25k: ')
  const price50k = await question('Stripe Price ID for 50k: ')
  const price100k = await question('Stripe Price ID for 100k: ')

  const eventData = {
    _type: 'event',
    title,
    slug: { _type: 'slug', current: slug },
    shortDescription: description,
    location,
    date: new Date(dateStr + 'T06:00:00Z').toISOString(),
    isPublished: true,
    distances: [
      {
        _type: 'distance',
        label: '25k',
        stripePriceId: price25k,
        isOpen: true,
        sortOrder: 1,
      },
      {
        _type: 'distance',
        label: '50k',
        stripePriceId: price50k,
        isOpen: true,
        sortOrder: 2,
      },
      {
        _type: 'distance',
        label: '100k',
        stripePriceId: price100k,
        isOpen: true,
        sortOrder: 3,
      },
    ],
  }

  console.log('\nCreating event...')
  const result = await client.create(eventData)
  console.log('✅ Event created:', result._id)
  console.log('\nRefresh http://localhost:3000 to see it!')

  rl.close()
}

addEvent().catch((err) => {
  console.error('Error:', err)
  rl.close()
})

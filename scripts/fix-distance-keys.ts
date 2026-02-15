import { createClient } from '@sanity/client'
import { randomUUID } from 'crypto'

const client = createClient({
  projectId: 'x0eosm5j',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function fixDistanceKeys() {
  console.log('Fetching all events...')

  const events = await client.fetch(`*[_type == "event"] {
    _id,
    _rev,
    title,
    distances
  }`)

  console.log(`Found ${events.length} events`)

  for (const event of events) {
    if (!event.distances || event.distances.length === 0) {
      console.log(`Skipping ${event.title} - no distances`)
      continue
    }

    // Check if any distance is missing _key
    const needsUpdate = event.distances.some((d: any) => !d._key)

    if (!needsUpdate) {
      console.log(`✓ ${event.title} - already has keys`)
      continue
    }

    console.log(`Fixing ${event.title}...`)

    // Add _key to distances that don't have one
    const updatedDistances = event.distances.map((distance: any) => ({
      ...distance,
      _key: distance._key || randomUUID(),
    }))

    try {
      await client
        .patch(event._id)
        .set({ distances: updatedDistances })
        .commit()

      console.log(`✓ Fixed ${event.title}`)
    } catch (error) {
      console.error(`✗ Error fixing ${event.title}:`, error)
    }
  }

  console.log('\nDone!')
}

fixDistanceKeys().catch(console.error)

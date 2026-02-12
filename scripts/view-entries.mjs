import { createClient } from '@sanity/client'
import { config } from 'dotenv'

config({ path: '.env.local' })

const client = createClient({
  projectId: 'x0eosm5j',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token: process.env.SANITY_API_TOKEN,
  useCdn: false,
})

async function viewEntries() {
  console.log('🎟️ Event Registrations\n')

  const entries = await client.fetch(
    `*[_type == "entry"] | order(createdAt desc) {
      _id,
      email,
      distanceLabel,
      paymentStatus,
      createdAt,
      "eventTitle": event->title
    }`
  )

  if (entries.length === 0) {
    console.log('No registrations yet.')
    return
  }

  entries.forEach((entry, index) => {
    console.log(`\n${index + 1}. ${entry.email}`)
    console.log(`   Event: ${entry.eventTitle}`)
    console.log(`   Distance: ${entry.distanceLabel}`)
    console.log(`   Status: ${entry.paymentStatus}`)
    console.log(`   Date: ${new Date(entry.createdAt).toLocaleString()}`)
  })

  console.log(`\n✅ Total: ${entries.length} registration(s)`)
}

viewEntries().catch(console.error)

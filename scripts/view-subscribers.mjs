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

async function viewSubscribers() {
  console.log('📧 Newsletter Subscribers\n')

  const subscribers = await client.fetch(
    `*[_type == "subscriber"] | order(subscribedAt desc) {
      _id,
      email,
      subscribedAt
    }`
  )

  if (subscribers.length === 0) {
    console.log('No subscribers yet.')
    return
  }

  subscribers.forEach((sub, index) => {
    console.log(`${index + 1}. ${sub.email}`)
    console.log(`   Subscribed: ${new Date(sub.subscribedAt).toLocaleString()}`)
  })

  console.log(`\n✅ Total: ${subscribers.length} subscriber(s)`)
}

viewSubscribers().catch(console.error)

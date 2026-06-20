import { createClient } from '@sanity/client'
import { config } from 'dotenv'

config({ path: '.env.local' })

const token = process.env.SANITY_API_TOKEN
if (!token) {
  console.error('SANITY_API_TOKEN not found in .env.local')
  process.exit(1)
}

const client = createClient({
  projectId: 'x0eosm5j',
  dataset: 'production',
  apiVersion: '2024-01-01',
  token,
  useCdn: false,
})

async function run() {
  const doc = await client.fetch('*[_id == "page-about"][0]{_id, excerpt}')
  if (!doc) {
    console.log('page-about document not found — nothing to do.')
    return
  }
  if (doc.excerpt) {
    console.log('Excerpt already set — leaving it untouched.')
    return
  }

  await client
    .patch('page-about')
    .set({
      excerpt:
        'What began as weekend adventures between two school friends grew into a vision: trail running events with personality, purpose, and a little creative twist.',
    })
    .commit()

  console.log('Set homepage excerpt on page-about.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

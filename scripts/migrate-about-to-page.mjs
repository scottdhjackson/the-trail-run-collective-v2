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
  const existingPage = await client.fetch('*[_type == "page" && slug.current == "about"][0]')
  if (existingPage) {
    console.log('A "page" document with slug "about" already exists — nothing to migrate.')
    return
  }

  const oldAboutPage = await client.fetch('*[_id == "aboutPage"][0]')
  if (!oldAboutPage) {
    console.log('No legacy aboutPage document found — nothing to migrate.')
    return
  }

  await client.createOrReplace({
    _id: 'page-about',
    _type: 'page',
    title: oldAboutPage.heading,
    slug: { _type: 'slug', current: 'about' },
    body: oldAboutPage.body,
    ctaLabel: oldAboutPage.ctaLabel,
    ctaUrl: oldAboutPage.ctaUrl,
    seoTitle: oldAboutPage.seoTitle,
    seoDescription: oldAboutPage.seoDescription,
  })

  await client.delete('aboutPage')

  console.log('Migrated aboutPage -> page (slug: about) and removed the old document.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

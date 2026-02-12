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

async function viewEnquiries() {
  console.log('📧 Contact Form Submissions\n')

  const enquiries = await client.fetch(
    `*[_type == "enquiry"] | order(submittedAt desc) {
      _id,
      name,
      email,
      message,
      submittedAt
    }`
  )

  if (enquiries.length === 0) {
    console.log('No enquiries yet.')
    return
  }

  enquiries.forEach((enquiry, index) => {
    console.log(`\n${index + 1}. ${enquiry.name} (${enquiry.email})`)
    console.log(`   Date: ${new Date(enquiry.submittedAt).toLocaleString()}`)
    console.log(`   Message: ${enquiry.message}`)
    console.log('   ' + '-'.repeat(60))
  })

  console.log(`\n✅ Total: ${enquiries.length} submission(s)`)
}

viewEnquiries().catch(console.error)

import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const client = createClient({
  projectId: 'x0eosm5j',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function checkEvent() {
  const event = await client.fetch(`*[_type == "event" && title match "Scott*"][0]{
    title,
    venueName,
    town,
    county,
    postcode,
    startTime,
    difficultyDescription,
    distances[]{
      label,
      distanceKm,
      elevationGain,
      price
    },
    whatYouGet,
    reviews,
    showReviews,
    showGettingThere,
    gettingThereByCar
  }`)

  console.log(JSON.stringify(event, null, 2))
}

checkEvent()

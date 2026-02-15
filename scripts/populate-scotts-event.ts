import { createClient } from '@sanity/client'
import * as dotenv from 'dotenv'

// Load environment variables
dotenv.config({ path: '.env.local' })

if (!process.env.SANITY_API_TOKEN) {
  console.error('ERROR: SANITY_API_TOKEN not found in .env.local')
  console.log('Please add SANITY_API_TOKEN=your_token_here to .env.local')
  process.exit(1)
}

console.log('✓ API token loaded')

const client = createClient({
  projectId: 'x0eosm5j',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

async function populateScottsEvent() {
  console.log('Finding "Scott\'s a ledge" event...')

  const event = await client.fetch(`*[_type == "event" && title match "Scott*"][0]{ _id, title, distances }`)

  if (!event) {
    console.error('Event not found!')
    return
  }

  console.log(`Found event: ${event.title} (${event._id})`)
  console.log('Updating with dummy data...')

  // Update distances with detailed info
  const updatedDistances = event.distances?.map((distance: any, index: number) => {
    const distances = [25, 50, 100]
    const elevations = [800, 1600, 3200]
    const prices = [35, 50, 75]

    return {
      ...distance,
      distanceKm: distances[index] || 25,
      elevationGain: elevations[index] || 800,
      price: prices[index] || 35,
      description: `A challenging ${distances[index]}km route through stunning countryside with ${elevations[index]}m of elevation gain. Perfect for ${index === 0 ? 'first-timers' : index === 1 ? 'intermediate' : 'experienced'} ultra runners.`,
    }
  }) || []

  const updates = {
    // Location details
    venueName: 'Box Hill National Trust Car Park',
    town: 'Dorking',
    county: 'Surrey',
    postcode: 'RH5 6BY',
    googleMapsLink: 'https://maps.google.com/?q=Box+Hill+Surrey',
    what3words: 'handed.dine.puzzle',

    // Event details
    registrationOpens: '2025-03-01T09:00:00Z',
    registrationCloses: '2025-05-15T23:59:00Z',
    startTime: '7:00 AM',
    difficultyDescription: 'This is a challenging trail ultra with significant elevation gain on technical terrain. Expect muddy conditions, steep climbs, and exposed sections. Suitable for runners with trail experience.',

    // Updated distances
    distances: updatedDistances,

    // Partner promo
    showPartnerPromo: true,
    partnerName: 'Salomon Running',
    partnerDescription: 'Official footwear partner of The Trail Run Collective. Get 15% off trail running shoes with your race entry.',
    partnerLink: 'https://www.salomon.com',

    // What you get
    whatYouGet: [
      'Free parking',
      'Fully marked course',
      'Outposts',
      'Fully timed',
      'Online results',
      'Event photography',
      'Food & drink',
      'Bag drop',
      'Medal',
    ],

    // Photo gallery
    showPhotoGallery: true,
    galleryLink: 'https://photos.example.com/scotts-a-ledge',

    // Reviews
    showReviews: true,
    reviews: [
      {
        _key: 'review-1',
        name: 'Sarah Thompson',
        quote: 'Absolutely brilliant event! The course was challenging but the scenery made every climb worth it. Amazing organization and support throughout.',
        rating: 5,
      },
      {
        _key: 'review-2',
        name: 'Mike Davies',
        quote: 'Tough but fair course. Aid stations were well stocked and the marshals were fantastic. Will definitely be back next year!',
        rating: 5,
      },
      {
        _key: 'review-3',
        name: 'Emma Wilson',
        quote: 'My first ultra and what an experience! The atmosphere was incredible and everyone was so supportive. Highly recommend.',
        rating: 5,
      },
      {
        _key: 'review-4',
        name: 'James Chen',
        quote: 'Great value for money. Course is well marked, aid stations plentiful, and the medal at the finish is gorgeous. One of the best trail ultras in the UK.',
        rating: 5,
      },
    ],

    // Getting there
    showGettingThere: true,
    gettingThereByCar: 'From London: Take the M25 to Junction 9, then follow A24 south towards Dorking. Take the Burford Bridge exit and follow signs to Box Hill. Free parking available at the National Trust car park.',
    gettingThereByTrainStation: 'Box Hill & Westhumble Station',
    gettingThereByTrainRoute: 'Direct trains from London Victoria and London Waterloo. The station is a 10-minute walk from the start line.',
    gettingThereByTrainTime: '10 minutes walk',
    gettingThereByTaxiCompany: 'Dorking Taxis',
    gettingThereByTaxiPhone: '01306 888 666',
  }

  try {
    await client.patch(event._id).set(updates).commit()
    console.log('✓ Event updated successfully!')
    console.log('\nUpdated fields:')
    console.log('- Location details (venue, town, postcode, maps)')
    console.log('- Distance details (km, elevation, price, descriptions)')
    console.log('- Registration dates and start time')
    console.log('- Difficulty description')
    console.log('- Partner promo (Salomon)')
    console.log('- What you get (9 features)')
    console.log('- Photo gallery enabled')
    console.log('- 4 customer reviews')
    console.log('- Getting there info (car, train, taxi)')
    console.log('\nView the event at: /events/' + event.title.toLowerCase().replace(/[^a-z0-9]+/g, '-'))
  } catch (error) {
    console.error('Error updating event:', error)
  }
}

populateScottsEvent()

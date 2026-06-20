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

const body = [
  'The Trail Run Collective was founded by two school friends united by a shared love of running — and an even deeper passion for the trails. What began as weekend adventures quickly grew into a vision: to create trail running events that feel different. Events with personality, purpose, and a little creative twist.',
  'Our mission is simple. We design trail races built around interesting concepts and formats, across a range of distances and difficulties, that maximise both fun and challenge. Whether you\'re chasing your first trail experience or pushing deeper into endurance territory, we want every event to feel memorable, rewarding, and worth talking about long after the finish line.',
  'Alongside this mission, we have two important side quests.',
  'First, we want to encourage as many runners as possible to make the transition from road to trail. We truly believe that trail running is where the sport is enjoyed at its purest — immersed in nature, free from pace pressure, and driven by exploration.',
  'Second, we aim to create formats that help runners take the leap into ultramarathon distance without intimidation. Ultras shouldn\'t feel unreachable — and with the right structure, support, and atmosphere, that sense of achievement becomes one of the most powerful experiences in running.',
  'Community sits at the heart of everything we do. As we create and host events, our focus will always be on building experiences that feel welcoming, inclusive, and genuinely fun — the kind you want to tell your mates about and return to year after year.',
  'And while personality is central to our events, experience backs it up. Between us, we\'ve participated in races across distances and terrains ranging from 5K Parkruns to ultramarathons in the mountains of New Zealand. This breadth of experience gives us a deep understanding of what makes events great — from atmosphere and organisation to course design and runner support. Expect plenty of personality from us, and we\'ll expect plenty of grit from you.',
  'Now for the important bits. Safety and wellbeing always come first (alongside the fun). We are fully insured, certified trail event hosts, with medical personnel, marshals, route mapping and GPX guidance, information points, and well-stocked aid stations all in place to keep runners happy, healthy, hydrated, fuelled, and moving forward.',
  'And of course, every effort deserves recognition. All finishers earn a medal to mark their achievement — with race apparel coming soon to help you wear the journey with pride.',
  'Ultimately, what makes our events stand out is the blend of thoughtful design, creative formats, supportive structure, and community energy. We don\'t just put on races — we create experiences that challenge limits, spark curiosity, and keep runners coming back for more.',
].join('\n\n')

async function run() {
  const existing = await client.fetch('*[_id == "aboutPage"][0]')
  if (existing) {
    console.log('aboutPage document already exists — leaving it untouched.')
    return
  }

  await client.createOrReplace({
    _id: 'aboutPage',
    _type: 'aboutPage',
    heading: 'About The Trail Run Collective',
    body,
    ctaLabel: 'View Our Events',
    ctaUrl: '/#events',
    seoTitle: 'About Us — The Trail Run Collective',
    seoDescription: 'UK trail & ultra events — Solstice specials at Box Hill, Surrey',
  })

  console.log('Created aboutPage document with the existing About page copy.')
}

run().catch((err) => {
  console.error(err)
  process.exit(1)
})

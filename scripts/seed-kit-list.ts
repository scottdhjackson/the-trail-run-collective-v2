import { createClient } from '@sanity/client'

const client = createClient({
  projectId: 'x0eosm5j',
  dataset: 'production',
  token: process.env.SANITY_API_TOKEN,
  apiVersion: '2024-01-01',
  useCdn: false,
})

const kitListData = {
  _type: 'kitList',
  title: 'Required Equipment',
  slug: {
    _type: 'slug',
    current: 'required-equipment',
  },
  requiredEquipment: [
    { _key: 'item-1', item: 'Trail running shoes suitable for muddy and technical off-road terrain' },
    { _key: 'item-2', item: 'Waterproof jacket with taped seams (hooded, suitable for sustained rain)' },
    { _key: 'item-3', item: 'Waterproof trousers' },
    { _key: 'item-4', item: 'Long-sleeve base layer' },
    { _key: 'item-5', item: 'Hat or buff' },
    { _key: 'item-6', item: 'Gloves' },
    { _key: 'item-7', item: 'Spare warm layer (fleece, insulated gilet, or equivalent)' },
    { _key: 'item-8', item: 'Headtorch' },
    { _key: 'item-9', item: 'Mobile phone (fully charged, emergency contact number saved)' },
    { _key: 'item-10', item: 'Whistle' },
    { _key: 'item-11', item: 'Foil survival blanket or bivvy bag' },
    { _key: 'item-12', item: 'Minimum 1 litre fluid capacity' },
    { _key: 'item-13', item: 'Nutrition sufficient for one full loop (approx. 10 miles / 2400 ft elevation)' },
  ],
  importantNotes: [
    { _key: 'note-1', note: 'All kit must be carried on every loop.' },
    { _key: 'note-2', note: 'Waterproofs must be genuine waterproof garments, not windproof shells.' },
    { _key: 'note-3', note: 'Additional kit may be required depending on forecast weather conditions.' },
    { _key: 'note-4', note: 'Failure to carry mandatory kit may result in time penalties or disqualification.' },
  ],
  footerText: `The Shortest Day is delivered in accordance with the principles and good practice of UK Athletics and licensed via the Trail Running Association.

These requirements reflect established UK trail running safety standards for winter conditions.`,
  isPublished: true,
}

async function seedKitList() {
  try {
    console.log('Creating kit list...')
    const result = await client.create(kitListData)
    console.log('✓ Kit list created successfully!')
    console.log(`  ID: ${result._id}`)
    console.log(`  View at: https://the-trail-run-collective.sanity.studio/structure/kitList;${result._id}`)
    console.log(`  Public URL: /kit-list/required-equipment`)
  } catch (error) {
    console.error('Error creating kit list:', error)
  }
}

seedKitList()

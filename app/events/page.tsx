import { client } from '@/sanity/lib/client'
import { EVENTS_QUERY } from '@/sanity/lib/queries'
import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { Footer } from '@/components/Footer'
import { EventsPageClient } from '@/components/EventsPageClient'

export const revalidate = 60

export const metadata = {
  title: 'Events | The Trail Run Collective',
  description: 'Browse all upcoming trail and ultra running events from The Trail Run Collective.',
}

export default async function EventsPage() {
  const events = await client.fetch(EVENTS_QUERY)

  return (
    <>
      <HeaderWithSettings />
      <main className="min-h-screen pt-16" style={{ backgroundColor: '#F2EDE3' }}>

        {/* Page header */}
        <section className="container mx-auto px-6 pt-16 pb-12 max-w-6xl">
          <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-4" style={{ color: '#6B6558' }}>
            Race Calendar
          </p>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <h1 className="font-heading font-black uppercase leading-none tracking-tight text-5xl md:text-6xl lg:text-7xl mb-6" style={{ color: '#0C0F1E' }}>
                Events
              </h1>
              <p className="text-base max-w-xl" style={{ color: '#6B6558' }}>
                Challenge yourself on beautiful trails across the UK. Our events are fully marked and supported for runners of all abilities.
              </p>
            </div>
          </div>
        </section>

        {/* Events grid + filters */}
        <section className="container mx-auto px-6 pb-20 max-w-6xl">
          <EventsPageClient events={events} />
        </section>

      </main>
      <Footer />
    </>
  )
}

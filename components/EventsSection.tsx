import { EventCard } from './EventCard'

type Distance = {
  label: string
  stripePriceId: string
  isOpen: boolean
  sortOrder: number
}

type Event = {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  longDescription?: string
  location: string
  date: string
  cardImage?: string
  heroImageUrl?: string
  distances: Distance[]
  comingSoon?: boolean
}

type EventsSectionProps = {
  events: Event[]
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="events" className="py-24" style={{ backgroundColor: 'var(--brand-cream, #E8E3D7)' }}>
      <div className="container mx-auto px-6">
        {/* Section header */}
        <div className="flex flex-col md:flex-row md:items-end md:justify-between mb-14">
          <div>
            <p className="text-xs font-semibold tracking-[0.25em] uppercase mb-3" style={{ color: '#2D5C26' }}>
              Race Calendar
            </p>
            <h2 className="font-heading font-black uppercase text-5xl md:text-6xl lg:text-7xl leading-none tracking-tight" style={{ color: '#0C0F1E' }}>
              Upcoming<br />Expeditions
            </h2>
            <p className="mt-5 text-base max-w-xl" style={{ color: '#6B6558' }}>
              Challenge yourself on beautiful trails across the UK. Our events are fully marked and supported for runners of all abilities.
            </p>
          </div>
          <a
            href="/events"
            className="mt-6 md:mt-0 shrink-0 inline-flex items-center gap-2 px-6 py-3 rounded-full border text-sm font-semibold tracking-wide transition-all hover:bg-black/5"
            style={{ borderColor: '#0C0F1E', color: '#0C0F1E' }}
          >
            View All Events →
          </a>
        </div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              slug={event.slug.current}
              shortDescription={event.shortDescription}
              longDescription={event.longDescription}
              location={event.location}
              date={event.date}
              cardImage={event.cardImage}
              heroImageUrl={event.heroImageUrl}
              distances={event.distances.sort((a, b) => a.sortOrder - b.sortOrder)}
              comingSoon={event.comingSoon}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

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
  location: string
  date: string
  cardImage?: string
  distances: Distance[]
}

type EventsSectionProps = {
  events: Event[]
}

export function EventsSection({ events }: EventsSectionProps) {
  return (
    <section id="events" className="py-24 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold tracking-tight mb-4">Events</h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Solstice celebrations at Box Hill, Surrey
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {events.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              slug={event.slug.current}
              shortDescription={event.shortDescription}
              location={event.location}
              date={event.date}
              cardImage={event.cardImage}
              distances={event.distances.sort((a, b) => a.sortOrder - b.sortOrder)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

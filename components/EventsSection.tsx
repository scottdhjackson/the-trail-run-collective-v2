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
          <h3 className="text-2xl font-semibold mb-4">Challenge yourself - your way</h3>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto mb-4">
            The Trail Run Collective hosts memorable trail and ultra running events designed for runners of all abilities. Whether you're aiming for your first ultra, chasing a personal best, or simply want to explore beautiful trails with great support, we've got an event for you.
          </p>
          <p className="text-lg text-muted-foreground max-w-4xl mx-auto">
            Our courses are fully marked and supported so you can run, jog, hike - whatever your goal.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
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
              distances={event.distances.sort((a, b) => a.sortOrder - b.sortOrder)}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

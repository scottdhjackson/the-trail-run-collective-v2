'use client'

import { useState } from 'react'
import { EventCard } from '@/components/EventCard'
import { SlidersHorizontal } from 'lucide-react'

type Distance = {
  label: string
  stripePriceId: string
  isOpen: boolean
  sortOrder: number
  price?: number
}

type Event = {
  _id: string
  title: string
  slug: { current: string }
  shortDescription: string
  longDescription?: string
  location: string
  date: string
  heroImageUrl?: string
  cardImage?: string
  distances: Distance[]
  comingSoon?: boolean
}

const FILTERS = ['ALL', 'OPEN', 'COMING SOON', 'SOLD OUT'] as const
type Filter = typeof FILTERS[number]

export function EventsPageClient({ events }: { events: Event[] }) {
  const [activeFilter, setActiveFilter] = useState<Filter>('ALL')

  const filtered = events.filter((event) => {
    if (activeFilter === 'ALL') return true
    if (activeFilter === 'COMING SOON') return event.comingSoon
    if (activeFilter === 'OPEN') return !event.comingSoon && event.distances.some((d) => d.isOpen)
    if (activeFilter === 'SOLD OUT') return !event.comingSoon && event.distances.every((d) => !d.isOpen)
    return true
  })

  return (
    <>
      {/* Filter bar */}
      <div className="flex items-center justify-end gap-3 mb-10">
        <span className="flex items-center gap-1.5 text-xs font-semibold tracking-widest uppercase" style={{ color: '#6B6558' }}>
          <SlidersHorizontal size={13} /> Filter by type
        </span>
        <div className="flex items-center gap-2">
          {FILTERS.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className="px-4 py-2 rounded-full text-xs font-semibold tracking-wide uppercase transition-all"
              style={
                activeFilter === f
                  ? { backgroundColor: '#2D5C26', color: '#ffffff' }
                  : { backgroundColor: '#ffffff', color: '#0C0F1E', border: '1px solid #0C0F1E20' }
              }
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Grid */}
      {filtered.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((event) => (
            <EventCard
              key={event._id}
              title={event.title}
              slug={event.slug.current}
              shortDescription={event.shortDescription}
              longDescription={event.longDescription}
              location={event.location}
              date={event.date}
              heroImageUrl={event.heroImageUrl}
              cardImage={event.cardImage}
              distances={event.distances}
              comingSoon={event.comingSoon}
            />
          ))}
        </div>
      ) : (
        <p className="text-center py-20 text-sm" style={{ color: '#6B6558' }}>
          No events match this filter.
        </p>
      )}
    </>
  )
}

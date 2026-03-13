import Image from 'next/image'
import Link from 'next/link'
import { CalendarDays, MapPin } from 'lucide-react'

type EventHeroProps = {
  title: string
  date: string
  location: string
  heroImageUrl?: string
  slug: string
  distanceLabel?: string
  difficultyDescription?: string
}

export function EventHero({ title, date, location, heroImageUrl, distanceLabel, difficultyDescription }: EventHeroProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase()

  // Derive a short difficulty label from the description
  const difficultyLabel = difficultyDescription
    ? difficultyDescription.split(' ').slice(0, 2).join(' ').toUpperCase()
    : null

  return (
    <header className="relative h-[70vh] min-h-[500px] flex items-end overflow-hidden">
      {heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt={title}
          fill
          className="object-cover"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-gray-700 to-gray-900" />
      )}

      {/* Dark gradient overlay — stronger at bottom */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-black/10" />

      {/* Content — bottom-left */}
      <div className="relative z-10 w-full container mx-auto px-6 pb-10 md:pb-14">
        {/* Back link */}
        <Link
          href="/#events"
          className="inline-flex items-center gap-2 text-white/70 text-xs font-semibold tracking-widest uppercase hover:text-white transition-colors mb-5"
        >
          ← Back to Calendar
        </Link>

        {/* Badges */}
        <div className="flex items-center gap-2 mb-4">
          {distanceLabel && (
            <span className="px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase text-white" style={{ backgroundColor: '#2D5C26' }}>
              {distanceLabel}
            </span>
          )}
          {difficultyLabel && (
            <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-white/20 text-white backdrop-blur-sm">
              {difficultyLabel}
            </span>
          )}
        </div>

        {/* Title */}
        <h1 className="font-heading font-black uppercase text-white leading-none tracking-tight mb-5 text-5xl md:text-7xl lg:text-8xl">
          {title}
        </h1>

        {/* Date + Location */}
        <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-white/80 text-sm font-medium">
          <span className="flex items-center gap-2">
            <CalendarDays size={14} className="opacity-70" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={14} className="opacity-70" />
            {location}
          </span>
        </div>
      </div>
    </header>
  )
}

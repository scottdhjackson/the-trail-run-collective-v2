'use client'

import { ArrowRight, Calendar, MapPin } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Distance = {
  label: string
  stripePriceId: string
  isOpen: boolean
  sortOrder: number
  price?: number
}

type EventCardProps = {
  title: string
  slug: string
  shortDescription: string
  longDescription?: string
  location: string
  date: string
  cardImage?: string
  heroImageUrl?: string
  distances: Distance[]
  comingSoon?: boolean
}

function getStatus(distances: Distance[], comingSoon?: boolean): { label: string; bg: string; text: string } {
  if (comingSoon) return { label: 'Coming Soon', bg: '#F5C518', text: '#000000' }
  const openCount = distances.filter((d) => d.isOpen).length
  if (openCount === 0) return { label: 'Sold Out', bg: '#1a1a1a', text: '#ffffff' }
  if (openCount === 1 && distances.length > 1) return { label: 'Filling Fast', bg: '#ffffff', text: '#0C0F1E' }
  return { label: 'Open', bg: '#ffffff', text: '#0C0F1E' }
}

export function EventCard({
  title,
  slug,
  shortDescription,
  longDescription,
  location,
  date,
  cardImage,
  heroImageUrl,
  distances,
  comingSoon,
}: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  const displayImage = heroImageUrl || cardImage
  const prices = distances.map((d) => d.price).filter((p): p is number => p != null)
  const lowestPrice = prices.length > 0 ? `From £${Math.min(...prices)}` : null
  const status = getStatus(distances, comingSoon)
  const primaryDistance = distances[0]?.label?.toUpperCase()

  const textPreview = longDescription
    ? longDescription.split(' ').slice(0, 22).join(' ') + '...'
    : shortDescription

  return (
    <div className="bg-white rounded-2xl overflow-hidden flex flex-col shadow-sm hover:shadow-lg transition-shadow duration-300">
      {/* Image */}
      <div className="relative h-56 w-full shrink-0">
        {displayImage ? (
          <Image src={displayImage} alt={title} fill className="object-cover" />
        ) : (
          <div className="w-full h-full" style={{ background: 'linear-gradient(135deg, #2D5C26 0%, #0C0F1E 100%)' }} />
        )}

        {/* Status badge — top right */}
        <div className="absolute top-3 right-3">
          <span
            className="px-3 py-1 rounded-full text-xs font-semibold tracking-wide shadow-sm"
            style={{ backgroundColor: status.bg, color: status.text }}
          >
            {status.label}
          </span>
        </div>

        {/* Distance badge — bottom left */}
        {primaryDistance && (
          <div className="absolute bottom-3 left-3">
            <span
              className="px-2.5 py-1 rounded text-xs font-bold tracking-wider"
              style={{ backgroundColor: '#2D5C26', color: '#ffffff' }}
            >
              {primaryDistance}
            </span>
          </div>
        )}
      </div>

      {/* Card body */}
      <div className="p-5 flex flex-col flex-1 gap-3">
        {/* Title + price */}
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-heading font-bold text-lg leading-snug" style={{ color: '#0C0F1E' }}>
            {title}
          </h3>
          {lowestPrice && (
            <span className="shrink-0 text-sm font-semibold" style={{ color: '#0C0F1E' }}>
              {lowestPrice}
            </span>
          )}
        </div>

        {/* Meta */}
        <div className="flex flex-col gap-1.5 text-sm" style={{ color: '#6B6558' }}>
          <span className="flex items-center gap-2">
            <Calendar size={13} className="shrink-0" />
            {formattedDate}
          </span>
          <span className="flex items-center gap-2">
            <MapPin size={13} className="shrink-0" />
            <span style={{ color: '#2D5C26' }}>{location}</span>
          </span>
        </div>

        {/* Distance pills */}
        {distances.length > 1 && (
          <div className="flex flex-wrap gap-1.5">
            {distances.map((d) => (
              <span
                key={d.label}
                className="px-2.5 py-1 rounded-full text-xs font-semibold border"
                style={{ borderColor: '#0C0F1E', color: '#0C0F1E' }}
              >
                {d.label}
              </span>
            ))}
          </div>
        )}

        {/* Description */}
        <p className="text-sm leading-relaxed flex-1" style={{ color: '#6B6558' }}>
          {isExpanded ? longDescription || shortDescription : textPreview}
        </p>

        {longDescription && (
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="text-xs font-semibold self-start underline hover:opacity-70 transition-opacity"
            style={{ color: '#2D5C26' }}
          >
            {isExpanded ? 'Read less' : 'Read more'}
          </button>
        )}

        {/* Buttons */}
        {!comingSoon && (
          <div className="flex gap-2 pt-1">
            <Link
              href={`/events/${slug}`}
              className="flex-1 text-center py-2.5 text-xs font-bold tracking-widest uppercase border rounded-lg transition-all hover:bg-black/5"
              style={{ borderColor: '#0C0F1E', color: '#0C0F1E' }}
            >
              View Details
            </Link>
            <Link
              href={`/book/${slug}`}
              className="flex-1 text-center py-2.5 text-xs font-bold tracking-widest uppercase rounded-lg transition-all hover:opacity-90 flex items-center justify-center gap-1"
              style={{ backgroundColor: '#2D5C26', color: '#ffffff' }}
            >
              Book <ArrowRight size={12} />
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}

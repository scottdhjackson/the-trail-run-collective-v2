'use client'

import { Button } from '@/components/ui/button'
import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

type Distance = {
  label: string
  stripePriceId: string
  isOpen: boolean
  sortOrder: number
}

type EventCardProps = {
  title: string
  slug: string
  shortDescription: string
  longDescription?: string
  location: string
  date: string
  cardImage?: string
  distances: Distance[]
}

export function EventCard({ title, slug, shortDescription, longDescription, location, date, cardImage, distances }: EventCardProps) {
  const [isExpanded, setIsExpanded] = useState(false)

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  }).toUpperCase()

  // Extract location region (e.g., "Box Hill, Surrey" -> "SURREY")
  const locationRegion = location.split(',').pop()?.trim().toUpperCase() || location.toUpperCase()

  // Find lowest price from distances (placeholder for now)
  const lowestPrice = '£25' // You can calculate this from actual Stripe prices later

  return (
    <>
      <div className="overflow-hidden bg-gray-900 rounded-lg hover:shadow-2xl transition-shadow">
        {/* Header Image with Overlays */}
        <div className="relative h-64 w-full">
          {cardImage ? (
            <Image
              src={cardImage}
              alt={title}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-blue-600 to-blue-800" />
          )}

          {/* Location Label - Top Left */}
          <div className="absolute top-4 left-4">
            <div className="bg-black/70 px-3 py-1 text-white text-sm font-bold tracking-wider">
              {locationRegion}
            </div>
          </div>

          {/* Date - Top Right */}
          <div className="absolute top-4 right-4">
            <div className="bg-black/70 px-3 py-1 text-white text-sm font-bold tracking-wider">
              {formattedDate}
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="p-6 space-y-4">
          {/* Title */}
          <h3 className="text-2xl font-bold text-white">
            {title}
          </h3>

          {/* Date and subtitle */}
          <p className="text-gray-300 text-sm">
            📅 {formattedDate} • {shortDescription}
          </p>

          {/* Expandable Description */}
          {longDescription && (
            <>
              {isExpanded && (
                <div className="text-gray-300 text-sm space-y-2 pt-2 border-t border-gray-700">
                  <p>{longDescription}</p>
                </div>
              )}

              <button
                onClick={() => setIsExpanded(!isExpanded)}
                className="text-white text-sm underline hover:text-gray-300"
              >
                {isExpanded ? 'Read less' : 'Read more'}
              </button>
            </>
          )}

          {/* Distances */}
          <div className="flex items-center gap-3 flex-wrap">
            <span className="text-gray-400 text-sm font-semibold tracking-wider">
              DISTANCES:
            </span>
            {distances.map((distance) => (
              <span
                key={distance.label}
                className="border border-white text-white px-3 py-1 text-sm font-bold"
              >
                {distance.label.toUpperCase()}
              </span>
            ))}
          </div>

          {/* Price */}
          <div className="text-white text-lg font-bold">
            FROM {lowestPrice}
          </div>

          {/* Buttons */}
          <div className="flex gap-3 pt-2">
            <Button
              asChild
              className="flex-1 bg-white text-black hover:bg-gray-200 font-bold"
              size="lg"
            >
              <Link href={`/register/${slug}`}>BOOK</Link>
            </Button>
            <Button
              className="border-2 border-white bg-transparent text-white hover:bg-white hover:text-black font-bold"
              size="lg"
            >
              INFO <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}

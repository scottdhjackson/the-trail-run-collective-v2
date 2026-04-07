'use client'

import Link from 'next/link'
import { Share2, Heart, Info } from 'lucide-react'

type Distance = {
  _key: string
  label: string
  distanceValue?: number
  distanceUnit?: string
  elevationGain?: number
  elevationUnit?: string
  price?: number
  isOpen: boolean
}

type EventRegistrationCardProps = {
  distance: Distance
  eventSlug: string
  bookingLink?: string
  comingSoon?: boolean
}

export function EventRegistrationCard({ distance, eventSlug, bookingLink, comingSoon }: EventRegistrationCardProps) {
  const bookHref = bookingLink ?? `/book/${eventSlug}`
  const isExternal = !!bookingLink

  const statusLabel = comingSoon
    ? 'Coming Soon'
    : distance.isOpen
    ? 'Open'
    : 'Closed'

  const statusColor = comingSoon
    ? 'text-amber-600'
    : distance.isOpen
    ? 'text-[#2D5C26] font-bold'
    : 'text-red-600 font-bold'

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({ title: document.title, url: window.location.href })
    } else {
      navigator.clipboard.writeText(window.location.href)
    }
  }

  return (
    <div className="bg-white rounded-2xl shadow-sm p-6 space-y-4">
      {/* Price row */}
      <div className="flex items-center justify-between">
        <span className="text-xs font-semibold tracking-widest uppercase text-gray-400">Registration</span>
        {distance.price ? (
          <span className="text-2xl font-black text-gray-900">£{distance.price}</span>
        ) : (
          <span className="text-sm text-gray-400">TBC</span>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Stats */}
      <div className="space-y-3 text-sm">
        <div className="flex justify-between items-center">
          <span className="text-gray-500">Status</span>
          <span className={statusColor}>{statusLabel.toUpperCase()}</span>
        </div>

        {distance.label && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Distance</span>
            <span className="font-bold text-gray-900 uppercase">{distance.label}</span>
          </div>
        )}

        {distance.elevationGain && (
          <div className="flex justify-between items-center">
            <span className="text-gray-500">Elevation</span>
            <span className="font-bold text-gray-900">
              {distance.elevationGain}{distance.elevationUnit ?? 'ft'}+
            </span>
          </div>
        )}
      </div>

      <hr className="border-gray-100" />

      {/* Register button */}
      {comingSoon ? (
        <button
          disabled
          className="w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase text-white opacity-50 cursor-not-allowed"
          style={{ backgroundColor: '#2D5C26' }}
        >
          Coming Soon
        </button>
      ) : distance.isOpen ? (
        <Link
          href={bookHref}
          target={isExternal ? '_blank' : undefined}
          rel={isExternal ? 'noopener noreferrer' : undefined}
          className="block w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase text-white text-center transition-opacity hover:opacity-90"
          style={{ backgroundColor: '#2D5C26' }}
        >
          Register Now
        </Link>
      ) : (
        <button
          disabled
          className="w-full py-4 rounded-xl text-sm font-black tracking-widest uppercase text-white opacity-40 cursor-not-allowed"
          style={{ backgroundColor: '#2D5C26' }}
        >
          Registration Closed
        </button>
      )}

      {/* Share + Save */}
      <div className="grid grid-cols-2 gap-3">
        <button
          onClick={handleShare}
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold tracking-wide uppercase text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Share2 size={13} /> Share
        </button>
        <button
          className="flex items-center justify-center gap-2 py-2.5 rounded-xl border border-gray-200 text-xs font-semibold tracking-wide uppercase text-gray-600 hover:bg-gray-50 transition-colors"
        >
          <Heart size={13} /> Save
        </button>
      </div>

      {/* Small note */}
      <div className="flex items-start gap-2 p-3 rounded-xl bg-gray-50 text-xs text-gray-500 leading-relaxed">
        <Info size={13} className="mt-0.5 shrink-0 text-gray-400" />
        <span>All entries include race insurance and event support. Fully marked and supported course.</span>
      </div>
    </div>
  )
}

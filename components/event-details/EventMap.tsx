'use client'

import { useEffect, useRef } from 'react'
import 'leaflet/dist/leaflet.css'
import type { LatLng } from '@/lib/geo'
import { LocationLinks, directionsUrlFor } from './LocationLinks'

type EventMapProps = {
  position: LatLng
  venueName?: string
  postcode?: string
  googleMapsLink?: string
  what3words?: string
}

// Brand-green map pin with the lucide "footprints" glyph
const PIN_HTML = `
<svg width="40" height="52" viewBox="0 0 40 52" xmlns="http://www.w3.org/2000/svg" style="filter: drop-shadow(0 3px 4px rgba(0,0,0,0.35))">
  <path d="M20 51C20 51 38 32.5 38 19.5C38 9.28 29.94 1 20 1C10.06 1 2 9.28 2 19.5C2 32.5 20 51 20 51Z" fill="#2D5C26" stroke="#ffffff" stroke-width="2"/>
  <g transform="translate(9.5 8.5) scale(0.875)" fill="none" stroke="#ffffff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 16v-2.38C4 11.5 2.97 10.5 3 8c.03-2.72 1.49-6 4.5-6C9.37 2 10 3.8 10 5.5c0 3.11-2 5.66-2 8.68V16a2 2 0 1 1-4 0Z"/>
    <path d="M20 20v-2.38c0-2.12 1.03-3.12 1-5.62-.03-2.72-1.49-6-4.5-6C14.63 6 14 7.8 14 9.5c0 3.11 2 5.66 2 8.68V20a2 2 0 1 0 4 0Z"/>
    <path d="M16 17h4"/><path d="M4 13h4"/>
  </g>
</svg>`

function escapeHtml(text: string) {
  return text.replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]!)
}

export function EventMap({ position, venueName, postcode, googleMapsLink, what3words }: EventMapProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const { lat, lng } = position

  useEffect(() => {
    let map: import('leaflet').Map | undefined
    let cancelled = false

    // Leaflet touches `window`, so load it on the client only
    import('leaflet').then(({ default: L }) => {
      if (cancelled || !containerRef.current) return

      map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 12,
        scrollWheelZoom: false, // don't hijack page scrolling
        dragging: !L.Browser.mobile, // one-finger page scroll still works on phones
      })

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      const marker = L.marker([lat, lng], {
        icon: L.divIcon({ html: PIN_HTML, className: '', iconSize: [40, 52], iconAnchor: [20, 51], popupAnchor: [0, -46] }),
        title: venueName || 'Event location',
        alt: venueName || 'Event location',
      }).addTo(map)

      const label = [venueName, postcode].filter(Boolean).join(', ')
      if (label) marker.bindPopup(`<strong>${escapeHtml(label)}</strong>`)
    })

    return () => {
      cancelled = true
      map?.remove()
    }
  }, [lat, lng, venueName, postcode])

  return (
    <div>
      <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight mb-2" style={{ color: '#0C0F1E' }}>
        Event Location
      </h2>
      {(venueName || postcode) && (
        <p className="text-base mb-6" style={{ color: '#6B6558' }}>
          {[venueName, postcode].filter(Boolean).join(', ')}
        </p>
      )}

      {/* `isolate` keeps Leaflet's internal z-indexes below the header and sticky footer */}
      <div
        ref={containerRef}
        role="region"
        aria-label={`Map showing ${venueName || 'the event location'}`}
        className="isolate h-[320px] md:h-[440px] w-full rounded-2xl overflow-hidden shadow-sm bg-[#dcd6c8]"
      />

      <div className="mt-5">
        <LocationLinks what3words={what3words} googleMapsLink={googleMapsLink} directionsUrl={directionsUrlFor(position)} />
      </div>
    </div>
  )
}

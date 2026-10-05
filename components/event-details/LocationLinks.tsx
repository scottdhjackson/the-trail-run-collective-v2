import { ExternalLink, Navigation } from 'lucide-react'

export type LocationLinksProps = {
  what3words?: string
  googleMapsLink?: string
  directionsUrl?: string
}

/** what3words address + Google Maps / Get Directions buttons for the event venue */
export function LocationLinks({ what3words, googleMapsLink, directionsUrl }: LocationLinksProps) {
  const w3w = what3words?.replace(/^\/+/, '')
  if (!w3w && !googleMapsLink && !directionsUrl) return null

  return (
    <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
      {w3w ? (
        <a
          href={`https://what3words.com/${encodeURIComponent(w3w)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-3 text-sm font-semibold hover:opacity-80"
          style={{ color: '#0C0F1E' }}
        >
          <span className="inline-flex items-center justify-center w-6 h-6 rounded text-[11px] font-black text-white tracking-tighter" style={{ backgroundColor: '#E11F26' }}>
            ///
          </span>
          <span>
            <span className="text-xs font-semibold tracking-[0.15em] uppercase mr-2" style={{ color: '#6B6558' }}>what3words</span>
            <span className="underline underline-offset-4">{w3w}</span>
          </span>
        </a>
      ) : (
        <span />
      )}

      <div className="flex flex-wrap gap-3">
        {googleMapsLink && (
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full border text-xs font-bold tracking-widest uppercase transition-all hover:bg-black/5"
            style={{ borderColor: '#0C0F1E', color: '#0C0F1E' }}
          >
            Google Maps <ExternalLink size={13} />
          </a>
        )}
        {directionsUrl && (
          <a
            href={directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-xs font-bold tracking-widest uppercase text-white transition-all hover:opacity-90"
            style={{ backgroundColor: '#2D5C26' }}
          >
            <Navigation size={13} /> Get Directions
          </a>
        )}
      </div>
    </div>
  )
}

/** Google Maps directions link to a point, or to an address when there are no coordinates */
export function directionsUrlFor(position: { lat: number; lng: number } | null, address?: string) {
  if (position) return `https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}`
  if (address) return `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(address)}`
  return undefined
}

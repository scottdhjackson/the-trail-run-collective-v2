import { MapPin, ExternalLink } from 'lucide-react'

type EventLocationProps = {
  venueName?: string
  town?: string
  county?: string
  postcode?: string
  googleMapsLink?: string
  what3words?: string
  locationImageUrl?: string
}

export function EventLocation({
  venueName,
  town,
  county,
  postcode,
  googleMapsLink,
  what3words,
}: EventLocationProps) {
  if (!venueName && !town) return null

  return (
    <div id="location" className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-4" style={{ borderColor: '#2D5C2640' }}>
        <MapPin className="h-10 w-10" strokeWidth={1.5} style={{ color: '#2D5C26' }} />
      </div>
      <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6B6558' }}>
        Location
      </h3>
      <div className="space-y-1 text-sm">
        {venueName && <p className="font-semibold" style={{ color: '#0C0F1E' }}>{venueName}</p>}
        {town && <p style={{ color: '#2D5C26' }}>{town}</p>}
        {county && <p style={{ color: '#2D5C26' }}>{county}</p>}
        {postcode && <p className="font-mono" style={{ color: '#2D5C26' }}>{postcode}</p>}
        {googleMapsLink && (
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 hover:underline text-xs"
            style={{ color: '#2D5C26' }}
          >
            View Map <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}

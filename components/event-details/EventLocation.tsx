import Image from 'next/image'
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
  locationImageUrl,
}: EventLocationProps) {
  if (!venueName && !town) return null

  return (
    <div id="location">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <MapPin className="h-5 w-5" />
        Location
      </h3>

      <div className="space-y-2">
        {venueName && <p className="font-semibold text-sm">{venueName}</p>}
        {town && <p className="text-muted-foreground text-sm">{town}</p>}
        {county && <p className="text-muted-foreground text-sm">{county}</p>}
        {postcode && <p className="text-muted-foreground font-mono text-sm">{postcode}</p>}

        {googleMapsLink && (
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-primary hover:underline text-xs"
          >
            View Map <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}

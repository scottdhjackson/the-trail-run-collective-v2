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
      <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center mb-4">
        <MapPin className="h-10 w-10 text-primary/60" strokeWidth={1.5} />
      </div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Location
      </h3>
      <div className="space-y-1 text-sm">
        {venueName && <p className="font-semibold">{venueName}</p>}
        {town && <p className="text-muted-foreground">{town}</p>}
        {county && <p className="text-muted-foreground">{county}</p>}
        {postcode && <p className="text-muted-foreground font-mono">{postcode}</p>}
        {googleMapsLink && (
          <a
            href={googleMapsLink}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-2 text-primary hover:underline text-xs"
          >
            View Map <ExternalLink className="h-3 w-3" />
          </a>
        )}
      </div>
    </div>
  )
}

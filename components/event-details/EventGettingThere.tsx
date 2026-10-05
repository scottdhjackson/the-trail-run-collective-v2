import { Car, Train, Phone, MapPin } from 'lucide-react'
import { LocationLinks, type LocationLinksProps } from './LocationLinks'

type EventGettingThereProps = {
  byCar?: string
  trainStation?: string
  trainRoute?: string
  trainTime?: string
  taxiCompany?: string
  taxiPhone?: string
  /** Venue + what3words/directions links — shown here when the page has no separate location map */
  venue?: LocationLinksProps & { address?: string }
}

export function EventGettingThere({
  byCar,
  trainStation,
  trainRoute,
  trainTime,
  taxiCompany,
  taxiPhone,
  venue,
}: EventGettingThereProps) {
  const hasCarInfo = !!byCar
  const hasTrainInfo = !!trainStation || !!trainRoute
  const hasTaxiInfo = !!taxiCompany || !!taxiPhone

  const hasVenue = !!venue && !!(venue.address || venue.what3words || venue.googleMapsLink || venue.directionsUrl)

  if (!hasCarInfo && !hasTrainInfo && !hasTaxiInfo && !hasVenue) return null

  return (
    <div id="getting-there">
      <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight mb-8" style={{ color: '#0C0F1E' }}>
        Getting to the Race
      </h2>

      {hasVenue && (
        <div className="bg-white rounded-2xl shadow-sm px-5 py-5 md:px-6 mb-10">
          {venue.address && (
            <p className="flex items-start gap-2 text-base font-semibold mb-4" style={{ color: '#0C0F1E' }}>
              <MapPin className="h-5 w-5 shrink-0 mt-0.5" style={{ color: '#2D5C26' }} />
              {venue.address}
            </p>
          )}
          <LocationLinks what3words={venue.what3words} googleMapsLink={venue.googleMapsLink} directionsUrl={venue.directionsUrl} />
        </div>
      )}

      <div className="space-y-8">
        {hasCarInfo && (
          <div>
            <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Car className="h-5 w-5" />
              By Car
            </h4>
            <p className="text-muted-foreground whitespace-pre-line">{byCar}</p>
          </div>
        )}

        {hasTrainInfo && (
          <div>
            <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Train className="h-5 w-5" />
              By Train
            </h4>
            {trainStation && (
              <p className="text-muted-foreground mb-2">
                Nearest Station: <span className="text-foreground font-semibold">{trainStation}</span>
              </p>
            )}
            {trainRoute && (
              <p className="text-muted-foreground mb-2">{trainRoute}</p>
            )}
            {trainTime && (
              <p className="text-muted-foreground">
                Journey Time: <span className="text-foreground">{trainTime}</span>
              </p>
            )}
          </div>
        )}

        {hasTaxiInfo && (
          <div>
            <h4 className="text-xl font-semibold mb-3 flex items-center gap-2">
              <Phone className="h-5 w-5" />
              By Taxi
            </h4>
            {taxiCompany && (
              <p className="text-muted-foreground mb-2">
                Recommended: <span className="text-foreground font-semibold">{taxiCompany}</span>
              </p>
            )}
            {taxiPhone && (
              <p className="text-muted-foreground">
                Phone: <a href={`tel:${taxiPhone}`} className="text-primary hover:underline">{taxiPhone}</a>
              </p>
            )}
          </div>
        )}
      </div>
    </div>
  )
}

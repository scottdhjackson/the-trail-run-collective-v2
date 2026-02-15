import { Car, Train, Phone } from 'lucide-react'

type EventGettingThereProps = {
  byCar?: string
  trainStation?: string
  trainRoute?: string
  trainTime?: string
  taxiCompany?: string
  taxiPhone?: string
}

export function EventGettingThere({
  byCar,
  trainStation,
  trainRoute,
  trainTime,
  taxiCompany,
  taxiPhone,
}: EventGettingThereProps) {
  const hasCarInfo = !!byCar
  const hasTrainInfo = !!trainStation || !!trainRoute
  const hasTaxiInfo = !!taxiCompany || !!taxiPhone

  if (!hasCarInfo && !hasTrainInfo && !hasTaxiInfo) return null

  return (
    <div id="getting-there" className="mt-16">
      <h3 className="text-2xl font-semibold mb-8">Getting to the Race</h3>

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

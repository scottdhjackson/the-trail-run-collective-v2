import { Compass } from 'lucide-react'

type Distance = {
  _key: string
  label: string
  distanceValue?: number
  distanceUnit?: string
}

type EventRoutesSummaryProps = {
  distances: Distance[]
}

export function EventRoutesSummary({ distances }: EventRoutesSummaryProps) {
  if (!distances || distances.length === 0) return null

  return (
    <div id="routes-summary" className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center mb-4">
        <Compass className="h-10 w-10 text-primary/60" strokeWidth={1.5} />
      </div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Routes
      </h3>
      <ul className="space-y-2 text-sm">
        {distances.map((distance) => (
          <li key={distance._key}>
            <span className="font-semibold">{distance.label}</span>
            {distance.distanceValue && (
              <span className="text-muted-foreground"> — {distance.distanceValue}{distance.distanceUnit ?? 'km'}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

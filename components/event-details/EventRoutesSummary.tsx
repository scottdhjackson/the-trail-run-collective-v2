import { Route } from 'lucide-react'

type Distance = {
  _key: string
  label: string
  distanceKm?: number
}

type EventRoutesSummaryProps = {
  distances: Distance[]
}

export function EventRoutesSummary({ distances }: EventRoutesSummaryProps) {
  if (!distances || distances.length === 0) return null

  return (
    <div id="routes-summary">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Route className="h-5 w-5" />
        Routes
      </h3>

      <ul className="space-y-2">
        {distances.map((distance) => (
          <li key={distance._key} className="flex items-center gap-2 text-sm">
            <span className="text-primary">•</span>
            <span className="font-semibold">{distance.label}</span>
            {distance.distanceKm && (
              <span className="text-muted-foreground text-xs">({distance.distanceKm}km)</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  )
}

import Image from 'next/image'
import { Download, TrendingUp } from 'lucide-react'
import { Button } from '@/components/ui/button'

type Distance = {
  _key: string
  label: string
  distanceKm?: number
  elevationGain?: number
  description?: string
  gpxFileUrl?: string
  routeMapImageUrl?: string
}

type EventRoutesProps = {
  distances: Distance[]
}

export function EventRoutes({ distances }: EventRoutesProps) {
  if (!distances || distances.length === 0) return null

  return (
    <section id="routes" className="py-16 bg-muted/20">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">The Routes</h2>

        <div className="space-y-12">
          {distances.map((distance, index) => (
            <div key={distance._key} className={`rounded-lg p-8 shadow-md ${
              index % 2 === 0 ? 'bg-background border-2 border-primary/20' : 'bg-secondary/5 border-2 border-secondary/20'
            }`}>
              <div className="grid md:grid-cols-2 gap-8">
                {/* Route Info */}
                <div>
                  <h3 className="text-2xl font-bold mb-4">{distance.label}</h3>

                  <div className="space-y-2 mb-6">
                    {distance.distanceKm && (
                      <p className="text-muted-foreground">
                        Distance: <span className="text-foreground font-semibold">{distance.distanceKm} km</span>
                      </p>
                    )}
                    {distance.elevationGain && (
                      <p className="text-muted-foreground flex items-center gap-1">
                        <TrendingUp className="h-4 w-4" />
                        Elevation Gain: <span className="text-foreground font-semibold">{distance.elevationGain} m</span>
                      </p>
                    )}
                  </div>

                  {distance.description && (
                    <p className="text-muted-foreground mb-6 whitespace-pre-line">
                      {distance.description}
                    </p>
                  )}

                  {distance.gpxFileUrl && (
                    <Button asChild variant="outline" className="gap-2">
                      <a href={distance.gpxFileUrl} download>
                        <Download className="h-4 w-4" />
                        Download GPX
                      </a>
                    </Button>
                  )}
                </div>

                {/* Route Map */}
                {distance.routeMapImageUrl && (
                  <div className="relative h-64 md:h-full min-h-[300px] rounded-lg overflow-hidden">
                    <Image
                      src={distance.routeMapImageUrl}
                      alt={`${distance.label} route map`}
                      fill
                      className="object-cover"
                    />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

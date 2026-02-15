import { Button } from '@/components/ui/button'
import { TrendingUp } from 'lucide-react'
import Link from 'next/link'

type Distance = {
  _key: string
  label: string
  distanceKm?: number
  elevationGain?: number
  price?: number
  isOpen: boolean
}

type EventPricesProps = {
  distances: Distance[]
  eventSlug: string
}

export function EventPrices({ distances, eventSlug }: EventPricesProps) {
  if (!distances || distances.length === 0) return null

  return (
    <section id="prices" className="py-16 bg-accent/10">
      <div className="container mx-auto px-4 max-w-6xl">
        <h2 className="text-3xl font-bold mb-12 text-center">Prices</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {distances.map((distance, index) => (
            <div
              key={distance._key}
              className={`border-2 rounded-lg p-6 hover:shadow-lg transition-shadow ${
                index === 0 ? 'border-primary/30 bg-primary/5' :
                index === 1 ? 'border-secondary/30 bg-secondary/5' :
                'border-accent/30 bg-accent/5'
              }`}
            >
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
                    Elevation: <span className="text-foreground font-semibold">{distance.elevationGain} m</span>
                  </p>
                )}
              </div>

              {distance.price && (
                <p className="text-3xl font-bold mb-6">£{distance.price}</p>
              )}

              <Button
                asChild
                className="w-full bg-primary text-white hover:bg-primary/90 font-bold"
                disabled={!distance.isOpen}
              >
                {distance.isOpen ? (
                  <Link href={`/register/${eventSlug}?distance=${distance.label}`}>
                    Enter Now
                  </Link>
                ) : (
                  <span>Registration Closed</span>
                )}
              </Button>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

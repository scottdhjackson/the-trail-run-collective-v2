import { Check, MapPin, Flag, Coffee, Camera, Medal, Package, Droplets } from 'lucide-react'

type EventWhatYouGetProps = {
  items: string[]
}

const iconMap: Record<string, any> = {
  'Free parking': MapPin,
  'Fully marked course': Flag,
  'Food & drink': Coffee,
  'Event photography': Camera,
  'Medal': Medal,
  'Bag drop': Package,
  'Fully timed': Check,
  'Online results': Check,
  'Outposts': Droplets,
}

export function EventWhatYouGet({ items }: EventWhatYouGetProps) {
  if (!items || items.length === 0) return null

  return (
    <div id="what-you-get" className="mb-16">
      <h3 className="text-2xl font-semibold mb-8">What You Get</h3>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {items.map((item, index) => {
          const Icon = iconMap[item] || Check
          return (
            <div key={index} className="flex flex-col items-center text-center gap-3">
              <div className="h-12 w-12 rounded-full bg-primary/10 flex items-center justify-center">
                <Icon className="h-6 w-6 text-primary" />
              </div>
              <span className="text-sm font-medium">{item}</span>
            </div>
          )
        })}
      </div>
    </div>
  )
}

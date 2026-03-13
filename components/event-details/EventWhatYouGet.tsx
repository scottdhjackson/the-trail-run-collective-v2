import { CheckCircle } from 'lucide-react'

type EventWhatYouGetProps = {
  items: string[]
}

export function EventWhatYouGet({ items }: EventWhatYouGetProps) {
  if (!items || items.length === 0) return null

  return (
    <div id="what-you-get" className="mt-10">
      <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight mb-6" style={{ color: '#0C0F1E' }}>
        What&apos;s Included
      </h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-3">
        {items.map((item, index) => (
          <div key={index} className="flex items-center gap-3 text-sm" style={{ color: '#6B6558' }}>
            <CheckCircle size={16} className="shrink-0" style={{ color: '#2D5C26' }} />
            <span>{item}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

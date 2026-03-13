import { Clock } from 'lucide-react'

type EventDetailsProps = {
  registrationOpens?: string
  registrationCloses?: string
  startTime?: string
}

export function EventDetails({
  registrationOpens,
  registrationCloses,
  startTime,
}: EventDetailsProps) {
  const formatDate = (dateString?: string) => {
    if (!dateString) return null
    return new Date(dateString).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <div id="event-details" className="flex flex-col items-center text-center">
      <div className="w-24 h-24 rounded-full border-2 flex items-center justify-center mb-4" style={{ borderColor: '#2D5C2640' }}>
        <Clock className="h-10 w-10" strokeWidth={1.5} style={{ color: '#2D5C26' }} />
      </div>
      <h3 className="text-xs font-semibold uppercase tracking-widest mb-4" style={{ color: '#6B6558' }}>
        Details
      </h3>
      <div className="space-y-3 text-sm">
        {registrationOpens && (
          <div>
            <p className="text-xs" style={{ color: '#2D5C26' }}>Registration opens</p>
            <p className="font-semibold" style={{ color: '#0C0F1E' }}>{formatDate(registrationOpens)}</p>
          </div>
        )}
        {registrationCloses && (
          <div>
            <p className="text-xs" style={{ color: '#2D5C26' }}>Registration closes</p>
            <p className="font-semibold" style={{ color: '#0C0F1E' }}>{formatDate(registrationCloses)}</p>
          </div>
        )}
        {startTime && (
          <div>
            <p className="text-xs" style={{ color: '#2D5C26' }}>Start time</p>
            <p className="font-semibold" style={{ color: '#0C0F1E' }}>{startTime}</p>
          </div>
        )}
      </div>
    </div>
  )
}

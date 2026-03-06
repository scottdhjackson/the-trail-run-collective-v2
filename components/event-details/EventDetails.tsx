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
      <div className="w-24 h-24 rounded-full border-2 border-primary/40 flex items-center justify-center mb-4">
        <Clock className="h-10 w-10 text-primary/60" strokeWidth={1.5} />
      </div>
      <h3 className="text-xs font-semibold uppercase tracking-widest text-muted-foreground mb-4">
        Details
      </h3>
      <div className="space-y-3 text-sm">
        {registrationOpens && (
          <div>
            <p className="text-xs text-muted-foreground">Registration opens</p>
            <p className="font-semibold">{formatDate(registrationOpens)}</p>
          </div>
        )}
        {registrationCloses && (
          <div>
            <p className="text-xs text-muted-foreground">Registration closes</p>
            <p className="font-semibold">{formatDate(registrationCloses)}</p>
          </div>
        )}
        {startTime && (
          <div>
            <p className="text-xs text-muted-foreground">Start time</p>
            <p className="font-semibold">{startTime}</p>
          </div>
        )}
      </div>
    </div>
  )
}

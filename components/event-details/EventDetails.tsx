import { Calendar, Clock } from 'lucide-react'

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
    <div id="event-details">
      <h3 className="text-xl font-semibold mb-4 flex items-center gap-2">
        <Calendar className="h-5 w-5" />
        Registration
      </h3>

      <div className="space-y-3">
        {registrationOpens && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Opens</p>
            <p className="text-sm font-semibold">{formatDate(registrationOpens)}</p>
          </div>
        )}
        {registrationCloses && (
          <div>
            <p className="text-xs text-muted-foreground mb-1">Closes</p>
            <p className="text-sm font-semibold">{formatDate(registrationCloses)}</p>
          </div>
        )}
        {startTime && (
          <div>
            <p className="text-xs text-muted-foreground mb-1 flex items-center gap-1">
              <Clock className="h-3 w-3" />
              Start Time
            </p>
            <p className="text-sm font-semibold">{startTime}</p>
          </div>
        )}
      </div>
    </div>
  )
}

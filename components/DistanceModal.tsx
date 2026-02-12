'use client'

import { useState } from 'react'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

type Distance = {
  label: string
  stripePriceId: string
  isOpen: boolean
  sortOrder: number
}

type DistanceModalProps = {
  isOpen: boolean
  onClose: () => void
  eventTitle: string
  eventSlug: string
  distances: Distance[]
}

export function DistanceModal({ isOpen, onClose, eventTitle, eventSlug, distances }: DistanceModalProps) {
  const [selectedDistance, setSelectedDistance] = useState<string>('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async () => {
    if (!selectedDistance) return

    setIsLoading(true)
    setError(null)

    try {
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          eventSlug,
          distanceLabel: selectedDistance,
        }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }

      // Redirect to Stripe Checkout
      if (data.url) {
        window.location.href = data.url
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      setIsLoading(false)
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{eventTitle}</DialogTitle>
          <DialogDescription>
            Select your distance to continue to payment
          </DialogDescription>
        </DialogHeader>

        <div className="space-y-4 py-4">
          {distances.map((distance) => (
            <div key={distance.label} className="flex items-center space-x-3">
              <input
                type="radio"
                id={distance.label}
                name="distance"
                value={distance.label}
                checked={selectedDistance === distance.label}
                onChange={(e) => setSelectedDistance(e.target.value)}
                disabled={!distance.isOpen || isLoading}
                className="h-4 w-4 border-gray-300 text-primary focus:ring-2 focus:ring-primary"
              />
              <Label
                htmlFor={distance.label}
                className={`flex-1 cursor-pointer ${!distance.isOpen ? 'opacity-50' : ''}`}
              >
                {distance.label}
                {!distance.isOpen && ' (Closed)'}
              </Label>
            </div>
          ))}
        </div>

        {error && (
          <div className="text-sm text-destructive">
            {error}
          </div>
        )}

        <DialogFooter>
          <Button
            variant="outline"
            onClick={onClose}
            disabled={isLoading}
          >
            Cancel
          </Button>
          <Button
            onClick={handleSubmit}
            disabled={!selectedDistance || isLoading}
          >
            {isLoading ? 'Loading...' : 'Continue to Payment'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}

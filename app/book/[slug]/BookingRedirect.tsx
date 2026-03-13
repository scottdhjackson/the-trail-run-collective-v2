'use client'

import { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button'

type BookingRedirectProps = {
  bookingLink: string
  eventTitle: string
}

export function BookingRedirect({ bookingLink, eventTitle }: BookingRedirectProps) {
  const [countdown, setCountdown] = useState(5)

  useEffect(() => {
    if (countdown === 0) {
      window.location.href = bookingLink
      return
    }
    const timer = setTimeout(() => setCountdown(countdown - 1), 1000)
    return () => clearTimeout(timer)
  }, [countdown, bookingLink])

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-4">
      <div className="text-center text-white max-w-lg">
        <div className="mb-8">
          <div className="w-16 h-16 border-4 border-white border-t-transparent rounded-full animate-spin mx-auto mb-6" />
          <h1 className="text-3xl font-bold mb-3">Almost there...</h1>
          <p className="text-xl text-gray-300 mb-2">
            Passing you to our event sign-up partner
          </p>
          <p className="text-gray-400 text-sm">for <span className="text-white font-semibold">{eventTitle}</span></p>
        </div>

        <p className="text-gray-400 mb-6">
          Redirecting in <span className="text-white font-bold text-lg">{countdown}</span> second{countdown !== 1 ? 's' : ''}...
        </p>

        <Button
          onClick={() => { window.location.href = bookingLink }}
          className="bg-white text-black hover:bg-gray-200 font-bold px-8"
          size="lg"
        >
          Continue now →
        </Button>

        <p className="text-xs text-gray-600 mt-6">
          You are being redirected to an external booking platform.
        </p>
      </div>
    </div>
  )
}

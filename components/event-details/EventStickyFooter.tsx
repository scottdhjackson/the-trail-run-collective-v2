'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useEffect, useState } from 'react'

type EventStickyFooterProps = {
  eventName: string
  date: string
  fromPrice: number
  eventSlug: string
}

export function EventStickyFooter({ eventName, date, fromPrice, eventSlug }: EventStickyFooterProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      // Show sticky footer after scrolling down 500px
      setIsVisible(window.scrollY > 500)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 bg-gray-900 text-white shadow-2xl transition-transform duration-300 z-50 ${
        isVisible ? 'translate-y-0' : 'translate-y-full'
      }`}
    >
      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="text-center sm:text-left">
            <h3 className="font-bold text-lg">{eventName}</h3>
            <p className="text-sm text-gray-300">{formattedDate} • From £{fromPrice}</p>
          </div>

          <Button
            asChild
            size="lg"
            className="bg-white text-black hover:bg-gray-200 font-bold px-8"
          >
            <Link href={`/register/${eventSlug}`}>Book Now</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}

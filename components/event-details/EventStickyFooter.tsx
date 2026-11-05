'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'
import { useBooking } from './BookingEmbed'

type EventStickyFooterProps = {
  eventName: string
  date: string
  fromPrice: number
  eventSlug: string
}

export function EventStickyFooter({ eventName, date, fromPrice, eventSlug }: EventStickyFooterProps) {
  const booking = useBooking()
  // Opens the embedded booking pop-up when the event has one, otherwise goes to /book
  const bookButton = (label: string) =>
    booking ? (
      <button type="button" onClick={booking.openBooking}>{label}</button>
    ) : (
      <Link href={`/book/${eventSlug}`}>{label}</Link>
    )
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()

  return (
    <div className="sticky-footer">
      {/* Mobile layout */}
      <div className="flex md:hidden items-center justify-between px-4 py-3 gap-3">
        <div className="flex flex-col leading-tight min-w-0">
          <span className="text-[10px] font-semibold tracking-widest text-gray-400 uppercase">{formattedDate}</span>
          <span className="text-[10px] tracking-widest text-gray-400 uppercase">FROM</span>
          <span className="text-sm font-bold">£{fromPrice}</span>
        </div>
        <Button
          asChild
          className="bg-green-500 hover:bg-green-400 text-white font-bold px-6 shrink-0 rounded"
          size="sm"
        >
          {bookButton('BOOK NOW')}
        </Button>
      </div>

      {/* Desktop layout */}
      <div className="hidden md:flex items-center justify-end px-8 py-3 gap-6 w-full">
        <div className="flex flex-col items-end leading-tight">
          <span className="text-base font-bold tracking-widest uppercase">{eventName}</span>
          <div className="flex items-center gap-2 text-sm tracking-widest text-gray-400 uppercase">
            <span>{formattedDate}</span>
            <span>·</span>
            <span>FROM <span className="text-white font-semibold">£{fromPrice}</span></span>
          </div>
        </div>
        <Button
          asChild
          className="bg-green-500 hover:bg-green-400 text-white font-bold px-8 shrink-0 rounded"
          size="default"
        >
          {bookButton('BOOK NOW')}
        </Button>
      </div>
    </div>
  )
}

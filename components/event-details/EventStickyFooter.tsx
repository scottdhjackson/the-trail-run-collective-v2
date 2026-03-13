'use client'

import { Button } from '@/components/ui/button'
import Link from 'next/link'

type EventStickyFooterProps = {
  eventName: string
  date: string
  fromPrice: number
  eventSlug: string
}

export function EventStickyFooter({ eventName, date, fromPrice, eventSlug }: EventStickyFooterProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()

  return (
    <div className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50 shadow-2xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      <div className="flex items-center justify-between px-4 py-2 gap-3">
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
          <Link href={`/book/${eventSlug}`}>BOOK NOW</Link>
        </Button>
      </div>
    </div>
  )
}

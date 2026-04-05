'use client'

import { useEffect, useRef } from 'react'
import { Button } from '@/components/ui/button'
import Link from 'next/link'

type EventStickyFooterProps = {
  eventName: string
  date: string
  fromPrice: number
  eventSlug: string
}

export function EventStickyFooter({ eventName, date, fromPrice, eventSlug }: EventStickyFooterProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof window === 'undefined' || !window.visualViewport) return

    const update = () => {
      const vv = window.visualViewport!
      const bottom = window.innerHeight - vv.height - vv.offsetTop
      el.style.bottom = `${Math.max(0, bottom)}px`
    }

    window.visualViewport.addEventListener('resize', update)
    window.visualViewport.addEventListener('scroll', update)
    update()

    return () => {
      window.visualViewport?.removeEventListener('resize', update)
      window.visualViewport?.removeEventListener('scroll', update)
    }
  }, [])

  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  }).toUpperCase()

  return (
    <div
      ref={ref}
      className="fixed bottom-0 left-0 right-0 bg-gray-900 text-white z-50 shadow-2xl"
      style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
    >
      {/* Mobile layout */}
      <div className="flex md:hidden items-center justify-between px-4 py-2 gap-3">
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
          <Link href={`/book/${eventSlug}`}>BOOK NOW</Link>
        </Button>
      </div>
    </div>
  )
}

'use client'

import { createContext, useCallback, useContext, useEffect, useState } from 'react'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { X } from 'lucide-react'

type BookingContextValue = { openBooking: () => void } | null

const BookingContext = createContext<BookingContextValue>(null)

/** Returns `openBooking` when this event takes bookings in an embedded pop-up, otherwise null */
export function useBooking() {
  return useContext(BookingContext)
}

const RESIZE_MESSAGE = 'eightmile-entry-resize'

/**
 * Wraps the event page and renders the booking pop-up. Book buttons inside call
 * `useBooking().openBooking()`. Visiting the page with `?book=1` opens it straight away.
 */
export function BookingProvider({
  embedUrl,
  eventTitle,
  children,
}: {
  embedUrl?: string
  eventTitle: string
  children: React.ReactNode
}) {
  const [open, setOpen] = useState(false)
  const [height, setHeight] = useState<number | null>(null)
  const openBooking = useCallback(() => setOpen(true), [])

  // Deep link from the homepage "Book" buttons (/book/[slug] → ?book=1)
  useEffect(() => {
    if (!embedUrl) return
    const params = new URLSearchParams(window.location.search)
    if (params.get('book') === '1') {
      setOpen(true)
      params.delete('book')
      const query = params.toString()
      history.replaceState(null, '', `${window.location.pathname}${query ? `?${query}` : ''}${window.location.hash}`)
    }
  }, [embedUrl])

  // The booking form tells us its height so the iframe never needs its own scrollbar
  useEffect(() => {
    if (!embedUrl) return
    const allowedOrigin = new URL(embedUrl).origin
    const onMessage = (e: MessageEvent) => {
      if (e.origin !== allowedOrigin) return
      if (e.data?.type === RESIZE_MESSAGE && typeof e.data.height === 'number' && e.data.height > 0) {
        setHeight(Math.min(Math.round(e.data.height), 20000))
      }
    }
    window.addEventListener('message', onMessage)
    return () => window.removeEventListener('message', onMessage)
  }, [embedUrl])

  if (!embedUrl) return <>{children}</>

  return (
    <BookingContext.Provider value={{ openBooking }}>
      {children}

      <DialogPrimitive.Root open={open} onOpenChange={setOpen}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[80] bg-[#080B18]/80 backdrop-blur-sm data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            className="fixed z-[80] inset-0 md:inset-auto md:left-1/2 md:top-1/2 md:-translate-x-1/2 md:-translate-y-1/2 md:w-[min(820px,calc(100vw-48px))] md:h-[min(900px,calc(100vh-48px))] flex flex-col bg-white md:rounded-2xl shadow-2xl overflow-hidden focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-200"
          >
            <div className="flex items-center justify-between gap-4 px-5 md:px-6 py-4 border-b shrink-0" style={{ borderColor: 'rgba(12,15,30,0.08)' }}>
              <div className="min-w-0">
                <p className="text-[10px] font-semibold tracking-[0.25em] uppercase" style={{ color: '#2D5C26' }}>
                  Enter
                </p>
                <DialogPrimitive.Title className="font-heading font-black uppercase tracking-tight text-lg md:text-xl truncate" style={{ color: '#0C0F1E' }}>
                  {eventTitle}
                </DialogPrimitive.Title>
              </div>
              <DialogPrimitive.Close
                className="shrink-0 p-2.5 rounded-full hover:bg-black/5 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5C26]"
                aria-label="Close booking"
                style={{ color: '#0C0F1E' }}
              >
                <X size={22} />
              </DialogPrimitive.Close>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain">
              <iframe
                id="eightmile-entry"
                src={embedUrl}
                title={`Enter ${eventTitle}`}
                className="block w-full border-0"
                style={{ height: height ? `${height}px` : '820px', minHeight: 820 }}
              />
            </div>
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </BookingContext.Provider>
  )
}

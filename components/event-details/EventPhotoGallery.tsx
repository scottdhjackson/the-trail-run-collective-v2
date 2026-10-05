'use client'

import { useCallback, useRef, useState } from 'react'
import Image from 'next/image'
import * as DialogPrimitive from '@radix-ui/react-dialog'
import { ChevronLeft, ChevronRight, ExternalLink, Expand, X } from 'lucide-react'
import { Reveal } from '@/components/Reveal'

type EventPhotoGalleryProps = {
  images: string[]
  galleryLink?: string
}

const GRID_LIMIT = 6

export function EventPhotoGallery({ images, galleryLink }: EventPhotoGalleryProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null)
  const touchStartX = useRef<number | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)

  const count = images?.length ?? 0
  const go = useCallback(
    (step: number) => setOpenIndex((i) => (i === null ? i : (i + step + count) % count)),
    [count]
  )

  if (!images || count === 0) return null

  const displayImages = images.slice(0, GRID_LIMIT)
  const hiddenCount = count - displayImages.length

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') go(1)
    if (e.key === 'ArrowLeft') go(-1)
  }

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return
    const delta = e.changedTouches[0].clientX - touchStartX.current
    if (Math.abs(delta) > 50) go(delta < 0 ? 1 : -1)
    touchStartX.current = null
  }

  return (
    <div id="photos">
      <Reveal>
        <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight mb-8" style={{ color: '#0C0F1E' }}>
          Photos
        </h2>
      </Reveal>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-3 md:gap-4 mb-6">
        {displayImages.map((imageUrl, index) => {
          const isLastWithMore = index === GRID_LIMIT - 1 && hiddenCount > 0
          return (
            <Reveal key={index} delay={(index % 3) * 100}>
              <button
                type="button"
                onClick={(e) => {
                  lastTrigger.current = e.currentTarget
                  setOpenIndex(index)
                }}
                className="group relative block w-full h-40 md:h-56 rounded-2xl overflow-hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5C26] focus-visible:ring-offset-2"
                aria-label={`Open photo ${index + 1} of ${count}`}
              >
                <Image
                  src={imageUrl}
                  alt={`Event photo ${index + 1}`}
                  fill
                  sizes="(min-width: 768px) 33vw, 50vw"
                  className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-300" />
                {isLastWithMore ? (
                  <div className="absolute inset-0 flex items-center justify-center bg-black/55">
                    <span className="font-heading font-black text-3xl text-white">+{hiddenCount}</span>
                  </div>
                ) : (
                  <Expand
                    size={20}
                    className="absolute bottom-3 right-3 text-white opacity-0 translate-y-1 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300"
                  />
                )}
              </button>
            </Reveal>
          )
        })}
      </div>

      {galleryLink && (
        <a
          href={galleryLink}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4 hover:opacity-80"
          style={{ color: '#2D5C26' }}
        >
          View more photos <ExternalLink className="h-4 w-4" />
        </a>
      )}

      {/* Lightbox */}
      <DialogPrimitive.Root open={openIndex !== null} onOpenChange={(open) => !open && setOpenIndex(null)}>
        <DialogPrimitive.Portal>
          <DialogPrimitive.Overlay className="fixed inset-0 z-[60] bg-[#080B18]/95 data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=open]:fade-in-0 data-[state=closed]:fade-out-0" />
          <DialogPrimitive.Content
            aria-describedby={undefined}
            onCloseAutoFocus={(e) => {
              // Return focus to the tile that opened the lightbox
              e.preventDefault()
              lastTrigger.current?.focus()
            }}
            onKeyDown={handleKeyDown}
            onTouchStart={(e) => (touchStartX.current = e.touches[0].clientX)}
            onTouchEnd={handleTouchEnd}
            className="fixed inset-0 z-[60] flex items-center justify-center focus:outline-none data-[state=open]:animate-in data-[state=open]:fade-in-0 data-[state=open]:zoom-in-95 duration-300"
          >
            <DialogPrimitive.Title className="sr-only">Event photos</DialogPrimitive.Title>

            {openIndex !== null && (
              <div key={openIndex} className="relative w-full h-full max-w-6xl max-h-[85vh] mx-4 md:mx-20 animate-in fade-in duration-300">
                <Image
                  src={images[openIndex]}
                  alt={`Event photo ${openIndex + 1} of ${count}`}
                  fill
                  sizes="100vw"
                  className="object-contain"
                  priority
                />
              </div>
            )}

            {/* Counter */}
            <p className="absolute top-5 left-1/2 -translate-x-1/2 text-xs font-semibold tracking-[0.25em] text-white/70 tabular-nums">
              {(openIndex ?? 0) + 1} / {count}
            </p>

            <DialogPrimitive.Close
              className="absolute top-4 right-4 p-2.5 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
              aria-label="Close"
            >
              <X size={22} />
            </DialogPrimitive.Close>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={() => go(-1)}
                  className="absolute left-3 md:left-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Previous photo"
                >
                  <ChevronLeft size={24} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  className="absolute right-3 md:right-6 top-1/2 -translate-y-1/2 p-3 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
                  aria-label="Next photo"
                >
                  <ChevronRight size={24} />
                </button>
              </>
            )}
          </DialogPrimitive.Content>
        </DialogPrimitive.Portal>
      </DialogPrimitive.Root>
    </div>
  )
}

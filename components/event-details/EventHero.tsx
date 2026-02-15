'use client'

import Image from 'next/image'
import { Button } from '@/components/ui/button'

type EventHeroProps = {
  title: string
  date: string
  heroImageUrl?: string
}

export function EventHero({ title, date, heroImageUrl }: EventHeroProps) {
  const formattedDate = new Date(date).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  })

  return (
    <header className="relative h-[70vh] min-h-[500px] flex items-center justify-center">
      {/* Background Image */}
      {heroImageUrl ? (
        <Image
          src={heroImageUrl}
          alt={title}
          fill
          className="object-cover brightness-50"
          priority
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-br from-blue-600 to-blue-900" />
      )}

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 max-w-4xl">
        <h1 className="text-5xl md:text-6xl font-bold mb-4">{title}</h1>
        <p className="text-2xl md:text-3xl mb-8">{formattedDate}</p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-black hover:bg-gray-200 font-bold text-lg px-8"
            onClick={() => document.getElementById('race-overview')?.scrollIntoView({ behavior: 'smooth' })}
          >
            More Info
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-2 border-white text-white hover:bg-white hover:text-black font-bold text-lg px-8"
            onClick={() => document.getElementById('prices')?.scrollIntoView({ behavior: 'smooth' })}
          >
            View Prices
          </Button>
        </div>
      </div>
    </header>
  )
}

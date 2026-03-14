import Image from 'next/image'

interface HeroProps {
  bannerImageUrl?: string
}

export function Hero({ bannerImageUrl }: HeroProps) {
  const imageSrc = bannerImageUrl || '/images/hero.jpg'

  return (
    <section className="relative h-[82vh] flex items-end overflow-hidden">
      {/* Background image */}
      <div className="absolute inset-0 z-0">
        <Image
          src={imageSrc}
          alt="Trail running"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--banner-overlay)' }} />
      </div>

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 container mx-auto px-6 pb-20 md:pb-28">
        {/* Eyebrow */}
        <p className="text-white/70 text-xs tracking-[0.25em] uppercase font-semibold mb-5">
          Season 2026 Now Open
        </p>

        {/* Heading */}
        <h1 className="font-heading font-black uppercase leading-none mb-8">
          <span className="block text-white text-6xl md:text-8xl lg:text-9xl tracking-tight">
            Run the
          </span>
          <span className="block font-accent italic text-[var(--brand-green)] text-6xl md:text-8xl lg:text-9xl" style={{ color: '#2D5C26' }}>
            Trails
          </span>
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#events"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90"
            style={{ backgroundColor: '#2D5C26', color: '#ffffff' }}
          >
            Find your race →
          </a>
          <a
            href="#join"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide border-2 border-white text-white transition-all hover:bg-white/10"
          >
            Join our mailing list
          </a>
        </div>
      </div>
    </section>
  )
}

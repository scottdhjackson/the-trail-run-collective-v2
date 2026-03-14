import Image from 'next/image'
import Link from 'next/link'

const FALLBACK_IMAGES = [
  '/images/miguel-a-amutio-QDv-uBc-poY-unsplash.jpg',
  '/images/hero.jpg',
  '/images/miguel-a-amutio-QDv-uBc-poY-unsplash.jpg',
]

interface AboutSectionProps {
  heading?: string
  body?: string
  ctaLabel?: string
  imageUrls?: string[]
}

const DUMMY_BODY =
  'The Trail Run Collective was founded by two school friends united by a shared love of running — and an even deeper passion for the trails. What began as weekend adventures quickly grew into a vision: to create trail running events that feel different. Events with personality, purpose, and a little creative twist.'

export function AboutSection({ heading, body, ctaLabel, imageUrls }: AboutSectionProps) {
  const images = [
    imageUrls?.[0] || FALLBACK_IMAGES[0],
    imageUrls?.[1] || FALLBACK_IMAGES[1],
    imageUrls?.[2] || FALLBACK_IMAGES[2],
  ]

  return (
    <section className="py-24 md:py-32" style={{ backgroundColor: '#080B18' }}>
      <div className="container mx-auto px-6">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          {/* Left: text */}
          <div>
            <h2 className="font-heading font-black uppercase leading-none mb-6">
              <span className="block text-white text-5xl md:text-6xl lg:text-7xl tracking-tight">
                {heading?.split(' ').slice(0, 2).join(' ') || 'More Than'}
              </span>
              <span
                className="block font-accent italic text-5xl md:text-6xl lg:text-7xl"
                style={{ color: '#2D5C26' }}
              >
                {heading?.split(' ').slice(2).join(' ') || 'A Run'}
              </span>
            </h2>
            <p className="text-base leading-relaxed mb-10 max-w-md" style={{ color: '#9a9a8a' }}>
              {body || DUMMY_BODY}
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Link
                href="/about"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full border-2 border-white text-white text-sm font-semibold tracking-wide transition-all hover:bg-white/10"
              >
                {ctaLabel || 'Learn More About Us'}
              </Link>
              <a
                href="/#join"
                className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90"
                style={{ backgroundColor: '#2D5C26', color: '#ffffff' }}
              >
                Join the Club
              </a>
            </div>
          </div>

          {/* Right: image collage */}
          <div className="grid grid-cols-2 gap-3">
            <div className="relative h-60 rounded-2xl overflow-hidden col-span-2">
              <Image src={images[0]} alt="Trail running" fill className="object-cover" />
            </div>
            <div className="relative h-44 rounded-2xl overflow-hidden bg-white/5">
              <Image src={images[1]} alt="Trail scenery" fill className="object-cover" />
            </div>
            <div className="relative h-44 rounded-2xl overflow-hidden bg-white/5">
              <Image src={images[2]} alt="Trail community" fill className="object-cover object-bottom" />
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

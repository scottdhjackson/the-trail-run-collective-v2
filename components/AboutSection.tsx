import Image from 'next/image'
import Link from 'next/link'

interface AboutSectionProps {
  heading?: string
  body?: string
  ctaLabel?: string
  backgroundImageUrl?: string
}

const DUMMY_BODY =
  'The Trail Run Collective was born out of a simple belief: that the mountains, forests, and trails are for everyone. We organise trail running events across the UK for runners of all abilities — from those lacing up for their first off-road adventure to seasoned ultra runners chasing their next big challenge. Every event we create is built around community, breathtaking landscapes, and the shared experience of pushing beyond the ordinary. We handle the logistics so you can focus on the run.'

export function AboutSection({ heading, body, ctaLabel, backgroundImageUrl }: AboutSectionProps) {
  const imageSrc = backgroundImageUrl || '/images/miguel-a-amutio-QDv-uBc-poY-unsplash.jpg'

  return (
    <section className="relative w-full min-h-[500px] flex items-center justify-center overflow-hidden">
      {/* Background image */}
      <Image
        src={imageSrc}
        alt="Trail runners at the start line"
        fill
        className="object-cover object-center"
        priority={false}
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/60" />

      {/* Content */}
      <div className="relative z-10 text-center text-white px-4 py-24 max-w-3xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          {heading || 'About The Trail Run Collective'}
        </h2>
        <p className="text-lg md:text-xl leading-relaxed text-white/90 mb-10">
          {body || DUMMY_BODY}
        </p>
        <Link
          href="/about"
          className="inline-block border-2 border-white text-white font-semibold uppercase tracking-widest text-sm px-8 py-3 hover:bg-white hover:text-black transition-colors duration-200"
        >
          {ctaLabel || 'Learn More About Us'}
        </Link>
      </div>
    </section>
  )
}

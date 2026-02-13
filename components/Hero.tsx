import Image from 'next/image'
import { Button } from '@/components/ui/button'

export function Hero() {
  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden mt-16">
      <div className="absolute inset-0 top-0 z-0">
        <Image
          src="/images/hero.jpg"
          alt="Trail running at Box Hill"
          fill
          className="object-cover object-center brightness-[0.7]"
          priority
        />
      </div>

      <div className="relative z-10 container mx-auto px-4 text-center text-white">
        <h1 className="text-5xl md:text-7xl font-bold tracking-tight mb-6">
          The Trail Run Collective
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto font-light">
          Discover epic trail and ultra running events across the UK.
        </p>
        <p className="text-lg md:text-xl mb-8 max-w-3xl mx-auto font-light">
          Join thrilling, well-supported races from 10 miles to 50 miles, perfect for beginners, seasoned runners, and everyone in between.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            asChild
            className="text-lg px-8 py-6"
          >
            <a href="#events">View Events</a>
          </Button>
          <Button
            size="lg"
            variant="outline"
            asChild
            className="text-lg px-8 py-6 bg-white/10 backdrop-blur hover:bg-white/20 border-white text-white"
          >
            <a href="#join">Join our mailing list</a>
          </Button>
        </div>
      </div>
    </section>
  )
}

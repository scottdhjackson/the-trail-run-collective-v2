import { Header } from '@/components/Header'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import Link from 'next/link'

export const revalidate = 60

const DUMMY_BODY =
  'The Trail Run Collective was born out of a simple belief: that the mountains, forests, and trails are for everyone. We organise trail running events across the UK for runners of all abilities — from those lacing up for their first off-road adventure to seasoned ultra runners chasing their next big challenge. Every event we create is built around community, breathtaking landscapes, and the shared experience of pushing beyond the ordinary. We handle the logistics so you can focus on the run.'

export default async function AboutPage() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)

  const heading = settings?.aboutHeading || 'About The Trail Run Collective'
  const body = settings?.aboutBody || DUMMY_BODY

  return (
    <>
      <Header />
      <main className="min-h-screen">
        <section className="py-24 bg-background">
          <div className="container mx-auto px-4 max-w-3xl">
            <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">{heading}</h1>
            <p className="text-lg text-muted-foreground leading-relaxed mb-12">{body}</p>
            <Link
              href="/#events"
              className="inline-block bg-primary text-primary-foreground font-semibold uppercase tracking-widest text-sm px-8 py-3 hover:opacity-90 transition-opacity"
            >
              View Our Events
            </Link>
          </div>
        </section>
      </main>
    </>
  )
}

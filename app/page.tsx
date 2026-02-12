import { Header } from '@/components/Header'
import { Hero } from '@/components/Hero'
import { EventsSection } from '@/components/EventsSection'
import { SignupSection } from '@/components/SignupSection'
import { ContactSection } from '@/components/ContactSection'
import { client } from '@/sanity/lib/client'
import { EVENTS_QUERY } from '@/sanity/lib/queries'
import { generateEventSchema, siteMetadata } from '@/lib/metadata'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const events = await client.fetch(EVENTS_QUERY)

  // Generate event schemas
  const eventSchemas = events.map((event: {
    title: string
    shortDescription: string
    location: string
    date: string
    slug: { current: string }
  }) =>
    generateEventSchema({
      title: event.title,
      description: event.shortDescription,
      location: event.location,
      date: event.date,
      url: `${siteMetadata.url}#events`,
    })
  )

  return (
    <>
      <Header />
      <main>
        <Hero />
        <EventsSection events={events} />
        <SignupSection />
        <ContactSection />

        <footer className="py-12 bg-muted/30 text-center">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground">
              © {new Date().getFullYear()} The Trail Run Collective. All rights reserved.
            </p>
          </div>
        </footer>
      </main>

      {eventSchemas.map((schema, index) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

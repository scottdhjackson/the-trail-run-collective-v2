import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { Footer } from '@/components/Footer'
import { Hero } from '@/components/Hero'
import { EventsSection } from '@/components/EventsSection'
import { AboutSection } from '@/components/AboutSection'
import { SignupSection } from '@/components/SignupSection'
import { ContactSection } from '@/components/ContactSection'
import { client } from '@/sanity/lib/client'
import { EVENTS_QUERY, PAGE_BY_SLUG_QUERY, SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { generateEventSchema, siteMetadata } from '@/lib/metadata'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const [events, settings, aboutPage] = await Promise.all([
    client.fetch(EVENTS_QUERY),
    client.fetch(SITE_SETTINGS_QUERY),
    client.fetch(PAGE_BY_SLUG_QUERY, { slug: 'about' }),
  ])

  // Generate event schemas
  const eventSchemas = events.map((event: {
    title: string
    shortDescription: string
    longDescription?: string
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
      <HeaderWithSettings />
      <main>
        <Hero
          mediaType={settings?.heroBannerMediaType}
          bannerImageUrl={settings?.heroBannerImageUrl}
          videoDesktopUrl={settings?.heroBannerVideoDesktopUrl}
          videoMobileUrl={settings?.heroBannerVideoMobileUrl}
        />
        <EventsSection events={events} />
<SignupSection />
        <AboutSection
          heading={aboutPage?.title}
          body={aboutPage?.excerpt || aboutPage?.body?.split(/\n\n+/)[0]}
          ctaLabel="Learn More About Us"
          images={settings?.aboutImages}
        />
        <ContactSection contactEmail={settings?.contactEmail} />

      </main>
      <Footer />

      {eventSchemas.map((schema: any, index: number) => (
        <script
          key={index}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  )
}

import { client } from '@/sanity/lib/client'
import { EVENT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { Header } from '@/components/Header'
import { EventHero } from '@/components/event-details/EventHero'
import { EventIntro } from '@/components/event-details/EventIntro'
import { EventLocation } from '@/components/event-details/EventLocation'
import { EventRoutesSummary } from '@/components/event-details/EventRoutesSummary'
import { EventDetails } from '@/components/event-details/EventDetails'
import { EventPrices } from '@/components/event-details/EventPrices'
import { EventRoutes } from '@/components/event-details/EventRoutes'
import { EventPartnerPromo } from '@/components/event-details/EventPartnerPromo'
import { EventWhatYouGet } from '@/components/event-details/EventWhatYouGet'
import { EventPhotoGallery } from '@/components/event-details/EventPhotoGallery'
import { EventReviews } from '@/components/event-details/EventReviews'
import { EventGettingThere } from '@/components/event-details/EventGettingThere'
import { EventStickyFooter } from '@/components/event-details/EventStickyFooter'
import { KitList } from '@/components/KitList'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })

  if (!event) {
    notFound()
  }

  const lowestPrice = event.distances
    .filter((d: any) => d.price)
    .reduce((min: number, d: any) => (d.price < min ? d.price : min), Infinity)

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        {/* 1. Hero */}
        <EventHero
          title={event.title}
          date={event.date}
          heroImageUrl={event.heroImageUrl}
        />

        {/* 2. Intro Block */}
        <EventIntro
          title={event.title}
          date={event.date}
          location={event.location}
          description={event.longDescription}
        />

        {/* 3. Race Overview Section */}
        <section id="race-overview" className="py-16 bg-muted/30">
          <div className="container mx-auto px-4 max-w-7xl">
            <h2 className="text-3xl font-bold mb-12 text-center">Race Overview</h2>

            {/* Horizontal Layout for Overview Items */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
              {/* 3a. Location */}
              <div className="bg-background rounded-lg p-6 shadow-sm">
                <EventLocation
                  venueName={event.venueName}
                  town={event.town}
                  county={event.county}
                  postcode={event.postcode}
                  googleMapsLink={event.googleMapsLink}
                  what3words={event.what3words}
                  locationImageUrl={event.locationImageUrl}
                />
              </div>

              {/* 3b. Routes Summary */}
              <div className="bg-secondary/20 rounded-lg p-6 shadow-sm">
                <EventRoutesSummary distances={event.distances} />
              </div>

              {/* 3c. Registration */}
              <div className="bg-accent/20 rounded-lg p-6 shadow-sm">
                <EventDetails
                  registrationOpens={event.registrationOpens}
                  registrationCloses={event.registrationCloses}
                  startTime={event.startTime}
                />
              </div>

              {/* 3d. Difficulty */}
              {event.difficultyDescription && (
                <div className="bg-primary/10 rounded-lg p-6 shadow-sm">
                  <div id="difficulty">
                    <h3 className="text-xl font-semibold mb-4">Difficulty</h3>
                    <p className="text-muted-foreground text-sm mb-2">{event.difficultyDescription}</p>
                    <a href="#routes" className="text-primary hover:underline text-sm">More Info →</a>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* 4. Prices Section */}
        <EventPrices distances={event.distances} eventSlug={event.slug.current} />

        {/* 5. The Routes Section */}
        <EventRoutes distances={event.distances} />

        {/* 6. Partner Promo */}
        {event.showPartnerPromo && (
          <EventPartnerPromo
            partnerName={event.partnerName}
            partnerLogoUrl={event.partnerLogoUrl}
            partnerDescription={event.partnerDescription}
            partnerLink={event.partnerLink}
          />
        )}

        {/* 7. More Information */}
        <section id="more-info" className="py-16 bg-secondary/10">
          <div className="container mx-auto px-4 max-w-6xl">
            <h2 className="text-3xl font-bold mb-12 text-center">More Information</h2>

            {/* 8. What You Get */}
            {event.whatYouGet && event.whatYouGet.length > 0 && (
              <EventWhatYouGet items={event.whatYouGet} />
            )}

            {/* 9. Essential Items Checklist */}
            {event.kitList && (
              <div id="kit-list" className="mt-16">
                <h3 className="text-2xl font-semibold mb-8">Essential Items</h3>
                {event.showKitListInline ? (
                  <KitList
                    title={event.kitList.title}
                    requiredEquipment={event.kitList.requiredEquipment}
                    importantNotes={[]}
                    footerText=""
                  />
                ) : (
                  <Link
                    href={`/kit-list/${event.kitList.slug.current}`}
                    className="text-primary hover:underline text-lg"
                  >
                    View the full kit list →
                  </Link>
                )}
              </div>
            )}

            {/* 10. Photo Gallery */}
            {event.showPhotoGallery && event.galleryImages && (
              <EventPhotoGallery
                images={event.galleryImages}
                galleryLink={event.galleryLink}
              />
            )}

            {/* 11. Reviews */}
            {event.showReviews && event.reviews && (
              <EventReviews reviews={event.reviews} />
            )}

            {/* 12. Getting to the Race */}
            {event.showGettingThere && (
              <EventGettingThere
                byCar={event.gettingThereByCar}
                trainStation={event.gettingThereByTrainStation}
                trainRoute={event.gettingThereByTrainRoute}
                trainTime={event.gettingThereByTrainTime}
                taxiCompany={event.gettingThereByTaxiCompany}
                taxiPhone={event.gettingThereByTaxiPhone}
              />
            )}
          </div>
        </section>

        {/* Footer */}
        <footer className="py-12 bg-muted/30 text-center">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-2">
              © {new Date().getFullYear()} The Trail Run Collective. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground space-x-4">
              <Link href="/faq" className="hover:text-primary underline">
                FAQs
              </Link>
              <span>•</span>
              <Link href="/kit-list/required-equipment" className="hover:text-primary underline">
                Kit List
              </Link>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-primary underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </footer>
      </main>

      {/* 13. Sticky Footer */}
      <EventStickyFooter
        eventName={event.title}
        date={event.date}
        fromPrice={lowestPrice}
        eventSlug={event.slug.current}
      />
    </>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })

  if (!event) {
    return {
      title: 'Event Not Found',
    }
  }

  return {
    title: `${event.title} | The Trail Run Collective`,
    description: event.shortDescription || event.longDescription,
  }
}

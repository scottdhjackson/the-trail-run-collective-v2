import { client } from '@/sanity/lib/client'
import { EVENT_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { EventHero } from '@/components/event-details/EventHero'
import { EventRegistrationCard } from '@/components/event-details/EventRegistrationCard'
import { EventLocation } from '@/components/event-details/EventLocation'
import { EventDetails } from '@/components/event-details/EventDetails'
import { EventPartnerPromo } from '@/components/event-details/EventPartnerPromo'
import { EventWhatYouGet } from '@/components/event-details/EventWhatYouGet'
import { EventPhotoGallery } from '@/components/event-details/EventPhotoGallery'
import { EventReviews } from '@/components/event-details/EventReviews'
import { EventGettingThere } from '@/components/event-details/EventGettingThere'
import { EventStickyFooter } from '@/components/event-details/EventStickyFooter'
import { KitList } from '@/components/KitList'
import { Reveal } from '@/components/Reveal'
import { Footer } from '@/components/Footer'
import { notFound } from 'next/navigation'
import Link from 'next/link'

export const revalidate = 60

export default async function EventDetailsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })

  if (!event) {
    notFound()
  }

  const primaryDistance = event.distances?.[0]
  const price = primaryDistance?.price ?? null

  return (
    <>
      <HeaderWithSettings />
      <main className="min-h-screen" style={{ backgroundColor: '#F2EDE3' }}>

        {/* Hero */}
        <EventHero
          title={event.title}
          date={event.date}
          location={event.location}
          heroImageUrl={event.heroImageUrl}
          slug={event.slug.current}
          distanceLabel={primaryDistance?.label}
          difficultyDescription={event.difficultyDescription}
        />

        {/* Two-column body */}
        <section className="container mx-auto px-6 py-14 max-w-6xl">
          <div className="flex flex-col lg:flex-row gap-12">

            {/* Left column */}
            <div className="flex-1 min-w-0">

              {/* Race Overview */}
              <Reveal>
                <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight mb-5" style={{ color: '#0C0F1E' }}>
                  Race Overview
                </h2>
                {event.longDescription && (
                  <div className="text-base leading-relaxed whitespace-pre-line space-y-4" style={{ color: '#6B6558' }}>
                    {event.longDescription.split('\n\n').map((para: string, i: number) => (
                      <p key={i}>{para}</p>
                    ))}
                  </div>
                )}
              </Reveal>

              {/* What's Included */}
              {event.whatYouGet && event.whatYouGet.length > 0 && (
                <Reveal>
                  <EventWhatYouGet items={event.whatYouGet} />
                </Reveal>
              )}

              {/* Kit List */}
              {event.kitList && (
                <div id="kit-list" className="mt-10">
                  <Reveal>
                    <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight mb-5" style={{ color: '#0C0F1E' }}>
                      Essential Kit
                    </h2>
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
                        className="inline-flex items-center gap-2 text-sm font-semibold underline underline-offset-4"
                        style={{ color: '#2D5C26' }}
                      >
                        View the full kit list →
                      </Link>
                    )}
                  </Reveal>
                </div>
              )}

              {/* Key Details */}
              {(event.venueName || event.town || event.registrationOpens || event.startTime) && (
                <Reveal className="mt-10">
                  <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight mb-8" style={{ color: '#0C0F1E' }}>
                    Key Details
                  </h2>
                  <div className="flex flex-col sm:flex-row gap-12">
                    {(event.venueName || event.town) && (
                      <EventLocation
                        venueName={event.venueName}
                        town={event.town}
                        county={event.county}
                        postcode={event.postcode}
                        googleMapsLink={event.googleMapsLink}
                        what3words={event.what3words}
                        locationImageUrl={event.locationImageUrl}
                      />
                    )}
                    {(event.registrationOpens || event.startTime) && (
                      <EventDetails
                        registrationOpens={event.registrationOpens}
                        registrationCloses={event.registrationCloses}
                        startTime={event.startTime}
                      />
                    )}
                  </div>
                </Reveal>
              )}

            </div>

            {/* Right column — registration card */}
            {primaryDistance && (
              <div className="w-full lg:w-80 shrink-0">
                <div className="lg:sticky lg:top-24">
                  <Reveal from="right" delay={200}>
                    <EventRegistrationCard
                      distance={primaryDistance}
                      eventSlug={event.slug.current}
                      bookingLink={event.bookingLink}
                      comingSoon={event.comingSoon}
                    />
                  </Reveal>
                </div>
              </div>
            )}
          </div>
        </section>


        {/* Partner Promo */}
        {event.showPartnerPromo && (
          <EventPartnerPromo
            partnerName={event.partnerName}
            partnerLogoUrl={event.partnerLogoUrl}
            partnerDescription={event.partnerDescription}
            partnerLink={event.partnerLink}
          />
        )}

        {/* Photo Gallery */}
        {event.showPhotoGallery && event.galleryImages && (
          <section className="container mx-auto px-6 py-14 max-w-6xl">
            <EventPhotoGallery
              images={event.galleryImages}
              galleryLink={event.galleryLink}
            />
          </section>
        )}

        {/* Reviews */}
        {event.showReviews && event.reviews && (
          <section className="container mx-auto px-6 pb-14 max-w-6xl">
            <Reveal>
              <EventReviews reviews={event.reviews} />
            </Reveal>
          </section>
        )}

        {/* Getting There */}
        {event.showGettingThere && (
          <section className="container mx-auto px-6 pb-14 max-w-6xl">
            <Reveal>
              <EventGettingThere
                byCar={event.gettingThereByCar}
                trainStation={event.gettingThereByTrainStation}
                trainRoute={event.gettingThereByTrainRoute}
                trainTime={event.gettingThereByTrainTime}
                taxiCompany={event.gettingThereByTaxiCompany}
                taxiPhone={event.gettingThereByTaxiPhone}
              />
            </Reveal>
          </section>
        )}

      </main>
      <Footer />

      {/* Sticky Footer */}
      {price && (
        <EventStickyFooter
          eventName={event.title}
          date={event.date}
          fromPrice={price}
          eventSlug={event.slug.current}
        />
      )}
    </>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const event = await client.fetch(EVENT_BY_SLUG_QUERY, { slug })

  if (!event) {
    return { title: 'Event Not Found' }
  }

  const title = event.seoTitle || event.title
  const description = event.seoDescription || event.shortDescription || event.longDescription

  return {
    title: `${title} | The Trail Run Collective`,
    description,
  }
}

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
import { EventMap } from '@/components/event-details/EventMap'
import { directionsUrlFor } from '@/components/event-details/LocationLinks'
import { EventRoutes, type RouteView } from '@/components/event-details/EventRoutes'
import { KitList } from '@/components/KitList'
import { Reveal } from '@/components/Reveal'
import { geocodeUkPostcode, parseLatLng } from '@/lib/geo'
import { buildRouteData } from '@/lib/gpx'
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

  // Exact pin from Sanity if set, otherwise the postcode's centre point
  const mapPosition = parseLatLng(event.mapPin) ?? (await geocodeUkPostcode(event.postcode))

  const routes = await buildRouteViews(event.slug.current, event.distances ?? [])

  // The route map already shows where the race is, so only show the separate
  // location map when there's no route. Otherwise the venue links live in Getting There.
  const showLocationMap = !!mapPosition && routes.length === 0
  const venueAddress = [event.venueName, event.postcode].filter(Boolean).join(', ')
  const venueLinks = showLocationMap
    ? undefined
    : {
        address: venueAddress || undefined,
        what3words: event.what3words,
        googleMapsLink: event.googleMapsLink,
        directionsUrl: directionsUrlFor(mapPosition, [event.venueName, event.town, event.postcode].filter(Boolean).join(', ')),
      }
  const hasVenueLinks = !!venueLinks && Object.values(venueLinks).some(Boolean)

  const registrationCard = primaryDistance && (
    <EventRegistrationCard
      // Only pass what the card shows — it's a client component, so anything passed is
      // visible in the page source (e.g. the raw GPX URL with personal activity data)
      distance={{
        _key: primaryDistance._key,
        label: primaryDistance.label,
        distanceValue: primaryDistance.distanceValue,
        distanceUnit: primaryDistance.distanceUnit,
        elevationGain: primaryDistance.elevationGain,
        elevationUnit: primaryDistance.elevationUnit,
        price: primaryDistance.price,
        isOpen: primaryDistance.isOpen,
      }}
      eventSlug={event.slug.current}
      bookingLink={event.bookingLink}
      comingSoon={event.comingSoon}
    />
  )

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

            {/* Right column — registration card (desktop; mobile shows it at the bottom of the page) */}
            {registrationCard && (
              <div className="hidden lg:block w-80 shrink-0">
                <div className="sticky top-24">
                  <Reveal from="right" delay={200}>
                    {registrationCard}
                  </Reveal>
                </div>
              </div>
            )}
          </div>
        </section>

        {/* Route map, elevation profile and GPX download */}
        {routes.length > 0 && (
          <section className="container mx-auto px-6 pb-14 max-w-6xl">
            <Reveal>
              <EventRoutes routes={routes} />
            </Reveal>
          </section>
        )}

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

        {/* Location map — only when there's no route map */}
        {showLocationMap && mapPosition && (
          <section className="container mx-auto px-6 pb-14 max-w-6xl">
            <Reveal>
              <EventMap
                position={mapPosition}
                venueName={event.venueName}
                postcode={event.postcode}
                googleMapsLink={event.googleMapsLink}
                what3words={event.what3words}
              />
            </Reveal>
          </section>
        )}

        {/* Getting There (+ venue links when there's no location map) */}
        {(event.showGettingThere || hasVenueLinks) && (
          <section className="container mx-auto px-6 pb-20 max-w-6xl">
            <Reveal>
              <EventGettingThere
                venue={hasVenueLinks ? venueLinks : undefined}
                {...(event.showGettingThere && {
                  byCar: event.gettingThereByCar,
                  trainStation: event.gettingThereByTrainStation,
                  trainRoute: event.gettingThereByTrainRoute,
                  trainTime: event.gettingThereByTrainTime,
                  taxiCompany: event.gettingThereByTaxiCompany,
                  taxiPhone: event.gettingThereByTaxiPhone,
                })}
              />
            </Reveal>
          </section>
        )}

        {/* Registration card — mobile only, last thing before the footer */}
        {registrationCard && (
          <section className="lg:hidden container mx-auto px-6 pb-20 max-w-6xl">
            <Reveal>{registrationCard}</Reveal>
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

type DistanceWithRoute = {
  _key: string
  label: string
  description?: string
  distanceValue?: number
  distanceUnit?: 'km' | 'mi'
  elevationGain?: number
  elevationUnit?: 'm' | 'ft'
  gpxFileUrl?: string
}

/**
 * Parse each distance's GPX into map/profile data. Figures entered in Sanity take
 * priority; anything missing is calculated from the GPX. Distances without a
 * usable GPX are skipped.
 */
async function buildRouteViews(slug: string, distances: DistanceWithRoute[]): Promise<RouteView[]> {
  const views = await Promise.all(
    distances.map(async (distance): Promise<RouteView | null> => {
      if (!distance.gpxFileUrl) return null
      try {
        const res = await fetch(distance.gpxFileUrl, { next: { revalidate: 3600 } })
        if (!res.ok) return null
        const data = buildRouteData(await res.text())
        if (!data) return null

        const distUnit = distance.distanceUnit ?? (distance.elevationUnit === 'ft' ? 'mi' : 'km')
        const eleUnit = distance.elevationUnit ?? (distUnit === 'mi' ? 'ft' : 'm')
        const toDist = (m: number) => (distUnit === 'mi' ? m / 1609.344 : m / 1000)
        const toEle = (m: number) => Math.round(eleUnit === 'ft' ? m * 3.28084 : m).toLocaleString('en-GB')

        return {
          key: distance._key,
          label: distance.label,
          description: distance.description,
          points: data.points,
          distanceM: data.distanceM,
          isLoop: data.isLoop,
          distanceText: distance.distanceValue
            ? `${distance.distanceValue} ${distance.distanceUnit ?? distUnit}`
            : `${toDist(data.distanceM).toFixed(1)} ${distUnit}`,
          climbText: distance.elevationGain
            ? `${distance.elevationGain.toLocaleString('en-GB')} ${eleUnit}`
            : data.ascentM !== null
              ? `${toEle(data.ascentM)} ${eleUnit}`
              : null,
          highPointText: data.maxEleM !== null ? `${toEle(data.maxEleM)} ${eleUnit}` : null,
          distUnit,
          eleUnit,
          downloadUrl: `/api/gpx/${slug}/${distance._key}`,
        }
      } catch {
        return null
      }
    })
  )
  return views.filter((v): v is RouteView => v !== null)
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

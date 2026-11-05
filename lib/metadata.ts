import { Metadata } from 'next'

export const siteMetadata = {
  title: 'The Trail Run Collective',
  description: 'UK trail & ultra events — Solstice specials at Box Hill, Surrey',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}

export function generateMetadata(overrides?: {
  title?: string
  description?: string
  heroImageUrl?: string
}): Metadata {
  const title = overrides?.title || siteMetadata.title
  const description = overrides?.description || siteMetadata.description
  const ogImages = overrides?.heroImageUrl
    ? [{ url: overrides.heroImageUrl, width: 1200, height: 630, alt: title }]
    : []
  return {
    title,
    description,
    metadataBase: new URL(siteMetadata.url),
    // './' resolves to each page's own URL, so every page gets the right canonical / share link
    alternates: { canonical: './' },
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: './',
      title,
      description,
      siteName: title,
      ...(ogImages.length > 0 && { images: ogImages }),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      ...(overrides?.heroImageUrl && { images: [overrides.heroImageUrl] }),
    },
  }
}

export function generateOrganizationSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: siteMetadata.title,
    url: siteMetadata.url,
    description: siteMetadata.description,
  }
}

/** Absolute URL for an event's own page */
export function eventUrl(slug: string) {
  return `${siteMetadata.url}/events/${slug}`
}

export function generateEventSchema(event: {
  title: string
  description: string
  location: string
  date: string
  url: string
  image?: string
  venueName?: string
  town?: string
  county?: string
  postcode?: string
  price?: number
  bookingUrl?: string
  isOpen?: boolean
}) {
  const address = [event.town, event.county, event.postcode].some(Boolean)
    ? {
        '@type': 'PostalAddress',
        ...(event.town && { addressLocality: event.town }),
        ...(event.county && { addressRegion: event.county }),
        ...(event.postcode && { postalCode: event.postcode }),
        addressCountry: 'GB',
      }
    : undefined

  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.title,
    description: event.description,
    startDate: event.date,
    eventStatus: 'https://schema.org/EventScheduled',
    eventAttendanceMode: 'https://schema.org/OfflineEventAttendanceMode',
    location: {
      '@type': 'Place',
      name: event.venueName || event.location,
      ...(address && { address }),
    },
    url: event.url,
    ...(event.image && { image: [event.image] }),
    ...(event.price != null && {
      offers: {
        '@type': 'Offer',
        price: event.price,
        priceCurrency: 'GBP',
        url: event.bookingUrl || event.url,
        availability: event.isOpen ? 'https://schema.org/InStock' : 'https://schema.org/SoldOut',
      },
    }),
    organizer: {
      '@type': 'Organization',
      name: siteMetadata.title,
      url: siteMetadata.url,
    },
  }
}

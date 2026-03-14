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
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: siteMetadata.url,
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

export function generateEventSchema(event: {
  title: string
  description: string
  location: string
  date: string
  url: string
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'SportsEvent',
    name: event.title,
    description: event.description,
    location: {
      '@type': 'Place',
      name: event.location,
    },
    startDate: event.date,
    url: event.url,
    organizer: {
      '@type': 'Organization',
      name: siteMetadata.title,
    },
  }
}

import { Metadata } from 'next'

export const siteMetadata = {
  title: 'The Trail Run Collective',
  description: 'UK trail & ultra events — Solstice specials at Box Hill, Surrey',
  url: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
}

export function generateMetadata(): Metadata {
  return {
    title: siteMetadata.title,
    description: siteMetadata.description,
    metadataBase: new URL(siteMetadata.url),
    openGraph: {
      type: 'website',
      locale: 'en_GB',
      url: siteMetadata.url,
      title: siteMetadata.title,
      description: siteMetadata.description,
      siteName: siteMetadata.title,
    },
    twitter: {
      card: 'summary_large_image',
      title: siteMetadata.title,
      description: siteMetadata.description,
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

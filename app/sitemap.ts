import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { EVENTS_QUERY, PAGES_SLUGS_QUERY } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const [events, pages] = await Promise.all([
    client.fetch(EVENTS_QUERY),
    client.fetch(PAGES_SLUGS_QUERY),
  ])

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/volunteer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const eventPages: MetadataRoute.Sitemap = events.map((event: { slug: { current: string } }) => ({
    url: `${baseUrl}/events/${event.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  const sanityPages: MetadataRoute.Sitemap = pages
    .filter((p: { slug: string | null }) => p.slug)
    .map((p: { slug: string }) => ({
      url: `${baseUrl}/${p.slug}`,
      lastModified: new Date(),
      changeFrequency: 'monthly' as const,
      priority: 0.7,
    }))

  return [...staticPages, ...eventPages, ...sanityPages]
}

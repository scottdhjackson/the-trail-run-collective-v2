import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { EVENTS_QUERY } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const events = await client.fetch(EVENTS_QUERY)

  const staticPages: MetadataRoute.Sitemap = [
    { url: baseUrl, lastModified: new Date(), changeFrequency: 'weekly', priority: 1 },
    { url: `${baseUrl}/events`, lastModified: new Date(), changeFrequency: 'weekly', priority: 0.9 },
    { url: `${baseUrl}/about`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.7 },
    { url: `${baseUrl}/faq`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.6 },
    { url: `${baseUrl}/volunteer`, lastModified: new Date(), changeFrequency: 'monthly', priority: 0.5 },
  ]

  const eventPages: MetadataRoute.Sitemap = events.map((event: { slug: { current: string } }) => ({
    url: `${baseUrl}/events/${event.slug.current}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [...staticPages, ...eventPages]
}

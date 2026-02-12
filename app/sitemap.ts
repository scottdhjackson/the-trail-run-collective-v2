import { MetadataRoute } from 'next'
import { client } from '@/sanity/lib/client'
import { EVENTS_QUERY } from '@/sanity/lib/queries'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'

  const events = await client.fetch(EVENTS_QUERY)

  const eventUrls = events.map((event: { slug: { current: string } }) => ({
    url: `${baseUrl}#events`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))

  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
    },
    ...eventUrls,
  ]
}

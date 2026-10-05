import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { toCleanGpx } from '@/lib/gpx'

export const revalidate = 3600

const ROUTE_GPX_QUERY = `*[_type == "event" && slug.current == $slug && isPublished == true][0]
  .distances[_key == $key][0]{ label, "gpx": gpxFile.asset->{ url, originalFilename } }`

/**
 * Serves a cleaned copy of a distance's GPX file (route + elevation only),
 * so personal data in the original recording (heart rate, timestamps, etc.) isn't shared.
 */
export async function GET(_request: Request, { params }: { params: Promise<{ slug: string; key: string }> }) {
  const { slug, key } = await params
  if (!/^[\w-]+$/.test(slug) || !/^[\w-]+$/.test(key)) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const distance = await client.fetch(ROUTE_GPX_QUERY, { slug, key })
  if (!distance?.gpx?.url) {
    return NextResponse.json({ error: 'Not found' }, { status: 404 })
  }

  const res = await fetch(distance.gpx.url, { next: { revalidate: 3600 } })
  if (!res.ok) {
    return NextResponse.json({ error: 'Route file unavailable' }, { status: 502 })
  }

  const baseName = (distance.gpx.originalFilename || `${slug}-${distance.label || 'route'}`)
    .replace(/\.gpx$/i, '')
    .replace(/[^\w.-]+/g, '_')

  return new NextResponse(toCleanGpx(await res.text(), distance.label || slug), {
    headers: {
      'Content-Type': 'application/gpx+xml; charset=utf-8',
      'Content-Disposition': `attachment; filename="${baseName}.gpx"`,
      'Cache-Control': 'public, s-maxage=3600, stale-while-revalidate=86400',
    },
  })
}

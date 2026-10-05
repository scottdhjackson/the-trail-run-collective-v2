/**
 * Minimal GPX helpers for event routes. Server-side only: parses track/route
 * points, derives distance + climb, and produces a privacy-safe GPX for download.
 */

export type GpxPoint = { lat: number; lng: number; ele: number | null }

/** A simplified point sent to the browser: position, distance along route (m), elevation (m) */
export type RoutePoint = { lat: number; lng: number; d: number; e: number | null }

export type RouteData = {
  name?: string
  points: RoutePoint[]
  distanceM: number
  ascentM: number | null
  descentM: number | null
  maxEleM: number | null
  minEleM: number | null
  isLoop: boolean
}

const POINT_RE = /<(trkpt|rtept)\b([^>]*?)(?:\/>|>([\s\S]*?)<\/\1>)/g
const attr = (attrs: string, name: string) => attrs.match(new RegExp(`\\b${name}\\s*=\\s*["']([^"']+)["']`))?.[1]

export function parseGpx(xml: string): { name?: string; points: GpxPoint[] } {
  const points: GpxPoint[] = []
  for (const [, , attrs, body] of xml.matchAll(POINT_RE)) {
    const lat = parseFloat(attr(attrs, 'lat') ?? '')
    const lng = parseFloat(attr(attrs, 'lon') ?? '')
    if (!Number.isFinite(lat) || !Number.isFinite(lng)) continue
    const eleText = body?.match(/<ele>\s*([^<]+?)\s*<\/ele>/)?.[1]
    const ele = eleText !== undefined ? parseFloat(eleText) : NaN
    points.push({ lat, lng, ele: Number.isFinite(ele) ? ele : null })
  }
  const name = xml.match(/<(?:trk|rte)>[\s\S]*?<name>([\s\S]*?)<\/name>/)?.[1]?.trim()
  return { name: name ? decodeXml(name) : undefined, points }
}

/** Great-circle distance in metres */
function haversine(a: GpxPoint, b: GpxPoint) {
  const R = 6371000
  const toRad = (x: number) => (x * Math.PI) / 180
  const dLat = toRad(b.lat - a.lat)
  const dLng = toRad(b.lng - a.lng)
  const h = Math.sin(dLat / 2) ** 2 + Math.cos(toRad(a.lat)) * Math.cos(toRad(b.lat)) * Math.sin(dLng / 2) ** 2
  return 2 * R * Math.asin(Math.sqrt(h))
}

/**
 * Total climb/descent with a small dead-band so GPS elevation jitter
 * doesn't inflate the numbers.
 */
function climb(elevations: number[], threshold = 3) {
  if (elevations.length < 2) return { ascent: 0, descent: 0 }
  let ascent = 0
  let descent = 0
  let ref = elevations[0]
  for (const e of elevations) {
    if (e - ref >= threshold) {
      ascent += e - ref
      ref = e
    } else if (ref - e >= threshold) {
      descent += ref - e
      ref = e
    }
  }
  return { ascent, descent }
}

/** Light moving-average to smooth the elevation line for display */
function smooth(values: (number | null)[], radius = 2): (number | null)[] {
  return values.map((v, i) => {
    if (v === null) return null
    let sum = 0
    let n = 0
    for (let j = Math.max(0, i - radius); j <= Math.min(values.length - 1, i + radius); j++) {
      const x = values[j]
      if (x !== null) {
        sum += x
        n++
      }
    }
    return sum / n
  })
}

export function buildRouteData(xml: string, spacingM = 25): RouteData | null {
  const { name, points } = parseGpx(xml)
  if (points.length < 2) return null

  // Cumulative distance along the full-resolution track
  const cumulative = [0]
  for (let i = 1; i < points.length; i++) cumulative.push(cumulative[i - 1] + haversine(points[i - 1], points[i]))
  const distanceM = cumulative[cumulative.length - 1]

  const elevations = points.map((p) => p.ele).filter((e): e is number => e !== null)
  const hasEle = elevations.length > points.length * 0.8
  const { ascent, descent } = hasEle ? climb(elevations) : { ascent: 0, descent: 0 }

  // Downsample to roughly one point every `spacingM` metres for the browser
  const kept: RoutePoint[] = []
  let lastD = -Infinity
  points.forEach((p, i) => {
    const isLast = i === points.length - 1
    if (cumulative[i] - lastD >= spacingM || isLast) {
      kept.push({ lat: p.lat, lng: p.lng, d: Math.round(cumulative[i]), e: p.ele })
      lastD = cumulative[i]
    }
  })
  const smoothed = hasEle ? smooth(kept.map((p) => p.e)) : kept.map(() => null)
  kept.forEach((p, i) => (p.e = smoothed[i] === null ? null : Math.round(smoothed[i]! * 10) / 10))

  const keptEle = kept.map((p) => p.e).filter((e): e is number => e !== null)

  return {
    name,
    points: kept.map((p) => ({ ...p, lat: +p.lat.toFixed(6), lng: +p.lng.toFixed(6) })),
    distanceM,
    ascentM: hasEle ? ascent : null,
    descentM: hasEle ? descent : null,
    maxEleM: keptEle.length ? Math.max(...keptEle) : null,
    minEleM: keptEle.length ? Math.min(...keptEle) : null,
    isLoop: haversine(points[0], points[points.length - 1]) < 200,
  }
}

function escapeXml(text: string) {
  return text.replace(/[<>&"']/g, (c) => ({ '<': '&lt;', '>': '&gt;', '&': '&amp;', '"': '&quot;', "'": '&apos;' })[c]!)
}

function decodeXml(text: string) {
  return text
    .replace(/&lt;/g, '<')
    .replace(/&gt;/g, '>')
    .replace(/&quot;/g, '"')
    .replace(/&apos;/g, "'")
    .replace(/&amp;/g, '&')
}

/**
 * Rebuild a GPX containing only the route geometry + elevation. Strips
 * timestamps, heart rate, cadence and any other data from the original recording.
 */
export function toCleanGpx(xml: string, fallbackName: string): string {
  const { name, points } = parseGpx(xml)
  const title = escapeXml(name || fallbackName)
  const pts = points
    .map(
      (p) =>
        `      <trkpt lat="${p.lat.toFixed(7)}" lon="${p.lng.toFixed(7)}">${p.ele !== null ? `<ele>${p.ele.toFixed(1)}</ele>` : ''}</trkpt>`
    )
    .join('\n')
  return `<?xml version="1.0" encoding="UTF-8"?>
<gpx version="1.1" creator="The Trail Run Collective" xmlns="http://www.topografix.com/GPX/1/1">
  <metadata>
    <name>${title}</name>
  </metadata>
  <trk>
    <name>${title}</name>
    <type>trail_running</type>
    <trkseg>
${pts}
    </trkseg>
  </trk>
</gpx>
`
}

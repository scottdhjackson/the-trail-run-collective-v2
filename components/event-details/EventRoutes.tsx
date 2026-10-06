'use client'

import { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import { Download } from 'lucide-react'
import 'leaflet/dist/leaflet.css'
import type { RoutePoint } from '@/lib/gpx'

export type RouteView = {
  key: string
  label: string
  points: RoutePoint[]
  distanceM: number
  isLoop: boolean
  distanceText: string
  climbText: string | null
  highPointText: string | null
  distUnit: 'km' | 'mi'
  eleUnit: 'm' | 'ft'
  downloadUrl: string
}

const GREEN = '#2D5C26'
const NAVY = '#0C0F1E'
const MUTED = '#6B6558'

const toDist = (m: number, unit: 'km' | 'mi') => (unit === 'mi' ? m / 1609.344 : m / 1000)
const toEle = (m: number, unit: 'm' | 'ft') => (unit === 'ft' ? m * 3.28084 : m)

/** Index of the point closest to a distance along the route (points are sorted by `d`) */
function nearestIndex(points: RoutePoint[], d: number) {
  let lo = 0
  let hi = points.length - 1
  while (lo < hi) {
    const mid = (lo + hi) >> 1
    if (points[mid].d < d) lo = mid + 1
    else hi = mid
  }
  if (lo > 0 && Math.abs(points[lo - 1].d - d) < Math.abs(points[lo].d - d)) return lo - 1
  return lo
}

// ─── Map ──────────────────────────────────────────────────────────────────────

const START_HTML = `
<div style="width:30px;height:30px;border-radius:9999px;background:${GREEN};border:3px solid #fff;box-shadow:0 2px 6px rgba(0,0,0,.35);display:flex;align-items:center;justify-content:center">
  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round">
    <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"/><line x1="4" x2="4" y1="22" y2="15"/>
  </svg>
</div>`

function RouteMap({ route, hoverIndex }: { route: RouteView; hoverIndex: number | null }) {
  const containerRef = useRef<HTMLDivElement>(null)
  const mapRef = useRef<import('leaflet').Map | null>(null)
  const hoverMarkerRef = useRef<import('leaflet').CircleMarker | null>(null)

  useEffect(() => {
    let cancelled = false

    import('leaflet').then(({ default: L }) => {
      if (cancelled || !containerRef.current) return

      const map = L.map(containerRef.current, {
        scrollWheelZoom: false, // don't hijack page scrolling
        dragging: !L.Browser.mobile, // one-finger page scroll still works on phones
      })
      mapRef.current = map

      L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map)

      const latlngs = route.points.map((p) => [p.lat, p.lng] as [number, number])
      // White halo underneath keeps the line readable over green map areas
      L.polyline(latlngs, { color: '#ffffff', weight: 8, opacity: 0.9, interactive: false }).addTo(map)
      const line = L.polyline(latlngs, { color: GREEN, weight: 4, opacity: 1, interactive: false }).addTo(map)
      map.fitBounds(line.getBounds(), { padding: [28, 28] })

      L.marker(latlngs[0], {
        icon: L.divIcon({ html: START_HTML, className: '', iconSize: [30, 30], iconAnchor: [15, 15] }),
        title: route.isLoop ? 'Start / Finish' : 'Start',
        alt: route.isLoop ? 'Start / Finish' : 'Start',
        zIndexOffset: 500,
      })
        .bindTooltip(route.isLoop ? 'Start / Finish' : 'Start', { direction: 'top', offset: [0, -14] })
        .addTo(map)

      hoverMarkerRef.current = L.circleMarker(latlngs[0], {
        radius: 7,
        color: GREEN,
        weight: 3,
        fillColor: '#ffffff',
        fillOpacity: 1,
        interactive: false,
      })
    })

    return () => {
      cancelled = true
      mapRef.current?.remove()
      mapRef.current = null
      hoverMarkerRef.current = null
    }
  }, [route])

  // Follow the elevation-profile cursor
  useEffect(() => {
    const map = mapRef.current
    const marker = hoverMarkerRef.current
    if (!map || !marker) return
    if (hoverIndex === null) {
      marker.remove()
      return
    }
    const p = route.points[hoverIndex]
    marker.setLatLng([p.lat, p.lng])
    if (!map.hasLayer(marker)) marker.addTo(map)
  }, [hoverIndex, route])

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={`Map of the ${route.label} route`}
      className="isolate h-[280px] md:h-[380px] w-full bg-[#dcd6c8]"
    />
  )
}

// ─── Elevation profile ────────────────────────────────────────────────────────

const W = 1000
const H = 200

function ElevationProfile({
  route,
  hoverIndex,
  onHover,
}: {
  route: RouteView
  hoverIndex: number | null
  onHover: (i: number | null) => void
}) {
  const { points, distanceM, distUnit, eleUnit } = route
  const plotRef = useRef<HTMLDivElement>(null)

  const chart = useMemo(() => {
    const withEle = points.filter((p) => p.e !== null) as (RoutePoint & { e: number })[]
    if (withEle.length < 2) return null

    const min = Math.min(...withEle.map((p) => p.e))
    const max = Math.max(...withEle.map((p) => p.e))
    const range = Math.max(max - min, 20)
    const yMin = Math.max(0, min - range * 0.15)
    const yMax = max + range * 0.15

    const x = (d: number) => (d / distanceM) * W
    const y = (e: number) => H - ((e - yMin) / (yMax - yMin)) * H
    const line = withEle.map((p, i) => `${i ? 'L' : 'M'}${x(p.d).toFixed(1)},${y(p.e).toFixed(1)}`).join('')
    const area = `${line}L${x(withEle[withEle.length - 1].d).toFixed(1)},${H}L${x(withEle[0].d).toFixed(1)},${H}Z`

    // Distance ticks: every 1 unit, or every 2/5 on longer routes
    const total = toDist(distanceM, distUnit)
    const step = total > 40 ? 5 : total > 15 ? 2 : 1
    const ticks: number[] = []
    for (let t = step; t < total - step * 0.3; t += step) ticks.push(t)

    return { y, area, line, ticks, total, maxEle: max, minEle: min }
  }, [points, distanceM, distUnit])

  const indexFromClientX = useCallback(
    (clientX: number) => {
      const rect = plotRef.current?.getBoundingClientRect()
      if (!rect) return null
      const frac = Math.min(1, Math.max(0, (clientX - rect.left) / rect.width))
      return nearestIndex(points, frac * distanceM)
    },
    [points, distanceM]
  )

  if (!chart) return null

  const hovered = hoverIndex !== null ? points[hoverIndex] : null
  const hoverFrac = hovered ? hovered.d / distanceM : 0
  const hoverY = hovered?.e != null ? chart.y(hovered.e) / H : null

  const handleKey = (e: React.KeyboardEvent) => {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return
    e.preventDefault()
    const step = Math.max(1, Math.round(points.length / 50))
    const current = hoverIndex ?? (e.key === 'ArrowRight' ? -step : points.length - 1 + step)
    onHover(Math.min(points.length - 1, Math.max(0, current + (e.key === 'ArrowRight' ? step : -step))))
  }

  return (
    <div className="px-4 md:px-6 pt-5 pb-4">
      <div className="flex items-baseline justify-between mb-3">
        <p className="text-xs font-semibold tracking-[0.25em] uppercase" style={{ color: GREEN }}>
          Elevation Profile
        </p>
        <p className="text-xs tabular-nums" style={{ color: MUTED }}>
          {hovered ? (
            <>
              <span className="font-semibold" style={{ color: NAVY }}>
                {toDist(hovered.d, distUnit).toFixed(1)} {distUnit}
              </span>
              {hovered.e != null && (
                <>
                  {' · '}
                  <span className="font-semibold" style={{ color: NAVY }}>
                    {Math.round(toEle(hovered.e, eleUnit)).toLocaleString()} {eleUnit}
                  </span>
                </>
              )}
            </>
          ) : (
            <span className="hidden sm:inline">Hover or drag along the profile to follow the route</span>
          )}
        </p>
      </div>

      <div className="flex gap-2">
        {/* Elevation axis */}
        <div className="flex flex-col justify-between text-[10px] tabular-nums text-right w-10 shrink-0 py-0.5" style={{ color: MUTED }}>
          <span>{Math.round(toEle(chart.maxEle, eleUnit)).toLocaleString()}</span>
          <span>{Math.round(toEle(chart.minEle, eleUnit)).toLocaleString()}</span>
        </div>

        <div className="flex-1 min-w-0">
          <div
            ref={plotRef}
            tabIndex={0}
            role="img"
            aria-label={`Elevation profile: ${route.distanceText}, lowest ${Math.round(toEle(chart.minEle, eleUnit))} ${eleUnit}, highest ${Math.round(toEle(chart.maxEle, eleUnit))} ${eleUnit}. Use left and right arrow keys to move along the route.`}
            className="relative h-36 md:h-44 cursor-crosshair select-none rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-[#2D5C26]"
            style={{ touchAction: 'pan-y' }}
            onPointerMove={(e) => onHover(indexFromClientX(e.clientX))}
            onPointerDown={(e) => onHover(indexFromClientX(e.clientX))}
            onPointerLeave={(e) => e.pointerType === 'mouse' && onHover(null)}
            onKeyDown={handleKey}
            onBlur={() => onHover(null)}
          >
            <svg viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="absolute inset-0 w-full h-full overflow-visible">
              <defs>
                <linearGradient id={`ele-fill-${route.key}`} x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor={GREEN} stopOpacity="0.45" />
                  <stop offset="100%" stopColor={GREEN} stopOpacity="0.05" />
                </linearGradient>
              </defs>
              {[0.25, 0.5, 0.75].map((f) => (
                <line key={f} x1="0" x2={W} y1={H * f} y2={H * f} stroke={NAVY} strokeOpacity="0.08" vectorEffect="non-scaling-stroke" />
              ))}
              <path d={chart.area} fill={`url(#ele-fill-${route.key})`} />
              <path d={chart.line} fill="none" stroke={GREEN} strokeWidth="2" vectorEffect="non-scaling-stroke" strokeLinejoin="round" />
              <line x1="0" x2={W} y1={H} y2={H} stroke={NAVY} strokeOpacity="0.25" vectorEffect="non-scaling-stroke" />
            </svg>

            {hovered && (
              <>
                <div className="absolute top-0 bottom-0 w-px pointer-events-none" style={{ left: `${hoverFrac * 100}%`, backgroundColor: NAVY, opacity: 0.5 }} />
                {hoverY !== null && (
                  <div
                    className="absolute w-3 h-3 -ml-1.5 -mt-1.5 rounded-full border-2 bg-white pointer-events-none"
                    style={{ left: `${hoverFrac * 100}%`, top: `${hoverY * 100}%`, borderColor: GREEN }}
                  />
                )}
              </>
            )}
          </div>

          {/* Distance axis */}
          <div className="relative h-5 mt-1 text-[10px] tabular-nums" style={{ color: MUTED }}>
            <span className="absolute left-0">0</span>
            {chart.ticks.map((t) => (
              <span
                key={t}
                // On narrow screens, drop ticks that would collide with the end label
                className={`absolute -translate-x-1/2 ${t / chart.total > 0.85 ? 'hidden md:inline' : ''}`}
                style={{ left: `${(t / chart.total) * 100}%` }}
              >
                {t}
              </span>
            ))}
            <span className="absolute right-0">
              {chart.total.toFixed(1)} {distUnit}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function EventRoutes({ routes }: { routes: RouteView[] }) {
  const [active, setActive] = useState(0)
  const [hoverIndex, setHoverIndex] = useState<number | null>(null)

  if (routes.length === 0) return null
  const route = routes[Math.min(active, routes.length - 1)]

  const stats = [
    { label: 'Distance', short: 'Distance', value: route.distanceText },
    route.climbText && { label: 'Elevation Gain', short: 'Climb', value: route.climbText },
    route.highPointText && { label: 'Highest Point', short: 'Peak', value: route.highPointText },
    { label: 'Route', short: 'Route', value: route.isLoop ? 'Loop' : 'Point to point' },
  ].filter(Boolean) as { label: string; short: string; value: string }[]

  return (
    <div id="route">
      <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mb-6">
        <h2 className="font-heading font-black uppercase text-2xl md:text-3xl tracking-tight" style={{ color: NAVY }}>
          {routes.length > 1 ? 'The Routes' : 'The Route'}
        </h2>

        {routes.length > 1 && (
          <div role="tablist" aria-label="Choose a distance" className="flex flex-wrap gap-2">
            {routes.map((r, i) => (
              <button
                key={r.key}
                role="tab"
                aria-selected={i === active}
                onClick={() => {
                  setActive(i)
                  setHoverIndex(null)
                }}
                className="px-4 py-2 rounded-full text-xs font-bold tracking-widest uppercase border transition-colors"
                style={i === active ? { backgroundColor: GREEN, borderColor: GREEN, color: '#fff' } : { borderColor: NAVY, color: NAVY }}
              >
                {r.label}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Map + profile */}
      <div className="bg-white rounded-2xl overflow-hidden shadow-sm">
        {/* Stats strip */}
        <dl
          className="grid divide-x border-b"
          style={{ gridTemplateColumns: `repeat(${stats.length}, minmax(0, 1fr))`, borderColor: 'rgba(12,15,30,0.08)' }}
        >
          {stats.map((s) => (
            <div key={s.label} className="px-2 py-3 md:px-5 md:py-4 text-center md:text-left" style={{ borderColor: 'rgba(12,15,30,0.08)' }}>
              <dt className="text-[9px] md:text-[10px] font-semibold tracking-[0.15em] md:tracking-[0.2em] uppercase mb-0.5" style={{ color: MUTED }}>
                <span className="md:hidden">{s.short}</span>
                <span className="hidden md:inline">{s.label}</span>
              </dt>
              <dd className="font-heading font-black text-sm md:text-xl tracking-tight whitespace-nowrap" style={{ color: NAVY }}>
                {s.value}
              </dd>
            </div>
          ))}
        </dl>
        <RouteMap key={route.key} route={route} hoverIndex={hoverIndex} />
        <ElevationProfile route={route} hoverIndex={hoverIndex} onHover={setHoverIndex} />
      </div>

      {/* Download */}
      <div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <p className="text-sm" style={{ color: MUTED }}>
          Load the route onto your watch or phone app (Garmin, Strava, Komoot, Coros…).
        </p>
        <a
          href={route.downloadUrl}
          download
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs font-bold tracking-widest uppercase text-white transition-all hover:opacity-90 shrink-0"
          style={{ backgroundColor: GREEN }}
        >
          <Download size={14} /> Download GPX
        </a>
      </div>
    </div>
  )
}

export type LatLng = { lat: number; lng: number }

/** Parse a "51.2503, -0.3092" string (as copied from Google Maps) */
export function parseLatLng(value?: string | null): LatLng | null {
  if (!value) return null
  const [lat, lng] = value.split(',').map((part) => parseFloat(part.trim()))
  if (!Number.isFinite(lat) || !Number.isFinite(lng)) return null
  if (Math.abs(lat) > 90 || Math.abs(lng) > 180) return null
  return { lat, lng }
}

/**
 * Look up the centre point of a UK postcode via postcodes.io (free, no key).
 * Cached for a day; returns null if the lookup fails so callers can hide the map.
 */
export async function geocodeUkPostcode(postcode?: string | null): Promise<LatLng | null> {
  if (!postcode) return null
  try {
    const res = await fetch(
      `https://api.postcodes.io/postcodes/${encodeURIComponent(postcode.replace(/\s+/g, ''))}`,
      { next: { revalidate: 86400 } }
    )
    if (!res.ok) return null
    const data = await res.json()
    const { latitude, longitude } = data?.result ?? {}
    return typeof latitude === 'number' && typeof longitude === 'number'
      ? { lat: latitude, lng: longitude }
      : null
  } catch {
    return null
  }
}

/**
 * Cookie consent state (client-side only). The choice itself is stored in
 * localStorage, which is "strictly necessary" and doesn't need consent.
 */

export type ConsentChoice = 'granted' | 'denied'

const STORAGE_KEY = 'ttrc-cookie-consent'
const MAX_AGE_MS = 365 * 24 * 60 * 60 * 1000 // ask again after 12 months
export const CONSENT_CHANGED_EVENT = 'ttrc:consent-changed'
export const OPEN_SETTINGS_EVENT = 'ttrc:open-cookie-settings'

export function getConsent(): ConsentChoice | null {
  try {
    const raw = localStorage.getItem(STORAGE_KEY)
    if (!raw) return null
    const { analytics, savedAt } = JSON.parse(raw)
    if (typeof savedAt !== 'number' || Date.now() - savedAt > MAX_AGE_MS) return null
    return analytics === 'granted' || analytics === 'denied' ? analytics : null
  } catch {
    return null
  }
}

export function setConsent(analytics: ConsentChoice) {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ analytics, savedAt: Date.now() }))
  } catch {
    // Storage blocked (e.g. private mode) — the choice still applies for this page view
  }
  window.dispatchEvent(new CustomEvent(CONSENT_CHANGED_EVENT, { detail: analytics }))
}

export function openCookieSettings() {
  window.dispatchEvent(new Event(OPEN_SETTINGS_EVENT))
}

/** Remove Google Analytics cookies after consent is withdrawn */
export function clearAnalyticsCookies() {
  const host = window.location.hostname
  const domains = ['', host, `.${host}`, `.${host.replace(/^www\./, '')}`]
  document.cookie.split(';').forEach((c) => {
    const name = c.split('=')[0].trim()
    if (name === '_ga' || name.startsWith('_ga_') || name === '_gid' || name === '_gat') {
      domains.forEach((d) => {
        document.cookie = `${name}=; Max-Age=0; path=/${d ? `; domain=${d}` : ''}`
      })
    }
  })
}

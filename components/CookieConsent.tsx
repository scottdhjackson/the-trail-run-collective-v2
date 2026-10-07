'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import Script from 'next/script'
import {
  CONSENT_CHANGED_EVENT,
  OPEN_SETTINGS_EVENT,
  clearAnalyticsCookies,
  getConsent,
  openCookieSettings,
  setConsent,
  type ConsentChoice,
} from '@/lib/consent'

const GA_ID = 'G-ME0CQMEMVQ'
const GTM_ID = 'GTM-MC44GFCQ'

declare global {
  interface Window {
    gtag?: (...args: unknown[]) => void
    [key: `ga-disable-${string}`]: boolean | undefined
  }
}

/**
 * Cookie banner + consent-gated analytics. Google Analytics and Tag Manager are
 * only loaded after the visitor accepts; rejecting (or withdrawing later) keeps
 * them off and clears any GA cookies.
 */
export function CookieConsent() {
  // undefined = not yet read from storage (avoids a flash during hydration)
  const [choice, setChoice] = useState<ConsentChoice | null | undefined>(undefined)
  const [bannerOpen, setBannerOpen] = useState(false)

  useEffect(() => {
    const stored = getConsent()
    setChoice(stored)
    setBannerOpen(stored === null)

    const onChange = (e: Event) => setChoice((e as CustomEvent<ConsentChoice>).detail)
    const onOpen = () => setBannerOpen(true)
    window.addEventListener(CONSENT_CHANGED_EVENT, onChange)
    window.addEventListener(OPEN_SETTINGS_EVENT, onOpen)
    return () => {
      window.removeEventListener(CONSENT_CHANGED_EVENT, onChange)
      window.removeEventListener(OPEN_SETTINGS_EVENT, onOpen)
    }
  }, [])

  // Turn GA on/off for scripts that are already loaded in this page view
  useEffect(() => {
    if (choice === undefined) return
    window[`ga-disable-${GA_ID}`] = choice !== 'granted'
    if (choice === 'granted') {
      window.gtag?.('consent', 'update', { analytics_storage: 'granted' })
    } else {
      window.gtag?.('consent', 'update', { analytics_storage: 'denied' })
      clearAnalyticsCookies()
    }
  }, [choice])

  const decide = (analytics: ConsentChoice) => {
    setConsent(analytics)
    setBannerOpen(false)
  }

  return (
    <>
      {choice === 'granted' && (
        <>
          <Script id="ga-init" strategy="afterInteractive">
            {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
window.gtag = gtag;
gtag('consent', 'default', { analytics_storage: 'granted', ad_storage: 'denied', ad_user_data: 'denied', ad_personalization: 'denied' });
gtag('js', new Date());
gtag('config', '${GA_ID}');`}
          </Script>
          <Script src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`} strategy="afterInteractive" />
          <Script id="gtm" strategy="afterInteractive">
            {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','${GTM_ID}');`}
          </Script>
        </>
      )}

      {bannerOpen && (
        <section
          role="region"
          aria-label="Cookie consent"
          className="fixed z-[70] bottom-4 left-4 right-4 sm:left-auto sm:right-6 sm:bottom-6 sm:max-w-md rounded-2xl p-5 md:p-6 shadow-2xl animate-in fade-in slide-in-from-bottom-4 duration-500"
          style={{ backgroundColor: '#080B18', color: '#ffffff' }}
        >
          <p className="font-heading font-black uppercase tracking-tight text-lg mb-2">Cookies</p>
          <p className="text-sm leading-relaxed text-white/75 mb-5">
            We&apos;d like to use Google Analytics cookies to understand how people use our site so we can improve it.
            They&apos;re only set if you accept. See our{' '}
            <Link href="/privacy-policy#cookies" className="underline underline-offset-2 text-white hover:opacity-80">
              cookie policy
            </Link>
            .
          </p>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => decide('denied')}
              className="h-11 rounded-full border-2 border-white text-xs font-bold tracking-widest uppercase transition-colors hover:bg-white/10"
            >
              Reject
            </button>
            <button
              type="button"
              onClick={() => decide('granted')}
              className="h-11 rounded-full border-2 text-xs font-bold tracking-widest uppercase transition-opacity hover:opacity-90"
              style={{ backgroundColor: '#2D5C26', borderColor: '#2D5C26' }}
            >
              Accept
            </button>
          </div>
        </section>
      )}
    </>
  )
}

/** Footer link that reopens the banner so visitors can change their choice */
export function CookieSettingsLink({ className }: { className?: string }) {
  return (
    <button
      type="button"
      className={className}
      onClick={openCookieSettings}
    >
      Cookie Settings
    </button>
  )
}

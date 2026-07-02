import type { Metadata } from 'next'
import { Montserrat, Lato, Playfair_Display } from 'next/font/google'
import './globals.css'
import { generateMetadata as buildMetadata, generateOrganizationSchema } from '@/lib/metadata'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['400', '600', '700', '800', '900'],
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
})

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-accent',
  style: ['italic'],
  weight: ['700', '800'],
  display: 'swap',
})

export const revalidate = 60

export async function generateMetadata(): Promise<Metadata> {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  return buildMetadata({
    title: settings?.seoTitle,
    description: settings?.seoDescription,
    heroImageUrl: settings?.heroBannerImageUrl,
  })
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const orgSchema = generateOrganizationSchema()
  const settings = await client.fetch(SITE_SETTINGS_QUERY)

  const colours = settings?.colours ?? {}
  const fontPreset = settings?.typography?.fontPreset ?? 'bell-mt'
  const bellMtStack = "'Bell MT', 'Book Antiqua', Palatino, serif"
  const defaultBodyStack = "'Lato', sans-serif"
  const defaultHeadingStack = "'Montserrat', sans-serif"
  const isDefault = fontPreset === 'default'
  const cssVars = [
    `--nav-bg: ${colours.navBackground || 'rgba(8, 11, 24, 0.55)'}`,
    `--nav-text: ${colours.navText || '#ffffff'}`,
    `--banner-overlay: ${colours.bannerOverlay || 'rgba(8,11,24,0.20)'}`,
    `--footer-bg: ${colours.footerBackground || '#080B18'}`,
    `--footer-text: ${colours.footerText || '#ffffff'}`,
    `--active-font-heading: ${isDefault ? defaultHeadingStack : bellMtStack}`,
    `--active-font-body: ${isDefault ? defaultBodyStack : bellMtStack}`,
  ].join('; ')

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        {/* Cookiebot must be first in <head> and synchronous per Cookiebot docs */}
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="70384fda-badb-417d-b539-a65cbaa66e2b"
          data-blockingmode="auto"
        />
        <style dangerouslySetInnerHTML={{ __html: `:root { ${cssVars} }` }} />
        <link rel="icon" href={settings?.logoUrl || '/images/logo.svg'} />
        <link rel="apple-touch-icon" href={settings?.logoUrl || '/images/logo.svg'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* Google Tag Manager */}
        <script dangerouslySetInnerHTML={{ __html: `(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src='https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);})(window,document,'script','dataLayer','GTM-MC44GFCQ');` }} />
        {/* Google tag (gtag.js) */}
        <script async src="https://www.googletagmanager.com/gtag/js?id=G-ME0CQMEMVQ" />
        <script dangerouslySetInnerHTML={{ __html: `window.dataLayer = window.dataLayer || [];function gtag(){dataLayer.push(arguments);}gtag('js', new Date());gtag('config', 'G-ME0CQMEMVQ');` }} />
      </head>
      <body className={`${lato.variable} ${montserrat.variable} ${playfair.variable} font-body`}>
        {/* Google Tag Manager (noscript) */}
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-MC44GFCQ"
            height="0"
            width="0"
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        {children}
      </body>
    </html>
  )
}

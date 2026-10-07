import type { Metadata } from 'next'
import { Montserrat, Lato, Playfair_Display } from 'next/font/google'
import './globals.css'
import { generateMetadata as buildMetadata, generateOrganizationSchema } from '@/lib/metadata'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { CookieConsent } from '@/components/CookieConsent'

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
        <style dangerouslySetInnerHTML={{ __html: `:root { ${cssVars} }` }} />
        <link rel="icon" href={settings?.logoUrl || '/images/logo.svg'} />
        <link rel="apple-touch-icon" href={settings?.logoUrl || '/images/logo.svg'} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${lato.variable} ${montserrat.variable} ${playfair.variable} font-body`}>
        {/* Scroll-reveal fallback: never leave content hidden without JS */}
        <noscript>
          <style>{'.reveal{opacity:1!important;transform:none!important}'}</style>
        </noscript>
        {children}
        {/* Cookie banner; Google Analytics/Tag Manager only load after consent */}
        <CookieConsent />
      </body>
    </html>
  )
}

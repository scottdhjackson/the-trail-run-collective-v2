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
    `--nav-bg: ${colours.navBackground || '#E8E3D7'}`,
    `--nav-text: ${colours.navText || '#0C0F1E'}`,
    `--banner-overlay: ${colours.bannerOverlay || 'rgba(8,11,24,0.60)'}`,
    `--footer-bg: ${colours.footerBackground || '#080B18'}`,
    `--footer-text: ${colours.footerText || '#ffffff'}`,
    `--active-font-heading: ${isDefault ? defaultHeadingStack : bellMtStack}`,
    `--active-font-body: ${isDefault ? defaultBodyStack : bellMtStack}`,
  ].join('; ')

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <script
          id="Cookiebot"
          src="https://consent.cookiebot.com/uc.js"
          data-cbid="70384fda-badb-417d-b539-a65cbaa66e2b"
          data-blockingmode="auto"
          type="text/javascript"
          async
        />
        <style dangerouslySetInnerHTML={{ __html: `:root { ${cssVars} }` }} />
        {settings?.logoUrl && (
          <>
            <link rel="icon" href={settings.logoUrl} />
            <link rel="apple-touch-icon" href={settings.logoUrl} />
          </>
        )}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${lato.variable} ${montserrat.variable} ${playfair.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}

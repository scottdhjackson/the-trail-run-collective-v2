import type { Metadata } from 'next'
import { Montserrat, Lato } from 'next/font/google'
import './globals.css'
import { generateMetadata, generateOrganizationSchema } from '@/lib/metadata'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

const montserrat = Montserrat({
  subsets: ['latin'],
  variable: '--font-heading',
  display: 'swap',
})

const lato = Lato({
  subsets: ['latin'],
  weight: ['300', '400', '700'],
  variable: '--font-body',
  display: 'swap',
})

export const revalidate = 60

export const metadata: Metadata = generateMetadata()

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const orgSchema = generateOrganizationSchema()
  const settings = await client.fetch(SITE_SETTINGS_QUERY)

  const colours = settings?.colours ?? {}
  const cssVars = [
    `--nav-bg: ${colours.navBackground || '#000000'}`,
    `--nav-text: ${colours.navText || '#ffffff'}`,
    `--banner-overlay: ${colours.bannerOverlay || 'rgba(0,0,0,0.45)'}`,
    `--footer-bg: ${colours.footerBackground || 'hsl(240 4.8% 95.9% / 0.3)'}`,
    `--footer-text: ${colours.footerText || 'hsl(240 3.8% 46.1%)'}`,
  ].join('; ')

  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <style dangerouslySetInnerHTML={{ __html: `:root { ${cssVars} }` }} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
      </head>
      <body className={`${lato.variable} ${montserrat.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}

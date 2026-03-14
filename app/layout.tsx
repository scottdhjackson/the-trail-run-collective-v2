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
  const cssVars = [
    `--nav-bg: ${colours.navBackground || '#E8E3D7'}`,
    `--nav-text: ${colours.navText || '#0C0F1E'}`,
    `--banner-overlay: ${colours.bannerOverlay || 'rgba(8,11,24,0.60)'}`,
    `--footer-bg: ${colours.footerBackground || '#080B18'}`,
    `--footer-text: ${colours.footerText || '#ffffff'}`,
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
      <body className={`${lato.variable} ${montserrat.variable} ${playfair.variable} font-body`}>
        {children}
      </body>
    </html>
  )
}

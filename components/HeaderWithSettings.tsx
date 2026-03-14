import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'
import { Header } from './Header'

export async function HeaderWithSettings() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  return <Header logoUrl={settings?.logoUrl} logoWidth={settings?.logoWidth} />
}

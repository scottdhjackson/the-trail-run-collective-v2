import { client } from '@/sanity/lib/client'
import { KIT_LIST_BY_SLUG_QUERY } from '@/sanity/lib/queries'
import { KitList } from '@/components/KitList'
import { Header } from '@/components/Header'
import { notFound } from 'next/navigation'
import Link from 'next/link'

type KitListData = {
  _id: string
  title: string
  slug: { current: string }
  requiredEquipment: Array<{ _key: string; item: string }>
  importantNotes?: Array<{ _key: string; note: string }>
  footerText?: string
}

export const revalidate = 60

export default async function KitListPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params

  const kitList: KitListData = await client.fetch(KIT_LIST_BY_SLUG_QUERY, { slug })

  if (!kitList) {
    notFound()
  }

  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <KitList
          title={kitList.title}
          requiredEquipment={kitList.requiredEquipment}
          importantNotes={kitList.importantNotes}
          footerText={kitList.footerText}
        />

        <footer className="py-12 bg-muted/30 text-center">
          <div className="container mx-auto px-4">
            <p className="text-sm text-muted-foreground mb-2">
              © {new Date().getFullYear()} The Trail Run Collective. All rights reserved.
            </p>
            <p className="text-sm text-muted-foreground space-x-4">
              <Link href="/faq" className="hover:text-primary underline">
                FAQs
              </Link>
              <span>•</span>
              <Link href="/kit-list/required-equipment" className="hover:text-primary underline">
                Kit List
              </Link>
              <span>•</span>
              <Link href="/privacy-policy" className="hover:text-primary underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </footer>
      </main>
    </>
  )
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const kitList: KitListData = await client.fetch(KIT_LIST_BY_SLUG_QUERY, { slug })

  if (!kitList) {
    return {
      title: 'Kit List Not Found',
    }
  }

  return {
    title: `${kitList.title} | The Trail Run Collective`,
    description: `Required equipment list for The Trail Run Collective events`,
  }
}

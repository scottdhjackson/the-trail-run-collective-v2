import Link from 'next/link'
import { client } from '@/sanity/lib/client'
import { SITE_SETTINGS_QUERY } from '@/sanity/lib/queries'

export async function Footer() {
  const settings = await client.fetch(SITE_SETTINGS_QUERY)
  const instagramUrl: string | undefined = settings?.socialLinks?.instagram
  const facebookUrl: string | undefined = settings?.socialLinks?.facebook

  return (
    <footer style={{ backgroundColor: 'var(--footer-bg, #080B18)', color: 'var(--footer-text, #ffffff)' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-heading font-black uppercase tracking-widest text-lg mb-4">
              The Trail Run Collective
            </p>
            <p className="text-sm leading-relaxed opacity-60 max-w-xs mb-5">
              Memorable trail and ultra running events across the UK — designed for runners of all abilities.
            </p>
            <div className="flex items-center gap-3">
              {instagramUrl && (
                <a
                  href={instagramUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                  className="inline-flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full opacity-90 hover:opacity-100 transition"
                  style={{
                    background:
                      'radial-gradient(circle at 30% 110%, #fdf497 0%, #fdf497 5%, #fd5949 45%, #d6249f 60%, #285AEB 90%)',
                  }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="#ffffff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    aria-hidden="true"
                    className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]"
                  >
                    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
                    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                    <line x1="17.5" y1="6.5" x2="17.5" y2="6.5" />
                  </svg>
                </a>
              )}
              {facebookUrl && (
                <a
                  href={facebookUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Facebook"
                  className="inline-flex items-center justify-center w-9 h-9 md:w-11 md:h-11 rounded-full opacity-90 hover:opacity-100 transition"
                  style={{ backgroundColor: '#1877F2' }}
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="18"
                    height="18"
                    viewBox="0 0 24 24"
                    fill="#ffffff"
                    aria-hidden="true"
                    className="w-[18px] h-[18px] md:w-[22px] md:h-[22px]"
                  >
                    <path d="M22 12.06C22 6.5 17.52 2 12 2S2 6.5 2 12.06c0 5 3.66 9.15 8.44 9.94v-7.03H7.9v-2.91h2.54V9.84c0-2.51 1.49-3.89 3.77-3.89 1.09 0 2.23.2 2.23.2v2.45h-1.26c-1.24 0-1.63.77-1.63 1.56v1.87h2.78l-.44 2.91h-2.34V22c4.78-.79 8.44-4.94 8.44-9.94z" />
                  </svg>
                </a>
              )}
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 opacity-50">Navigation</p>
            <ul className="space-y-3">
              <li><a href="/#events" className="text-sm opacity-80 hover:opacity-100 transition-opacity">All Events</a></li>
              <li><Link href="/faq" className="text-sm opacity-80 hover:opacity-100 transition-opacity">FAQs</Link></li>
              <li><Link href="/volunteer" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Volunteer</Link></li>
              <li><Link href="/about" className="text-sm opacity-80 hover:opacity-100 transition-opacity">About Us</Link></li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <p className="text-xs font-semibold tracking-[0.2em] uppercase mb-5 opacity-50">Support</p>
            <ul className="space-y-3">
              <li><Link href="/kit-list/required-equipment" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Kit List</Link></li>
              <li><Link href="/privacy-policy" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Privacy Policy</Link></li>
              <li><a href="mailto:info@thetrailruncollective.com" className="text-sm opacity-80 hover:opacity-100 transition-opacity">Contact Us</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/10 pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs opacity-40">
            © {new Date().getFullYear()} The Trail Run Collective. All rights reserved.
          </p>
          <p className="text-xs opacity-40 uppercase tracking-widest">
            Run the trails
          </p>
        </div>
      </div>
    </footer>
  )
}

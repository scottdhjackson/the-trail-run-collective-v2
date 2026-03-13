import Link from 'next/link'

export function Footer() {
  return (
    <footer style={{ backgroundColor: 'var(--footer-bg, #080B18)', color: 'var(--footer-text, #ffffff)' }}>
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <p className="font-heading font-black uppercase tracking-widest text-lg mb-4">
              The Trail Run Collective
            </p>
            <p className="text-sm leading-relaxed opacity-60 max-w-xs">
              Memorable trail and ultra running events across the UK — designed for runners of all abilities.
            </p>
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

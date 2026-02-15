import { Header } from '@/components/Header'
import Link from 'next/link'

export const metadata = {
  title: 'Privacy Policy - The Trail Run Collective',
  description: 'Privacy Policy for The Trail Run Collective',
}

export default function PrivacyPolicyPage() {
  return (
    <>
      <Header />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24 max-w-4xl">
          <h1 className="text-4xl font-bold tracking-tight mb-8">Privacy Policy</h1>

          <div className="space-y-8 text-muted-foreground">
            <div>
              <p className="mb-2"><strong>Effective Date:</strong> 13 February 2026</p>
              <p><strong>Website:</strong> <a href="http://www.thetrailruncollective.co.uk/" className="text-primary hover:underline">www.thetrailruncollective.co.uk</a></p>
            </div>

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">1. Who We Are</h2>
              <p className="mb-4">
                The Trail Run Collective ("we", "us", "our") organises trail and ultra running events in the UK.
              </p>
              <p>
                If you have any questions about this policy, you can contact us at:<br />
                Email: <a href="mailto:info@thetrailruncollective.co.uk" className="text-primary hover:underline">info@thetrailruncollective.co.uk</a>
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">2. What Personal Data We Collect</h2>
              <p className="mb-4">We may collect the following information:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Name</li>
                <li>Email address</li>
                <li>Phone number (if provided)</li>
                <li>Event registration details</li>
                <li>Payment information (processed securely via third-party providers)</li>
                <li>Website usage data (via cookies and analytics tools)</li>
              </ul>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">3. How We Use Your Data</h2>
              <p className="mb-4">We use your information to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Process event registrations</li>
                <li>Send event updates and important information</li>
                <li>Provide customer support</li>
                <li>Send marketing emails (only if you opt in)</li>
                <li>Improve our website and services</li>
              </ul>
              <p className="mt-4 font-semibold">We will never sell your personal data.</p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">4. Legal Basis for Processing</h2>
              <p className="mb-4">Under UK GDPR, we rely on:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Contractual necessity (to deliver events you register for)</li>
                <li>Legitimate interests (to operate and improve our business)</li>
                <li>Consent (for marketing emails and optional cookies)</li>
              </ul>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">5. How Long We Keep Your Data</h2>
              <p className="mb-4">
                We retain personal data only as long as necessary to:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Fulfil event obligations</li>
                <li>Meet legal or accounting requirements</li>
                <li>Provide ongoing communications (if subscribed)</li>
              </ul>
              <p className="mt-4">You may request deletion at any time.</p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">6. Third Parties</h2>
              <p className="mb-4">We may share data with:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Payment processors</li>
                <li>Event timing providers</li>
                <li>Email marketing platforms</li>
                <li>Website analytics providers</li>
              </ul>
              <p className="mt-4">
                All third parties are required to protect your data and we will never share your details unless specified.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">7. Your Rights</h2>
              <p className="mb-4">Under UK GDPR, you have the right to:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>Access your personal data</li>
                <li>Request correction</li>
                <li>Request deletion</li>
                <li>Withdraw consent</li>
                <li>Lodge a complaint with the Information Commissioner's Office (ICO)</li>
              </ul>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-4">8. Data Security</h2>
              <p>
                We take reasonable technical and organisational measures to protect your data.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h2 className="text-2xl font-bold text-foreground mb-6">Cookie Policy</h2>

              <h3 className="text-xl font-semibold text-foreground mb-3">What Are Cookies?</h3>
              <p className="mb-6">
                Cookies are small text files stored on your device when you visit our website.
              </p>

              <h3 className="text-xl font-semibold text-foreground mb-3">Types of Cookies We Use</h3>

              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold text-foreground mb-2">Essential Cookies</h4>
                  <p>Necessary for the website to function properly.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Analytics Cookies</h4>
                  <p>Help us understand how visitors use our website so we can improve it.</p>
                </div>

                <div>
                  <h4 className="font-semibold text-foreground mb-2">Marketing Cookies (if applicable)</h4>
                  <p>Used to deliver relevant advertisements and track campaign performance.</p>
                </div>
              </div>

              <h3 className="text-xl font-semibold text-foreground mb-3 mt-6">Managing Cookies</h3>
              <p className="mb-2">
                When you first visit our website, you will be asked to accept or reject non-essential cookies.
              </p>
              <p>
                You can also manage cookies through your browser settings.
              </p>
            </section>
          </div>
        </div>

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

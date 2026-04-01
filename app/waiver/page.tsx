import { HeaderWithSettings } from '@/components/HeaderWithSettings'
import { Footer } from '@/components/Footer'

export const metadata = {
  title: 'Participation Waiver - The Trail Run Collective x The Dough Shack',
  description: 'Participation Waiver & Terms and Conditions for The Trail Run Collective x The Dough Shack Run Club.',
}

export default function WaiverPage() {
  return (
    <>
      <HeaderWithSettings />
      <main className="min-h-screen bg-background">
        <div className="container mx-auto px-4 py-24 max-w-4xl">
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
            The Trail Run Collective x The Dough Shack
          </h1>
          <h2 className="text-xl md:text-2xl font-semibold mb-10 text-muted-foreground">
            Run Club Participation Waiver &amp; Terms and Conditions
          </h2>

          <div className="space-y-10 text-muted-foreground">

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">1. Acknowledgement of Risk</h3>
              <p className="mb-3">
                By participating in this run club organised by The Trail Run Collective in partnership with The Dough Shack, you acknowledge that running—particularly on trails, roads, pavements, or mixed terrain—carries inherent risks. These risks may include, but are not limited to, trips, falls, collisions, uneven surfaces, weather conditions, traffic, and other natural or man-made hazards.
              </p>
              <p>
                You understand that participation is entirely voluntary and undertaken at your own risk.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">2. Health &amp; Fitness Declaration</h3>
              <p className="mb-3">By taking part, you confirm that:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>You are physically fit and able to safely participate in the run club.</li>
                <li>You do not have any medical condition, injury, or health concern that would make participation unsafe.</li>
                <li>If you have any underlying or pre-existing medical conditions, you have sought appropriate medical advice and have been cleared to participate.</li>
              </ul>
              <p>
                You accept full responsibility for monitoring your own physical condition during the activity and agree to stop if you feel unwell or at risk.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">3. Waiver of Liability</h3>
              <p className="mb-3">
                To the fullest extent permitted by UK law, you agree that The Trail Run Collective, The Dough Shack, their organisers, employees, volunteers, partners, and affiliates shall not be held liable for:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>Any injury, illness, or health issue arising from participation</li>
                <li>Any loss or damage to personal property</li>
                <li>Any incidents occurring before, during, or after the run</li>
              </ul>
              <p>
                This includes outcomes ranging from minor injuries to more serious consequences, except where liability cannot be excluded under applicable law (including death or personal injury caused by negligence).
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">4. Personal Responsibility</h3>
              <p className="mb-3">You agree to:</p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>Follow any instructions, guidance, or safety briefings provided by organisers</li>
                <li>Act responsibly and respectfully toward other participants, the public, and the environment</li>
                <li>Comply with road safety rules and applicable laws</li>
              </ul>
              <p>Participation may be refused or terminated if behaviour is deemed unsafe.</p>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">5. Personal Belongings</h3>
              <p>
                You acknowledge and agree that any personal belongings brought to the run club are entirely at your own risk. The Trail Run Collective and The Dough Shack accept no responsibility for the loss, theft, or damage of any personal items before, during, or after the event. Participants are solely responsible for the safekeeping of their belongings at all times.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">6. Data Protection &amp; Privacy</h3>
              <p className="mb-3">
                By signing up to and participating in the run club, you agree that any personal data provided (including contact details and participation records) may be collected, stored, and shared between The Trail Run Collective and The Dough Shack for purposes including:
              </p>
              <ul className="list-disc list-inside space-y-2 mb-3">
                <li>Event administration</li>
                <li>Communication regarding the run club</li>
                <li>Relevant updates, offers, or future events</li>
              </ul>
              <p>All data will be handled in accordance with applicable UK data protection laws.</p>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">7. Run Club Participant Offer</h3>
              <p className="mb-3">
                Participants in the run club will receive 50% off one pizza, subject to the following conditions:
              </p>
              <ul className="list-disc list-inside space-y-2">
                <li>Valid for one pizza only per participant</li>
                <li>Redeemable only at The Dough Shack Surbiton location</li>
                <li>Valid on the same day as participation in the run club only</li>
                <li>Cannot be combined with any other offers or discounts</li>
                <li>Cannot be transferred, exchanged, or carried forward</li>
                <li>Valid for one-time use only</li>
              </ul>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">8. Photography &amp; Media</h3>
              <p>
                You consent to photographs or videos being taken during the run club, which may be used by The Trail Run Collective and The Dough Shack for promotional and marketing purposes. If you do not wish to be included, you should inform the organisers in advance.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">9. Emergency Contact &amp; Medical Assistance</h3>
              <p className="mb-3">You acknowledge that:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>You are responsible for providing accurate emergency contact information if requested</li>
                <li>In the event of an emergency, organisers may seek medical assistance on your behalf</li>
              </ul>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">10. Changes &amp; Cancellation</h3>
              <p>
                Organisers reserve the right to modify, postpone, or cancel the run club due to weather, safety concerns, or other unforeseen circumstances.
              </p>
            </section>

            <hr className="border-muted" />

            <section>
              <h3 className="text-xl font-bold text-foreground mb-3">11. Agreement to Terms</h3>
              <p className="mb-3">By registering for or attending the run club, you confirm that:</p>
              <ul className="list-disc list-inside space-y-2">
                <li>You have read and understood this waiver and terms and conditions</li>
                <li>You agree to be bound by them</li>
                <li>You accept full responsibility for your participation</li>
              </ul>
            </section>

            <hr className="border-muted" />

            <section className="pt-2">
              <div className="space-y-6 text-foreground">
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Participant Name</p>
                  <div className="border-b border-muted w-72 pb-1">&nbsp;</div>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Signature</p>
                  <div className="border-b border-muted w-72 pb-1">&nbsp;</div>
                </div>
                <div>
                  <p className="text-sm font-semibold uppercase tracking-widest text-muted-foreground mb-1">Date</p>
                  <div className="border-b border-muted w-72 pb-1">&nbsp;</div>
                </div>
              </div>
            </section>

          </div>
        </div>
      </main>
      <Footer />
    </>
  )
}

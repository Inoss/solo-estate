import { getTranslations } from 'next-intl/server'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return {
    title: 'Terms of Service - SOLO Estate',
    description: 'Terms of Service for SOLO Estate real estate platform',
  }
}

export default async function TermsPage({
  params,
}: {
  params: Promise<{ locale: string }>
}) {
  const { locale } = await params

  return (
    <div className="min-h-screen py-20 bg-background">
      <div className="container mx-auto px-6 lg:px-8 max-w-4xl">
        <h1 className="text-4xl font-bold text-foreground mb-8">Terms of Service</h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-muted-foreground mb-6">
            Last updated: {new Date().toLocaleDateString()}
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">1. Acceptance of Terms</h2>
            <p className="text-muted-foreground leading-relaxed">
              By accessing and using SOLO Estate's website and services, you accept and agree to be bound by the terms and provision of this agreement. If you do not agree to abide by the above, please do not use this service.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">2. Use License</h2>
            <p className="text-muted-foreground leading-relaxed mb-4">
              Permission is granted to temporarily access the materials (information or software) on SOLO Estate's website for personal, non-commercial transitory viewing only.
            </p>
            <p className="text-muted-foreground leading-relaxed">
              This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc pl-6 text-muted-foreground space-y-2 mt-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to reverse engineer any software contained on SOLO Estate's website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">3. Property Listings</h2>
            <p className="text-muted-foreground leading-relaxed">
              All property information is provided for informational purposes only. SOLO Estate makes every effort to ensure accuracy but cannot guarantee the completeness or accuracy of information. Properties may be subject to prior sale, price change, or withdrawal from the market without notice.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">4. Investment Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              Investment returns and projections are estimates based on current market conditions and historical data. Past performance does not guarantee future results. All investments carry risk, and you should consult with financial and legal advisors before making any investment decisions.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">5. User Accounts</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you create an account on our website, you are responsible for maintaining the security of your account and for all activities that occur under your account. You must immediately notify us of any unauthorized uses of your account or any other breaches of security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">6. Privacy Policy</h2>
            <p className="text-muted-foreground leading-relaxed">
              Your use of SOLO Estate's website is also governed by our Privacy Policy. Please review our Privacy Policy, which also governs the site and informs users of our data collection practices.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">7. Disclaimer</h2>
            <p className="text-muted-foreground leading-relaxed">
              The materials on SOLO Estate's website are provided on an 'as is' basis. SOLO Estate makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">8. Limitations</h2>
            <p className="text-muted-foreground leading-relaxed">
              In no event shall SOLO Estate or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on SOLO Estate's website.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">9. Governing Law</h2>
            <p className="text-muted-foreground leading-relaxed">
              These terms and conditions are governed by and construed in accordance with the laws of Georgia, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-bold text-foreground mb-4">10. Contact Information</h2>
            <p className="text-muted-foreground leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at:
            </p>
            <ul className="list-none text-muted-foreground space-y-2 mt-4">
              <li>Email: info@solo-estate.com</li>
              <li>Phone: +995 511 107 142</li>
              <li>Website: https://solo-estate.com</li>
            </ul>
          </section>
        </div>
      </div>
    </div>
  )
}

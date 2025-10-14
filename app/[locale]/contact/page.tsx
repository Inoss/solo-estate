import { getTranslations } from 'next-intl/server'
import { ContactForm } from '@/components/contact/contact-form'
import { ContactInfo } from '@/components/contact/contact-info'
import { ContactMethods } from '@/components/contact/contact-methods'

interface Props {
  params: Promise<{
    locale: string
  }>
}

export async function generateMetadata({ params }: Props) {
  const { locale } = await params
  const t = await getTranslations({ locale })

  return {
    title: 'Contact Us - SOLO Estate',
    description: 'Get in touch with SOLO Estate. Our team is ready to help you find the perfect investment property in Georgia.',
    openGraph: {
      title: 'Contact Us - SOLO Estate',
      description: 'Get in touch with our team of real estate investment experts',
      locale: locale,
      type: 'website',
    },
  }
}

export default async function ContactPage({ params }: Props) {
  const { locale } = await params

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-primary to-primary/80 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-5xl font-bold mb-6">Get in Touch</h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto">
            Ready to start your investment journey? Our team is here to answer your questions
            and guide you through the process.
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <ContactMethods locale={locale} />

      {/* Main Contact Section */}
      <section className="py-20 bg-background">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <div>
              <h2 className="text-3xl font-bold mb-6">Send Us a Message</h2>
              <p className="text-muted-foreground mb-8">
                Fill out the form below and we'll get back to you within 24 hours.
              </p>
              <ContactForm locale={locale} />
            </div>

            {/* Contact Information */}
            <ContactInfo locale={locale} />
          </div>
        </div>
      </section>

      {/* Map Section */}
      <section className="h-96 bg-muted">
        <iframe
          width="100%"
          height="100%"
          frameBorder="0"
          style={{ border: 0 }}
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.1154690530456!2d44.78689431543658!3d41.723488279234246!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40447294decc3bd7%3A0x7b12ad0b0d63b1a2!2sTbilisi%2C%20Georgia!5e0!3m2!1sen!2sus!4v1234567890123!5m2!1sen!2sus"
          allowFullScreen
          loading="lazy"
        />
      </section>
    </div>
  )
}

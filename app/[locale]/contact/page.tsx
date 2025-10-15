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
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-black via-gray-900 to-black text-white py-32">
        {/* Animated Background Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-32 h-32 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '0s' }} />
          <div className="absolute top-40 right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '2s' }} />
          <div className="absolute bottom-32 left-1/4 w-36 h-36 bg-accent/10 rounded-full blur-2xl animate-float" style={{ animationDelay: '4s' }} />
        </div>

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent/20 backdrop-blur-sm px-5 py-2 text-sm font-semibold text-accent border border-accent/30 shadow-lg mb-6">
            <span>💎</span>
            <span>Premium Support</span>
          </div>
          <h1 className="text-5xl font-bold mb-6 bg-gradient-to-r from-white via-accent to-white bg-clip-text text-transparent">
            Get in Touch
          </h1>
          <p className="text-xl opacity-90 max-w-2xl mx-auto text-gray-200">
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
              <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
                Send Us a Message
              </h2>
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
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2978.0!2d44.7937!3d41.7151!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNDHCsDQyJzU0LjQiTiA0NMKwNDcnMzcuMyJF!5e0!3m2!1sen!2sge!4v1234567890123!5m2!1sen!2sge&q=Gotua+Street+1,+Tbilisi,+Georgia"
          allowFullScreen
          loading="lazy"
        />
      </section>
    </div>
  )
}

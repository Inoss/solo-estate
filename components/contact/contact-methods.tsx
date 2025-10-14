export function ContactMethods({ locale }: { locale: string }) {
  const methods = [
    {
      icon: '💬',
      title: 'Live Chat',
      description: 'Get instant answers',
      action: 'Start Chat',
      href: '#',
    },
    {
      icon: '📱',
      title: 'WhatsApp',
      description: 'Message us anytime',
      action: 'Open WhatsApp',
      href: 'https://wa.me/995555123456',
    },
    {
      icon: '📧',
      title: 'Email',
      description: 'info@soloestate.ge',
      action: 'Send Email',
      href: 'mailto:info@soloestate.ge',
    },
    {
      icon: '📞',
      title: 'Phone',
      description: '+995 555 123 456',
      action: 'Call Now',
      href: 'tel:+995555123456',
    },
  ]

  return (
    <section className="py-12 border-b">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, index) => (
            <a
              key={index}
              href={method.href}
              className="flex flex-col items-center text-center p-6 rounded-xl border-2 border-border hover:border-primary hover:shadow-lg transition-all group"
            >
              <div className="text-5xl mb-4 group-hover:scale-110 transition-transform">
                {method.icon}
              </div>
              <h3 className="text-lg font-semibold mb-2">{method.title}</h3>
              <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
              <span className="text-sm font-medium text-primary group-hover:underline">
                {method.action} →
              </span>
            </a>
          ))}
        </div>
      </div>
    </section>
  )
}

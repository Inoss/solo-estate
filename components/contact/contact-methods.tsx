import { MessageCircle, Phone, Mail, MessageSquare } from 'lucide-react'

export function ContactMethods({ locale }: { locale: string }) {
  const methods = [
    {
      icon: MessageCircle,
      title: 'Live Chat',
      description: 'Get instant answers',
      action: 'Start Chat',
      href: '#',
    },
    {
      icon: MessageSquare,
      title: 'WhatsApp',
      description: 'Message us anytime',
      action: 'Open WhatsApp',
      href: 'https://wa.me/995511107142',
    },
    {
      icon: Mail,
      title: 'Email',
      description: 'sales@soloestate.ge',
      action: 'Send Email',
      href: 'mailto:sales@soloestate.ge',
    },
    {
      icon: Phone,
      title: 'Phone',
      description: '+995 511 107 142',
      action: 'Call Now',
      href: 'tel:+995511107142',
    },
  ]

  return (
    <section className="py-16 -mt-12 relative z-20">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {methods.map((method, index) => {
            const IconComponent = method.icon
            return (
              <a
                key={index}
                href={method.href}
                className="glass flex flex-col items-center text-center p-8 rounded-xl border border-white/10 hover:border-accent/50 hover:shadow-2xl hover:shadow-accent/20 transition-all duration-300 group backdrop-blur-md bg-white/5"
              >
                <div className="w-16 h-16 rounded-full bg-gradient-to-br from-accent/20 to-yellow-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform border border-accent/30">
                  <IconComponent className="h-8 w-8 text-accent" />
                </div>
                <h3 className="text-lg font-semibold mb-2 text-foreground">{method.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{method.description}</p>
                <span className="text-sm font-medium bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent group-hover:underline flex items-center gap-1">
                  {method.action} →
                </span>
              </a>
            )
          })}
        </div>
      </div>
    </section>
  )
}

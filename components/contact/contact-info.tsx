import { Card, CardContent } from '@/components/ui/card'

export function ContactInfo({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6">Contact Information</h2>
        <p className="text-muted-foreground">
          Reach out to us through any of these channels and we'll respond promptly.
        </p>
      </div>

      {/* Office Address */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl">
              📍
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Office Address</h3>
              <p className="text-muted-foreground">
                123 Rustaveli Avenue<br />
                Tbilisi 0108, Georgia
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phone */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl">
              📞
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <a href="tel:+995555123456" className="text-muted-foreground hover:text-primary transition-colors">
                +995 555 123 456
              </a>
              <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl">
              ✉️
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <a href="mailto:info@soloestate.ge" className="text-muted-foreground hover:text-primary transition-colors">
                info@soloestate.ge
              </a>
              <p className="text-sm text-muted-foreground mt-1">We reply within 24 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card>
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center text-primary text-2xl">
              🕐
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Business Hours</h3>
              <div className="text-muted-foreground space-y-1">
                <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                <p>Saturday: 10:00 AM - 4:00 PM</p>
                <p>Sunday: Closed</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

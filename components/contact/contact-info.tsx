import { Card, CardContent } from '@/components/ui/card'
import { MapPin, Phone, Mail, Clock } from 'lucide-react'

export function ContactInfo({ locale }: { locale: string }) {
  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold mb-6 bg-gradient-to-r from-foreground to-accent bg-clip-text text-transparent">
          Contact Information
        </h2>
        <p className="text-muted-foreground">
          Reach out to us through any of these channels and we'll respond promptly.
        </p>
      </div>

      {/* Office Address */}
      <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-accent/20 to-yellow-500/20 rounded-lg flex items-center justify-center border border-accent/30">
              <MapPin className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Office Address</h3>
              <p className="text-muted-foreground">
                Gotua Street N1<br />
                Tbilisi, Georgia
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Phone */}
      <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-accent/20 to-yellow-500/20 rounded-lg flex items-center justify-center border border-accent/30">
              <Phone className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Phone</h3>
              <a href="tel:+995511107142" className="text-muted-foreground hover:text-accent transition-colors font-medium">
                +995 511 107 142
              </a>
              <p className="text-sm text-muted-foreground mt-1">Mon-Fri, 9:00 AM - 6:00 PM</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Email */}
      <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-accent/20 to-yellow-500/20 rounded-lg flex items-center justify-center border border-accent/30">
              <Mail className="h-6 w-6 text-accent" />
            </div>
            <div>
              <h3 className="font-semibold text-lg mb-2">Email</h3>
              <a href="mailto:info@soloestate.ge" className="text-muted-foreground hover:text-accent transition-colors font-medium">
                info@soloestate.ge
              </a>
              <p className="text-sm text-muted-foreground mt-1">We reply within 24 hours</p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Business Hours */}
      <Card className="border-accent/20 hover:border-accent/40 transition-all duration-300 hover:shadow-lg hover:shadow-accent/10">
        <CardContent className="p-6">
          <div className="flex items-start gap-4">
            <div className="flex-shrink-0 w-14 h-14 bg-gradient-to-br from-accent/20 to-yellow-500/20 rounded-lg flex items-center justify-center border border-accent/30">
              <Clock className="h-6 w-6 text-accent" />
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

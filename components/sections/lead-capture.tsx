'use client'

import { useState } from 'react'
import { useLocale } from 'next-intl'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Star, TrendingUp, Home, CreditCard, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react'

export function LeadCapture() {
  const locale = useLocale()
  const [phone, setPhone] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate API call
    setTimeout(() => {
      setIsSubmitting(false)
      setIsSuccess(true)

      // Reset after 3 seconds
      setTimeout(() => {
        setIsSuccess(false)
        setPhone('')
      }, 3000)
    }, 1500)
  }

  return (
    <section className="relative py-20 lg:py-28 overflow-hidden">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1582407947304-fd86f028f716?q=80&w=2096')",
        }}
      />

      {/* Dark Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-black/85 via-primary/80 to-black/85" />

      {/* Animated Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-yellow-500/10 rounded-full blur-3xl animate-pulse delay-1000" />
      </div>

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left Side - Value Propositions */}
            <div className="text-white space-y-8">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-accent/20 backdrop-blur-md px-5 py-2.5 rounded-full border border-accent/40 shadow-xl">
                <Sparkles className="h-4 w-4 text-accent" />
                <span className="text-sm font-bold text-accent">Exclusive Investment Offers</span>
              </div>

              {/* Heading */}
              <div>
                <h2 className="text-4xl lg:text-5xl font-bold mb-4 leading-tight">
                  Get TOP-10 Property Offers
                  <span className="block mt-2 bg-gradient-to-r from-accent via-yellow-300 to-accent bg-clip-text text-transparent">
                    Selected for You
                  </span>
                </h2>
                <p className="text-xl text-gray-300 leading-relaxed">
                  Handpicked investment opportunities in Tbilisi & Batumi with verified returns
                </p>
              </div>

              {/* Value Props */}
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center shadow-lg">
                    <TrendingUp className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">Price from $800/m²</h3>
                    <p className="text-sm text-gray-300">Premium locations at competitive prices</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg">
                    <Home className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">With & Without Finishing</h3>
                    <p className="text-sm text-gray-300">Choose your preferred completion level</p>
                  </div>
                </div>

                <div className="flex items-start gap-4 bg-white/10 backdrop-blur-sm rounded-xl p-4 border border-white/20">
                  <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br from-accent to-accent/70 flex items-center justify-center shadow-lg">
                    <CreditCard className="h-6 w-6 text-white" />
                  </div>
                  <div>
                    <h3 className="font-bold text-lg mb-1">0% Interest Installments</h3>
                    <p className="text-sm text-gray-300">Flexible payment plans available</p>
                  </div>
                </div>
              </div>

              {/* Trust Indicators */}
              <div className="flex items-center gap-6 pt-4">
                <div className="flex -space-x-3">
                  {[1, 2, 3, 4].map((i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full border-2 border-white bg-gradient-to-br from-accent to-yellow-500 flex items-center justify-center text-white font-bold text-xs"
                    >
                      {i === 4 ? '+' : '👤'}
                    </div>
                  ))}
                </div>
                <div className="text-sm">
                  <div className="font-bold">500+ Happy Investors</div>
                  <div className="text-gray-300">Joined this month</div>
                </div>
              </div>
            </div>

            {/* Right Side - Form */}
            <div className="bg-white rounded-3xl p-8 lg:p-10 shadow-2xl border border-accent/20 transform hover:scale-105 transition-transform duration-300">
              {!isSuccess ? (
                <>
                  {/* Form Header */}
                  <div className="text-center mb-8">
                    <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-accent to-yellow-500 mb-4 shadow-xl">
                      <Star className="h-8 w-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-bold text-foreground mb-2">
                      Get Your Free Selection
                    </h3>
                    <p className="text-muted-foreground">
                      Enter your phone number and receive personalized offers in 5 minutes
                    </p>
                  </div>

                  {/* Form */}
                  <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                      <label htmlFor="phone" className="block text-sm font-semibold text-foreground mb-2">
                        Your Phone Number
                      </label>
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+7 (___) ___-__-__"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        required
                        className="h-14 text-lg border-2 border-border/50 focus:border-accent rounded-xl"
                      />
                      <p className="text-xs text-muted-foreground mt-2">
                        We'll send you offers via WhatsApp or Telegram
                      </p>
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full h-14 text-lg font-bold gradient-gold text-white hover:opacity-90 transition-all duration-300 shadow-xl hover:shadow-2xl group rounded-xl"
                    >
                      {isSubmitting ? (
                        <span>Sending...</span>
                      ) : (
                        <>
                          <span>Get TOP-10 Offers</span>
                          <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
                        </>
                      )}
                    </Button>

                    {/* Privacy Notice */}
                    <p className="text-xs text-center text-muted-foreground">
                      By submitting, you agree to our Privacy Policy. We respect your data.
                    </p>
                  </form>

                  {/* Benefits */}
                  <div className="mt-6 pt-6 border-t border-border/50 space-y-3">
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">No spam, ever</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">Free consultation included</span>
                    </div>
                    <div className="flex items-center gap-3 text-sm">
                      <CheckCircle2 className="h-5 w-5 text-green-500 flex-shrink-0" />
                      <span className="text-foreground">Verified properties only</span>
                    </div>
                  </div>
                </>
              ) : (
                /* Success State */
                <div className="text-center py-12">
                  <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-500 mb-6 shadow-xl animate-bounce">
                    <CheckCircle2 className="h-10 w-10 text-white" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-3">
                    Success! 🎉
                  </h3>
                  <p className="text-lg text-muted-foreground mb-6">
                    Your request has been received. Our expert will contact you within 5 minutes with your personalized property selection.
                  </p>
                  <div className="inline-flex items-center gap-2 bg-green-50 text-green-700 px-4 py-2 rounded-full text-sm font-semibold">
                    <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
                    Processing your request...
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

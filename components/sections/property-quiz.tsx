'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  Home,
  DollarSign,
  MapPin,
  Calendar,
  TrendingUp,
  Users,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  CheckCircle2,
  Building2,
  Briefcase
} from 'lucide-react'

interface QuizData {
  propertyType: string
  budget: string
  location: string
  purpose: string
  timeline: string
  size: string
  infrastructure: string[]
  contact: {
    name: string
    phone: string
    email: string
  }
}

export function PropertyQuiz() {
  const [isOpen, setIsOpen] = useState(false)
  const [currentStep, setCurrentStep] = useState(1)
  const [quizData, setQuizData] = useState<QuizData>({
    propertyType: '',
    budget: '',
    location: '',
    purpose: '',
    timeline: '',
    size: '',
    infrastructure: [],
    contact: {
      name: '',
      phone: '',
      email: '',
    },
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const totalSteps = 7

  const handleNext = () => {
    if (currentStep < totalSteps) {
      setCurrentStep(currentStep + 1)
    }
  }

  const handleBack = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1)
    }
  }

  const handleSubmit = () => {
    // Here you would send data to your API
    console.log('Quiz Data:', quizData)
    setIsSubmitted(true)
  }

  const updateData = (field: string, value: any) => {
    setQuizData({ ...quizData, [field]: value })
  }

  const updateContact = (field: string, value: string) => {
    setQuizData({
      ...quizData,
      contact: { ...quizData.contact, [field]: value },
    })
  }

  const toggleInfrastructure = (item: string) => {
    const current = quizData.infrastructure
    if (current.includes(item)) {
      updateData('infrastructure', current.filter(i => i !== item))
    } else {
      updateData('infrastructure', [...current, item])
    }
  }

  if (!isOpen) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-br from-accent/10 via-background to-yellow-500/10 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(201,169,97,0.15),transparent_50%)]" />

        <div className="container mx-auto px-6 lg:px-8 relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            {/* Badge */}
            <div className="inline-flex items-center gap-2 bg-white backdrop-blur-sm px-6 py-3 rounded-full border-2 border-accent/30 shadow-xl mb-6">
              <Sparkles className="h-5 w-5 text-accent" />
              <span className="text-sm font-bold text-accent">Free Property Selection</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              Answer 7 Questions & Get
              <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
                5 Perfect Properties for You
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              Our AI-powered system will match you with the best properties based on your preferences, budget, and investment goals. Takes only 2 minutes!
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: CheckCircle2, text: 'Verified Properties Only' },
                { icon: TrendingUp, text: 'ROI Calculator Included' },
                { icon: Sparkles, text: 'Instant Results' },
              ].map((item, idx) => (
                <div
                  key={idx}
                  className="flex items-center justify-center gap-3 bg-white rounded-xl p-4 shadow-md border border-border/50"
                >
                  <item.icon className="h-5 w-5 text-accent flex-shrink-0" />
                  <span className="text-sm font-semibold text-foreground">{item.text}</span>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button
              size="lg"
              onClick={() => setIsOpen(true)}
              className="gradient-gold text-white hover:opacity-90 px-12 py-8 h-auto text-xl font-bold shadow-2xl hover:shadow-3xl transition-all duration-300 group rounded-2xl"
            >
              <span>Start Quiz Now</span>
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="mt-6 text-sm text-muted-foreground">
              ⏱️ Takes 2 minutes • 🎁 100% Free • 🔒 No credit card required
            </p>
          </div>
        </div>
      </section>
    )
  }

  if (isSubmitted) {
    return (
      <section className="py-20 lg:py-28 bg-gradient-to-br from-green-50 to-background">
        <div className="container mx-auto px-6 lg:px-8">
          <div className="max-w-2xl mx-auto text-center">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-500 mb-8 shadow-2xl animate-bounce">
              <CheckCircle2 className="h-12 w-12 text-white" />
            </div>

            <h2 className="text-4xl font-bold text-foreground mb-4">
              Perfect! We're Preparing Your Selection
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              Our experts are analyzing 1000+ properties to find the perfect 5 matches for you.
              You'll receive your personalized selection within 15 minutes via WhatsApp or email.
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-border/50 mb-8">
              <h3 className="font-bold text-lg mb-4">What happens next?</h3>
              <div className="space-y-4 text-left">
                {[
                  'Our AI analyzes your preferences against our database',
                  'Expert review of top 10 matches',
                  'You receive 5 best properties with full details',
                  'Free 30-min consultation with our specialist',
                ].map((step, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="flex-shrink-0 w-6 h-6 rounded-full bg-accent text-white flex items-center justify-center text-sm font-bold">
                      {idx + 1}
                    </div>
                    <span className="text-muted-foreground">{step}</span>
                  </div>
                ))}
              </div>
            </div>

            <Button
              size="lg"
              onClick={() => {
                setIsOpen(false)
                setIsSubmitted(false)
                setCurrentStep(1)
              }}
              variant="outline"
              className="px-8 py-6 h-auto text-lg"
            >
              Close
            </Button>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="min-h-screen py-10 px-4">
        <div className="max-w-3xl mx-auto bg-white rounded-3xl shadow-2xl overflow-hidden">
          {/* Progress Bar */}
          <div className="bg-secondary p-6">
            <div className="flex items-center justify-between mb-3">
              <span className="text-sm font-semibold text-foreground">
                Step {currentStep} of {totalSteps}
              </span>
              <span className="text-sm text-muted-foreground">
                {Math.round((currentStep / totalSteps) * 100)}% Complete
              </span>
            </div>
            <div className="w-full bg-border rounded-full h-3 overflow-hidden">
              <div
                className="h-full bg-gradient-to-r from-accent to-yellow-500 transition-all duration-500 rounded-full"
                style={{ width: `${(currentStep / totalSteps) * 100}%` }}
              />
            </div>
          </div>

          {/* Quiz Content */}
          <div className="p-8 lg:p-12">
            {/* Step 1: Property Type */}
            {currentStep === 1 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <Building2 className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    What type of property are you looking for?
                  </h3>
                  <p className="text-muted-foreground">Select one option</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'apartment', label: 'Apartment', icon: Home },
                    { value: 'house', label: 'House / Villa', icon: Home },
                    { value: 'commercial', label: 'Commercial Property', icon: Briefcase },
                    { value: 'land', label: 'Land / Plot', icon: MapPin },
                  ].map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.value}
                        onClick={() => updateData('propertyType', option.value)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                          quizData.propertyType === option.value
                            ? 'border-accent bg-accent/10 shadow-lg scale-105'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <Icon className="h-8 w-8 text-accent mb-3" />
                        <div className="font-bold text-lg">{option.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 2: Budget */}
            {currentStep === 2 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <DollarSign className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    What's your budget?
                  </h3>
                  <p className="text-muted-foreground">Select your price range</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Under $50,000',
                    '$50,000 - $100,000',
                    '$100,000 - $200,000',
                    '$200,000 - $500,000',
                    'Above $500,000',
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateData('budget', option)}
                      className={`p-5 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                        quizData.budget === option
                          ? 'border-accent bg-accent/10 shadow-lg scale-105'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-bold text-lg">{option}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 3: Location */}
            {currentStep === 3 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <MapPin className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    Where do you want to buy?
                  </h3>
                  <p className="text-muted-foreground">Choose preferred location</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Tbilisi - City Center',
                    'Tbilisi - Saburtalo',
                    'Tbilisi - Vake',
                    'Batumi - Seafront',
                    'Batumi - City Center',
                    'Other Location',
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateData('location', option)}
                      className={`p-5 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                        quizData.location === option
                          ? 'border-accent bg-accent/10 shadow-lg scale-105'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-bold text-lg">{option}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 4: Purpose */}
            {currentStep === 4 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <Target className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    What's your purchase goal?
                  </h3>
                  <p className="text-muted-foreground">Select your main purpose</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { value: 'investment', label: 'Investment / Rental Income', icon: TrendingUp },
                    { value: 'residence', label: 'Personal Residence', icon: Home },
                    { value: 'relocation', label: 'Relocation / Moving', icon: Users },
                    { value: 'permit', label: 'Residence Permit', icon: CheckCircle2 },
                  ].map((option) => {
                    const Icon = option.icon
                    return (
                      <button
                        key={option.value}
                        onClick={() => updateData('purpose', option.value)}
                        className={`p-6 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg flex items-center gap-4 ${
                          quizData.purpose === option.value
                            ? 'border-accent bg-accent/10 shadow-lg scale-105'
                            : 'border-border hover:border-accent/50'
                        }`}
                      >
                        <Icon className="h-8 w-8 text-accent flex-shrink-0" />
                        <div className="font-bold text-lg">{option.label}</div>
                      </button>
                    )
                  })}
                </div>
              </div>
            )}

            {/* Step 5: Timeline */}
            {currentStep === 5 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <Calendar className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    When do you want to buy?
                  </h3>
                  <p className="text-muted-foreground">Select your timeline</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    'Immediately (within 1 month)',
                    'Soon (1-3 months)',
                    'This year (3-12 months)',
                    'Just exploring options',
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateData('timeline', option)}
                      className={`p-5 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                        quizData.timeline === option
                          ? 'border-accent bg-accent/10 shadow-lg scale-105'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-bold text-lg">{option}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 6: Size */}
            {currentStep === 6 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <Home className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    What size do you need?
                  </h3>
                  <p className="text-muted-foreground">Select property size</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    'Studio (20-40 m²)',
                    '1 Bedroom (40-60 m²)',
                    '2 Bedrooms (60-90 m²)',
                    '3+ Bedrooms (90+ m²)',
                    'Large Property (150+ m²)',
                    'Flexible / Any size',
                  ].map((option) => (
                    <button
                      key={option}
                      onClick={() => updateData('size', option)}
                      className={`p-5 rounded-xl border-2 transition-all duration-300 text-left hover:shadow-lg ${
                        quizData.size === option
                          ? 'border-accent bg-accent/10 shadow-lg scale-105'
                          : 'border-border hover:border-accent/50'
                      }`}
                    >
                      <div className="font-bold text-lg">{option}</div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Step 7: Contact Info */}
            {currentStep === 7 && (
              <div className="space-y-6 animate-fade-in">
                <div className="text-center mb-8">
                  <Sparkles className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    Almost done! How can we reach you?
                  </h3>
                  <p className="text-muted-foreground">We'll send your personalized property selection</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      value={quizData.contact.name}
                      onChange={(e) => updateContact('name', e.target.value)}
                      placeholder="John Doe"
                      className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={quizData.contact.phone}
                      onChange={(e) => updateContact('phone', e.target.value)}
                      placeholder="+995 555 123 456"
                      className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={quizData.contact.email}
                      onChange={(e) => updateContact('email', e.target.value)}
                      placeholder="john@example.com"
                      className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-foreground">
                        By submitting, you agree to receive property recommendations via WhatsApp/Email.
                        We respect your privacy and won't spam.
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Navigation Buttons */}
            <div className="flex items-center justify-between mt-10 pt-8 border-t border-border">
              <div className="flex gap-3">
                {currentStep > 1 && (
                  <Button
                    onClick={handleBack}
                    variant="outline"
                    size="lg"
                    className="px-6"
                  >
                    <ArrowLeft className="mr-2 h-5 w-5" />
                    Back
                  </Button>
                )}
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="lg"
                >
                  Close
                </Button>
              </div>

              {currentStep < totalSteps ? (
                <Button
                  onClick={handleNext}
                  size="lg"
                  disabled={
                    (currentStep === 1 && !quizData.propertyType) ||
                    (currentStep === 2 && !quizData.budget) ||
                    (currentStep === 3 && !quizData.location) ||
                    (currentStep === 4 && !quizData.purpose) ||
                    (currentStep === 5 && !quizData.timeline) ||
                    (currentStep === 6 && !quizData.size)
                  }
                  className="gradient-gold text-white px-8"
                >
                  Next
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              ) : (
                <Button
                  onClick={handleSubmit}
                  size="lg"
                  disabled={
                    !quizData.contact.name ||
                    !quizData.contact.phone ||
                    !quizData.contact.email
                  }
                  className="gradient-gold text-white px-8"
                >
                  Get My Properties
                  <Sparkles className="ml-2 h-5 w-5" />
                </Button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

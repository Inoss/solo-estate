'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  FileText,
  Search,
  Eye,
  FileCheck,
  Trophy,
  Plane,
  User,
  Building,
  MapPin,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  Star,
  Clock,
  Shield
} from 'lucide-react'

export function PurchaseProcess() {
  const [activeStep, setActiveStep] = useState<number | null>(null)

  const steps = [
    {
      number: '01',
      title: 'Leave an Application',
      subtitle: 'Tell Us Your Vision',
      description: 'Share your requirements: property type, budget range, preferred location, and timeline. Our experts analyze your needs to create a personalized search strategy.',
      details: [
        'Property type and specifications',
        'Estimated budget and payment preferences',
        'Suitable terms and conditions',
        'Investment goals and timeline'
      ],
      icon: FileText,
      gradient: 'from-accent via-accent/90 to-accent/70',
      bgColor: 'bg-accent/10'
    },
    {
      number: '02',
      title: 'Receive Tailored Offers',
      subtitle: 'Handpicked Selection',
      description: 'We curate a selection of properties that perfectly match your criteria. Each option is verified, analyzed, and presented with complete transparency.',
      details: [
        'Maximum variants matching your criteria',
        'Detailed property analysis and reports',
        'ROI calculations and projections',
        'You select the most suitable options'
      ],
      icon: Search,
      gradient: 'from-accent via-accent/90 to-accent/70',
      bgColor: 'bg-accent/10'
    },
    {
      number: '03',
      title: 'Property Viewings',
      subtitle: 'See Your Future Home',
      description: 'Experience properties in person or virtually. We arrange live viewings, site visits with developers, and comprehensive online presentations for remote clients.',
      details: [
        'Live viewings of selected properties',
        'Construction site visits with developers',
        'Online presentations if needed',
        'Professional photography and videos'
      ],
      icon: Eye,
      gradient: 'from-accent via-accent/90 to-accent/70',
      bgColor: 'bg-accent/10'
    },
    {
      number: '04',
      title: 'Contract & Financing',
      subtitle: 'Secure Your Investment',
      description: 'We handle all paperwork and financial arrangements. From contract negotiation to mortgage processing, we ensure a smooth, secure transaction.',
      details: [
        'Sales contract preparation and review',
        'Secure money transfer arrangements',
        'Mortgage and installment plan setup',
        'Legal documentation support'
      ],
      icon: FileCheck,
      gradient: 'from-accent via-accent/90 to-accent/70',
      bgColor: 'bg-accent/10'
    },
    {
      number: '05',
      title: 'Welcome Home',
      subtitle: 'Your Investment Success',
      description: 'Congratulations! You are now the owner of premium real estate with strong rental potential and capital appreciation prospects.',
      details: [
        'Liquid real estate ownership',
        'Income potential from 30% per year',
        'Property management assistance',
        'Ongoing support and consultation'
      ],
      icon: Trophy,
      gradient: 'from-accent to-accent/70',
      bgColor: 'bg-accent/10'
    }
  ]

  const premiumServices = [
    {
      icon: Plane,
      title: 'VIP Airport Service',
      description: 'Complimentary pickup and hotel transfer',
      color: 'from-accent via-accent/80 to-accent/60'
    },
    {
      icon: User,
      title: 'Personal Manager',
      description: 'Dedicated expert guides you through everything',
      color: 'from-accent via-accent/80 to-accent/60'
    },
    {
      icon: Building,
      title: 'Office Consultation',
      description: 'In-depth discussion of all details',
      color: 'from-accent via-accent/80 to-accent/60'
    },
    {
      icon: MapPin,
      title: 'Guided Tours',
      description: 'Priority property and sightseeing tours',
      color: 'from-accent via-accent/80 to-accent/60'
    }
  ]

  const guarantees = [
    { icon: Clock, text: '24/7 Support', subtext: 'Available anytime' },
    { icon: Shield, text: '100% Secure', subtext: 'Legal protection' },
    { icon: Star, text: 'Top Properties', subtext: 'Verified only' }
  ]

  return (
    <section className="relative py-20 lg:py-28 bg-gradient-to-b from-background via-secondary/10 to-background overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#e5e7eb_1px,transparent_1px),linear-gradient(to_bottom,#e5e7eb_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />

      {/* Floating Gradient Blobs */}
      <div className="absolute top-20 left-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl animate-pulse" />
      <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl animate-pulse delay-1000" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="max-w-4xl mx-auto text-center mb-16">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-yellow-500/20 backdrop-blur-sm px-6 py-3 rounded-full border border-accent/30 shadow-lg mb-6">
            <Sparkles className="h-5 w-5 text-accent" />
            <span className="text-sm font-bold text-accent">Our Proven Method</span>
          </div>

          {/* Heading */}
          <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
            Purchase Your Dream Property
            <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              In Just 5 Simple Steps
            </span>
          </h2>

          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed mb-8">
            We are not an advertising board. We work with each client individually, taking into account all your wishes and requirements.
          </p>

          {/* Guarantees */}
          <div className="flex flex-wrap items-center justify-center gap-6 mb-8">
            {guarantees.map((item, idx) => {
              const Icon = item.icon
              return (
                <div key={idx} className="flex items-center gap-3 bg-white rounded-xl px-5 py-3 shadow-md border border-border/50">
                  <Icon className="h-5 w-5 text-accent" />
                  <div className="text-left">
                    <div className="font-bold text-sm text-foreground">{item.text}</div>
                    <div className="text-xs text-muted-foreground">{item.subtext}</div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Steps Timeline */}
        <div className="max-w-6xl mx-auto mb-20">
          <div className="space-y-6">
            {steps.map((step, index) => {
              const Icon = step.icon
              const isActive = activeStep === index

              return (
                <div
                  key={index}
                  className="group relative"
                  onMouseEnter={() => setActiveStep(index)}
                  onMouseLeave={() => setActiveStep(null)}
                >
                  {/* Connector Line */}
                  {index < steps.length - 1 && (
                    <div className="absolute left-8 top-20 w-0.5 h-full bg-gradient-to-b from-accent/30 to-transparent hidden lg:block" />
                  )}

                  <div className={`relative bg-white rounded-2xl p-6 lg:p-8 shadow-lg hover:shadow-2xl transition-all duration-500 border-2 ${
                    isActive ? 'border-accent scale-[1.02]' : 'border-border/50'
                  }`}>
                    <div className="flex flex-col lg:flex-row gap-6 items-start">
                      {/* Left: Number and Icon */}
                      <div className="flex-shrink-0">
                        <div className={`relative w-16 h-16 rounded-2xl bg-gradient-to-br ${step.gradient} shadow-xl flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                          <Icon className="h-8 w-8 text-white" />
                          <div className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-foreground text-white font-bold flex items-center justify-center text-sm shadow-lg">
                            {step.number}
                          </div>
                        </div>
                      </div>

                      {/* Middle: Content */}
                      <div className="flex-1">
                        <div className="mb-4">
                          <div className="text-sm font-bold text-accent mb-1">{step.subtitle}</div>
                          <h3 className="text-2xl font-bold text-foreground mb-2 group-hover:text-accent transition-colors">
                            {step.title}
                          </h3>
                          <p className="text-muted-foreground leading-relaxed">
                            {step.description}
                          </p>
                        </div>

                        {/* Details List */}
                        <div className={`grid grid-cols-1 md:grid-cols-2 gap-3 overflow-hidden transition-all duration-500 ${
                          isActive ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0 lg:max-h-96 lg:opacity-100'
                        }`}>
                          {step.details.map((detail, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0 mt-0.5" />
                              <span className="text-sm text-foreground">{detail}</span>
                            </div>
                          ))}
                        </div>
                      </div>

                      {/* Right: Step Indicator (Desktop) */}
                      <div className="hidden lg:block">
                        <div className={`w-32 h-32 rounded-2xl ${step.bgColor} flex items-center justify-center border-2 border-border/50 group-hover:border-accent transition-colors`}>
                          <div className="text-center">
                            <div className="text-4xl font-bold text-foreground mb-1">{index + 1}</div>
                            <div className="text-xs text-muted-foreground font-semibold">of {steps.length}</div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Bottom Border on Hover */}
                    <div className={`absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r ${step.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-300 rounded-b-2xl`} />
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Premium Services Section */}
        <div className="max-w-6xl mx-auto mb-16">
          <div className="bg-gradient-to-br from-primary via-primary/95 to-accent rounded-3xl p-10 lg:p-14 shadow-2xl overflow-hidden relative">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
            </div>

            <div className="relative z-10">
              {/* Header */}
              <div className="text-center mb-10">
                <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-sm px-5 py-2 rounded-full mb-4 border border-white/30">
                  <Star className="h-5 w-5 text-white" />
                  <span className="text-sm font-bold text-white">Premium Experience</span>
                </div>
                <h3 className="text-3xl lg:text-4xl font-bold text-white mb-4">
                  We Provide VIP Service at Your Request
                </h3>
                <p className="text-xl text-white/90 max-w-2xl mx-auto">
                  Experience world-class hospitality and personalized attention throughout your property journey
                </p>
              </div>

              {/* Services Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
                {premiumServices.map((service, idx) => {
                  const Icon = service.icon
                  return (
                    <div key={idx} className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 hover:bg-white/20 transition-all duration-300 group">
                      <div className={`inline-flex p-3 rounded-xl bg-gradient-to-br ${service.color} shadow-lg mb-4 group-hover:scale-110 transition-transform`}>
                        <Icon className="h-6 w-6 text-white" />
                      </div>
                      <h4 className="font-bold text-white mb-2 text-lg">{service.title}</h4>
                      <p className="text-sm text-white/80">{service.description}</p>
                    </div>
                  )
                })}
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <Button
                  size="lg"
                  className="bg-white text-primary hover:bg-white/90 px-10 py-7 h-auto text-lg font-bold shadow-xl hover:shadow-2xl transition-all duration-300 group"
                >
                  <span>Get Premium Offers</span>
                  <ArrowRight className="ml-2 h-5 w-5 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-10 py-7 h-auto text-lg font-bold transition-all duration-300"
                >
                  <FileText className="mr-2 h-5 w-5" />
                  <span>Apply Now</span>
                </Button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-3xl" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-3xl" />
          </div>
        </div>

        {/* Final CTA Stats */}
        <div className="max-w-5xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent mb-2">
                500+
              </div>
              <div className="text-sm text-muted-foreground font-semibold">Happy Homeowners</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent mb-2">
                1-5 Days
              </div>
              <div className="text-sm text-muted-foreground font-semibold">Average Process Time</div>
            </div>
            <div className="bg-white rounded-2xl p-8 shadow-lg border border-border/50 text-center hover:shadow-xl transition-shadow">
              <div className="text-5xl font-bold bg-gradient-to-r from-accent to-accent/70 bg-clip-text text-transparent mb-2">
                30%+
              </div>
              <div className="text-sm text-muted-foreground font-semibold">Annual ROI Potential</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

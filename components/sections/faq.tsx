'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  ChevronDown,
  Globe,
  CreditCard,
  Home,
  FileCheck,
  Receipt,
  Building2,
  Clock,
  TrendingUp,
  Shield,
  MessageCircle,
  HelpCircle,
  CheckCircle2,
  Sparkles
} from 'lucide-react'

interface FAQ {
  id: number
  question: string
  answer: string
  details: string[]
  icon: any
  category: string
}

export function FAQ() {
  const [openId, setOpenId] = useState<number | null>(1)

  const faqs: FAQ[] = [
    {
      id: 1,
      question: 'Is it possible to buy an apartment remotely?',
      answer: 'Yes! You can purchase property in Georgia completely remotely without visiting the country. We provide comprehensive online services to make the process seamless.',
      details: [
        'Virtual property tours with 360° views and live video calls',
        'Digital document signing with full legal validity',
        'Remote notarization services available',
        'SWIFT and cryptocurrency payment options',
        'Power of attorney can be arranged if needed',
        'Our team handles all on-ground procedures for you'
      ],
      icon: Globe,
      category: 'Buying Process'
    },
    {
      id: 2,
      question: 'What are the ways to pay for real estate in Georgia?',
      answer: 'Georgia offers flexible payment options including cash, bank transfers, cryptocurrency, installments, and mortgages to accommodate international investors.',
      details: [
        'Cash payment in USD, EUR, or GEL',
        'SWIFT international bank transfers',
        'Cryptocurrency payments (Bitcoin, Ethereum, USDT)',
        '0% interest installment plans from developers',
        'Bank mortgages with competitive rates (8-12% annually)',
        'Mixed payment methods are acceptable',
        'Escrow services available for security'
      ],
      icon: CreditCard,
      category: 'Financial'
    },
    {
      id: 3,
      question: 'How to choose the right property in Georgia?',
      answer: 'Our expert team analyzes your goals, budget, and preferences across 6 key parameters to find properties that perfectly match your investment objectives.',
      details: [
        'Define your purpose: investment, residence, or relocation',
        'Determine budget: new builds from $800/m², resale from $1,200/m²',
        'Choose location: Tbilisi (capital), Batumi (seaside), or mountain areas',
        'Consider rental yield potential (10-30% annually)',
        'Evaluate developer reputation and construction quality',
        'Check nearby infrastructure and future development plans',
        'Review legal status and ownership documents',
        'We provide detailed analysis reports for each option'
      ],
      icon: Home,
      category: 'Buying Process'
    },
    {
      id: 4,
      question: 'Can I get Georgian citizenship after buying real estate?',
      answer: 'Real estate purchase alone does not grant citizenship, but it can help you obtain a residence permit which is the first step toward citizenship.',
      details: [
        'Residence permit available for property owners (annual renewal)',
        'Investment of $100,000+ in property qualifies for residence',
        'After 5 years of legal residence, you can apply for citizenship',
        'Dual citizenship is allowed in Georgia',
        'Citizenship requires language test and integration exam',
        'Real estate ownership is a strong supporting factor',
        'We assist with all residence permit applications'
      ],
      icon: FileCheck,
      category: 'Legal'
    },
    {
      id: 5,
      question: 'What are the real estate taxes in Georgia?',
      answer: 'Georgia has one of the most favorable tax systems in the world for property owners, with very low annual taxes and no capital gains tax.',
      details: [
        'Annual property tax: 0.05% - 1% of cadastral value (extremely low)',
        'No capital gains tax when selling property',
        'No wealth tax or inheritance tax',
        'Rental income tax: 5% flat rate (one of the lowest globally)',
        'VAT: 0% on residential property sales',
        'One-time registration fee: approximately $50',
        'Foreign and local owners pay the same rates'
      ],
      icon: Receipt,
      category: 'Financial'
    },
    {
      id: 6,
      question: 'How do I get a loan or mortgage in Georgia?',
      answer: 'Both local and international buyers can access mortgages from Georgian banks, with competitive rates and flexible terms available.',
      details: [
        'Mortgage available for foreigners and residents',
        'Interest rates: 8-12% annually (depends on bank and profile)',
        'Down payment: typically 20-30% of property value',
        'Loan term: up to 20-25 years',
        'Required documents: passport, income proof, employment verification',
        'Some banks offer pre-approval within 3-5 days',
        'We partner with major banks to facilitate your application',
        'Alternative: 0% developer installment plans (no bank needed)'
      ],
      icon: Building2,
      category: 'Financial'
    },
    {
      id: 7,
      question: 'How long does the property purchase process take?',
      answer: 'The entire process can be completed in as little as 1-5 days if all documents are ready, making Georgia one of the fastest markets globally.',
      details: [
        'Property selection: 1-3 days with our expert team',
        'Document preparation: 1-2 days',
        'Due diligence and verification: 1 day',
        'Contract signing and registration: 1 day',
        'Total timeline: 1-5 days on average',
        'Can be done remotely without visiting Georgia',
        'We expedite all processes for our clients'
      ],
      icon: Clock,
      category: 'Buying Process'
    },
    {
      id: 8,
      question: 'What ROI can I expect from rental properties?',
      answer: 'Georgia offers exceptional rental yields, especially in Tbilisi and Batumi, with annual returns ranging from 10% to 30% depending on property type and location.',
      details: [
        'Long-term rentals: 8-12% annual yield',
        'Short-term vacation rentals: 15-30% annual yield',
        'Tbilisi city center: highest demand for long-term',
        'Batumi seaside: excellent for vacation rentals',
        'New developments: typically higher yields than resale',
        'We provide property management services',
        'Guaranteed rental programs available for some projects',
        'Capital appreciation: 5-15% annually in prime locations'
      ],
      icon: TrendingUp,
      category: 'Investment'
    },
    {
      id: 9,
      question: 'Is it safe to buy property in Georgia as a foreigner?',
      answer: 'Georgia has a transparent, secure legal system with full foreign ownership rights and strong property protection laws.',
      details: [
        'Foreigners have 100% ownership rights (same as locals)',
        'Property rights protected by law and international treaties',
        'Public registry system ensures title transparency',
        'Low corruption levels and rule of law',
        'Notary system provides additional security',
        'Title insurance available for extra protection',
        'We conduct full legal due diligence on every property',
        'Georgia ranks high in World Bank "Ease of Doing Business"'
      ],
      icon: Shield,
      category: 'Legal'
    },
    {
      id: 10,
      question: 'What about property management and maintenance?',
      answer: 'We offer comprehensive property management services to handle everything from tenant search to maintenance, ensuring hassle-free ownership.',
      details: [
        'Full property management services available',
        'Tenant search and screening',
        'Rent collection and financial reporting',
        'Property maintenance and repairs',
        'Utility bill management',
        'Annual inspections and compliance',
        'Management fees: typically 8-10% of rental income',
        '24/7 emergency support for tenants and owners'
      ],
      icon: Home,
      category: 'Services'
    }
  ]

  const categories = Array.from(new Set(faqs.map(faq => faq.category)))

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="relative py-16 lg:py-20 bg-gradient-to-b from-secondary/10 via-background to-secondary/10 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:20px_20px] opacity-30" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header - Compact */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30 shadow-lg mb-4">
            <HelpCircle className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold text-accent">Got Questions? We Have Answers</span>
          </div>

          {/* Heading - Smaller */}
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
            Frequently Asked
            <span className="inline-block ml-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed">
            Everything you need to know about buying property in Georgia
          </p>
        </div>

        {/* FAQ Accordion - 5 Column Grid - Compact */}
        <div className="max-w-7xl mx-auto mb-12">
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
            {faqs.map((faq) => {
              const Icon = faq.icon
              const isOpen = openId === faq.id

              return (
                <div
                  key={faq.id}
                  className={`bg-white rounded-xl shadow-sm hover:shadow-lg transition-all duration-300 border ${
                    isOpen ? 'border-accent shadow-accent/20' : 'border-border/50'
                  } flex flex-col`}
                >
                  {/* Question Header - Compact */}
                  <button
                    onClick={() => toggleFAQ(faq.id)}
                    className="w-full text-left p-4 flex items-start gap-2 group"
                  >
                    {/* Icon - Smaller */}
                    <div className={`flex-shrink-0 w-8 h-8 rounded-lg bg-gradient-to-br ${
                      isOpen ? 'from-accent to-yellow-500' : 'from-accent/10 to-accent/5'
                    } flex items-center justify-center transition-all duration-300 group-hover:scale-105`}>
                      <Icon className={`h-4 w-4 ${isOpen ? 'text-white' : 'text-accent'}`} />
                    </div>

                    {/* Question Text - Very Compact */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-start justify-between gap-1">
                        <h3 className={`text-[11px] font-semibold transition-colors leading-tight ${
                          isOpen ? 'text-accent' : 'text-foreground group-hover:text-accent'
                        }`}>
                          {faq.question}
                        </h3>
                        <ChevronDown className={`h-3 w-3 flex-shrink-0 text-muted-foreground transition-transform duration-300 ${
                          isOpen ? 'rotate-180 text-accent' : ''
                        }`} />
                      </div>

                      {/* Category Badge - Tiny */}
                      <div className="mt-0.5">
                        <span className="inline-block px-1 py-0.5 rounded text-[8px] font-semibold text-accent bg-accent/10">
                          {faq.category}
                        </span>
                      </div>
                    </div>
                  </button>

                  {/* Answer Content - Compact */}
                  <div className={`overflow-hidden transition-all duration-500 ${
                    isOpen ? 'max-h-[600px] opacity-100' : 'max-h-0 opacity-0'
                  }`}>
                    <div className="px-4 pb-4">
                      {/* Main Answer - Smaller */}
                      <p className="text-muted-foreground leading-snug mb-2 text-xs">
                        {faq.answer}
                      </p>

                      {/* Details List - Show only first 4 items */}
                      <div className="space-y-1.5 bg-gradient-to-br from-secondary/30 to-secondary/10 rounded-lg p-2">
                        {faq.details.slice(0, 4).map((detail, idx) => (
                          <div key={idx} className="flex items-start gap-1.5">
                            <CheckCircle2 className="h-3 w-3 text-green-500 flex-shrink-0 mt-0.5" />
                            <span className="text-[11px] text-foreground leading-snug">{detail}</span>
                          </div>
                        ))}
                        {faq.details.length > 4 && (
                          <div className="text-[10px] text-accent font-semibold pt-1">
                            +{faq.details.length - 4} more benefits
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              )
            })}
          </div>
        </div>

        {/* Still Have Questions CTA - Compact */}
        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gradient-to-br from-primary via-primary/95 to-accent rounded-2xl p-6 lg:p-8 shadow-xl overflow-hidden">
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(255,255,255,0.8),transparent_50%)]" />
            </div>

            <div className="relative z-10 text-center text-white">
              <h3 className="text-2xl lg:text-3xl font-bold mb-2">
                Still Have Questions?
              </h3>
              <p className="text-sm text-white/90 mb-6 max-w-2xl mx-auto">
                24/7 expert support • {'<'}5min response time • 100% satisfaction
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="default"
                  className="bg-white text-primary hover:bg-white/90 px-6 py-5 h-auto font-bold shadow-lg transition-all duration-300 group"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>Chat with Expert</span>
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-5 h-auto font-bold transition-all duration-300"
                >
                  <span>Schedule Call</span>
                </Button>
              </div>
            </div>

            {/* Decorative Elements */}
            <div className="absolute top-0 right-0 w-40 h-40 bg-white/5 rounded-full -translate-y-1/2 translate-x-1/2 blur-2xl" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-yellow-500/10 rounded-full translate-y-1/2 -translate-x-1/2 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}

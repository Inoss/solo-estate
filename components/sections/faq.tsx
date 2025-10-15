'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('home.faq')
  const [openId, setOpenId] = useState<number | null>(1)

  const faqs: FAQ[] = [
    {
      id: 1,
      question: t('q1'),
      answer: t('a1'),
      details: [
        t('q1d1'),
        t('q1d2'),
        t('q1d3'),
        t('q1d4'),
        t('q1d5'),
        t('q1d6')
      ],
      icon: Globe,
      category: t('category1')
    },
    {
      id: 2,
      question: t('q2'),
      answer: t('a2'),
      details: [
        t('q2d1'),
        t('q2d2'),
        t('q2d3'),
        t('q2d4'),
        t('q2d5'),
        t('q2d6'),
        t('q2d7')
      ],
      icon: CreditCard,
      category: t('category2')
    },
    {
      id: 3,
      question: t('q3'),
      answer: t('a3'),
      details: [
        t('q3d1'),
        t('q3d2'),
        t('q3d3'),
        t('q3d4'),
        t('q3d5'),
        t('q3d6'),
        t('q3d7'),
        t('q3d8')
      ],
      icon: Home,
      category: t('category1')
    },
    {
      id: 4,
      question: t('q4'),
      answer: t('a4'),
      details: [
        t('q4d1'),
        t('q4d2'),
        t('q4d3'),
        t('q4d4'),
        t('q4d5'),
        t('q4d6'),
        t('q4d7')
      ],
      icon: FileCheck,
      category: t('category3')
    },
    {
      id: 5,
      question: t('q5'),
      answer: t('a5'),
      details: [
        t('q5d1'),
        t('q5d2'),
        t('q5d3'),
        t('q5d4'),
        t('q5d5'),
        t('q5d6'),
        t('q5d7')
      ],
      icon: Receipt,
      category: t('category2')
    },
    {
      id: 6,
      question: t('q6'),
      answer: t('a6'),
      details: [
        t('q6d1'),
        t('q6d2'),
        t('q6d3'),
        t('q6d4'),
        t('q6d5'),
        t('q6d6'),
        t('q6d7'),
        t('q6d8')
      ],
      icon: Building2,
      category: t('category2')
    },
    {
      id: 7,
      question: t('q7'),
      answer: t('a7'),
      details: [
        t('q7d1'),
        t('q7d2'),
        t('q7d3'),
        t('q7d4'),
        t('q7d5'),
        t('q7d6'),
        t('q7d7')
      ],
      icon: Clock,
      category: t('category1')
    },
    {
      id: 8,
      question: t('q8'),
      answer: t('a8'),
      details: [
        t('q8d1'),
        t('q8d2'),
        t('q8d3'),
        t('q8d4'),
        t('q8d5'),
        t('q8d6'),
        t('q8d7'),
        t('q8d8')
      ],
      icon: TrendingUp,
      category: t('category4')
    },
    {
      id: 9,
      question: t('q9'),
      answer: t('a9'),
      details: [
        t('q9d1'),
        t('q9d2'),
        t('q9d3'),
        t('q9d4'),
        t('q9d5'),
        t('q9d6'),
        t('q9d7'),
        t('q9d8')
      ],
      icon: Shield,
      category: t('category3')
    },
    {
      id: 10,
      question: t('q10'),
      answer: t('a10'),
      details: [
        t('q10d1'),
        t('q10d2'),
        t('q10d3'),
        t('q10d4'),
        t('q10d5'),
        t('q10d6'),
        t('q10d7'),
        t('q10d8')
      ],
      icon: Home,
      category: t('category5')
    }
  ]

  const categories = Array.from(new Set(faqs.map(faq => faq.category)))

  const toggleFAQ = (id: number) => {
    setOpenId(openId === id ? null : id)
  }

  return (
    <section className="relative py-16 lg:py-20 bg-white pattern-dots texture-noise overflow-hidden">
      {/* Decorative geometric elements */}
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent/5 rounded-full blur-3xl" />
      <div className="absolute bottom-40 left-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />

      <div className="container mx-auto px-6 lg:px-8 relative z-10">
        {/* Section Header - Compact */}
        <div className="max-w-3xl mx-auto text-center mb-10">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-accent/20 to-yellow-500/20 backdrop-blur-sm px-4 py-2 rounded-full border border-accent/30 shadow-lg mb-4">
            <HelpCircle className="h-4 w-4 text-accent" />
            <span className="text-xs font-bold text-accent">{t('badge')}</span>
          </div>

          {/* Heading - Smaller */}
          <h2 className="text-3xl lg:text-4xl font-bold text-foreground mb-3 leading-tight">
            {t('title')}
            <span className="inline-block ml-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
              {t('titleHighlight')}
            </span>
          </h2>

          <p className="text-base text-muted-foreground leading-relaxed">
            {t('subtitle')}
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
                            {t('moreBenefits', { count: faq.details.length - 4 })}
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
                {t('ctaTitle')}
              </h3>
              <p className="text-sm text-white/90 mb-6 max-w-2xl mx-auto">
                {t('ctaSubtitle')}
              </p>

              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <Button
                  size="default"
                  className="bg-white text-primary hover:bg-white/90 px-6 py-5 h-auto font-bold shadow-lg transition-all duration-300 group"
                >
                  <MessageCircle className="mr-2 h-4 w-4" />
                  <span>{t('ctaButton1')}</span>
                </Button>
                <Button
                  size="default"
                  variant="outline"
                  className="bg-transparent border-2 border-white text-white hover:bg-white/10 px-6 py-5 h-auto font-bold transition-all duration-300"
                >
                  <span>{t('ctaButton2')}</span>
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

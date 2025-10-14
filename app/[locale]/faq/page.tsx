'use client'

import { useState } from 'react'
import { getTranslations } from 'next-intl/server'
import { ChevronDown } from 'lucide-react'

interface FAQItem {
  question: string
  answer: string
  category: string
}

export default function FAQPage() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  const categories = [
    { id: 'buying', label: 'Buying Process' },
    { id: 'investment', label: 'Investment & Returns' },
    { id: 'legal', label: 'Legal & Taxes' },
    { id: 'management', label: 'Property Management' },
    { id: 'general', label: 'General Questions' },
  ]

  const faqs: FAQItem[] = [
    {
      category: 'buying',
      question: 'Can foreigners buy property in Georgia?',
      answer: 'Yes, Georgia has one of the most liberal property laws in the region. Foreigners can buy apartments and commercial properties without restrictions. However, agricultural land has some limitations.',
    },
    {
      category: 'buying',
      question: 'What is the buying process timeline?',
      answer: 'The typical timeline is 2-4 weeks from offer acceptance to closing. This includes due diligence (3-5 days), contract preparation (1 week), and registration (1-2 weeks).',
    },
    {
      category: 'buying',
      question: 'What are the closing costs?',
      answer: 'Closing costs typically range from 3-5% of the property price, including: registration fee (0.5%), notary fees (1-2%), legal fees (1-2%), and translation services if needed.',
    },
    {
      category: 'buying',
      question: 'Do I need to visit Georgia to buy property?',
      answer: 'While we recommend visiting to see the property, it\'s possible to complete the purchase remotely using a Power of Attorney. We can guide you through the entire process.',
    },
    {
      category: 'investment',
      question: 'What is the typical ROI for rental properties?',
      answer: 'Rental yields in Tbilisi typically range from 6-10% annually, depending on location and property type. Batumi can offer 8-12% for short-term rentals during high season.',
    },
    {
      category: 'investment',
      question: 'What is the expected capital appreciation?',
      answer: 'Historical data shows 5-8% annual appreciation in Tbilisi\'s prime areas. New developments in emerging neighborhoods can see higher appreciation rates.',
    },
    {
      category: 'investment',
      question: 'Can I get financing in Georgia?',
      answer: 'Georgian banks offer mortgages to foreigners, typically requiring 30-50% down payment. Interest rates range from 10-14% for foreigners. We can connect you with local banks.',
    },
    {
      category: 'investment',
      question: 'What are the risks I should consider?',
      answer: 'Main risks include: currency fluctuations (GEL/USD/EUR), developer delays for off-plan properties, regulatory changes, and tenant turnover. We help mitigate these through due diligence.',
    },
    {
      category: 'legal',
      question: 'What taxes do property owners pay in Georgia?',
      answer: 'Property tax is minimal (0.05-1% annually based on value). Rental income is taxed at 5% for individuals or 1% under the small business regime. Capital gains tax is 0% if owned for 2+ years.',
    },
    {
      category: 'legal',
      question: 'How is property registered?',
      answer: 'Properties are registered with the National Agency of Public Registry (NAPR). The process takes 1-2 weeks and creates a clear, blockchain-based title that is publicly searchable.',
    },
    {
      category: 'legal',
      question: 'What legal protections do foreign buyers have?',
      answer: 'Foreign buyers have the same legal protections as Georgian citizens. Property rights are strongly protected by law, and Georgia ranks highly in property rights indices.',
    },
    {
      category: 'legal',
      question: 'Do I need a Georgian lawyer?',
      answer: 'While not mandatory, we strongly recommend using a local lawyer for due diligence, contract review, and registration. We work with trusted legal partners.',
    },
    {
      category: 'management',
      question: 'Do you provide property management services?',
      answer: 'Yes, we offer full property management including: tenant sourcing, rent collection, maintenance, legal compliance, and financial reporting. Fees typically range from 8-12% of rental income.',
    },
    {
      category: 'management',
      question: 'How do you find tenants?',
      answer: 'We use multiple channels: online listings, social media, corporate relocations, and our tenant database. Average time to find a qualified tenant is 2-4 weeks.',
    },
    {
      category: 'management',
      question: 'What if the property needs repairs?',
      answer: 'Our team handles all maintenance issues. Minor repairs (under $200) are handled immediately. Larger repairs require owner approval. We work with vetted contractors.',
    },
    {
      category: 'general',
      question: 'Why invest in Georgia?',
      answer: 'Georgia offers: attractive yields (6-12%), low taxes (1-5%), strong property rights, growing tourism, EU candidate status, and a strategic location between Europe and Asia.',
    },
    {
      category: 'general',
      question: 'Which cities are best for investment?',
      answer: 'Tbilisi (capital) offers stability and year-round rental demand. Batumi (seaside) offers higher yields through tourism. Kutaisi and Rustavi are emerging markets with lower entry prices.',
    },
    {
      category: 'general',
      question: 'What is the minimum investment amount?',
      answer: 'Quality investment properties start from $50,000-$70,000 for apartments in secondary cities, and $80,000-$120,000 in Tbilisi\'s good locations.',
    },
    {
      category: 'general',
      question: 'How do I repatriate rental income?',
      answer: 'Georgia has no capital controls. You can transfer money freely in any currency. We can set up direct deposits to your foreign bank account.',
    },
  ]

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <div className="min-h-screen py-20">
      <div className="container mx-auto px-4">
        {/* Hero */}
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Get answers to common questions about investing in Georgian real estate.
            Can't find what you're looking for? Contact us directly.
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap justify-center gap-3 mb-12">
          {categories.map((category) => (
            <button
              key={category.id}
              className="px-6 py-3 rounded-full border hover:bg-muted transition-colors"
            >
              {category.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion */}
        <div className="max-w-4xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="border rounded-xl overflow-hidden"
            >
              <button
                onClick={() => toggleFAQ(index)}
                className="w-full p-6 text-left flex items-center justify-between hover:bg-muted/50 transition-colors"
              >
                <span className="font-semibold text-lg pr-8">{faq.question}</span>
                <ChevronDown
                  className={`w-5 h-5 flex-shrink-0 transition-transform ${
                    openIndex === index ? 'rotate-180' : ''
                  }`}
                />
              </button>
              {openIndex === index && (
                <div className="px-6 pb-6 pt-2">
                  <p className="text-muted-foreground leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 text-center bg-muted/50 rounded-2xl p-12">
          <h2 className="text-3xl font-bold mb-4">Still have questions?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Our investment advisors are here to help you make informed decisions.
          </p>
          <a
            href="/contact"
            className="inline-block bg-primary text-primary-foreground px-8 py-4 rounded-lg font-semibold hover:opacity-90 transition-opacity"
          >
            Schedule a Consultation
          </a>
        </div>
      </div>
    </div>
  )
}

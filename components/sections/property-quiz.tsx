'use client'

import { useState } from 'react'
import { useTranslations } from 'next-intl'
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
  const t = useTranslations('home.propertyQuiz')
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
              <span className="text-sm font-bold text-accent">{t('badge')}</span>
            </div>

            {/* Heading */}
            <h2 className="text-4xl lg:text-5xl font-bold text-foreground mb-6 leading-tight">
              {t('title')}
              <span className="block mt-2 bg-gradient-to-r from-accent to-yellow-500 bg-clip-text text-transparent">
                {t('titleHighlight')}
              </span>
            </h2>

            <p className="text-xl text-muted-foreground mb-10 max-w-2xl mx-auto">
              {t('subtitle')}
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {[
                { icon: CheckCircle2, text: t('benefit1') },
                { icon: TrendingUp, text: t('benefit2') },
                { icon: Sparkles, text: t('benefit3') },
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
              <span>{t('startButton')}</span>
              <ArrowRight className="ml-3 h-6 w-6 transition-transform group-hover:translate-x-1" />
            </Button>

            <p className="mt-6 text-sm text-muted-foreground">
              {t('timeInfo')}
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
              {t('successTitle')}
            </h2>
            <p className="text-xl text-muted-foreground mb-8">
              {t('successMessage')}
            </p>

            <div className="bg-white rounded-2xl p-8 shadow-xl border border-border/50 mb-8">
              <h3 className="font-bold text-lg mb-4">{t('nextStepsTitle')}</h3>
              <div className="space-y-4 text-left">
                {[
                  t('nextStep1'),
                  t('nextStep2'),
                  t('nextStep3'),
                  t('nextStep4'),
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
              {t('closeButton')}
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
                {t('stepOf', { current: currentStep, total: totalSteps })}
              </span>
              <span className="text-sm text-muted-foreground">
                {t('percentComplete', { percent: Math.round((currentStep / totalSteps) * 100) })}
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
                    {t('question1')}
                  </h3>
                  <p className="text-muted-foreground">{t('question1Subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    { value: 'apartment', label: t('type1'), icon: Home },
                    { value: 'house', label: t('type2'), icon: Home },
                    { value: 'commercial', label: t('type3'), icon: Briefcase },
                    { value: 'land', label: t('type4'), icon: MapPin },
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
                    {t('question2')}
                  </h3>
                  <p className="text-muted-foreground">{t('question2Subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    t('budget1'),
                    t('budget2'),
                    t('budget3'),
                    t('budget4'),
                    t('budget5'),
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
                    {t('question3')}
                  </h3>
                  <p className="text-muted-foreground">{t('question3Subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    t('location1'),
                    t('location2'),
                    t('location3'),
                    t('location4'),
                    t('location5'),
                    t('location6'),
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
                  <TrendingUp className="h-16 w-16 text-accent mx-auto mb-4" />
                  <h3 className="text-3xl font-bold text-foreground mb-3">
                    {t('question4')}
                  </h3>
                  <p className="text-muted-foreground">{t('question4Subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  {[
                    { value: 'investment', label: t('purpose1'), icon: TrendingUp },
                    { value: 'residence', label: t('purpose2'), icon: Home },
                    { value: 'relocation', label: t('purpose3'), icon: Users },
                    { value: 'permit', label: t('purpose4'), icon: CheckCircle2 },
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
                    {t('question5')}
                  </h3>
                  <p className="text-muted-foreground">{t('question5Subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 gap-3">
                  {[
                    t('timeline1'),
                    t('timeline2'),
                    t('timeline3'),
                    t('timeline4'),
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
                    {t('question6')}
                  </h3>
                  <p className="text-muted-foreground">{t('question6Subtitle')}</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {[
                    t('size1'),
                    t('size2'),
                    t('size3'),
                    t('size4'),
                    t('size5'),
                    t('size6'),
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
                    {t('question7')}
                  </h3>
                  <p className="text-muted-foreground">{t('question7Subtitle')}</p>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t('nameLabel')}
                    </label>
                    <input
                      type="text"
                      value={quizData.contact.name}
                      onChange={(e) => updateContact('name', e.target.value)}
                      placeholder={t('namePlaceholder')}
                      className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t('phoneLabel')}
                    </label>
                    <input
                      type="tel"
                      value={quizData.contact.phone}
                      onChange={(e) => updateContact('phone', e.target.value)}
                      placeholder={t('phonePlaceholder')}
                      className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-semibold text-foreground mb-2">
                      {t('emailLabel')}
                    </label>
                    <input
                      type="email"
                      value={quizData.contact.email}
                      onChange={(e) => updateContact('email', e.target.value)}
                      placeholder={t('emailPlaceholder')}
                      className="w-full px-4 py-3 border-2 border-border rounded-xl focus:border-accent focus:outline-none transition-colors"
                      required
                    />
                  </div>

                  <div className="bg-accent/10 border border-accent/30 rounded-xl p-4 mt-6">
                    <div className="flex items-start gap-3">
                      <CheckCircle2 className="h-5 w-5 text-accent flex-shrink-0 mt-0.5" />
                      <div className="text-sm text-foreground">
                        {t('consentText')}
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
                    {t('backButton')}
                  </Button>
                )}
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="lg"
                >
                  {t('closeButton')}
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
                  {t('nextButton')}
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
                  {t('submitButton')}
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

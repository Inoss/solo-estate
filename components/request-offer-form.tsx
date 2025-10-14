'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import type { Locale } from '@/i18n'

const formSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters'),
  email: z.string().email('Invalid email address'),
  phone: z.string().min(5, 'Phone number must be at least 5 characters'),
  message: z.string().optional(),
})

type FormData = z.infer<typeof formSchema>

interface RequestOfferFormProps {
  projectId: string
  projectTitle: string
  locale: Locale
}

export function RequestOfferForm({ projectId, projectTitle, locale }: RequestOfferFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'success' | 'error' | null>(null)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
  })

  const onSubmit = async (data: FormData) => {
    setIsSubmitting(true)
    setSubmitStatus(null)

    try {
      const response = await fetch('/api/submit-request', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...data,
          projectId,
          projectTitle,
          locale,
        }),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      setSubmitStatus('success')
      reset()
    } catch (error) {
      console.error('Form submission error:', error)
      setSubmitStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="border-2 border-primary/20">
      <CardHeader className="bg-primary/5">
        <CardTitle className="text-xl">Request an Offer</CardTitle>
        <p className="text-sm text-muted-foreground">
          Interested in {projectTitle}? Fill out the form and we'll get back to you.
        </p>
      </CardHeader>

      <CardContent className="p-6">
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          {/* Name */}
          <div>
            <label htmlFor="name" className="text-sm font-medium block mb-2">
              Full Name *
            </label>
            <Input
              id="name"
              type="text"
              {...register('name')}
              className={errors.name ? 'border-red-500' : ''}
              placeholder="John Doe"
            />
            {errors.name && (
              <p className="text-xs text-red-500 mt-1">{errors.name.message}</p>
            )}
          </div>

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-sm font-medium block mb-2">
              Email *
            </label>
            <Input
              id="email"
              type="email"
              {...register('email')}
              className={errors.email ? 'border-red-500' : ''}
              placeholder="john@example.com"
            />
            {errors.email && (
              <p className="text-xs text-red-500 mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Phone */}
          <div>
            <label htmlFor="phone" className="text-sm font-medium block mb-2">
              Phone Number *
            </label>
            <Input
              id="phone"
              type="tel"
              {...register('phone')}
              className={errors.phone ? 'border-red-500' : ''}
              placeholder="+995 555 123 456"
            />
            {errors.phone && (
              <p className="text-xs text-red-500 mt-1">{errors.phone.message}</p>
            )}
          </div>

          {/* Message */}
          <div>
            <label htmlFor="message" className="text-sm font-medium block mb-2">
              Message (Optional)
            </label>
            <textarea
              id="message"
              {...register('message')}
              className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
              placeholder="Any questions or special requests..."
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting}
          >
            {isSubmitting ? 'Sending...' : 'Request Offer'}
          </Button>

          {/* Status Messages */}
          {submitStatus === 'success' && (
            <div className="p-3 bg-green-100 border border-green-300 rounded text-sm text-green-800">
              Thank you! We'll contact you shortly.
            </div>
          )}

          {submitStatus === 'error' && (
            <div className="p-3 bg-red-100 border border-red-300 rounded text-sm text-red-800">
              Something went wrong. Please try again or contact us directly.
            </div>
          )}
        </form>

        <div className="mt-6 pt-6 border-t">
          <p className="text-xs text-muted-foreground">
            By submitting this form, you agree to our Privacy Policy and Terms of Service.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}

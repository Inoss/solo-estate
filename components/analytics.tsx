'use client'

import Script from 'next/script'

export function GoogleAnalytics() {
  const measurementId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID

  if (!measurementId) {
    return null
  }

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${measurementId}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${measurementId}', {
            page_path: window.location.pathname,
          });
        `}
      </Script>
    </>
  )
}

// Track custom events
export function trackEvent(eventName: string, eventParams?: Record<string, any>) {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag('event', eventName, eventParams)
  }
}

// Predefined event tracking functions
export const analytics = {
  formSubmit: (formName: string) => {
    trackEvent('form_submit', { form_name: formName })
  },

  projectView: (projectId: string, projectTitle: string) => {
    trackEvent('project_viewed', {
      project_id: projectId,
      project_title: projectTitle
    })
  },

  brochureDownload: (projectId: string, projectTitle: string) => {
    trackEvent('brochure_download', {
      project_id: projectId,
      project_title: projectTitle
    })
  },

  chatOpened: () => {
    trackEvent('chat_opened')
  },

  phoneClick: (phoneNumber: string) => {
    trackEvent('phone_click', { phone_number: phoneNumber })
  },

  whatsappClick: (phoneNumber: string) => {
    trackEvent('whatsapp_click', { phone_number: phoneNumber })
  },

  emailClick: (email: string) => {
    trackEvent('email_click', { email })
  },

  languageChange: (fromLang: string, toLang: string) => {
    trackEvent('language_change', {
      from_language: fromLang,
      to_language: toLang
    })
  },

  filterApply: (filterType: string, filterValue: string) => {
    trackEvent('filter_apply', {
      filter_type: filterType,
      filter_value: filterValue
    })
  },
}

'use client'

import { useState, useEffect } from 'react'
import { X } from 'lucide-react'
import { Button } from './ui/button'

export function CookieConsent() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    // Check if user has already consented
    const consent = localStorage.getItem('cookie-consent')
    if (!consent) {
      // Show banner after a short delay
      setTimeout(() => setShowBanner(true), 1000)
    }
  }, [])

  const acceptAll = () => {
    localStorage.setItem('cookie-consent', 'all')
    setShowBanner(false)
  }

  const acceptNecessary = () => {
    localStorage.setItem('cookie-consent', 'necessary')
    setShowBanner(false)
  }

  const closeBanner = () => {
    setShowBanner(false)
  }

  if (!showBanner) {
    return null
  }

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 md:p-6 bg-background/95 backdrop-blur-sm border-t shadow-lg">
      <div className="container mx-auto max-w-6xl">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div className="flex-1">
            <h3 className="font-semibold mb-2">We value your privacy</h3>
            <p className="text-sm text-muted-foreground">
              We use cookies to enhance your browsing experience, serve personalized content, and analyze our traffic.
              By clicking "Accept All", you consent to our use of cookies.
              {' '}
              <a href="/privacy" className="underline hover:text-primary">
                Learn more
              </a>
            </p>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <Button
              variant="outline"
              size="sm"
              onClick={acceptNecessary}
            >
              Necessary Only
            </Button>
            <Button
              size="sm"
              onClick={acceptAll}
            >
              Accept All
            </Button>
            <button
              onClick={closeBanner}
              className="p-2 hover:bg-muted rounded-lg transition-colors"
              aria-label="Close"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

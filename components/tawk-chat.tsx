'use client'

import { useEffect } from 'react'

export function TawkChat() {
  const propertyId = process.env.NEXT_PUBLIC_TAWK_PROPERTY_ID
  const widgetId = process.env.NEXT_PUBLIC_TAWK_WIDGET_ID

  useEffect(() => {
    if (!propertyId || !widgetId) {
      return
    }

    // Load Tawk.to script
    const script = document.createElement('script')
    script.async = true
    script.src = `https://embed.tawk.to/${propertyId}/${widgetId}`
    script.charset = 'UTF-8'
    script.setAttribute('crossorigin', '*')
    document.body.appendChild(script)

    return () => {
      // Cleanup: Remove script when component unmounts
      document.body.removeChild(script)

      // Remove Tawk widget if it exists
      const tawkWidget = document.getElementById('tawkchat-container')
      if (tawkWidget) {
        tawkWidget.remove()
      }
    }
  }, [propertyId, widgetId])

  return null
}

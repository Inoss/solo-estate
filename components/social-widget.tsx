'use client'

import { useState } from 'react'
import { Instagram, Facebook, MessageCircle, X } from 'lucide-react'

export function SocialWidget() {
  const [isOpen, setIsOpen] = useState(false)

  const socialLinks = [
    {
      name: 'Instagram',
      href: 'https://www.instagram.com/soloestate_?igsh=MWc1czR4YnR0ZHNzNg%3D%3D&utm_source=qr',
      icon: Instagram,
      color: 'bg-gradient-to-br from-purple-600 via-pink-600 to-orange-500 hover:from-purple-700 hover:via-pink-700 hover:to-orange-600',
    },
    {
      name: 'Facebook',
      href: 'https://www.facebook.com/profile.php?id=61558366256708&mibextid=wwXIfr&rdid=snb7fqt8A2aBtQzL&share_url=https%3A%2F%2Fwww.facebook.com%2Fshare%2F1DwssytEPX%2F%3Fmibextid%3DwwXIfr#',
      icon: Facebook,
      color: 'bg-blue-600 hover:bg-blue-700',
    },
    {
      name: 'WhatsApp',
      href: 'https://wa.me/995511107142',
      icon: MessageCircle,
      color: 'bg-green-500 hover:bg-green-600',
    },
  ]

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end gap-3">
      {/* Social Links - Appear when open */}
      <div
        className={`flex flex-col gap-3 transition-all duration-300 ${
          isOpen
            ? 'opacity-100 translate-y-0 pointer-events-auto'
            : 'opacity-0 translate-y-4 pointer-events-none'
        }`}
      >
        {socialLinks.map((link) => {
          const Icon = link.icon
          return (
            <a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${link.color} text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl group relative`}
              aria-label={link.name}
            >
              <Icon className="w-6 h-6" />
              <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
                {link.name}
              </span>
            </a>
          )
        })}
      </div>

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`${
          isOpen
            ? 'bg-gray-800 hover:bg-gray-900'
            : 'bg-primary hover:bg-primary/90'
        } text-white p-4 rounded-full shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl`}
        aria-label={isOpen ? 'Close social menu' : 'Open social menu'}
      >
        {isOpen ? (
          <X className="w-6 h-6" />
        ) : (
          <div className="relative">
            <MessageCircle className="w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></span>
          </div>
        )}
      </button>
    </div>
  )
}

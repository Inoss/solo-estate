'use client'

import { useEffect, useRef, ReactNode } from 'react'

interface ScrollRevealProps {
  children: ReactNode
  className?: string
  delay?: number
}

export function ScrollReveal({ children, className = '', delay = 0 }: ScrollRevealProps) {
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    // Initial hidden state with smooth transition
    element.style.opacity = '0'
    element.style.transform = 'translateY(30px)'
    element.style.transition = 'opacity 0.8s ease-out, transform 0.8s ease-out'

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setTimeout(() => {
              entry.target.classList.add('revealed')
              // Apply revealed styles directly
              if (entry.target instanceof HTMLElement) {
                entry.target.style.opacity = '1'
                entry.target.style.transform = 'translateY(0)'
              }
            }, delay)
          }
        })
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px',
      }
    )

    observer.observe(element)

    return () => {
      if (element) {
        observer.unobserve(element)
      }
    }
  }, [delay])

  return (
    <div
      ref={ref}
      className={`scroll-reveal ${className}`}
    >
      {children}
    </div>
  )
}

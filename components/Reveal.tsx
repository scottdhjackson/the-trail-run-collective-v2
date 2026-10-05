'use client'

import { useEffect, useRef, useState } from 'react'
import { cn } from '@/lib/utils'

type RevealProps = {
  children: React.ReactNode
  className?: string
  /** Delay in ms before the animation starts — use for staggering siblings */
  delay?: number
  /** Direction the element travels in from */
  from?: 'up' | 'left' | 'right' | 'none'
}

const OFFSETS = {
  up: 'translate-y-8',
  left: '-translate-x-8',
  right: 'translate-x-8',
  none: '',
}

/**
 * Fades + slides its children in the first time they scroll into view.
 * Respects prefers-reduced-motion (content shows immediately).
 */
export function Reveal({ children, className, delay = 0, from = 'up' }: RevealProps) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setVisible(true)
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true)
          observer.disconnect()
        }
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <div
      ref={ref}
      className={cn(
        'reveal transition-all duration-700 ease-out motion-reduce:transition-none',
        visible ? 'opacity-100 translate-x-0 translate-y-0' : cn('opacity-0', OFFSETS[from]),
        className
      )}
      style={{ transitionDelay: visible ? `${delay}ms` : '0ms' }}
    >
      {children}
    </div>
  )
}

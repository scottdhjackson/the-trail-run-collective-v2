'use client'

import { useEffect, useState } from 'react'

type CountdownProps = {
  /** ISO date string of the race start */
  date: string
  className?: string
}

type Remaining = { days: number; hours: number; minutes: number; seconds: number }

function getRemaining(target: number): Remaining | null {
  const diff = target - Date.now()
  if (diff <= 0) return null
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor((diff / 3_600_000) % 24),
    minutes: Math.floor((diff / 60_000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  }
}

/**
 * Live days / hours / mins / secs countdown, styled for dark image backgrounds.
 * Renders nothing once the date has passed. Time is only computed on the client
 * to avoid server/client hydration mismatches.
 */
export function Countdown({ date, className }: CountdownProps) {
  const target = new Date(date).getTime()
  const [remaining, setRemaining] = useState<Remaining | null | undefined>(undefined)

  useEffect(() => {
    setRemaining(getRemaining(target))
    const id = setInterval(() => setRemaining(getRemaining(target)), 1000)
    return () => clearInterval(id)
  }, [target])

  // Not yet mounted, or race has started
  if (!remaining) return null

  const units: [number, string][] = [
    [remaining.days, remaining.days === 1 ? 'Day' : 'Days'],
    [remaining.hours, 'Hrs'],
    [remaining.minutes, 'Mins'],
    [remaining.seconds, 'Secs'],
  ]

  return (
    <div
      className={`flex gap-2 animate-in fade-in duration-700 ${className ?? ''}`}
      role="timer"
      aria-label={`${remaining.days} days, ${remaining.hours} hours and ${remaining.minutes} minutes to go`}
    >
      {units.map(([value, label]) => (
        <div
          key={label}
          className="flex flex-col items-center justify-center w-16 md:w-[4.5rem] py-2.5 rounded-xl bg-white/10 backdrop-blur-md border border-white/15"
        >
          <span className="font-heading font-black text-2xl md:text-3xl text-white leading-none tabular-nums">
            {String(value).padStart(2, '0')}
          </span>
          <span className="mt-1 text-[10px] font-semibold tracking-[0.2em] uppercase text-white/60">
            {label}
          </span>
        </div>
      ))}
    </div>
  )
}

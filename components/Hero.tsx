'use client'

import { useState, useRef } from 'react'
import Image from 'next/image'

interface HeroProps {
  mediaType?: 'image' | 'video'
  bannerImageUrl?: string
  videoDesktopUrl?: string
  videoMobileUrl?: string
}

export function Hero({ mediaType, bannerImageUrl, videoDesktopUrl, videoMobileUrl }: HeroProps) {
  const imageSrc = bannerImageUrl || '/images/hero.jpg'
  const videoRef = useRef<HTMLVideoElement>(null)
  const [isMuted, setIsMuted] = useState(true)

  const desktopSrc = videoDesktopUrl || '/video/TTRC_Teaser_v2.1-desktop.mp4'
  const mobileSrc = videoMobileUrl || videoDesktopUrl || '/video/TTRC_Teaser_v2.1-mobile.mp4'
  // Show video unless Sanity explicitly sets mediaType to 'image'
  const showVideo = mediaType !== 'image'

  const toggleMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !videoRef.current.muted
      setIsMuted(prev => !prev)
    }
  }

  return (
    <section className="relative h-[82vh] flex items-end overflow-hidden">
      {/* Background media */}
      <div className="absolute inset-0 z-0">
        {showVideo ? (
          <video
            ref={videoRef}
            autoPlay
            loop
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover object-center"
          >
            {mobileSrc !== desktopSrc && (
              <source src={mobileSrc} media="(max-width: 767px)" type="video/mp4" />
            )}
            <source src={desktopSrc} type="video/mp4" />
          </video>
        ) : (
          <Image
            src={imageSrc}
            alt="Trail running"
            fill
            className="object-cover object-center"
            priority
          />
        )}
        <div className="absolute inset-0" style={{ backgroundColor: 'var(--banner-overlay)' }} />
      </div>

      {/* Content — bottom-left aligned */}
      <div className="relative z-10 container mx-auto px-6 pb-20 md:pb-28">
        {/* Eyebrow */}
        <p className="text-white/70 text-xs tracking-[0.25em] uppercase font-semibold mb-5">
          Season 2026 Now Open
        </p>

        {/* Heading */}
        <h1 className="font-heading font-black uppercase leading-none mb-8">
          <span className="block text-white text-6xl md:text-8xl lg:text-9xl tracking-tight">
            Run the
          </span>
          <span className="block font-accent italic text-white text-6xl md:text-8xl lg:text-9xl">
            Trails
          </span>
        </h1>

        {/* Buttons */}
        <div className="flex flex-col sm:flex-row gap-4">
          <a
            href="#events"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide transition-all hover:opacity-90"
            style={{ backgroundColor: '#2D5C26', color: '#ffffff' }}
          >
            Find your race →
          </a>
          <a
            href="#join"
            className="inline-flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-semibold tracking-wide border-2 border-white text-white transition-all hover:bg-white/10"
          >
            Join our mailing list
          </a>
        </div>
      </div>

      {/* Mute toggle — only shown in video mode */}
      {showVideo && (
        <button
          onClick={toggleMute}
          className="absolute bottom-6 right-6 z-20 p-2.5 rounded-full bg-black/40 backdrop-blur-sm text-white hover:bg-black/60 transition-colors"
          aria-label={isMuted ? 'Unmute video' : 'Mute video'}
        >
          {isMuted ? (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <line x1="23" y1="9" x2="17" y2="15" />
              <line x1="17" y1="9" x2="23" y2="15" />
            </svg>
          ) : (
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="11 5 6 9 2 9 2 15 6 15 11 19 11 5" />
              <path d="M19.07 4.93a10 10 0 0 1 0 14.14" />
              <path d="M15.54 8.46a5 5 0 0 1 0 7.07" />
            </svg>
          )}
        </button>
      )}
    </section>
  )
}

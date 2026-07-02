'use client'

import { useState } from 'react'
import Link from 'next/link'

import { Menu, X } from 'lucide-react'

interface HeaderProps {
  logoUrl?: string
  logoWidth?: number
}

export function Header({ logoUrl, logoWidth }: HeaderProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className="fixed top-0 w-full z-50 backdrop-blur-sm"
      style={{ backgroundColor: 'var(--nav-bg)', color: 'var(--nav-text)' }}
    >
      <div className="container mx-auto px-6 h-16 md:h-20 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center shrink-0" onClick={closeMenu}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={logoUrl || '/images/logo.svg'}
            alt="The Trail Run Collective"
            style={{ width: logoWidth || 160, filter: 'invert(1)' }}
            className="h-10 md:h-16 w-auto"
          />
        </Link>

        {/* Desktop Navigation — centred */}
        <nav className="hidden md:flex items-center gap-10 absolute left-1/2 -translate-x-1/2">
          <a href="/#events" className="text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-60">
            Events
          </a>
          <a href="/#join" className="text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-60">
            Join
          </a>
          <a href="/#contact" className="text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-60">
            Contact
          </a>
          <Link href="/faq" className="text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-60">
            FAQs
          </Link>
          <Link href="/volunteer" className="text-xs font-semibold tracking-widest uppercase transition-opacity hover:opacity-60">
            Volunteer
          </Link>
        </nav>


        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:opacity-60 transition-opacity"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden" style={{ backgroundColor: 'var(--nav-bg)' }}>
          <nav className="container mx-auto px-6 py-6 flex flex-col gap-5">
            <a href="/#events" className="text-xs font-semibold tracking-widest uppercase hover:opacity-60 transition-opacity" onClick={closeMenu}>Events</a>
            <a href="/#join" className="text-xs font-semibold tracking-widest uppercase hover:opacity-60 transition-opacity" onClick={closeMenu}>Join</a>
            <a href="/#contact" className="text-xs font-semibold tracking-widest uppercase hover:opacity-60 transition-opacity" onClick={closeMenu}>Contact</a>
            <Link href="/faq" className="text-xs font-semibold tracking-widest uppercase hover:opacity-60 transition-opacity" onClick={closeMenu}>FAQs</Link>
            <Link href="/volunteer" className="text-xs font-semibold tracking-widest uppercase hover:opacity-60 transition-opacity" onClick={closeMenu}>Volunteer</Link>
          </nav>
        </div>
      )}
    </header>
  )
}

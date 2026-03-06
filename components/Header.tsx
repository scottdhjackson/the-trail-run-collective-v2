'use client'

import { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen)
  const closeMenu = () => setIsMenuOpen(false)

  return (
    <header
      className="fixed top-0 w-full z-50 border-b"
      style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'var(--nav-bg)', color: 'var(--nav-text)' }}
    >
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center" onClick={closeMenu}>
          <Image
            src="/images/logo.svg"
            alt="The Trail Run Collective"
            width={400}
            height={80}
            className="h-14 w-auto"
          />
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          <a href="/#events" className="text-sm font-medium transition-colors hover:opacity-75">
            Events
          </a>
          <a href="/#join" className="text-sm font-medium transition-colors hover:opacity-75">
            Join
          </a>
          <a href="/#contact" className="text-sm font-medium transition-colors hover:opacity-75">
            Contact
          </a>
          <Link href="/faq" className="text-sm font-medium transition-colors hover:opacity-75">
            FAQs
          </Link>
          <Link href="/volunteer" className="text-sm font-medium transition-colors hover:opacity-75">
            Volunteer
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden p-2 hover:opacity-75 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden border-t" style={{ backgroundColor: 'var(--nav-bg)', borderColor: 'rgba(255,255,255,0.1)' }}>
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="/#events"
              className="text-sm font-medium transition-colors hover:opacity-75 py-2"
              onClick={closeMenu}
            >
              Events
            </a>
            <a
              href="/#join"
              className="text-sm font-medium transition-colors hover:opacity-75 py-2"
              onClick={closeMenu}
            >
              Join
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium transition-colors hover:opacity-75 py-2"
              onClick={closeMenu}
            >
              Contact
            </a>
            <Link
              href="/faq"
              className="text-sm font-medium transition-colors hover:opacity-75 py-2"
              onClick={closeMenu}
            >
              FAQs
            </Link>
            <Link
              href="/volunteer"
              className="text-sm font-medium transition-colors hover:opacity-75 py-2"
              onClick={closeMenu}
            >
              Volunteer
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

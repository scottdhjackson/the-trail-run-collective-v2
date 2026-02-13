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
    <header className="fixed top-0 w-full bg-black z-50 border-b border-black">
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
          <a href="/#events" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            Events
          </a>
          <a href="/#join" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            Join
          </a>
          <a href="/#contact" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            Contact
          </a>
          <Link href="/faq" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            FAQs
          </Link>
        </nav>

        {/* Mobile Menu Button */}
        <button
          onClick={toggleMenu}
          className="md:hidden text-white p-2 hover:text-gray-300 transition-colors"
          aria-label="Toggle menu"
        >
          {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-black border-t border-gray-800">
          <nav className="container mx-auto px-4 py-4 flex flex-col gap-4">
            <a
              href="/#events"
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors py-2"
              onClick={closeMenu}
            >
              Events
            </a>
            <a
              href="/#join"
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors py-2"
              onClick={closeMenu}
            >
              Join
            </a>
            <a
              href="/#contact"
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors py-2"
              onClick={closeMenu}
            >
              Contact
            </a>
            <Link
              href="/faq"
              className="text-sm font-medium text-white hover:text-gray-300 transition-colors py-2"
              onClick={closeMenu}
            >
              FAQs
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}

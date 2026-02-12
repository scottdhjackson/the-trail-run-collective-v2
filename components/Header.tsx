import Link from 'next/link'
import Image from 'next/image'

export function Header() {
  return (
    <header className="fixed top-0 w-full bg-black z-50 border-b border-black">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center">
          <Image
            src="/images/logo.svg"
            alt="The Trail Run Collective"
            width={400}
            height={80}
            className="h-14 w-auto"
          />
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          <a href="#events" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            Events
          </a>
          <a href="#join" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            Join
          </a>
          <a href="#contact" className="text-sm font-medium text-white hover:text-gray-300 transition-colors">
            Contact
          </a>
        </nav>
      </div>
    </header>
  )
}

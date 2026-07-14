import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Menu, X, Braces } from 'lucide-react'

const NAV_LINKS = [
  { label: 'Home', href: '#home' },
  { label: 'Courses', href: '#courses' },
  { label: 'About', href: '#about' },
  { label: 'Success Stories', href: '#testimonials' },
  { label: 'Blogs', href: '#blogs' },
  { label: 'Contact', href: '#contact' },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <a href="#home" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Braces className="h-5 w-5 text-teal" aria-hidden="true" />
          Data Master Consulting
        </a>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate hover:text-offwhite transition-colors"
            >
              {link.label}
            </a>
          ))}
        </nav>

        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/login"
            className="text-sm font-medium text-offwhite hover:text-teal transition-colors"
          >
            Log in
          </Link>
          <Link
            to="/login"
            className="rounded-md bg-teal px-4 py-2 text-sm font-medium text-ink hover:bg-teal-dim transition-colors"
          >
            Get started
          </Link>
        </div>

        <button
          className="lg:hidden text-offwhite"
          onClick={() => setIsOpen((v) => !v)}
          aria-label={isOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={isOpen}
        >
          {isOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isOpen && (
        <nav className="lg:hidden border-t border-border/60 px-6 py-4 flex flex-col gap-4" aria-label="Mobile">
          {NAV_LINKS.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="text-sm text-slate hover:text-offwhite"
              onClick={() => setIsOpen(false)}
            >
              {link.label}
            </a>
          ))}
          <Link to="/login" className="text-sm font-medium text-offwhite">
            Log in
          </Link>
          <Link
            to="/login"
            className="rounded-md bg-teal px-4 py-2 text-sm font-medium text-ink text-center"
          >
            Get started
          </Link>
        </nav>
      )}
    </header>
  )
}

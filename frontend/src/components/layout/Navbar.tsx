import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { Menu, X, Braces } from 'lucide-react'

// 'route' links go to a real page. 'hash' links jump to a section on the homepage —
// on any other page they navigate home first, then to that section.
const NAV_LINKS = [
  { label: 'Home', to: '/', type: 'route' as const },
  { label: 'Courses', to: '/courses', type: 'route' as const },
  { label: 'About', to: '#about', type: 'hash' as const },
  { label: 'Success Stories', to: '#testimonials', type: 'hash' as const },
  { label: 'Blogs', to: '#blogs', type: 'hash' as const },
  { label: 'Contact', to: '#contact', type: 'hash' as const },
]

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  const isHome = location.pathname === '/'

  const renderLink = (link: (typeof NAV_LINKS)[number], onClick?: () => void) => {
    if (link.type === 'route') {
      return (
        <Link
          key={link.label}
          to={link.to}
          onClick={onClick}
          className="text-sm text-slate hover:text-offwhite transition-colors"
        >
          {link.label}
        </Link>
      )
    }
    // On the homepage, a plain anchor gives native same-page scrolling.
    // Anywhere else, route to "/" + the hash so it at least lands on the right page.
    return isHome ? (
      <a
        key={link.label}
        href={link.to}
        onClick={onClick}
        className="text-sm text-slate hover:text-offwhite transition-colors"
      >
        {link.label}
      </a>
    ) : (
      <Link
        key={link.label}
        to={`/${link.to}`}
        onClick={onClick}
        className="text-sm text-slate hover:text-offwhite transition-colors"
      >
        {link.label}
      </Link>
    )
  }

  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-ink/85 backdrop-blur">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <Link to="/" className="flex items-center gap-2 font-display text-lg font-semibold">
          <Braces className="h-5 w-5 text-teal" aria-hidden="true" />
          Data Master Consulting
        </Link>

        <nav className="hidden lg:flex items-center gap-8" aria-label="Primary">
          {NAV_LINKS.map((link) => renderLink(link))}
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
          {NAV_LINKS.map((link) => renderLink(link, () => setIsOpen(false)))}
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

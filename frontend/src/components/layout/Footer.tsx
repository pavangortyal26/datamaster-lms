import { Link, useLocation } from 'react-router-dom'
import { Braces, Linkedin, Twitter, Youtube, Instagram } from 'lucide-react'

export function Footer() {
  const location = useLocation()
  const isHome = location.pathname === '/'

  // Same-page anchors only work as plain <a> when already on the homepage;
  // otherwise route to "/" + hash so the link actually goes somewhere.
  const sectionHref = (hash: string) => (isHome ? hash : `/${hash}`)

  return (
    <footer id="contact" className="border-t border-border/60 bg-surface/40">
      <div className="mx-auto max-w-7xl px-6 py-14 grid gap-10 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <div className="flex items-center gap-2 font-display text-lg font-semibold">
            <Braces className="h-5 w-5 text-teal" aria-hidden="true" />
            Data Master Consulting
          </div>
          <p className="mt-3 text-sm text-slate max-w-xs">
            Corporate training and career-focused courses in data engineering, analytics, and AI.
          </p>
          <div className="mt-5 flex gap-4 text-slate">
            <a href="#" aria-label="LinkedIn" className="hover:text-teal transition-colors"><Linkedin className="h-5 w-5" /></a>
            <a href="#" aria-label="Twitter" className="hover:text-teal transition-colors"><Twitter className="h-5 w-5" /></a>
            <a href="#" aria-label="YouTube" className="hover:text-teal transition-colors"><Youtube className="h-5 w-5" /></a>
            <a href="#" aria-label="Instagram" className="hover:text-teal transition-colors"><Instagram className="h-5 w-5" /></a>
          </div>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-slate mb-4">Courses</p>
          <ul className="space-y-2 text-sm text-slate">
            <li><Link to="/courses?category=data-engineering" className="hover:text-offwhite transition-colors">Data Engineering</Link></li>
            <li><Link to="/courses?category=generative-ai" className="hover:text-offwhite transition-colors">Generative AI</Link></li>
            <li><Link to="/courses?category=data-analytics" className="hover:text-offwhite transition-colors">Data Analytics</Link></li>
            <li><Link to="/courses?category=machine-learning" className="hover:text-offwhite transition-colors">Machine Learning</Link></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-slate mb-4">Company</p>
          <ul className="space-y-2 text-sm text-slate">
            <li>
              {isHome
                ? <a href="#about" className="hover:text-offwhite transition-colors">About us</a>
                : <Link to={sectionHref('#about')} className="hover:text-offwhite transition-colors">About us</Link>}
            </li>
            <li>
              {isHome
                ? <a href="#testimonials" className="hover:text-offwhite transition-colors">Success stories</a>
                : <Link to={sectionHref('#testimonials')} className="hover:text-offwhite transition-colors">Success stories</Link>}
            </li>
            <li>
              {isHome
                ? <a href="#blogs" className="hover:text-offwhite transition-colors">Blogs</a>
                : <Link to={sectionHref('#blogs')} className="hover:text-offwhite transition-colors">Blogs</Link>}
            </li>
            <li><a href="mailto:hello@thedatamaster.in" className="hover:text-offwhite transition-colors">Contact</a></li>
          </ul>
        </div>

        <div>
          <p className="font-mono text-xs uppercase tracking-widest text-slate mb-4">Legal</p>
          <ul className="space-y-2 text-sm text-slate">
            <li><a href="/privacy" className="hover:text-offwhite transition-colors">Privacy policy</a></li>
            <li><a href="/terms" className="hover:text-offwhite transition-colors">Terms of service</a></li>
            <li><a href="/refund-policy" className="hover:text-offwhite transition-colors">Refund policy</a></li>
          </ul>
        </div>
      </div>

      <div className="border-t border-border/60 py-6">
        <p className="text-center text-xs text-slate">
          © {new Date().getFullYear()} Data Master Consulting. All rights reserved.
        </p>
      </div>
    </footer>
  )
}

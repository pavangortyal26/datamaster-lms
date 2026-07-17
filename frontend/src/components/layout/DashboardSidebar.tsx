import { LayoutDashboard, BookOpen, Award, User, X } from 'lucide-react'
import { Braces } from 'lucide-react'

const NAV_ITEMS = [
  { label: 'Overview', href: '#overview', icon: LayoutDashboard },
  { label: 'My Courses', href: '#my-courses', icon: BookOpen },
  { label: 'Certificates', href: '#certificates', icon: Award },
  { label: 'Profile', href: '#profile', icon: User },
]

interface Props {
  isOpen: boolean
  onClose: () => void
}

export function DashboardSidebar({ isOpen, onClose }: Props) {
  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      <aside
        className={`fixed lg:sticky top-0 z-50 lg:z-0 h-screen w-64 shrink-0 border-r border-appBorder bg-appSurface transition-transform lg:translate-x-0 ${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex items-center justify-between px-6 py-5">
          <div className="flex items-center gap-2 font-display text-base font-semibold text-appFg">
            <Braces className="h-5 w-5 text-teal" aria-hidden="true" />
            Data Master
          </div>
          <button onClick={onClose} className="lg:hidden text-appMuted" aria-label="Close menu">
            <X className="h-5 w-5" />
          </button>
        </div>

        <nav className="mt-2 px-3 space-y-1" aria-label="Dashboard">
          {NAV_ITEMS.map((item) => (
            <a
              key={item.href}
              href={item.href}
              onClick={onClose}
              className="flex items-center gap-3 rounded-md px-3 py-2.5 text-sm text-appMuted hover:bg-appBg hover:text-appFg transition-colors"
            >
              <item.icon className="h-4 w-4" />
              {item.label}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}

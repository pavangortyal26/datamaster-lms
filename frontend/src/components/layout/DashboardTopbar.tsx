import { useState, useRef, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { Menu, Bell, Moon, Sun, LogOut, ChevronDown } from 'lucide-react'
import { useThemeStore } from '@/store/themeStore'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/features/auth/api'
import { useNotifications } from '@/features/dashboard/hooks'

interface Props {
  onMenuClick: () => void
}

export function DashboardTopbar({ onMenuClick }: Props) {
  const navigate = useNavigate()
  const theme = useThemeStore((s) => s.theme)
  const toggleTheme = useThemeStore((s) => s.toggleTheme)
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)
  const { data: notifications } = useNotifications()

  const [isNotifOpen, setIsNotifOpen] = useState(false)
  const [isProfileOpen, setIsProfileOpen] = useState(false)
  const notifRef = useRef<HTMLDivElement>(null)
  const profileRef = useRef<HTMLDivElement>(null)

  const unreadCount = notifications.filter((n) => !n.isRead).length

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      if (notifRef.current && !notifRef.current.contains(e.target as Node)) setIsNotifOpen(false)
      if (profileRef.current && !profileRef.current.contains(e.target as Node)) setIsProfileOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } finally {
      logout()
      navigate('/', { replace: true })
    }
  }

  return (
    <header className="sticky top-0 z-30 flex items-center justify-between border-b border-appBorder bg-appSurface/90 backdrop-blur px-4 sm:px-6 py-4">
      <button onClick={onMenuClick} className="lg:hidden text-appFg" aria-label="Open menu">
        <Menu className="h-5 w-5" />
      </button>

      <div className="hidden lg:block" />

      <div className="flex items-center gap-2 sm:gap-4">
        <button
          onClick={toggleTheme}
          aria-label={theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode'}
          className="rounded-md p-2 text-appMuted hover:text-appFg hover:bg-appBg transition-colors"
        >
          {theme === 'dark' ? <Sun className="h-4 w-4" /> : <Moon className="h-4 w-4" />}
        </button>

        <div className="relative" ref={notifRef}>
          <button
            onClick={() => setIsNotifOpen((v) => !v)}
            aria-label="Notifications"
            aria-expanded={isNotifOpen}
            className="relative rounded-md p-2 text-appMuted hover:text-appFg hover:bg-appBg transition-colors"
          >
            <Bell className="h-4 w-4" />
            {unreadCount > 0 && (
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-amber" />
            )}
          </button>

          {isNotifOpen && (
            <div className="absolute right-0 mt-2 w-80 rounded-lg border border-appBorder bg-appSurface shadow-xl">
              <div className="px-4 py-3 border-b border-appBorder">
                <p className="text-sm font-medium text-appFg">Notifications</p>
              </div>
              <div className="max-h-80 overflow-y-auto divide-y divide-appBorder">
                {notifications.map((n) => (
                  <div key={n.id} className="px-4 py-3">
                    <div className="flex items-start gap-2">
                      {!n.isRead && <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-teal" />}
                      <div className={n.isRead ? 'ml-3.5' : ''}>
                        <p className="text-sm font-medium text-appFg">{n.title}</p>
                        <p className="text-xs text-appMuted mt-0.5">{n.message}</p>
                        <p className="text-xs text-appMuted/70 mt-1">{n.timestamp}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="relative" ref={profileRef}>
          <button
            onClick={() => setIsProfileOpen((v) => !v)}
            aria-expanded={isProfileOpen}
            className="flex items-center gap-2 rounded-md py-1.5 pl-1.5 pr-2 hover:bg-appBg transition-colors"
          >
            <div className="h-7 w-7 rounded-full bg-teal/20 text-teal flex items-center justify-center text-xs font-semibold">
              {user?.name?.[0]?.toUpperCase() ?? '?'}
            </div>
            <span className="hidden sm:block text-sm text-appFg">{user?.name}</span>
            <ChevronDown className="h-3.5 w-3.5 text-appMuted" />
          </button>

          {isProfileOpen && (
            <div className="absolute right-0 mt-2 w-48 rounded-lg border border-appBorder bg-appSurface shadow-xl py-1">
              <button
                onClick={handleLogout}
                className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-appFg hover:bg-appBg transition-colors"
              >
                <LogOut className="h-4 w-4" /> Log out
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  )
}

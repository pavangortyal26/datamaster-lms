import { Navigate, useLocation } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import type { ReactNode } from 'react'

export function ProtectedRoute({ children }: { children: ReactNode }) {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const hasBootstrapped = useAuthStore((s) => s.hasBootstrapped)
  const location = useLocation()

  // Wait for the silent session-restore attempt to finish before deciding whether
  // to redirect — otherwise a direct reload of a protected page bounces to /login
  // before the /auth/refresh call even resolves.
  if (!hasBootstrapped) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-teal" aria-label="Loading" />
      </div>
    )
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  return <>{children}</>
}

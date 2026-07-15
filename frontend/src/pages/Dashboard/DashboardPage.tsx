import { useNavigate } from 'react-router-dom'
import { LogOut } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { authApi } from '@/features/auth/api'

export default function DashboardPage() {
  const navigate = useNavigate()
  const user = useAuthStore((s) => s.user)
  const logout = useAuthStore((s) => s.logout)

  const handleLogout = async () => {
    try {
      await authApi.logout()
    } finally {
      logout()
      navigate('/', { replace: true })
    }
  }

  return (
    <main className="min-h-screen p-8">
      <div className="flex items-center justify-between max-w-4xl mx-auto">
        <div>
          <h1 className="font-display text-2xl font-semibold">
            Welcome back{user ? `, ${user.name}` : ''}
          </h1>
          <p className="mt-2 text-sm text-slate">
            {user?.email} · {user?.role}
          </p>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 rounded-md border border-border px-4 py-2 text-sm text-offwhite hover:border-teal transition-colors"
        >
          <LogOut className="h-4 w-4" /> Log out
        </button>
      </div>

      <p className="mt-8 max-w-4xl mx-auto text-sm text-slate">
        Course progress, certificates, and recommendations arrive in Phase 4.
      </p>
    </main>
  )
}

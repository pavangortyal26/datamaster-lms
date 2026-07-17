import { Mail, Shield } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'

export function ProfileCard() {
  const user = useAuthStore((s) => s.user)

  return (
    <section id="profile">
      <h2 className="font-display text-lg font-semibold">Profile</h2>
      <div className="mt-4 rounded-lg border border-appBorder bg-appSurface p-6 flex items-center gap-5">
        <div className="h-14 w-14 rounded-full bg-teal/20 text-teal flex items-center justify-center text-lg font-semibold shrink-0">
          {user?.name?.[0]?.toUpperCase() ?? '?'}
        </div>
        <div className="flex-1 min-w-0">
          <p className="font-medium">{user?.name}</p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-appMuted">
            <Mail className="h-3.5 w-3.5" /> {user?.email}
          </p>
          <p className="mt-1 flex items-center gap-1.5 text-xs text-appMuted">
            <Shield className="h-3.5 w-3.5" /> {user?.role}
          </p>
        </div>
        <button
          disabled
          title="Profile editing arrives in a later phase"
          className="shrink-0 rounded-md border border-appBorder px-4 py-2 text-sm text-appMuted opacity-60 cursor-not-allowed"
        >
          Edit profile
        </button>
      </div>
    </section>
  )
}

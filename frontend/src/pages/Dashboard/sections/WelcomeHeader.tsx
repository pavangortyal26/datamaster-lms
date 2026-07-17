import { Flame, TrendingUp, Clock } from 'lucide-react'
import { useAuthStore } from '@/store/authStore'
import { useDashboardStats } from '@/features/dashboard/hooks'

export function WelcomeHeader() {
  const user = useAuthStore((s) => s.user)
  const { data: stats } = useDashboardStats()

  const firstName = user?.name?.split(' ')[0] ?? 'there'

  return (
    <div id="overview">
      <h1 className="font-display text-2xl sm:text-3xl font-semibold">
        Welcome back, {firstName}
      </h1>
      <p className="mt-1 text-sm text-appMuted">Here's where your learning stands today.</p>

      <div className="mt-6 grid grid-cols-1 sm:grid-cols-3 gap-4">
        <StatCard icon={TrendingUp} label="Overall completion" value={`${stats.completionRate}%`} />
        <StatCard icon={Flame} label="Learning streak" value={`${stats.learningStreakDays} days`} />
        <StatCard icon={Clock} label="Hours this week" value={`${stats.hoursSpentThisWeek}h`} />
      </div>
    </div>
  )
}

function StatCard({
  icon: Icon,
  label,
  value,
}: {
  icon: typeof Flame
  label: string
  value: string
}) {
  return (
    <div className="rounded-lg border border-appBorder bg-appSurface p-5 flex items-center gap-4">
      <div className="rounded-md bg-teal/10 p-2.5">
        <Icon className="h-5 w-5 text-teal" />
      </div>
      <div>
        <p className="font-mono text-xl">{value}</p>
        <p className="text-xs text-appMuted mt-0.5">{label}</p>
      </div>
    </div>
  )
}

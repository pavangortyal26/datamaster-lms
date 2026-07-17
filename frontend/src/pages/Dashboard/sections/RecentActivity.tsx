import { CheckCircle2, HelpCircle, Award, BookPlus } from 'lucide-react'
import type { ActivityType } from '@/types/dashboard'
import { useRecentActivity } from '@/features/dashboard/hooks'

const ICONS: Record<ActivityType, typeof CheckCircle2> = {
  lesson_completed: CheckCircle2,
  quiz_passed: HelpCircle,
  certificate_earned: Award,
  enrolled: BookPlus,
}

export function RecentActivity() {
  const { data: activity } = useRecentActivity()

  return (
    <section>
      <h2 className="font-display text-lg font-semibold">Recent Activity</h2>
      <div className="mt-4 rounded-lg border border-appBorder bg-appSurface divide-y divide-appBorder">
        {activity.map((item) => {
          const Icon = ICONS[item.type]
          return (
            <div key={item.id} className="flex items-start gap-3 px-5 py-4">
              <Icon className="h-4 w-4 text-teal mt-0.5 shrink-0" />
              <div>
                <p className="text-sm">{item.description}</p>
                <p className="mt-1 text-xs text-appMuted">{item.timestamp}</p>
              </div>
            </div>
          )
        })}
      </div>
    </section>
  )
}

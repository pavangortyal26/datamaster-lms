import { CalendarDays } from 'lucide-react'
import { useEnrolledCourses } from '@/features/dashboard/hooks'

export function UpcomingCourses() {
  const { data: courses } = useEnrolledCourses()
  const upcoming = courses.filter((c) => c.startsOn)

  if (upcoming.length === 0) return null

  return (
    <section>
      <h2 className="font-display text-lg font-semibold">Upcoming</h2>
      <div className="mt-4 space-y-3">
        {upcoming.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border border-appBorder bg-appSurface p-5 flex items-center gap-4"
          >
            <div className="rounded-md bg-amber/10 p-2.5 shrink-0">
              <CalendarDays className="h-5 w-5 text-amber" />
            </div>
            <div>
              <h3 className="font-medium">{course.title}</h3>
              <p className="mt-1 text-xs text-appMuted">Starts {course.startsOn}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}

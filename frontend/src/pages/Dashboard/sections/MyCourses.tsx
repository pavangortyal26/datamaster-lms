import { PlayCircle, CheckCircle2 } from 'lucide-react'
import { useEnrolledCourses } from '@/features/dashboard/hooks'

export function MyCourses() {
  const { data: courses } = useEnrolledCourses()
  const started = courses.filter((c) => !c.startsOn)

  return (
    <section id="my-courses">
      <div className="flex items-center justify-between">
        <h2 className="font-display text-lg font-semibold">My Courses</h2>
      </div>

      <div className="mt-4 space-y-3">
        {started.map((course) => (
          <div
            key={course.id}
            className="rounded-lg border border-appBorder bg-appSurface p-5 flex flex-col sm:flex-row sm:items-center gap-4"
          >
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                {course.progressPct === 100 ? (
                  <CheckCircle2 className="h-4 w-4 text-teal shrink-0" />
                ) : (
                  <PlayCircle className="h-4 w-4 text-appMuted shrink-0" />
                )}
                <h3 className="font-medium truncate">{course.title}</h3>
              </div>
              <p className="mt-1 text-xs text-appMuted">
                {course.instructor} · {course.completedLessons}/{course.totalLessons} lessons ·
                last accessed {course.lastAccessed}
              </p>
              <div className="mt-3 h-1.5 rounded-full bg-appBorder overflow-hidden max-w-sm">
                <div
                  className="h-full rounded-full bg-teal transition-all"
                  style={{ width: `${course.progressPct}%` }}
                />
              </div>
            </div>

            <button className="shrink-0 rounded-md bg-teal px-4 py-2 text-sm font-medium text-ink hover:bg-teal-dim transition-colors">
              {course.progressPct === 100 ? 'Review' : 'Continue'}
            </button>
          </div>
        ))}
      </div>
    </section>
  )
}

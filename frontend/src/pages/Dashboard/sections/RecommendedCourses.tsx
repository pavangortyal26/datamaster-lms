import { CourseCard } from '@/components/ui/CourseCard'
import { featuredCourses } from '@/data/courses'
import { useEnrolledCourses } from '@/features/dashboard/hooks'

export function RecommendedCourses() {
  const { data: enrolled } = useEnrolledCourses()
  const enrolledIds = new Set(enrolled.map((c) => c.id))
  const recommended = featuredCourses.filter((c) => !enrolledIds.has(c.id)).slice(0, 3)

  if (recommended.length === 0) return null

  return (
    <section>
      <h2 className="font-display text-lg font-semibold">Recommended for you</h2>
      <p className="mt-1 text-sm text-appMuted">Based on courses you've completed and started.</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}

import { Loader2 } from 'lucide-react'
import { CourseCard } from '@/components/ui/CourseCard'
import { useCourseList } from '@/features/courses/hooks'
import { useWishlist } from '@/features/wishlist/hooks'
import { useWishlistToggle } from '@/features/wishlist/useWishlistToggle'

export function RecommendedCourses() {
  // Pulls real courses from the Phase 5 catalog (most popular first) rather than the
  // dashboard's mock enrolled-courses data, since wishlisting needs a real course UUID.
  const { data: courses, isLoading } = useCourseList({ sort: 'POPULAR' })
  const { data: wishlist } = useWishlist()
  const { toggle } = useWishlistToggle()

  const wishlistedIds = new Set((wishlist ?? []).map((c) => c.id))
  const recommended = (courses ?? []).slice(0, 3)

  if (isLoading) {
    return (
      <section>
        <h2 className="font-display text-lg font-semibold">Recommended for you</h2>
        <div className="mt-4 flex justify-center py-8">
          <Loader2 className="h-5 w-5 animate-spin text-teal" />
        </div>
      </section>
    )
  }

  if (recommended.length === 0) return null

  return (
    <section>
      <h2 className="font-display text-lg font-semibold">Recommended for you</h2>
      <p className="mt-1 text-sm text-appMuted">Popular courses other learners are taking.</p>
      <div className="mt-4 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {recommended.map((course) => (
          <CourseCard
            key={course.id}
            course={course}
            isWishlisted={wishlistedIds.has(course.id)}
            onToggleWishlist={toggle}
          />
        ))}
      </div>
    </section>
  )
}

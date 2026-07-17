import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Loader2 } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { CourseCard } from '@/components/ui/CourseCard'
import { CourseFilterBar } from './CourseFilterBar'
import { useCourseList } from '@/features/courses/hooks'
import { useWishlistToggle } from '@/features/wishlist/useWishlistToggle'
import type { CourseFilters } from '@/features/courses/api'

export default function CourseMarketplacePage() {
  const [searchParams] = useSearchParams()
  const [filters, setFilters] = useState<CourseFilters>({
    sort: 'POPULAR',
    category: searchParams.get('category') ?? undefined,
  })
  const { data: courses, isLoading, isError } = useCourseList(filters)
  const { toggle } = useWishlistToggle()

  return (
    <div className="min-h-screen">
      <Navbar />
      <main className="px-6 py-16">
        <div className="mx-auto max-w-7xl">
          <div className="max-w-2xl">
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
              // course catalog
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold">
              Find your next course
            </h1>
          </div>

          <div className="mt-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-10">
            <aside>
              <CourseFilterBar filters={filters} onChange={setFilters} />
            </aside>

            <div>
              {isLoading && (
                <div className="flex items-center justify-center py-24">
                  <Loader2 className="h-6 w-6 animate-spin text-teal" aria-label="Loading courses" />
                </div>
              )}

              {isError && (
                <p className="text-sm text-slate py-12 text-center">
                  Couldn't load courses right now. Please try again shortly.
                </p>
              )}

              {courses && courses.length === 0 && (
                <p className="text-sm text-slate py-12 text-center">
                  No courses match those filters. Try widening your search.
                </p>
              )}

              {courses && courses.length > 0 && (
                <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                  {courses.map((course) => (
                    <CourseCard
                      key={course.id}
                      course={course}
                      isWishlisted={course.isWishlisted}
                      onToggleWishlist={toggle}
                    />
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

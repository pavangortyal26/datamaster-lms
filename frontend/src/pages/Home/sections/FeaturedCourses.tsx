import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { CourseCard } from '@/components/ui/CourseCard'
import { featuredCourses } from '@/data/courses'

export function FeaturedCourses() {
  return (
    <section id="courses" className="px-6 py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionEyebrow>featured courses</SectionEyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Six paths into a data or AI career
            </h2>
          </div>
          <Link
            to="/courses"
            className="inline-flex items-center gap-1.5 text-sm font-medium text-teal hover:text-teal-dim transition-colors"
          >
            Browse all courses <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {featuredCourses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      </div>
    </section>
  )
}

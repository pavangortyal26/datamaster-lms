import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { CourseCard } from '@/components/ui/CourseCard'
import { featuredCourses } from '@/data/courses'

export function FeaturedCourses() {
  return (
    <section id="courses" className="px-6 py-24 border-t border-border/60">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionEyebrow>featured courses</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Six paths into a data or AI career
          </h2>
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

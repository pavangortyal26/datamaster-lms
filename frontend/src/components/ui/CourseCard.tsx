import { Star, Clock, Signal, Heart } from 'lucide-react'
import type { Course } from '@/types/course'

export function CourseCard({ course }: { course: Course }) {
  const discountPct = course.originalPrice
    ? Math.round(100 - (course.price / course.originalPrice) * 100)
    : null

  return (
    <div className="group rounded-lg border border-border/60 bg-surface overflow-hidden hover:border-teal/50 transition-colors flex flex-col">
      <div className="relative h-40 bg-gradient-to-br from-surfaceHover to-ink flex items-center justify-center">
        <span className="font-mono text-xs uppercase tracking-widest text-teal">
          {course.category}
        </span>
        <button
          aria-label="Add to wishlist"
          className="absolute top-3 right-3 rounded-full bg-ink/60 p-2 text-slate hover:text-amber transition-colors"
        >
          <Heart className="h-4 w-4" />
        </button>
      </div>

      <div className="p-5 flex flex-col flex-1">
        <h3 className="font-display text-lg font-semibold leading-snug">{course.title}</h3>
        <p className="mt-2 text-sm text-slate leading-relaxed flex-1">{course.description}</p>

        <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-2 text-xs text-slate">
          <span className="flex items-center gap-1">
            <Clock className="h-3.5 w-3.5" /> {course.duration}
          </span>
          <span className="flex items-center gap-1">
            <Signal className="h-3.5 w-3.5" /> {course.level}
          </span>
          <span className="flex items-center gap-1 text-amber">
            <Star className="h-3.5 w-3.5 fill-amber" /> {course.rating}
          </span>
        </div>

        <p className="mt-3 text-xs text-slate">
          {course.instructor} · {course.studentsCount.toLocaleString('en-IN')} students
        </p>

        <div className="mt-5 flex items-center justify-between">
          <div className="flex items-baseline gap-2">
            <span className="font-mono text-lg text-offwhite">
              ₹{course.price.toLocaleString('en-IN')}
            </span>
            {course.originalPrice && (
              <span className="font-mono text-xs text-slate line-through">
                ₹{course.originalPrice.toLocaleString('en-IN')}
              </span>
            )}
            {discountPct && (
              <span className="font-mono text-xs text-teal">{discountPct}% off</span>
            )}
          </div>
        </div>

        <button className="mt-4 w-full rounded-md bg-teal py-2.5 text-sm font-medium text-ink hover:bg-teal-dim transition-colors">
          Enroll now
        </button>
      </div>
    </div>
  )
}

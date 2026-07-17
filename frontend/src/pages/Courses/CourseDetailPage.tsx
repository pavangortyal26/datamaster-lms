import { useState } from 'react'
import { useParams, useNavigate, useLocation, Link } from 'react-router-dom'
import { Loader2, Star, Clock, Signal, Users, Heart, CheckCircle2, ChevronDown } from 'lucide-react'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { useCourseDetail } from '@/features/courses/hooks'
import { useWishlistToggle } from '@/features/wishlist/useWishlistToggle'
import { useAuthStore } from '@/store/authStore'

export default function CourseDetailPage() {
  const { slug = '' } = useParams()
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const { data: course, isLoading, isError } = useCourseDetail(slug)
  const { toggle } = useWishlistToggle()
  const [showCheckoutNote, setShowCheckoutNote] = useState(false)
  const [openFaqIndex, setOpenFaqIndex] = useState<number | null>(0)

  const handleBuyNow = () => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }
    // Payments aren't wired up yet — that's Phase 6 (Razorpay checkout). Being upfront
    // here rather than pretending a purchase happened.
    setShowCheckoutNote(true)
  }

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader2 className="h-6 w-6 animate-spin text-teal" aria-label="Loading course" />
      </div>
    )
  }

  if (isError || !course) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 px-6 text-center">
        <p className="text-slate">We couldn't find that course.</p>
        <Link to="/courses" className="text-teal hover:underline">Back to all courses</Link>
      </div>
    )
  }

  const discountPct = course.originalPrice
    ? Math.round(100 - (course.price / course.originalPrice) * 100)
    : null

  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <div className="border-b border-border/60 bg-surface/30 px-6 py-14">
          <div className="mx-auto max-w-5xl">
            <p className="font-mono text-xs uppercase tracking-widest text-teal mb-3">
              {course.category}
            </p>
            <h1 className="font-display text-3xl sm:text-4xl font-semibold max-w-2xl">
              {course.title}
            </h1>
            <p className="mt-4 text-slate max-w-2xl leading-relaxed">{course.description}</p>

            <div className="mt-6 flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-slate">
              <span className="flex items-center gap-1.5 text-amber">
                <Star className="h-4 w-4 fill-amber" /> {course.rating}
              </span>
              <span className="flex items-center gap-1.5">
                <Users className="h-4 w-4" /> {course.studentsCount.toLocaleString('en-IN')} students
              </span>
              <span className="flex items-center gap-1.5">
                <Clock className="h-4 w-4" /> {course.duration}
              </span>
              <span className="flex items-center gap-1.5">
                <Signal className="h-4 w-4" /> {course.level}
              </span>
            </div>
          </div>
        </div>

        <div className="px-6 py-14">
          <div className="mx-auto max-w-5xl grid lg:grid-cols-[1fr_320px] gap-12">
            <div className="space-y-12">
              <section id="outcomes">
                <h2 className="font-display text-xl font-semibold">What you'll learn</h2>
                <ul className="mt-4 grid sm:grid-cols-2 gap-3">
                  {course.learningOutcomes.map((outcome) => (
                    <li key={outcome} className="flex items-start gap-2 text-sm text-slate">
                      <CheckCircle2 className="h-4 w-4 text-teal mt-0.5 shrink-0" />
                      {outcome}
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold">Skills you'll build</h2>
                <div className="mt-4 flex flex-wrap gap-2">
                  {course.skills.map((skill) => (
                    <span
                      key={skill}
                      className="font-mono text-xs rounded-full border border-border px-3 py-1.5 text-slate"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </section>

              <section>
                <h2 className="font-display text-xl font-semibold">Your instructor</h2>
                <div className="mt-4 flex items-start gap-4">
                  <div className="h-12 w-12 rounded-full bg-teal/20 text-teal flex items-center justify-center font-semibold shrink-0">
                    {course.instructorName[0]}
                  </div>
                  <div>
                    <p className="font-medium">{course.instructorName}</p>
                    <p className="mt-1 text-sm text-slate leading-relaxed">{course.instructorBio}</p>
                  </div>
                </div>
              </section>

              {course.faqs.length > 0 && (
                <section>
                  <h2 className="font-display text-xl font-semibold">Questions about this course</h2>
                  <div className="mt-4 divide-y divide-border/60 border-t border-border/60">
                    {course.faqs.map((faq, i) => {
                      const isOpen = openFaqIndex === i
                      return (
                        <div key={faq.question}>
                          <button
                            onClick={() => setOpenFaqIndex(isOpen ? null : i)}
                            className="w-full flex items-center justify-between py-4 text-left"
                            aria-expanded={isOpen}
                          >
                            <span className="text-sm font-medium">{faq.question}</span>
                            <ChevronDown
                              className={`h-4 w-4 text-slate shrink-0 transition-transform ${
                                isOpen ? 'rotate-180 text-teal' : ''
                              }`}
                            />
                          </button>
                          {isOpen && (
                            <p className="pb-4 text-sm text-slate leading-relaxed pr-8">{faq.answer}</p>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </section>
              )}
            </div>

            {/* Sticky purchase card */}
            <aside className="lg:sticky lg:top-24 h-fit rounded-lg border border-border/60 bg-surface p-6">
              <div className="flex items-baseline gap-2">
                <span className="font-mono text-2xl text-offwhite">
                  ₹{course.price.toLocaleString('en-IN')}
                </span>
                {course.originalPrice && (
                  <span className="font-mono text-sm text-slate line-through">
                    ₹{course.originalPrice.toLocaleString('en-IN')}
                  </span>
                )}
              </div>
              {discountPct && <p className="mt-1 text-xs text-teal">{discountPct}% off</p>}

              <button
                onClick={handleBuyNow}
                className="mt-5 w-full rounded-md bg-teal py-2.5 text-sm font-medium text-ink hover:bg-teal-dim transition-colors"
              >
                Buy now
              </button>

              {showCheckoutNote && (
                <p className="mt-3 text-xs text-amber leading-relaxed">
                  Checkout and payments launch in the next release. This course isn't
                  purchasable yet — thanks for your patience.
                </p>
              )}

              <button
                onClick={() => document.getElementById('outcomes')?.scrollIntoView({ behavior: 'smooth' })}
                className="mt-2.5 w-full rounded-md border border-border py-2.5 text-sm text-offwhite hover:border-teal transition-colors"
              >
                Preview curriculum
              </button>

              <button
                onClick={() => toggle(course)}
                className="mt-2.5 w-full flex items-center justify-center gap-2 rounded-md border border-border py-2.5 text-sm text-offwhite hover:border-teal transition-colors"
              >
                <Heart className={`h-4 w-4 ${course.isWishlisted ? 'fill-amber text-amber' : ''}`} />
                {course.isWishlisted ? 'Saved to wishlist' : 'Add to wishlist'}
              </button>
            </aside>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  )
}

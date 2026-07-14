import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { testimonials } from '@/data/testimonials'

export function Testimonials() {
  const [index, setIndex] = useState(0)
  const current = testimonials[index]

  const goTo = (next: number) => {
    setIndex((next + testimonials.length) % testimonials.length)
  }

  return (
    <section id="testimonials" className="px-6 py-24 border-t border-border/60 bg-surface/20">
      <div className="mx-auto max-w-3xl text-center">
        <SectionEyebrow>success stories</SectionEyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold">
          What learners say after they finish
        </h2>

        <div className="mt-12 relative min-h-[220px] flex items-center justify-center">
          <AnimatePresence mode="wait">
            <motion.div
              key={current.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="rounded-lg border border-border/60 bg-surface p-8"
            >
              <Quote className="h-6 w-6 text-teal mx-auto" aria-hidden="true" />
              <p className="mt-4 text-lg text-offwhite leading-relaxed">{current.quote}</p>
              <p className="mt-6 font-display font-semibold">{current.name}</p>
              <p className="text-sm text-slate">{current.role}</p>
              <p className="mt-1 font-mono text-xs text-teal">{current.courseTaken}</p>
            </motion.div>
          </AnimatePresence>
        </div>

        <div className="mt-8 flex items-center justify-center gap-6">
          <button
            onClick={() => goTo(index - 1)}
            aria-label="Previous testimonial"
            className="text-slate hover:text-offwhite transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                onClick={() => goTo(i)}
                aria-label={`Go to testimonial ${i + 1}`}
                className={`h-1.5 rounded-full transition-all ${
                  i === index ? 'w-6 bg-teal' : 'w-1.5 bg-border'
                }`}
              />
            ))}
          </div>
          <button
            onClick={() => goTo(index + 1)}
            aria-label="Next testimonial"
            className="text-slate hover:text-offwhite transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  )
}

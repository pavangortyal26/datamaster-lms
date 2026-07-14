import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { PipelineAnimation } from '@/components/common/PipelineAnimation'

const STATS = [
  { value: '12,400+', label: 'learners trained' },
  { value: '94%', label: 'course completion' },
  { value: '4.8/5', label: 'average rating' },
]

export function Hero() {
  return (
    <section id="home" className="relative overflow-hidden px-6 pt-20 pb-24">
      <div className="mx-auto max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="max-w-2xl"
        >
          <p className="font-mono text-xs uppercase tracking-widest text-teal mb-4">
            // data engineering &amp; ai training
          </p>
          <h1 className="font-display text-4xl sm:text-5xl lg:text-6xl font-semibold leading-[1.1]">
            Turn raw data skills into a career that ships.
          </h1>
          <p className="mt-6 text-lg text-slate max-w-xl">
            Cohort-based courses in data engineering, analytics, and AI — built by
            practitioners, graded on real pipelines and models, not multiple-choice quizzes.
          </p>
          <div className="mt-8 flex flex-wrap gap-4">
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-md bg-teal px-6 py-3 text-sm font-medium text-ink hover:bg-teal-dim transition-colors"
            >
              Explore courses
              <ArrowRight className="h-4 w-4" />
            </Link>
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-md border border-border px-6 py-3 text-sm font-medium text-offwhite hover:border-teal transition-colors"
            >
              Why Data Master
            </a>
          </div>

          <dl className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <dt className="sr-only">{stat.label}</dt>
                <dd className="font-mono text-2xl text-offwhite">{stat.value}</dd>
                <p className="text-xs text-slate mt-1">{stat.label}</p>
              </div>
            ))}
          </dl>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 rounded-xl border border-border/60 bg-surface/40 p-8"
        >
          <PipelineAnimation />
        </motion.div>
      </div>
    </section>
  )
}

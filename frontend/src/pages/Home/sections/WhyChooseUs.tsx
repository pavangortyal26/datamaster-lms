import { motion } from 'framer-motion'
import { Workflow, Users, GraduationCap, Briefcase, Clock, ShieldCheck } from 'lucide-react'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

const REASONS = [
  {
    icon: Workflow,
    title: 'Production-grade projects',
    description: 'Build the same pipelines and models you would ship at a real data team, not simplified exercises.',
  },
  {
    icon: Users,
    title: 'Practitioner instructors',
    description: 'Learn from engineers and analysts currently working in data engineering and AI roles.',
  },
  {
    icon: Briefcase,
    title: 'Placement support',
    description: 'Resume reviews, mock interviews, and a hiring partner network for 6 months post-course.',
  },
  {
    icon: Clock,
    title: 'Flexible learning',
    description: 'Recorded lessons on your schedule, plus weekly live sessions for real-time doubt clearing.',
  },
  {
    icon: GraduationCap,
    title: 'Verifiable certification',
    description: 'A QR-verified certificate employers can check, shareable directly to LinkedIn.',
  },
  {
    icon: ShieldCheck,
    title: 'Lifetime access',
    description: 'Keep access to course content and future cohort sessions even after you complete a course.',
  },
]

export function WhyChooseUs() {
  return (
    <section className="px-6 py-24 border-t border-border/60 bg-surface/20">
      <div className="mx-auto max-w-7xl">
        <div className="max-w-2xl">
          <SectionEyebrow>why choose us</SectionEyebrow>
          <h2 className="font-display text-3xl sm:text-4xl font-semibold">
            Courses designed around what hiring managers actually check
          </h2>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {REASONS.map((reason, i) => (
            <motion.div
              key={reason.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-40px' }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="rounded-lg border border-border/60 bg-surface p-6 hover:border-teal/50 transition-colors"
            >
              <reason.icon className="h-6 w-6 text-teal" aria-hidden="true" />
              <h3 className="mt-4 font-display text-lg font-semibold">{reason.title}</h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">{reason.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

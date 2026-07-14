import { SectionEyebrow } from '@/components/ui/SectionEyebrow'

export function About() {
  return (
    <section id="about" className="px-6 py-24 border-t border-border/60">
      <div className="mx-auto max-w-4xl text-center">
        <SectionEyebrow>about us</SectionEyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold">
          Built by data practitioners, not course-content vendors
        </h2>
        <p className="mt-6 text-slate text-lg leading-relaxed">
          Data Master Consulting started as a corporate training practice, helping engineering
          teams adopt modern data stacks. That practitioner background shapes every course we
          run: instructors have shipped the pipelines and models they teach, and every project
          is modeled on real production work rather than toy datasets.
        </p>
      </div>
    </section>
  )
}

import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { faqs } from '@/data/faqs'

export function FAQSection() {
  const [openId, setOpenId] = useState<string | null>(faqs[0].id)

  return (
    <section className="px-6 py-24 border-t border-border/60">
      <div className="mx-auto max-w-3xl">
        <SectionEyebrow>faqs</SectionEyebrow>
        <h2 className="font-display text-3xl sm:text-4xl font-semibold">
          Questions before you enroll
        </h2>

        <div className="mt-10 divide-y divide-border/60 border-t border-border/60">
          {faqs.map((faq) => {
            const isOpen = openId === faq.id
            return (
              <div key={faq.id}>
                <button
                  onClick={() => setOpenId(isOpen ? null : faq.id)}
                  className="w-full flex items-center justify-between py-5 text-left"
                  aria-expanded={isOpen}
                >
                  <span className="font-medium text-offwhite">{faq.question}</span>
                  <ChevronDown
                    className={`h-4 w-4 text-slate shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-teal' : ''
                    }`}
                  />
                </button>
                {isOpen && (
                  <p className="pb-5 text-sm text-slate leading-relaxed pr-8">{faq.answer}</p>
                )}
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

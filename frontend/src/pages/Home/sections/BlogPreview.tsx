import { ArrowUpRight } from 'lucide-react'
import { SectionEyebrow } from '@/components/ui/SectionEyebrow'
import { blogPosts } from '@/data/blogs'

export function BlogPreview() {
  return (
    <section id="blogs" className="px-6 py-24 border-t border-border/60 bg-surface/20">
      <div className="mx-auto max-w-7xl">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div className="max-w-2xl">
            <SectionEyebrow>from the blog</SectionEyebrow>
            <h2 className="font-display text-3xl sm:text-4xl font-semibold">
              Notes on data, AI, and hiring
            </h2>
          </div>
          <span className="font-mono text-xs text-slate">
            Full blog launches with the next release
          </span>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {blogPosts.map((post) => (
            <article
              key={post.id}
              className="rounded-lg border border-border/60 bg-surface p-6 hover:border-teal/50 transition-colors flex flex-col"
            >
              <div className="flex items-center justify-between">
                <span className="font-mono text-xs uppercase tracking-widest text-teal">
                  {post.category}
                </span>
                <ArrowUpRight className="h-4 w-4 text-slate" aria-hidden="true" />
              </div>
              <h3 className="mt-4 font-display text-lg font-semibold leading-snug flex-1">
                {post.title}
              </h3>
              <p className="mt-2 text-sm text-slate leading-relaxed">{post.excerpt}</p>
              <p className="mt-4 text-xs text-slate">
                {post.date} · {post.readTime}
              </p>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

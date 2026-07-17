import { Search } from 'lucide-react'
import type { CourseFilters, SortOption } from '@/features/courses/api'
import { useCourseCategories } from '@/features/courses/hooks'

const LEVELS = ['Beginner', 'Intermediate', 'Advanced']
const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'POPULAR', label: 'Most popular' },
  { value: 'RATING', label: 'Highest rated' },
  { value: 'PRICE_LOW', label: 'Price: low to high' },
  { value: 'PRICE_HIGH', label: 'Price: high to low' },
]

interface Props {
  filters: CourseFilters
  onChange: (filters: CourseFilters) => void
}

export function CourseFilterBar({ filters, onChange }: Props) {
  const { data: categories } = useCourseCategories()

  return (
    <div className="space-y-4">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate" />
        <input
          type="text"
          value={filters.search ?? ''}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search courses..."
          className="w-full rounded-md border border-border bg-surface pl-10 pr-4 py-2.5 text-sm text-offwhite placeholder:text-slate-dark focus-visible:border-teal"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2">
        <button
          onClick={() => onChange({ ...filters, category: undefined })}
          className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
            !filters.category
              ? 'bg-teal text-ink'
              : 'border border-border text-slate hover:text-offwhite'
          }`}
        >
          All categories
        </button>
        {categories?.map((cat) => (
          <button
            key={cat.slug}
            onClick={() => onChange({ ...filters, category: cat.slug })}
            className={`rounded-full px-3.5 py-1.5 text-xs font-medium transition-colors ${
              filters.category === cat.slug
                ? 'bg-teal text-ink'
                : 'border border-border text-slate hover:text-offwhite'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      <div className="flex flex-wrap items-center gap-3">
        <select
          value={filters.level ?? ''}
          onChange={(e) => onChange({ ...filters, level: e.target.value || undefined })}
          className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-offwhite focus-visible:border-teal"
        >
          <option value="">All levels</option>
          {LEVELS.map((level) => (
            <option key={level} value={level}>{level}</option>
          ))}
        </select>

        <select
          value={filters.sort ?? 'POPULAR'}
          onChange={(e) => onChange({ ...filters, sort: e.target.value as SortOption })}
          className="rounded-md border border-border bg-surface px-3 py-2 text-xs text-offwhite focus-visible:border-teal"
        >
          {SORT_OPTIONS.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
      </div>
    </div>
  )
}

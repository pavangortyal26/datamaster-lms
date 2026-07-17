import { useQuery } from '@tanstack/react-query'
import { coursesApi, type CourseFilters } from './api'

export function useCourseList(filters: CourseFilters) {
  return useQuery({
    queryKey: ['courses', filters],
    queryFn: () => coursesApi.list(filters).then((r) => r.data),
    placeholderData: (previous) => previous, // keep old results visible while filters change
  })
}

export function useCourseCategories() {
  return useQuery({
    queryKey: ['course-categories'],
    queryFn: () => coursesApi.categories().then((r) => r.data),
    staleTime: 1000 * 60 * 10, // categories change rarely
  })
}

export function useCourseDetail(slug: string) {
  return useQuery({
    queryKey: ['course', slug],
    queryFn: () => coursesApi.bySlug(slug).then((r) => r.data),
    enabled: !!slug,
  })
}

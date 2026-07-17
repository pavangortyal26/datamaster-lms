import { apiClient } from '@/lib/axios'
import type { Course, CourseDetail } from '@/types/course'

export type SortOption = 'POPULAR' | 'PRICE_LOW' | 'PRICE_HIGH' | 'RATING'

export interface CourseFilters {
  category?: string
  level?: string
  search?: string
  sort?: SortOption
}

export interface CourseCategoryOption {
  name: string
  slug: string
}

// Backend response includes isWishlisted inline (personalized per logged-in user);
// keep that as a distinct shape from the plain Course type used for static/landing cards.
export type CourseSummaryDto = Course & { isWishlisted: boolean }
export type CourseDetailDto = CourseDetail & { isWishlisted: boolean }

export const coursesApi = {
  list: (filters: CourseFilters = {}) =>
    apiClient.get<CourseSummaryDto[]>('/courses/public', { params: filters }),

  categories: () => apiClient.get<CourseCategoryOption[]>('/courses/public/categories'),

  bySlug: (slug: string) => apiClient.get<CourseDetailDto>(`/courses/public/${slug}`),
}

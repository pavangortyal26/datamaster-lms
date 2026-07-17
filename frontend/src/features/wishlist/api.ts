import { apiClient } from '@/lib/axios'
import type { CourseSummaryDto } from '@/features/courses/api'

export const wishlistApi = {
  list: () => apiClient.get<CourseSummaryDto[]>('/wishlist'),
  toggle: (courseId: string) =>
    apiClient.post<{ isWishlisted: boolean }>(`/wishlist/${courseId}`),
}

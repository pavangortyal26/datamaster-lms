import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import { useAuthStore } from '@/store/authStore'
import { wishlistApi } from './api'

export function useWishlist() {
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)

  return useQuery({
    queryKey: ['wishlist'],
    queryFn: () => wishlistApi.list().then((r) => r.data),
    enabled: isAuthenticated, // no point calling an authenticated endpoint while logged out
  })
}

export function useToggleWishlist() {
  const queryClient = useQueryClient()

  return useMutation({
    mutationFn: (courseId: string) => wishlistApi.toggle(courseId),
    onSuccess: () => {
      // Both the wishlist list itself and any course list showing isWishlisted flags
      // need to reflect the change.
      queryClient.invalidateQueries({ queryKey: ['wishlist'] })
      queryClient.invalidateQueries({ queryKey: ['courses'] })
      queryClient.invalidateQueries({ queryKey: ['course'] })
    },
  })
}

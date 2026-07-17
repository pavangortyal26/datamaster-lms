import { useNavigate, useLocation } from 'react-router-dom'
import { useAuthStore } from '@/store/authStore'
import { useToggleWishlist } from './hooks'
import type { Course } from '@/types/course'

export function useWishlistToggle() {
  const navigate = useNavigate()
  const location = useLocation()
  const isAuthenticated = useAuthStore((s) => s.isAuthenticated)
  const toggleMutation = useToggleWishlist()

  const toggle = (course: Course) => {
    if (!isAuthenticated) {
      navigate('/login', { state: { from: location } })
      return
    }
    toggleMutation.mutate(course.id)
  }

  return { toggle }
}

import {
  mockEnrolledCourses,
  mockCertificates,
  mockActivity,
  mockNotifications,
  mockStats,
} from '@/data/mockDashboard'

// Each hook below stands in for a future `useQuery(['...'], () => apiClient.get(...))`.
// Keeping the mock data behind hooks (rather than importing the arrays directly into
// components) means wiring up Phase 5/8/9's real endpoints later only touches this file.

export function useEnrolledCourses() {
  return { data: mockEnrolledCourses, isLoading: false }
}

export function useCertificates() {
  return { data: mockCertificates, isLoading: false }
}

export function useRecentActivity() {
  return { data: mockActivity, isLoading: false }
}

export function useNotifications() {
  return { data: mockNotifications, isLoading: false }
}

export function useDashboardStats() {
  return { data: mockStats, isLoading: false }
}

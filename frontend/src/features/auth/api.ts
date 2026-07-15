import { apiClient } from '@/lib/axios'
import type { AuthUser } from '@/store/authStore'

interface AuthResponse {
  accessToken: string
  user: AuthUser
}

export const authApi = {
  requestOtp: (email: string) =>
    apiClient.post<{ message: string }>('/auth/otp/request', { email }),

  verifyOtp: (email: string, code: string, rememberMe: boolean) =>
    apiClient.post<AuthResponse>('/auth/otp/verify', { email, code, rememberMe }),

  refresh: () => apiClient.post<AuthResponse>('/auth/refresh'),

  logout: () => apiClient.post<{ message: string }>('/auth/logout'),
}

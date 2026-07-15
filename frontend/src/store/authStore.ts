import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface AuthUser {
  id: string
  name: string
  email: string
  role: 'STUDENT' | 'INSTRUCTOR' | 'ADMIN'
  avatarUrl?: string
}

interface AuthState {
  user: AuthUser | null
  accessToken: string | null
  isAuthenticated: boolean
  rememberMe: boolean
  hasBootstrapped: boolean
  setSession: (user: AuthUser, accessToken: string) => void
  setAccessToken: (accessToken: string) => void
  setRememberMe: (value: boolean) => void
  setHasBootstrapped: (value: boolean) => void
  logout: () => void
}

// NOTE: Only the short-lived access token is kept in JS-accessible state.
// The refresh token lives in a secure, httpOnly, SameSite cookie set by the backend
// and is never touched from the frontend.
export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      isAuthenticated: false,
      rememberMe: false,
      hasBootstrapped: false,
      setSession: (user, accessToken) =>
        set({ user, accessToken, isAuthenticated: true }),
      setAccessToken: (accessToken) => set({ accessToken }),
      setRememberMe: (rememberMe) => set({ rememberMe }),
      setHasBootstrapped: (hasBootstrapped) => set({ hasBootstrapped }),
      logout: () =>
        set({ user: null, accessToken: null, isAuthenticated: false }),
    }),
    {
      name: 'dm-lms-auth',
      partialize: (state) => ({
        // Never persist the access token itself to localStorage
        user: state.user,
        rememberMe: state.rememberMe,
      }),
    },
  ),
)

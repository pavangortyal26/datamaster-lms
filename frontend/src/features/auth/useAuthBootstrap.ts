import { useEffect } from 'react'
import { authApi } from './api'
import { useAuthStore } from '@/store/authStore'

/**
 * The access token lives only in memory (Zustand, not persisted), so a full page
 * reload always starts logged-out on the client. This hook silently calls /auth/refresh
 * on mount — if the browser is still carrying a valid httpOnly refresh cookie, the
 * session is restored transparently. If not (or it's expired/revoked), it fails
 * silently and the person just sees the logged-out state.
 *
 * `hasBootstrapped` is written to the shared store (not local state) so ProtectedRoute
 * can wait for this to finish before deciding whether to redirect to /login — otherwise
 * a direct reload of a protected page would redirect away before the session-restore
 * request even resolves.
 */
export function useAuthBootstrap() {
  const setSession = useAuthStore((s) => s.setSession)
  const setHasBootstrapped = useAuthStore((s) => s.setHasBootstrapped)

  useEffect(() => {
    let cancelled = false

    authApi
      .refresh()
      .then(({ data }) => {
        if (!cancelled) {
          setSession(data.user, data.accessToken)
        }
      })
      .catch(() => {
        // No valid session cookie — this is the normal logged-out case, not an error.
      })
      .finally(() => {
        if (!cancelled) setHasBootstrapped(true)
      })

    return () => {
      cancelled = true
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
}

import { AppRouter } from '@/routes/AppRouter'
import { useAuthBootstrap } from '@/features/auth/useAuthBootstrap'

function App() {
  // Silently attempt to restore a session from the httpOnly refresh cookie on load.
  // We intentionally don't block rendering on this — public pages should show
  // immediately, and protected routes redirect to /login if it turns out there's no session.
  useAuthBootstrap()

  return <AppRouter />
}

export default App

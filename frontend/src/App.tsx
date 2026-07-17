import { useEffect } from 'react'
import { AppRouter } from '@/routes/AppRouter'
import { useAuthBootstrap } from '@/features/auth/useAuthBootstrap'
import { useThemeStore } from '@/store/themeStore'

function App() {
  // Silently attempt to restore a session from the httpOnly refresh cookie on load.
  useAuthBootstrap()

  // Apply the dashboard's light/dark preference at the document root. Only components
  // using the app-* token namespace (dashboard) actually respond to this class —
  // the marketing site's fixed palette is untouched either way.
  const theme = useThemeStore((s) => s.theme)
  useEffect(() => {
    document.documentElement.classList.toggle('dark', theme === 'dark')
  }, [theme])

  return <AppRouter />
}

export default App

import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type Theme = 'dark' | 'light'

interface ThemeState {
  theme: Theme
  toggleTheme: () => void
}

// Scoped to the authenticated app shell (dashboard). The public marketing site keeps
// its fixed dark brand look regardless of this setting — see App.tsx for how the
// 'dark' class is applied only to the parts of the tree that opt into theme-aware tokens.
export const useThemeStore = create<ThemeState>()(
  persist(
    (set) => ({
      theme: 'dark',
      toggleTheme: () => set((s) => ({ theme: s.theme === 'dark' ? 'light' : 'dark' })),
    }),
    { name: 'dm-lms-theme' },
  ),
)

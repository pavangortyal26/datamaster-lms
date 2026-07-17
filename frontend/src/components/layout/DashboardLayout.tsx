import { useState } from 'react'
import type { ReactNode } from 'react'
import { DashboardSidebar } from './DashboardSidebar'
import { DashboardTopbar } from './DashboardTopbar'

export function DashboardLayout({ children }: { children: ReactNode }) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false)

  return (
    <div className="min-h-screen flex bg-appBg text-appFg">
      <DashboardSidebar isOpen={isSidebarOpen} onClose={() => setIsSidebarOpen(false)} />

      <div className="flex-1 min-w-0">
        <DashboardTopbar onMenuClick={() => setIsSidebarOpen(true)} />
        <main className="px-4 sm:px-6 lg:px-8 py-8 max-w-6xl mx-auto">{children}</main>
      </div>
    </div>
  )
}

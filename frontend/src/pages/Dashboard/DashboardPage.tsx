import { DashboardLayout } from '@/components/layout/DashboardLayout'
import { WelcomeHeader } from './sections/WelcomeHeader'
import { MyCourses } from './sections/MyCourses'
import { UpcomingCourses } from './sections/UpcomingCourses'
import { RecommendedCourses } from './sections/RecommendedCourses'
import { CertificatesSection } from './sections/CertificatesSection'
import { RecentActivity } from './sections/RecentActivity'
import { ProfileCard } from './sections/ProfileCard'

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <div className="space-y-10">
        <WelcomeHeader />
        <MyCourses />
        <UpcomingCourses />
        <RecommendedCourses />
        <CertificatesSection />
        <RecentActivity />
        <ProfileCard />
      </div>
    </DashboardLayout>
  )
}

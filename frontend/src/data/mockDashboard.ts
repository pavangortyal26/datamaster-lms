import type {
  EnrolledCourse,
  Certificate,
  ActivityItem,
  NotificationItem,
  DashboardStats,
} from '@/types/dashboard'

// NOTE: All data below is placeholder. It exists so the dashboard UI can be built and
// reviewed now. Once Phase 5 (course marketplace / enrollments), Phase 8 (progress
// tracking), and Phase 9 (certificates) ship their real endpoints, this file goes away
// and the hooks in features/dashboard/ swap over to React Query calls against those APIs.

export const mockEnrolledCourses: EnrolledCourse[] = [
  {
    id: 'data-engineering-bootcamp',
    title: 'Data Engineering Bootcamp',
    category: 'Data Engineering',
    instructor: 'Rohan Kulkarni',
    progressPct: 68,
    completedLessons: 34,
    totalLessons: 50,
    lastAccessed: '2 hours ago',
  },
  {
    id: 'advanced-sql-query-optimization',
    title: 'Advanced SQL & Query Optimization',
    category: 'SQL',
    instructor: 'Rohan Kulkarni',
    progressPct: 100,
    completedLessons: 22,
    totalLessons: 22,
    lastAccessed: '3 days ago',
  },
  {
    id: 'python-for-data-professionals',
    title: 'Python for Data Professionals',
    category: 'Python',
    instructor: 'Sneha Patil',
    progressPct: 12,
    completedLessons: 4,
    totalLessons: 32,
    lastAccessed: '1 week ago',
  },
  {
    id: 'generative-ai-for-engineers',
    title: 'Generative AI for Engineers',
    category: 'Generative AI',
    instructor: 'Ananya Deshpande',
    progressPct: 0,
    completedLessons: 0,
    totalLessons: 28,
    lastAccessed: 'Not started',
    startsOn: 'Aug 4, 2026',
  },
]

export const mockCertificates: Certificate[] = [
  {
    id: 'cert-1',
    courseTitle: 'Advanced SQL & Query Optimization',
    issuedDate: 'Jul 2, 2026',
    certificateNumber: 'DM-SQL-2026-4821',
  },
]

export const mockActivity: ActivityItem[] = [
  {
    id: 'a1',
    type: 'lesson_completed',
    description: 'Completed "Partitioning strategies at scale" in Data Engineering Bootcamp',
    timestamp: '2 hours ago',
  },
  {
    id: 'a2',
    type: 'quiz_passed',
    description: 'Scored 92% on the Window Functions quiz in Advanced SQL',
    timestamp: '3 days ago',
  },
  {
    id: 'a3',
    type: 'certificate_earned',
    description: 'Earned a certificate for Advanced SQL & Query Optimization',
    timestamp: '3 days ago',
  },
  {
    id: 'a4',
    type: 'enrolled',
    description: 'Enrolled in Generative AI for Engineers',
    timestamp: '1 week ago',
  },
]

export const mockNotifications: NotificationItem[] = [
  {
    id: 'n1',
    title: 'New lesson available',
    message: 'Module 6 of Data Engineering Bootcamp is now live.',
    isRead: false,
    timestamp: '1 hour ago',
  },
  {
    id: 'n2',
    title: 'Certificate issued',
    message: 'Your certificate for Advanced SQL & Query Optimization is ready.',
    isRead: false,
    timestamp: '3 days ago',
  },
  {
    id: 'n3',
    title: 'Cohort starts soon',
    message: 'Generative AI for Engineers begins Aug 4, 2026.',
    isRead: true,
    timestamp: '1 week ago',
  },
]

export const mockStats: DashboardStats = {
  completionRate: 68,
  learningStreakDays: 12,
  hoursSpentThisWeek: 6.5,
}

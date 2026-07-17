export interface EnrolledCourse {
  id: string
  title: string
  category: string
  instructor: string
  progressPct: number
  completedLessons: number
  totalLessons: number
  lastAccessed: string
  startsOn?: string // present only for courses not yet started
}

export interface Certificate {
  id: string
  courseTitle: string
  issuedDate: string
  certificateNumber: string
}

export type ActivityType = 'lesson_completed' | 'quiz_passed' | 'certificate_earned' | 'enrolled'

export interface ActivityItem {
  id: string
  type: ActivityType
  description: string
  timestamp: string
}

export interface NotificationItem {
  id: string
  title: string
  message: string
  isRead: boolean
  timestamp: string
}

export interface DashboardStats {
  completionRate: number
  learningStreakDays: number
  hoursSpentThisWeek: number
}

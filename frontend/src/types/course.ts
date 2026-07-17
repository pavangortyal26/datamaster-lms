export interface Course {
  id: string // real UUID for API-backed courses; mirrors slug for the landing page's static cards
  slug: string
  title: string
  category: string
  description: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  instructorName: string
  rating: number
  studentsCount: number
  price: number
  originalPrice?: number
  thumbnailUrl?: string
}

export interface CourseFaq {
  question: string
  answer: string
}

export interface CourseDetail extends Course {
  learningOutcomes: string[]
  skills: string[]
  instructorBio?: string
  bannerUrl?: string
  faqs: CourseFaq[]
}

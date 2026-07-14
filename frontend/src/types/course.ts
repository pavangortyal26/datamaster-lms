export interface Course {
  id: string
  title: string
  category: string
  description: string
  duration: string
  level: 'Beginner' | 'Intermediate' | 'Advanced'
  instructor: string
  rating: number
  studentsCount: number
  price: number
  originalPrice?: number
}

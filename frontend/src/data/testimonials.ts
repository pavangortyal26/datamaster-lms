export interface Testimonial {
  id: string
  name: string
  role: string
  quote: string
  courseTaken: string
}

export const testimonials: Testimonial[] = [
  {
    id: 't1',
    name: 'Priya Sharma',
    role: 'Data Analyst at a fintech startup',
    quote:
      'I went from writing broken VLOOKUPs to owning our team\'s entire reporting pipeline in ten weeks. The projects were the closest thing to real work I found anywhere.',
    courseTaken: 'Data Analytics Foundations',
  },
  {
    id: 't2',
    name: 'Arjun Mehta',
    role: 'Data Engineer, mid-size SaaS company',
    quote:
      'The bootcamp assumes nothing and builds everything. By week eight I had a working Airflow pipeline I could actually show in interviews, not just a certificate.',
    courseTaken: 'Data Engineering Bootcamp',
  },
  {
    id: 't3',
    name: 'Kavya Reddy',
    role: 'Product Analyst, e-commerce',
    quote:
      'Best SQL course I have taken, and I had taken three before this one. The query optimization module alone justified the fee.',
    courseTaken: 'Advanced SQL & Query Optimization',
  },
  {
    id: 't4',
    name: 'Siddharth Rao',
    role: 'ML Engineer, healthtech',
    quote:
      'What stood out was how much time we spent on deployment and monitoring, not just model training. Most courses stop right before the part that matters at a job.',
    courseTaken: 'Machine Learning in Production',
  },
]

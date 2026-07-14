export interface FAQ {
  id: string
  question: string
  answer: string
}

export const faqs: FAQ[] = [
  {
    id: 'f1',
    question: 'Do I need a technical background to enroll?',
    answer:
      'No. Our Beginner-level courses (Python, Data Analytics Foundations) assume no prior coding experience. Intermediate and Advanced courses list prerequisites clearly on each course page.',
  },
  {
    id: 'f2',
    question: 'Are classes live or self-paced?',
    answer:
      'Every course combines recorded lessons you can watch on your schedule with weekly live doubt-clearing sessions and mentor office hours.',
  },
  {
    id: 'f3',
    question: 'Will I get a certificate?',
    answer:
      'Yes. On completion you receive a verifiable certificate with a QR code, which you can add directly to LinkedIn from your dashboard.',
  },
  {
    id: 'f4',
    question: 'Is there placement support?',
    answer:
      'Yes. Every cohort includes resume reviews, mock interviews, and access to our hiring partner network. Support continues for 6 months after course completion.',
  },
  {
    id: 'f5',
    question: 'What if I fall behind or need to pause?',
    answer:
      'You keep lifetime access to course content and can join doubt-clearing sessions from any future cohort at no extra cost.',
  },
  {
    id: 'f6',
    question: 'What payment options are available?',
    answer:
      'We support UPI, credit/debit cards, net banking, and wallets via Razorpay, along with no-cost EMI on select courses.',
  },
]

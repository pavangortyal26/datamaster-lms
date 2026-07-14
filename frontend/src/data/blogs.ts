export interface BlogPost {
  id: string
  title: string
  excerpt: string
  category: string
  readTime: string
  date: string
}

export const blogPosts: BlogPost[] = [
  {
    id: 'b1',
    title: 'Why most data pipelines break in production (and how to design around it)',
    excerpt:
      'A look at the failure patterns we see most often in student and client pipelines, and the design habits that prevent them.',
    category: 'Data Engineering',
    readTime: '6 min read',
    date: 'Jun 2026',
  },
  {
    id: 'b2',
    title: 'RAG is not a silver bullet: when to fine-tune instead',
    excerpt:
      'A practical framework for choosing between retrieval-augmented generation and fine-tuning for your use case.',
    category: 'Generative AI',
    readTime: '8 min read',
    date: 'May 2026',
  },
  {
    id: 'b3',
    title: 'The SQL interview question that trips up 70% of candidates',
    excerpt:
      'Window functions come up constantly in interviews. Here is how to actually reason through them instead of memorizing syntax.',
    category: 'SQL',
    readTime: '5 min read',
    date: 'May 2026',
  },
]

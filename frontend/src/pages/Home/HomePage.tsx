import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { Hero } from './sections/Hero'
import { About } from './sections/About'
import { WhyChooseUs } from './sections/WhyChooseUs'
import { FeaturedCourses } from './sections/FeaturedCourses'
import { Testimonials } from './sections/Testimonials'
import { BlogPreview } from './sections/BlogPreview'
import { FAQSection } from './sections/FAQSection'

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Navbar />
      <main>
        <Hero />
        <About />
        <WhyChooseUs />
        <FeaturedCourses />
        <Testimonials />
        <BlogPreview />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}

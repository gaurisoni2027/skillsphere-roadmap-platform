import { CTASection } from '../components/landing/CTASection'
import { Features } from '../components/landing/Features'
import { Footer } from '../components/landing/Footer'
import { Hero } from '../components/landing/Hero'
import { Navbar } from '../components/landing/Navbar'
import { RoadmapPreview } from '../components/landing/RoadmapPreview'

export function LandingPage() {
  return (
    <div className="min-h-screen bg-canvas">
      <Navbar />
      <main>
        <Hero />
        <Features />
        <RoadmapPreview />
        <CTASection />
      </main>
      <Footer />
    </div>
  )
}

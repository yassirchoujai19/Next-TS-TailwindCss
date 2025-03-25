import { HeroSection } from "@/components/hero-section"
import { Navbar } from "@/components/navbar"
import { FeaturesSection } from "@/components/features-section"
import { TestimonialsSection } from "@/components/testimonials-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen bg-background text-foreground">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <TestimonialsSection />
      <ContactSection />
      <Footer />
    </main>
  )
}


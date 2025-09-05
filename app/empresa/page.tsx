import { Header } from "@/components/header"
import { AboutHeroSection } from "@/components/about-hero-section"
import { HistorySection } from "@/components/history-section"
import { MissionVisionSection } from "@/components/mission-vision-section"
import { SegmentsSection } from "@/components/segments-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export const metadata = {
  title: "A Empresa - Ventura Informática",
  description: "Conheça a história, missão e visão da Ventura Informática, especializada em soluções tecnológicas.",
}

export default function AboutPage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <AboutHeroSection />
        <HistorySection />
        <MissionVisionSection />
        <SegmentsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

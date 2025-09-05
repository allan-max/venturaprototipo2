import { Header } from "@/components/header"
import { HeroSection } from "@/components/hero-section"
import { ServicesSection } from "@/components/services-section"
import { ClientsSection } from "@/components/clients-section"
import { NewsPartnersSection } from "@/components/news-partners-section"
import { ProductsSection } from "@/components/products-section"
import { ContactSection } from "@/components/contact-section"
import { Footer } from "@/components/footer"

export default function HomePage() {
  return (
    <div className="min-h-screen">
      <Header />
      <main>
        <HeroSection />
        <ServicesSection />
        <ClientsSection />
        <NewsPartnersSection />
        <ProductsSection />
        <ContactSection />
      </main>
      <Footer />
    </div>
  )
}

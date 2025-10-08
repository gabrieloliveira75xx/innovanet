import Header from "@/components/header"
import Hero from "@/components/hero"
import ServiceLinks from "@/components/service-links"
import Plans from "@/components/plans"
import Coverage from "@/components/coverage"
import Profiles from "@/components/profiles"
import AppDownload from "@/components/app-download"
import Footer from "@/components/footer"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <ServiceLinks />
      <Plans />
      <Coverage />
      <Profiles />
      <AppDownload />
      <Footer />
    </main>
  )
}

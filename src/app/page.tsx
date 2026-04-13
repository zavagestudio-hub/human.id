import { Navbar } from '@/components/home/Navbar'
import { HeroSection } from '@/components/home/HeroSection'
import { AudienceSection } from '@/components/home/AudienceSection'
import { HowItWorks } from '@/components/home/HowItWorks'
import { ProfileSection } from '@/components/home/ProfileSection'
import { PricingSection } from '@/components/home/PricingSection'
import { CtaSection } from '@/components/home/CtaSection'
import { Footer } from '@/components/home/Footer'

export default function Home() {
  return (
    <>
      <Navbar />
      <main style={{ paddingTop: '64px' }}>
        <HeroSection />
        <AudienceSection />
        <HowItWorks />
        <ProfileSection />
        <PricingSection />
        <CtaSection />
      </main>
      <Footer />
    </>
  )
}

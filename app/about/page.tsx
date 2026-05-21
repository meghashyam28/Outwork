import Navbar from '@/components/Navbar'
import WhyOutwork from '@/components/WhyOutwork'
import HowItWorks from '@/components/HowItWorks'
import FinalCTA from '@/components/FinalCTA'

export default function AboutPage() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <WhyOutwork />
      <HowItWorks />
      <FinalCTA />
    </main>
  )
}

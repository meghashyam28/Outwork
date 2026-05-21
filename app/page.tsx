import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import BentoServices from '@/components/BentoServices'
import SocialProof from '@/components/SocialProof'
import FinalCTA from '@/components/FinalCTA'

export default function Home() {
  return (
    <main className="relative overflow-x-hidden">
      <Navbar />
      <Hero />
      <SocialProof />
      <BentoServices />
      <FinalCTA />
    </main>
  )
}


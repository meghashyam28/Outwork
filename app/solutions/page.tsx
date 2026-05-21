import Navbar from '@/components/Navbar'
import BentoServices from '@/components/BentoServices'
import FinalCTA from '@/components/FinalCTA'

export default function SolutionsPage() {
  return (
    <main className="relative overflow-x-hidden pt-20">
      <Navbar />
      
      {/* Core Bento Capabilities Showcase with clickable modal catalogs */}
      <BentoServices />

      <FinalCTA />
    </main>
  )
}

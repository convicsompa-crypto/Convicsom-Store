import { Header } from '../components/layout/Header'
import { Footer } from '../components/layout/Footer'
import { HeroBanner } from '../components/home/HeroBanner'
import { FeaturedProducts } from '../components/home/FeaturedProducts'
import { CategoryBannerGrid } from '../components/home/CategoryBannerGrid'
import { CampaignBanner } from '../components/home/CampaignBanner'
import { InstitutionalSection } from '../components/home/InstitutionalSection'

export function HomePage() {
  return (
    <div className="min-h-screen bg-neutral-50">
      <Header />
      <main>
        <HeroBanner />
        <FeaturedProducts />
        <CategoryBannerGrid />
        <CampaignBanner />
        <InstitutionalSection />
      </main>
      <Footer />
    </div>
  )
}

import Hero from '@/components/Hero';
import CompanyLogos from '@/components/CompanyLogos';
import CategorySection from '@/components/CategorySection';
import CTASection from '@/components/CTASection';
import FeaturedJobs from '@/components/FeaturedJobs';
import LatestJobs from '@/components/LatestJobs';

export default function Home() {
  return (
    <div className="min-h-screen bg-white">
      <Hero />
      <CompanyLogos />
      <CategorySection />
      <CTASection />
      <FeaturedJobs />
      <LatestJobs />
    </div>
  );
}


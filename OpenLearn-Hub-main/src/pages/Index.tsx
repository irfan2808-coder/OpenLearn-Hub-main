import { Layout } from '@/components/layout/Layout';
import { HeroSection } from '@/components/home/HeroSection';
import { CategorySection } from '@/components/home/CategorySection';
import { FeaturedResources } from '@/components/home/FeaturedResources';
import { MissionSection } from '@/components/home/MissionSection';
import { CTASection } from '@/components/home/CTASection';

const Index = () => {
  return (
    <Layout>
      <HeroSection />
      <CategorySection />
      <FeaturedResources />
      <MissionSection />
      <CTASection />
    </Layout>
  );
};

export default Index;

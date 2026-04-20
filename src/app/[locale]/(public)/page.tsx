import { setRequestLocale } from 'next-intl/server';
import { generateMeta } from '@/lib/utils/seo';
import { Hero } from '@/components/sections/hero';
import { ServicesPreview } from '@/components/sections/services-preview';
import { PortfolioShowcase } from '@/components/sections/portfolio-showcase';
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel';
import { CTASection } from '@/components/sections/cta-section';
import { portfolioRepo, testimonialsRepo } from '@/lib/repositories';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateMeta({ locale });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch featured portfolio projects
  let projects: any[] = [];
  try {
    const result = await portfolioRepo.listPortfolioProjects({
      featured: true,
      limit: 8,
      page: 1,
    });
    projects = result.data || [];
  } catch {
    projects = [];
  }

  // Fetch featured testimonials
  let testimonials: any[] = [];
  try {
    const result = await testimonialsRepo.listTestimonials({
      featured: true,
      limit: 6,
      page: 1,
    });
    testimonials = (result.data || []).map((t: any) => ({
      id: t.id,
      clientName: t.clientName,
      clientTitle: t.clientTitle,
      content: t.content,
      rating: t.rating,
    }));
  } catch {
    testimonials = [];
  }

  return (
    <>
      <Hero />
      <ServicesPreview />
      {projects.length > 0 && <PortfolioShowcase projects={projects} />}
      {testimonials.length > 0 && <TestimonialsCarousel testimonials={testimonials} />}
      <CTASection />
    </>
  );
}

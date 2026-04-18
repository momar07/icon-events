import { setRequestLocale } from 'next-intl/server';
import { generateMeta } from '@/lib/utils/seo';
import { listPortfolioProjects, getPortfolioCategories } from '@/lib/repositories/portfolio.repo';
import { PortfolioGrid } from '@/components/sections/portfolio-grid';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMeta({
    title: 'Our Portfolio',
    description: 'Explore our collection of award-winning exhibitions and events.',
    path: '/portfolio',
    locale,
  });
}

export default async function PortfolioPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const [{ data: projects, total }, categories] = await Promise.all([
    listPortfolioProjects({ page: 1, limit: 12 }),
    getPortfolioCategories(),
  ]);

  return (
    <div className="pt-20">
      <PortfolioGrid
        initialProjects={projects}
        initialTotal={total}
        categories={categories}
      />
    </div>
  );
}

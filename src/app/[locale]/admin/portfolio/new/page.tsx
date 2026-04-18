import { PortfolioForm } from '@/components/admin/portfolio-form';

interface NewPortfolioPageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewPortfolioPage({ params }: NewPortfolioPageProps) {
  const { locale } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        {locale === 'ar' ? 'إضافة مشروع جديد' : 'New Project'}
      </h1>
      <PortfolioForm locale={locale} />
    </div>
  );
}

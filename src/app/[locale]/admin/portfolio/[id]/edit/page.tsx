import { notFound } from 'next/navigation';
import { portfolioRepo } from '@/lib/repositories';
import { PortfolioForm } from '@/components/admin/portfolio-form';
import { parseImages } from '@/lib/utils/parse-images';

interface EditPortfolioPageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function EditPortfolioPage({ params }: EditPortfolioPageProps) {
  const { locale, id } = await params;
  const project = await portfolioRepo.getPortfolioProjectById(Number(id));

  if (!project) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        {locale === 'ar' ? 'تعديل المشروع' : 'Edit Project'}
      </h1>
      <PortfolioForm
        locale={locale}
        initialData={{
          id: project.id,
          title: project.title,
          description: project.description,
          category: project.category,
          clientName: project.clientName,
          clientLogo: project.clientLogo,
          images: parseImages(project.images),
          year: project.year,
          budgetMin: project.budgetMin,
          budgetMax: project.budgetMax,
          budgetDisplay: project.budgetDisplay,
          teamSize: project.teamSize,
          featured: project.featured,
          displayOrder: project.displayOrder,
        }}
      />
    </div>
  );
}

import { notFound } from 'next/navigation';
import { servicesRepo } from '@/lib/repositories';
import { ServiceForm } from '@/components/admin/service-form';

interface EditServicePageProps {
  params: Promise<{ locale: string; id: string }>;
}

export default async function EditServicePage({ params }: EditServicePageProps) {
  const { locale, id } = await params;
  const service = await servicesRepo.findById(Number(id));

  if (!service) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        {locale === 'ar' ? 'تعديل الخدمة' : 'Edit Service'}
      </h1>
      <ServiceForm
        locale={locale}
        initialData={{
          id: service.id,
          title: service.title,
          description: service.description,
          icon: service.icon,
          displayOrder: service.displayOrder,
        }}
      />
    </div>
  );
}

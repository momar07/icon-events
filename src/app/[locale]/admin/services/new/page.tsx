import { ServiceForm } from '@/components/admin/service-form';

interface NewServicePageProps {
  params: Promise<{ locale: string }>;
}

export default async function NewServicePage({ params }: NewServicePageProps) {
  const { locale } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        {locale === 'ar' ? 'إضافة خدمة جديدة' : 'New Service'}
      </h1>
      <ServiceForm locale={locale} />
    </div>
  );
}

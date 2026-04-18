import { notFound } from 'next/navigation';
import { testimonialsRepo } from '@/lib/repositories';
import { TestimonialForm } from '@/components/admin/testimonial-form';

interface Props { params: Promise<{ locale: string; id: string }>; }

export default async function EditTestimonialPage({ params }: Props) {
  const { locale, id } = await params;
  const item = await testimonialsRepo.getTestimonialById(Number(id));
  if (!item) notFound();

  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        {locale === 'ar' ? 'تعديل الشهادة' : 'Edit Testimonial'}
      </h1>
      <TestimonialForm
        locale={locale}
        initialData={{
          id: item.id,
          clientName: item.clientName,
          clientTitle: item.clientTitle,
          clientLogo: item.clientLogo,
          content: item.content,
          rating: item.rating,
          featured: item.featured,
          displayOrder: item.displayOrder,
        }}
      />
    </div>
  );
}

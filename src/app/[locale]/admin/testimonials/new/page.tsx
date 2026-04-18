import { TestimonialForm } from '@/components/admin/testimonial-form';

interface Props { params: Promise<{ locale: string }>; }

export default async function NewTestimonialPage({ params }: Props) {
  const { locale } = await params;
  return (
    <div>
      <h1 className="text-2xl font-bold text-white mb-6">
        {locale === 'ar' ? 'إضافة شهادة جديدة' : 'New Testimonial'}
      </h1>
      <TestimonialForm locale={locale} />
    </div>
  );
}

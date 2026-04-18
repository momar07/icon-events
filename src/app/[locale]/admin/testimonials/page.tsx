import Link from 'next/link';
import { Plus, Pencil, Star } from 'lucide-react';
import { testimonialsRepo } from '@/lib/repositories';
import { TestimonialDeleteBtn } from '@/components/admin/testimonial-delete-btn';
import { cn } from '@/lib/utils/cn';

interface TestimonialsPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ deleted?: string }>;
}

export default async function AdminTestimonialsPage({ params, searchParams }: TestimonialsPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const showDeleted = sp.deleted === 'true';

  const data = showDeleted
    ? await testimonialsRepo.listAllTestimonials(true)
    : await testimonialsRepo.listAllTestimonials(false);

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {locale === 'ar' ? 'آراء العملاء' : 'Testimonials'}
          </h1>
          <p className="text-steel-gray text-sm mt-1">
            {locale === 'ar' ? 'إدارة آراء وشهادات العملاء' : 'Manage client testimonials'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/admin/testimonials?deleted=${!showDeleted}`}
            className="px-3 py-2 rounded-lg text-sm border border-electric-cyan/20 text-steel-gray hover:text-white hover:bg-white/5 transition-all"
          >
            {showDeleted ? 'Hide Deleted' : 'Show Deleted'}
          </Link>
          <Link
            href={`/${locale}/admin/testimonials/new`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-pink to-electric-cyan text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            {locale === 'ar' ? 'إضافة شهادة' : 'Add Testimonial'}
          </Link>
        </div>
      </div>

      {data.length === 0 ? (
        <div className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] p-12 text-center">
          <p className="text-steel-gray">No testimonials yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {data.map((item: any) => (
            <div
              key={item.id}
              className={cn(
                'rounded-xl border bg-[#0d1230] p-5',
                item.deletedAt ? 'border-neon-pink/20 opacity-60' : 'border-electric-cyan/10'
              )}
            >
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="text-white font-semibold text-sm">{item.clientName}</h3>
                  {item.clientTitle && <p className="text-steel-gray text-xs">{item.clientTitle}</p>}
                </div>
                <div className="flex items-center gap-1">
                  {item.deletedAt ? (
                    <TestimonialDeleteBtn id={item.id} action="restore" locale={locale} />
                  ) : (
                    <>
                      <Link
                        href={`/${locale}/admin/testimonials/${item.id}/edit`}
                        className="p-1.5 rounded-lg text-steel-gray hover:text-electric-cyan hover:bg-electric-cyan/10 transition-all"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </Link>
                      <TestimonialDeleteBtn id={item.id} action="delete" locale={locale} />
                    </>
                  )}
                </div>
              </div>

              {/* Stars */}
              <div className="flex gap-0.5 mb-2">
                {[1, 2, 3, 4, 5].map((s) => (
                  <Star
                    key={s}
                    className={cn(
                      'w-3.5 h-3.5',
                      s <= item.rating ? 'text-amber-400 fill-amber-400' : 'text-steel-gray/20'
                    )}
                  />
                ))}
              </div>

              <p className="text-steel-gray text-sm line-clamp-3">{item.content}</p>

              <div className="mt-3 flex items-center gap-2">
                {item.featured && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] border bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30">
                    Featured
                  </span>
                )}
                {item.deletedAt && (
                  <span className="px-2 py-0.5 rounded-full text-[10px] border bg-neon-pink/10 text-neon-pink border-neon-pink/30">
                    Deleted
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

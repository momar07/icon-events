import Link from 'next/link';
import { Plus, Pencil, Trash2, RotateCcw } from 'lucide-react';
import { servicesRepo } from '@/lib/repositories';
import { ServiceDeleteBtn } from '@/components/admin/service-delete-btn';

interface ServicesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; deleted?: string }>;
}

export default async function AdminServicesPage({ params, searchParams }: ServicesPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const showDeleted = sp.deleted === 'true';
  const page = Number(sp.page) || 1;

  const result = showDeleted
    ? await servicesRepo.findAllWithDeleted({ page, limit: 50 })
    : await servicesRepo.findAll({ page, limit: 50 });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {locale === 'ar' ? 'الخدمات' : 'Services'}
          </h1>
          <p className="text-steel-gray text-sm mt-1">
            {locale === 'ar' ? 'إدارة خدمات الشركة' : 'Manage company services'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/admin/services?deleted=${!showDeleted}`}
            className="px-3 py-2 rounded-lg text-sm border border-electric-cyan/20 text-steel-gray hover:text-white hover:bg-white/5 transition-all"
          >
            {showDeleted
              ? (locale === 'ar' ? 'إخفاء المحذوفة' : 'Hide Deleted')
              : (locale === 'ar' ? 'عرض المحذوفة' : 'Show Deleted')}
          </Link>
          <Link
            href={`/${locale}/admin/services/new`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-pink to-electric-cyan text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            {locale === 'ar' ? 'إضافة خدمة' : 'Add Service'}
          </Link>
        </div>
      </div>

      {/* Table */}
      {result.data.length === 0 ? (
        <div className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] p-12 text-center">
          <p className="text-steel-gray">
            {locale === 'ar' ? 'لا توجد خدمات بعد' : 'No services yet'}
          </p>
        </div>
      ) : (
        <div className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-electric-cyan/10">
                  <th className="text-left px-5 py-3 text-steel-gray font-medium">
                    {locale === 'ar' ? 'العنوان' : 'Title'}
                  </th>
                  <th className="text-left px-5 py-3 text-steel-gray font-medium hidden md:table-cell">
                    {locale === 'ar' ? 'الأيقونة' : 'Icon'}
                  </th>
                  <th className="text-left px-5 py-3 text-steel-gray font-medium hidden sm:table-cell">
                    {locale === 'ar' ? 'الترتيب' : 'Order'}
                  </th>
                  <th className="text-left px-5 py-3 text-steel-gray font-medium">
                    {locale === 'ar' ? 'الحالة' : 'Status'}
                  </th>
                  <th className="text-right px-5 py-3 text-steel-gray font-medium">
                    {locale === 'ar' ? 'إجراءات' : 'Actions'}
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric-cyan/5">
                {result.data.map((service: any) => (
                  <tr key={service.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5 text-white font-medium">{service.title}</td>
                    <td className="px-5 py-3.5 text-steel-gray hidden md:table-cell">{service.icon || '—'}</td>
                    <td className="px-5 py-3.5 text-steel-gray hidden sm:table-cell">{service.displayOrder}</td>
                    <td className="px-5 py-3.5">
                      {service.deletedAt ? (
                        <span className="px-2 py-0.5 rounded-full text-xs border bg-neon-pink/10 text-neon-pink border-neon-pink/30">
                          Deleted
                        </span>
                      ) : (
                        <span className="px-2 py-0.5 rounded-full text-xs border bg-emerald-500/10 text-emerald-400 border-emerald-500/30">
                          Active
                        </span>
                      )}
                    </td>
                    <td className="px-5 py-3.5">
                      <div className="flex items-center justify-end gap-2">
                        {service.deletedAt ? (
                          <ServiceDeleteBtn
                            id={service.id}
                            action="restore"
                            locale={locale}
                          />
                        ) : (
                          <>
                            <Link
                              href={`/${locale}/admin/services/${service.id}/edit`}
                              className="p-2 rounded-lg text-steel-gray hover:text-electric-cyan hover:bg-electric-cyan/10 transition-all"
                              title="Edit"
                            >
                              <Pencil className="w-4 h-4" />
                            </Link>
                            <ServiceDeleteBtn
                              id={service.id}
                              action="delete"
                              locale={locale}
                            />
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

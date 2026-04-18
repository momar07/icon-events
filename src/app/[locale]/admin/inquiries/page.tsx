import Link from 'next/link';
import { Mail } from 'lucide-react';
import { inquiriesRepo } from '@/lib/repositories';
import { cn } from '@/lib/utils/cn';

interface InquiriesPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; status?: string }>;
}

const statusStyles: Record<string, string> = {
  new: 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30',
  reviewed: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  contacted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
};

export default async function AdminInquiriesPage({ params, searchParams }: InquiriesPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const page = Number(sp.page) || 1;
  const statusFilter = sp.status as 'new' | 'reviewed' | 'contacted' | undefined;

  const result = await inquiriesRepo.listInquiries({
    page,
    limit: 20,
    status: statusFilter,
  });

  const statuses = ['all', 'new', 'reviewed', 'contacted'];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">
          {locale === 'ar' ? 'الاستفسارات' : 'Inquiries'}
        </h1>
        <p className="text-steel-gray text-sm mt-1">
          {locale === 'ar' ? 'إدارة استفسارات العملاء' : 'Manage client inquiries'}
        </p>
      </div>

      {/* Status filter tabs */}
      <div className="flex gap-2">
        {statuses.map((s) => (
          <Link
            key={s}
            href={`/${locale}/admin/inquiries${s === 'all' ? '' : `?status=${s}`}`}
            className={cn(
              'px-3 py-1.5 rounded-lg text-sm font-medium border transition-all',
              (s === 'all' && !statusFilter) || s === statusFilter
                ? 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30'
                : 'border-electric-cyan/10 text-steel-gray hover:text-white hover:bg-white/5'
            )}
          >
            {s.charAt(0).toUpperCase() + s.slice(1)}
          </Link>
        ))}
      </div>

      {result.data.length === 0 ? (
        <div className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] p-12 text-center">
          <Mail className="w-10 h-10 text-steel-gray/30 mx-auto mb-3" />
          <p className="text-steel-gray">No inquiries found</p>
        </div>
      ) : (
        <div className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-electric-cyan/10">
                  <th className="text-left px-5 py-3 text-steel-gray font-medium">Name</th>
                  <th className="text-left px-5 py-3 text-steel-gray font-medium hidden md:table-cell">Email</th>
                  <th className="text-left px-5 py-3 text-steel-gray font-medium hidden lg:table-cell">Event Type</th>
                  <th className="text-left px-5 py-3 text-steel-gray font-medium">Status</th>
                  <th className="text-left px-5 py-3 text-steel-gray font-medium hidden sm:table-cell">Date</th>
                  <th className="text-right px-5 py-3 text-steel-gray font-medium">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-electric-cyan/5">
                {result.data.map((inq: any) => (
                  <tr key={inq.id} className="hover:bg-white/[0.02] transition-colors">
                    <td className="px-5 py-3.5">
                      <Link href={`/${locale}/admin/inquiries/${inq.id}`} className="text-white font-medium hover:text-electric-cyan transition-colors">
                        {inq.name}
                      </Link>
                    </td>
                    <td className="px-5 py-3.5 text-steel-gray hidden md:table-cell">{inq.email}</td>
                    <td className="px-5 py-3.5 text-steel-gray hidden lg:table-cell">{inq.eventType || '—'}</td>
                    <td className="px-5 py-3.5">
                      <span className={cn('px-2 py-0.5 rounded-full text-xs border', statusStyles[inq.status])}>
                        {inq.status}
                      </span>
                    </td>
                    <td className="px-5 py-3.5 text-steel-gray text-xs hidden sm:table-cell">
                      {new Date(inq.createdAt).toLocaleDateString()}
                    </td>
                    <td className="px-5 py-3.5 text-right">
                      <Link
                        href={`/${locale}/admin/inquiries/${inq.id}`}
                        className="text-sm text-electric-cyan hover:text-white transition-colors"
                      >
                        View
                      </Link>
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

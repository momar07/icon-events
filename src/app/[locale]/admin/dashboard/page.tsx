import { Wrench, FolderOpen, MessageSquareQuote, Mail } from 'lucide-react';
import { StatCard } from '@/components/admin/stat-card';
import { RecentInquiries } from '@/components/admin/recent-inquiries';
import {
  servicesRepo,
  portfolioRepo,
  testimonialsRepo,
  inquiriesRepo,
} from '@/lib/repositories';

interface DashboardPageProps {
  params: Promise<{ locale: string }>;
}

export default async function AdminDashboardPage({ params }: DashboardPageProps) {
  const { locale } = await params;

  const [servicesCount, portfolioCount, testimonialsCount, inquiriesCount, recentInquiries] =
    await Promise.all([
      servicesRepo.countServices(),
      portfolioRepo.countPortfolioProjects(),
      testimonialsRepo.countTestimonials(),
      inquiriesRepo.countInquiriesByStatus(),
      inquiriesRepo.listInquiries({ page: 1, limit: 5 }),
    ]);

  const stats = [
    { title: 'Services', value: servicesCount, icon: Wrench, color: 'cyan' as const },
    { title: 'Projects', value: portfolioCount, icon: FolderOpen, color: 'pink' as const },
    { title: 'Testimonials', value: testimonialsCount, icon: MessageSquareQuote, color: 'green' as const },
    { title: 'Inquiries', value: inquiriesCount, icon: Mail, color: 'amber' as const },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className="text-2xl md:text-3xl font-bold text-white">
          {locale === 'ar' ? 'لوحة التحكم' : 'Dashboard'}
        </h1>
        <p className="text-steel-gray mt-1">
          {locale === 'ar' ? 'نظرة عامة على بيانات الموقع' : 'Overview of your site data'}
        </p>
      </div>

      {/* Stats grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>

      {/* Recent inquiries */}
      <RecentInquiries
        inquiries={recentInquiries.data.map((inq) => ({
          id: inq.id,
          name: inq.name,
          email: inq.email,
          eventType: inq.eventType,
          status: inq.status as 'new' | 'reviewed' | 'contacted',
          createdAt: inq.createdAt,
        }))}
        locale={locale}
      />
    </div>
  );
}

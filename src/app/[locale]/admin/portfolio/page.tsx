import Link from 'next/link';
import { Plus, Pencil, Star } from 'lucide-react';
import { portfolioRepo } from '@/lib/repositories';
import { PortfolioDeleteBtn } from '@/components/admin/portfolio-delete-btn';
import { parseImages } from '@/lib/utils/parse-images';

interface PortfolioPageProps {
  params: Promise<{ locale: string }>;
  searchParams: Promise<{ page?: string; category?: string; deleted?: string }>;
}

export default async function AdminPortfolioPage({ params, searchParams }: PortfolioPageProps) {
  const { locale } = await params;
  const sp = await searchParams;
  const showDeleted = sp.deleted === 'true';
  const page = Number(sp.page) || 1;

  const result = await portfolioRepo.listPortfolioProjects({
    page,
    limit: 50,
    category: sp.category || undefined,
    includeDeleted: showDeleted,
  });

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white">
            {locale === 'ar' ? 'الأعمال' : 'Portfolio'}
          </h1>
          <p className="text-steel-gray text-sm mt-1">
            {locale === 'ar' ? 'إدارة المشاريع والأعمال' : 'Manage projects and works'}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <Link
            href={`/${locale}/admin/portfolio?deleted=${!showDeleted}`}
            className="px-3 py-2 rounded-lg text-sm border border-electric-cyan/20 text-steel-gray hover:text-white hover:bg-white/5 transition-all"
          >
            {showDeleted ? 'Hide Deleted' : 'Show Deleted'}
          </Link>
          <Link
            href={`/${locale}/admin/portfolio/new`}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-lg bg-gradient-to-r from-neon-pink to-electric-cyan text-white text-sm font-semibold hover:opacity-90 transition-all"
          >
            <Plus className="w-4 h-4" />
            {locale === 'ar' ? 'إضافة مشروع' : 'Add Project'}
          </Link>
        </div>
      </div>

      {/* Grid */}
      {result.data.length === 0 ? (
        <div className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] p-12 text-center">
          <p className="text-steel-gray">No projects yet</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4">
          {result.data.map((project: any) => {
            const imgList = parseImages(project.images);
            const cover = imgList.find((img) => img.isCover) || imgList[0];
            return (
              <div
                key={project.id}
                className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] overflow-hidden group"
              >
                {/* Image */}
                <div className="aspect-video bg-deep-black relative">
                  {cover ? (
                    <img src={cover.url} alt={cover.alt} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-steel-gray/30 text-sm">
                      No image
                    </div>
                  )}
                  {project.featured && (
                    <span className="absolute top-2 right-2 p-1 rounded bg-electric-cyan/90">
                      <Star className="w-3 h-3 text-white fill-white" />
                    </span>
                  )}
                  {project.deletedAt && (
                    <span className="absolute top-2 left-2 px-2 py-0.5 rounded text-xs bg-neon-pink/80 text-white">
                      Deleted
                    </span>
                  )}
                </div>

                {/* Info */}
                <div className="p-4">
                  <div className="flex items-start justify-between gap-2">
                    <div className="min-w-0">
                      <h3 className="text-white font-semibold text-sm truncate">{project.title}</h3>
                      <p className="text-steel-gray text-xs mt-0.5">{project.category} · {project.year}</p>
                    </div>
                    <div className="flex items-center gap-1 flex-shrink-0">
                      {project.deletedAt ? (
                        <PortfolioDeleteBtn id={project.id} action="restore" locale={locale} />
                      ) : (
                        <>
                          <Link
                            href={`/${locale}/admin/portfolio/${project.id}/edit`}
                            className="p-1.5 rounded-lg text-steel-gray hover:text-electric-cyan hover:bg-electric-cyan/10 transition-all"
                          >
                            <Pencil className="w-3.5 h-3.5" />
                          </Link>
                          <PortfolioDeleteBtn id={project.id} action="delete" locale={locale} />
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

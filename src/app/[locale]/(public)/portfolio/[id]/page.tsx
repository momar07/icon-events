import { notFound } from 'next/navigation';
import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generateMeta } from '@/lib/utils/seo';
import { getPortfolioProjectById } from '@/lib/repositories/portfolio.repo';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from '@/lib/i18n/navigation';
import { ArrowLeft, Calendar, Users, DollarSign, Building2 } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  const project = await getPortfolioProjectById(parseInt(id, 10));

  if (!project || project.deletedAt) {
    return generateMeta({ title: 'Project Not Found', locale, noIndex: true });
  }

  return generateMeta({
    title: project.title,
    description: project.description.substring(0, 160),
    path: `/portfolio/${id}`,
    locale,
  });
}

export default async function PortfolioDetailPage({
  params,
}: {
  params: Promise<{ locale: string; id: string }>;
}) {
  const { locale, id } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('portfolio');
  const tCommon = await getTranslations('common');

  const project = await getPortfolioProjectById(parseInt(id, 10));

  if (!project || project.deletedAt) {
    notFound();
  }

  const images = (typeof project.images === 'string'
    ? JSON.parse(project.images)
    : project.images) || [];

  return (
    <div className="pt-20">
      <article className="section-padding">
        <div className="container-custom">
          {/* Back button */}
          <Link
            href="/portfolio"
            className="mb-8 inline-flex items-center gap-2 text-sm text-[#A0AEC0] transition-colors hover:text-[#00D9FF]"
          >
            <ArrowLeft size={16} />
            {tCommon('goBack')}
          </Link>

          {/* Header */}
          <div className="mb-12">
            <div className="mb-4 flex flex-wrap items-center gap-3">
              <Badge variant="cyan">{project.category}</Badge>
              {project.featured && <Badge variant="pink">{t('featured')}</Badge>}
            </div>

            <h1 className="heading-1 mb-4 text-[#F5F7FA]">{project.title}</h1>

            {project.clientName && (
              <div className="mb-6 flex items-center gap-2 text-lg text-[#A0AEC0]">
                <Building2 size={20} className="text-[#FF006E]" />
                <span>{project.clientName}</span>
              </div>
            )}

            {/* Meta row */}
            <div className="flex flex-wrap gap-6 border-b border-[#252B4A] pb-6">
              {project.year && (
                <div className="flex items-center gap-2 text-[#A0AEC0]">
                  <Calendar size={18} className="text-[#00D9FF]" />
                  <span>{project.year}</span>
                </div>
              )}
              {project.teamSize && (
                <div className="flex items-center gap-2 text-[#A0AEC0]">
                  <Users size={18} className="text-[#00D9FF]" />
                  <span>{project.teamSize} team members</span>
                </div>
              )}
              {project.budgetDisplay && (
                <div className="flex items-center gap-2 text-[#A0AEC0]">
                  <DollarSign size={18} className="text-[#00D9FF]" />
                  <span>{project.budgetDisplay}</span>
                </div>
              )}
            </div>
          </div>

          {/* Description */}
          <div className="mb-16 max-w-3xl">
            <h2 className="heading-3 mb-4 neon-text-cyan">{t('details')}</h2>
            <p className="body-large whitespace-pre-line">{project.description}</p>
          </div>

          {/* Image Gallery */}
          {images.length > 0 && (
            <div className="mb-16">
              <h2 className="heading-3 mb-6 neon-text-cyan">{t('gallery')}</h2>
              <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
                {images.map((img: any, index: number) => (
                  <div
                    key={index}
                    className="group relative aspect-[16/10] overflow-hidden rounded-lg border border-[#252B4A]"
                  >
                    <img
                      src={img.url}
                      alt={img.alt || project.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                      loading="lazy"
                    />
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* CTA */}
          <div className="rounded-2xl border border-[#252B4A] bg-[#1A1F3A] p-8 text-center md:p-12">
            <h3 className="heading-3 mb-4 text-[#F5F7FA]">
              Interested in a similar project?
            </h3>
            <p className="mb-6 text-[#A0AEC0]">
              Let us help you create something extraordinary.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Get in Touch
              </Button>
            </Link>
          </div>
        </div>
      </article>
    </div>
  );
}

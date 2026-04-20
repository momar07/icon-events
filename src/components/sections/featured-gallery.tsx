'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Project {
  id: number;
  title: string;
  category: string;
  description: string | null;
  images: string | null;
}

function getCoverUrl(images: string | null): string {
  if (!images) return '';
  try {
    let parsed = typeof images === 'string' ? JSON.parse(images) : images;
    if (typeof parsed === 'string') parsed = JSON.parse(parsed);
    if (Array.isArray(parsed) && parsed.length > 0) {
      const cover = parsed.find((img: any) => img.isCover) || parsed[0];
      return cover?.url || '';
    }
  } catch {}
  return '';
}

export function FeaturedGallery({ projects }: { projects: Project[] }) {
  const locale = useLocale();
  const isAr = locale === 'ar';

  if (!projects || projects.length === 0) return null;

  // Take up to 6 projects for the grid
  const items = projects.slice(0, 6);

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#252B4A] to-transparent" />

      <div className="container-custom">
        {/* Header */}
        <AnimateOnScroll className="text-center mb-14">
          <span className="section-label mb-4 block">{isAr ? 'أعمالنا' : 'OUR WORK'}</span>
          <h2 className="heading-1 text-[#F5F7FA] mb-4">
            {isAr ? 'مشاريع' : 'Featured'}
            <span className="neon-text-pink"> {isAr ? 'مميزة' : 'Projects'}</span>
          </h2>
          <p className="body-large text-[#A0AEC0] max-w-2xl mx-auto text-balance">
            {isAr
              ? 'اكتشف مجموعة من أنجح المعارض والفعاليات والتفعيلات التي أبهرت الجماهير حول العالم'
              : 'Explore our portfolio of successful exhibitions, events, and brand activations that have captivated audiences worldwide.'}
          </p>
        </AnimateOnScroll>

        {/* Gallery Grid — 3 columns, 2 rows */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 lg:gap-5">
          {items.map((project, i) => {
            const coverUrl = getCoverUrl(project.images);
            return (
              <AnimateOnScroll key={project.id} delay={i * 80}>
                <Link href={`/portfolio/${project.id}`} className="block group">
                  <div className="relative aspect-[4/3] rounded-xl overflow-hidden border border-[#252B4A]/50 transition-all duration-500 hover:border-[#FF006E]/40 hover:shadow-[0_0_30px_rgba(255,0,110,0.12)]">
                    {/* Image */}
                    {coverUrl ? (
                      <img
                        src={coverUrl}
                        alt={project.title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                      />
                    ) : (
                      <div className="w-full h-full bg-gradient-to-br from-[#1A1F3A] to-[#252B4A] flex items-center justify-center">
                        <span className="text-[#6B7280] text-sm">{isAr ? 'بدون صورة' : 'No Image'}</span>
                      </div>
                    )}

                    {/* Dark overlay — stronger on hover */}
                    <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-70 transition-opacity duration-500 group-hover:opacity-90" />

                    {/* Category badge */}
                    <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#FF006E]/90 text-xs font-semibold text-white backdrop-blur-sm">
                      {project.category}
                    </div>

                    {/* Arrow icon top-right on hover */}
                    <div className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 backdrop-blur-sm flex items-center justify-center opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                      <ArrowUpRight size={16} className="text-white" />
                    </div>

                    {/* Bottom text */}
                    <div className="absolute bottom-0 left-0 right-0 p-5">
                      <h3 className="text-lg font-bold text-white mb-1 transition-colors group-hover:text-[#00D9FF]">
                        {project.title}
                      </h3>
                      {project.description && (
                        <p className="text-sm text-[#c0c8d8] line-clamp-1 opacity-0 translate-y-2 transition-all duration-300 group-hover:opacity-100 group-hover:translate-y-0">
                          {project.description}
                        </p>
                      )}
                    </div>
                  </div>
                </Link>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* View all link */}
        <AnimateOnScroll className="text-center mt-12">
          <Link href="/portfolio">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#FF006E]/40 text-[#FF006E] font-medium transition-all duration-300 hover:bg-[#FF006E]/10 hover:border-[#FF006E]/70 hover:shadow-[0_0_20px_rgba(255,0,110,0.15)]">
              {isAr ? 'جميع المشاريع' : 'View All Projects'}
              <ArrowRight size={16} />
            </button>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}

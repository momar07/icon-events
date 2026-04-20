'use client';

import { useRef, useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { ArrowRight, ChevronLeft, ChevronRight } from 'lucide-react';
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

export function PortfolioShowcase({ projects }: { projects: Project[] }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const checkScroll = () => {
    if (!scrollRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
    setCanScrollLeft(scrollLeft > 10);
    setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
  };

  useEffect(() => {
    checkScroll();
    const el = scrollRef.current;
    if (el) el.addEventListener('scroll', checkScroll, { passive: true });
    return () => el?.removeEventListener('scroll', checkScroll);
  }, []);

  const scroll = (dir: 'left' | 'right') => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.8;
    scrollRef.current.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  if (!projects || projects.length === 0) return null;

  return (
    <section className="section-padding relative overflow-hidden bg-[#0d1230]">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#252B4A] to-transparent" />

      <div className="container-custom mb-12">
        <AnimateOnScroll>
          <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-6">
            <div>
              <span className="section-label mb-4 block">{isAr ? 'أعمالنا' : 'OUR WORK'}</span>
              <h2 className="heading-1 text-[#F5F7FA]">
                {isAr ? 'مشاريع' : 'Featured'}
                <span className="neon-text-pink"> {isAr ? 'مميزة' : 'Projects'}</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <button
                onClick={() => scroll('left')}
                disabled={!canScrollLeft}
                className={cn(
                  'w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300',
                  canScrollLeft
                    ? 'border-[#252B4A] text-[#F5F7FA] hover:border-[#00D9FF] hover:text-[#00D9FF] hover:shadow-[0_0_15px_rgba(0,217,255,0.2)]'
                    : 'border-[#252B4A]/50 text-[#6B7280] cursor-not-allowed'
                )}
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => scroll('right')}
                disabled={!canScrollRight}
                className={cn(
                  'w-12 h-12 rounded-full border flex items-center justify-center transition-all duration-300',
                  canScrollRight
                    ? 'border-[#252B4A] text-[#F5F7FA] hover:border-[#00D9FF] hover:text-[#00D9FF] hover:shadow-[0_0_15px_rgba(0,217,255,0.2)]'
                    : 'border-[#252B4A]/50 text-[#6B7280] cursor-not-allowed'
                )}
              >
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </AnimateOnScroll>
      </div>

      {/* Horizontal scroll container */}
      <div ref={scrollRef} className="horizontal-scroll gap-6 px-[max(1.5rem,calc((100vw-1280px)/2+1.5rem))]">
        {projects.map((project, i) => {
          const coverUrl = getCoverUrl(project.images);
          return (
            <Link key={project.id} href={`/portfolio/${project.id}`} className="block">
              <div className="group relative w-[340px] sm:w-[420px] lg:w-[520px] rounded-2xl overflow-hidden border border-[#252B4A] bg-[#1A1F3A]/40 transition-all duration-500 hover:border-[#00D9FF]/30 hover:shadow-[0_0_40px_rgba(0,217,255,0.08)]">
                {/* Image */}
                <div className="relative aspect-[16/10] overflow-hidden">
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
                  {/* Overlay gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-transparent to-transparent opacity-60" />
                  {/* Category badge */}
                  <div className="absolute top-4 left-4 px-3 py-1 rounded-full bg-[#0A0E27]/70 backdrop-blur-sm text-xs font-medium text-[#00D9FF] border border-[#00D9FF]/20">
                    {project.category}
                  </div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-[#F5F7FA] mb-2 transition-colors group-hover:text-[#00D9FF]">
                    {project.title}
                  </h3>
                  {project.description && (
                    <p className="text-sm text-[#A0AEC0] line-clamp-2">{project.description}</p>
                  )}
                  <div className="mt-4 flex items-center gap-2 text-[#FF006E] text-sm font-medium">
                    {isAr ? 'عرض المشروع' : 'View Project'}
                    <ArrowRight size={14} className="transition-transform group-hover:translate-x-1" />
                  </div>
                </div>
              </div>
            </Link>
          );
        })}
      </div>

      {/* View all link */}
      <AnimateOnScroll className="text-center mt-12">
        <Link href="/portfolio">
          <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#00D9FF]/30 text-[#00D9FF] font-medium transition-all duration-300 hover:bg-[#00D9FF]/10 hover:border-[#00D9FF]/60 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]">
            {isAr ? 'جميع المشاريع' : 'View All Projects'}
            <ArrowRight size={16} />
          </button>
        </Link>
      </AnimateOnScroll>
    </section>
  );
}

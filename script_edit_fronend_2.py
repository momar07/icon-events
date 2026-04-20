#!/usr/bin/env python3
"""ICON EVENTS – Redesign Script 2/3: Home Sections"""

import os
from pathlib import Path

ROOT = Path.home() / "Desktop" / "websites" / "icon-events"
os.chdir(ROOT)

def write(path, content):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content.strip() + "\n", encoding="utf-8")
    print(f"  ✅ {path} ({p.stat().st_size:,} bytes)")

# ─── 1. Services Preview Section ───
write("src/components/sections/services-preview.tsx", r"""
'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { ArrowRight, Palette, Users, Mic2, Building2, PartyPopper, Sparkles } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const services = [
  {
    icon: Building2,
    titleEn: 'Exhibitions & Trade Shows',
    titleAr: 'المعارض والمؤتمرات التجارية',
    descEn: 'Immersive exhibition experiences that captivate audiences and drive engagement.',
    descAr: 'تجارب معارض غامرة تجذب الجمهور وتعزز التفاعل.',
  },
  {
    icon: PartyPopper,
    titleEn: 'Corporate Events',
    titleAr: 'فعاليات الشركات',
    descEn: 'Premium corporate gatherings, galas, and conferences with flawless execution.',
    descAr: 'تجمعات مؤسسية فاخرة وحفلات ومؤتمرات بتنفيذ متقن.',
  },
  {
    icon: Mic2,
    titleEn: 'Product Launches',
    titleAr: 'إطلاق المنتجات',
    descEn: 'High-impact launch events that create buzz and leave lasting impressions.',
    descAr: 'فعاليات إطلاق مؤثرة تصنع الحدث وتترك انطباعاً دائماً.',
  },
  {
    icon: Palette,
    titleEn: 'Brand Activations',
    titleAr: 'تفعيل العلامات التجارية',
    descEn: 'Creative brand experiences that forge emotional connections with your audience.',
    descAr: 'تجارب إبداعية للعلامة التجارية تبني روابط عاطفية مع جمهورك.',
  },
  {
    icon: Users,
    titleEn: 'Conferences & Summits',
    titleAr: 'المؤتمرات والقمم',
    descEn: 'World-class conferences with seamless logistics and cutting-edge production.',
    descAr: 'مؤتمرات عالمية المستوى بلوجستيات سلسة وإنتاج متطور.',
  },
  {
    icon: Sparkles,
    titleEn: 'Weddings & Celebrations',
    titleAr: 'الأعراس والاحتفالات',
    descEn: 'Bespoke celebrations that transform your most precious moments into magic.',
    descAr: 'احتفالات مخصصة تحوّل أغلى لحظاتك إلى سحر.',
  },
];

export function ServicesPreview() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="section-padding relative overflow-hidden">
      {/* Background accent */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#252B4A] to-transparent" />

      <div className="container-custom">
        {/* Header */}
        <AnimateOnScroll className="text-center mb-16">
          <span className="section-label mb-4 block">{isAr ? 'ما نقدمه' : 'WHAT WE DO'}</span>
          <h2 className="heading-1 text-[#F5F7FA] mb-4">
            {isAr ? 'خدمات تصنع' : 'Services That Create'}
            <span className="neon-text-pink"> {isAr ? 'الفارق' : 'Impact'}</span>
          </h2>
          <p className="body-large text-[#A0AEC0] max-w-2xl mx-auto text-balance">
            {isAr
              ? 'من المفهوم إلى التنفيذ، نقدم حلول فعاليات شاملة مصممة لتجاوز التوقعات'
              : 'From concept to execution, we deliver comprehensive event solutions designed to exceed expectations'}
          </p>
        </AnimateOnScroll>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <AnimateOnScroll key={i} delay={i * 100}>
                <div className="group relative p-8 rounded-2xl border border-[#252B4A] bg-[#1A1F3A]/40 transition-all duration-500 hover:border-[#FF006E]/30 hover:bg-[#1A1F3A]/80 hover:shadow-[0_0_40px_rgba(255,0,110,0.08)]">
                  {/* Icon */}
                  <div className="w-14 h-14 rounded-xl bg-[#FF006E]/10 flex items-center justify-center mb-6 transition-all duration-500 group-hover:bg-[#FF006E]/20 group-hover:shadow-[0_0_20px_rgba(255,0,110,0.2)]">
                    <Icon size={26} className="text-[#FF006E]" />
                  </div>

                  {/* Content */}
                  <h3 className="text-xl font-semibold text-[#F5F7FA] mb-3 transition-colors group-hover:text-[#FF006E]">
                    {isAr ? service.titleAr : service.titleEn}
                  </h3>
                  <p className="text-[#A0AEC0] text-sm leading-relaxed mb-6">
                    {isAr ? service.descAr : service.descEn}
                  </p>

                  {/* Arrow */}
                  <div className="flex items-center gap-2 text-[#00D9FF] text-sm font-medium opacity-0 translate-x-[-8px] transition-all duration-300 group-hover:opacity-100 group-hover:translate-x-0">
                    {isAr ? 'اعرف المزيد' : 'Learn more'}
                    <ArrowRight size={14} />
                  </div>
                </div>
              </AnimateOnScroll>
            );
          })}
        </div>

        {/* CTA */}
        <AnimateOnScroll className="text-center mt-12">
          <Link href="/services">
            <button className="inline-flex items-center gap-2 px-8 py-3 rounded-full border border-[#00D9FF]/30 text-[#00D9FF] font-medium transition-all duration-300 hover:bg-[#00D9FF]/10 hover:border-[#00D9FF]/60 hover:shadow-[0_0_20px_rgba(0,217,255,0.15)]">
              {isAr ? 'جميع الخدمات' : 'View All Services'}
              <ArrowRight size={16} />
            </button>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
""")

# ─── 2. Portfolio Showcase (Horizontal scroll like sela achievements) ───
write("src/components/sections/portfolio-showcase.tsx", r"""
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
""")

# ─── 3. Testimonials Carousel (like sela network) ───
write("src/components/sections/testimonials-carousel.tsx", r"""
'use client';

import { useState, useEffect } from 'react';
import { useLocale } from 'next-intl';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { ChevronLeft, ChevronRight, Quote, Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Testimonial {
  id: number;
  clientName: string;
  clientTitle: string | null;
  content: string;
  rating: number;
}

export function TestimonialsCarousel({ testimonials }: { testimonials: Testimonial[] }) {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [active, setActive] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    if (testimonials.length <= 1) return;
    const timer = setInterval(() => {
      goTo((active + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [active, testimonials.length]);

  const goTo = (index: number) => {
    if (isAnimating) return;
    setIsAnimating(true);
    setActive(index);
    setTimeout(() => setIsAnimating(false), 600);
  };

  if (!testimonials || testimonials.length === 0) return null;
  const item = testimonials[active];

  return (
    <section className="section-padding relative overflow-hidden">
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#252B4A] to-transparent" />
      {/* Background glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] bg-[#FF006E]/3 blur-[150px] rounded-full" />

      <div className="container-custom relative">
        <AnimateOnScroll className="text-center mb-16">
          <span className="section-label mb-4 block">{isAr ? 'شبكتنا' : 'OUR NETWORK'}</span>
          <h2 className="heading-1 text-[#F5F7FA]">
            {isAr ? 'ماذا يقول' : 'What Our'}
            <span className="neon-text-pink"> {isAr ? 'عملاؤنا' : 'Clients Say'}</span>
          </h2>
        </AnimateOnScroll>

        {/* Testimonial card */}
        <div className="max-w-3xl mx-auto">
          <div className="relative glass-card rounded-2xl p-10 md:p-14 text-center">
            <Quote size={48} className="mx-auto mb-6 text-[#FF006E]/30" />

            {/* Stars */}
            <div className="flex justify-center gap-1 mb-6">
              {Array.from({ length: 5 }).map((_, i) => (
                <Star
                  key={i}
                  size={18}
                  className={i < item.rating ? 'text-[#FFD600] fill-[#FFD600]' : 'text-[#252B4A]'}
                />
              ))}
            </div>

            {/* Content */}
            <p key={active} className="text-lg md:text-xl text-[#F5F7FA] leading-relaxed mb-8 animate-fade-in font-light italic">
              &ldquo;{item.content}&rdquo;
            </p>

            {/* Author */}
            <div className="animate-fade-in">
              <h4 className="text-lg font-semibold text-[#F5F7FA]">{item.clientName}</h4>
              {item.clientTitle && (
                <p className="text-sm text-[#00D9FF] mt-1">{item.clientTitle}</p>
              )}
            </div>

            {/* Dots */}
            {testimonials.length > 1 && (
              <div className="flex justify-center gap-2 mt-8">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => goTo(i)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-500',
                      i === active ? 'w-8 bg-gradient-to-r from-[#FF006E] to-[#00D9FF]' : 'w-2 bg-[#252B4A] hover:bg-[#A0AEC0]'
                    )}
                  />
                ))}
              </div>
            )}
          </div>

          {/* Navigation arrows */}
          {testimonials.length > 1 && (
            <div className="flex justify-center gap-4 mt-8">
              <button
                onClick={() => goTo(active === 0 ? testimonials.length - 1 : active - 1)}
                className="w-12 h-12 rounded-full border border-[#252B4A] flex items-center justify-center text-[#A0AEC0] transition-all duration-300 hover:border-[#00D9FF] hover:text-[#00D9FF]"
              >
                <ChevronLeft size={20} />
              </button>
              <button
                onClick={() => goTo((active + 1) % testimonials.length)}
                className="w-12 h-12 rounded-full border border-[#252B4A] flex items-center justify-center text-[#A0AEC0] transition-all duration-300 hover:border-[#00D9FF] hover:text-[#00D9FF]"
              >
                <ChevronRight size={20} />
              </button>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
""")

# ─── 4. CTA Section ───
write("src/components/sections/cta-section.tsx", r"""
'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { ArrowRight } from 'lucide-react';

export function CTASection() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="relative py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF006E]/10 via-[#0A0E27] to-[#00D9FF]/10" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] bg-[#FF006E]/5 blur-[150px] rounded-full" />
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#252B4A] to-transparent" />
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#252B4A] to-transparent" />

      <div className="container-custom relative text-center">
        <AnimateOnScroll>
          <span className="section-label mb-6 block">{isAr ? 'ابدأ رحلتك' : "LET'S CONNECT"}</span>
          <h2 className="heading-display text-[#F5F7FA] mb-6">
            {isAr ? (
              <>
                لنصنع شيئاً<br />
                <span className="neon-text-pink">استثنائياً معاً</span>
              </>
            ) : (
              <>
                Let&apos;s Create Something<br />
                <span className="neon-text-pink">Extraordinary Together</span>
              </>
            )}
          </h2>
          <p className="body-large text-[#A0AEC0] max-w-xl mx-auto mb-10 text-balance">
            {isAr
              ? 'كل شيء يبدأ بمحادثة. أخبرنا عن خططك وسنساعدك في تحقيقها.'
              : 'It all starts with a conversation. Tell us about your plans and we\'ll help make them happen.'}
          </p>
          <Link href="/contact">
            <button className="group inline-flex items-center gap-3 px-10 py-4 rounded-full bg-[#FF006E] text-white text-lg font-semibold transition-all duration-300 hover:shadow-[0_0_40px_rgba(255,0,110,0.4)] hover:scale-105">
              {isAr ? 'تواصل معنا' : 'Get In Touch'}
              <ArrowRight size={20} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
        </AnimateOnScroll>
      </div>
    </section>
  );
}
""")

print("\n🎨 Script 2/3 Complete!")
print("   ✅ services-preview.tsx — 6-card grid with hover effects & icons")
print("   ✅ portfolio-showcase.tsx — horizontal scroll with navigation arrows")
print("   ✅ testimonials-carousel.tsx — rotating quotes with auto-play & dots")
print("   ✅ cta-section.tsx — cinematic full-width CTA")
print("\n   Next → Run Script 3 to wire homepage + update footer")

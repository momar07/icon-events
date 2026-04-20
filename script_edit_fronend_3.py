#!/usr/bin/env python3
"""ICON EVENTS – Redesign Script 3/3: Wire Homepage + Footer"""

import os
from pathlib import Path

ROOT = Path.home() / "Desktop" / "websites" / "icon-events"
os.chdir(ROOT)

def write(path, content):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content.strip() + "\n", encoding="utf-8")
    print(f"  ✅ {path} ({p.stat().st_size:,} bytes)")

# ─── 1. Updated Home Page (Server Component that fetches data) ───
write("src/app/[locale]/(public)/page.tsx", r"""
import { setRequestLocale } from 'next-intl/server';
import { generateMeta } from '@/lib/utils/seo';
import { Hero } from '@/components/sections/hero';
import { ServicesPreview } from '@/components/sections/services-preview';
import { PortfolioShowcase } from '@/components/sections/portfolio-showcase';
import { TestimonialsCarousel } from '@/components/sections/testimonials-carousel';
import { CTASection } from '@/components/sections/cta-section';
import { portfolioRepo, testimonialsRepo } from '@/lib/dal';

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  return generateMeta({ locale });
}

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale } = await params;
  setRequestLocale(locale);

  // Fetch featured portfolio projects
  let projects: any[] = [];
  try {
    const result = await portfolioRepo.listPortfolioProjects({
      featured: true,
      limit: 8,
      page: 1,
    });
    projects = result.data || [];
  } catch {
    projects = [];
  }

  // Fetch featured testimonials
  let testimonials: any[] = [];
  try {
    const result = await testimonialsRepo.listTestimonials({
      featured: true,
      limit: 6,
      page: 1,
    });
    testimonials = (result.data || []).map((t: any) => ({
      id: t.id,
      clientName: t.clientName,
      clientTitle: t.clientTitle,
      content: t.content,
      rating: t.rating,
    }));
  } catch {
    testimonials = [];
  }

  return (
    <>
      <Hero />
      <ServicesPreview />
      {projects.length > 0 && <PortfolioShowcase projects={projects} />}
      {testimonials.length > 0 && <TestimonialsCarousel testimonials={testimonials} />}
      <CTASection />
    </>
  );
}
""")

# ─── 2. Updated Footer ───
write("src/components/layout/footer.tsx", r"""
'use client';

import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Zap, Mail, Phone, MapPin, ArrowUpRight, Instagram, Twitter, Linkedin } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const quickLinks = [
  { href: '/', labelEn: 'Home', labelAr: 'الرئيسية' },
  { href: '/services', labelEn: 'Services', labelAr: 'الخدمات' },
  { href: '/portfolio', labelEn: 'Portfolio', labelAr: 'أعمالنا' },
  { href: '/about', labelEn: 'About', labelAr: 'عن الشركة' },
  { href: '/contact', labelEn: 'Contact', labelAr: 'تواصل معنا' },
];

const services = [
  { labelEn: 'Exhibitions', labelAr: 'المعارض' },
  { labelEn: 'Corporate Events', labelAr: 'فعاليات الشركات' },
  { labelEn: 'Product Launches', labelAr: 'إطلاق المنتجات' },
  { labelEn: 'Conferences', labelAr: 'المؤتمرات' },
  { labelEn: 'Weddings', labelAr: 'الأعراس' },
];

export function Footer() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const year = new Date().getFullYear();

  return (
    <footer className="relative border-t border-[#252B4A]/50 bg-[#080b1e]">
      {/* Top gradient line */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#00D9FF]/30 to-transparent" />

      <div className="container-custom py-16 lg:py-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Link href="/" className="inline-flex items-center gap-2 mb-6">
              <Zap size={28} className="text-[#FF006E]" />
              <span className="text-xl font-bold text-[#F5F7FA]">
                ICON<span className="text-[#FF006E]">.</span>EVENTS
              </span>
            </Link>
            <p className="text-sm text-[#A0AEC0] leading-relaxed mb-6">
              {isAr
                ? 'نصنع تجارب استثنائية تتجاوز التوقعات وتترك أثراً لا يُنسى.'
                : 'Creating extraordinary experiences that exceed expectations and leave lasting impressions.'}
            </p>
            {/* Social */}
            <div className="flex gap-3">
              {[Instagram, Twitter, Linkedin].map((Icon, i) => (
                <a
                  key={i}
                  href="#"
                  className="w-10 h-10 rounded-full border border-[#252B4A] flex items-center justify-center text-[#A0AEC0] transition-all duration-300 hover:border-[#00D9FF] hover:text-[#00D9FF] hover:shadow-[0_0_12px_rgba(0,217,255,0.2)]"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-sm font-semibold text-[#F5F7FA] uppercase tracking-wider mb-6">
              {isAr ? 'روابط سريعة' : 'Quick Links'}
            </h4>
            <ul className="space-y-3">
              {quickLinks.map((link, i) => (
                <li key={i}>
                  <Link
                    href={link.href}
                    className="text-sm text-[#A0AEC0] transition-colors duration-300 hover:text-[#00D9FF] flex items-center gap-1 group"
                  >
                    {isAr ? link.labelAr : link.labelEn}
                    <ArrowUpRight size={12} className="opacity-0 -translate-x-1 transition-all group-hover:opacity-100 group-hover:translate-x-0" />
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-sm font-semibold text-[#F5F7FA] uppercase tracking-wider mb-6">
              {isAr ? 'خدماتنا' : 'Services'}
            </h4>
            <ul className="space-y-3">
              {services.map((item, i) => (
                <li key={i}>
                  <span className="text-sm text-[#A0AEC0]">
                    {isAr ? item.labelAr : item.labelEn}
                  </span>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-[#F5F7FA] uppercase tracking-wider mb-6">
              {isAr ? 'تواصل معنا' : 'Get In Touch'}
            </h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3">
                <Mail size={16} className="text-[#00D9FF] mt-0.5 flex-shrink-0" />
                <a href="mailto:info@iconevents.com" className="text-sm text-[#A0AEC0] hover:text-[#00D9FF] transition-colors">
                  info@iconevents.com
                </a>
              </li>
              <li className="flex items-start gap-3">
                <Phone size={16} className="text-[#00D9FF] mt-0.5 flex-shrink-0" />
                <a href="tel:+15551234567" className="text-sm text-[#A0AEC0] hover:text-[#00D9FF] transition-colors">
                  +1 (555) 123-4567
                </a>
              </li>
              <li className="flex items-start gap-3">
                <MapPin size={16} className="text-[#00D9FF] mt-0.5 flex-shrink-0" />
                <span className="text-sm text-[#A0AEC0]">
                  {isAr ? 'دبي، الإمارات العربية المتحدة' : 'Dubai, UAE'}
                </span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-[#252B4A]/30">
        <div className="container-custom py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-[#6B7280]">
            &copy; {year} Icon Events. {isAr ? 'جميع الحقوق محفوظة.' : 'All rights reserved.'}
          </p>
          <p className="text-xs text-[#6B7280]">
            {isAr ? 'صُنع بشغف في دبي' : 'Crafted with passion in Dubai'}
          </p>
        </div>
      </div>
    </footer>
  );
}
""")

print("\n🎨 Script 3/3 Complete!")
print("   ✅ page.tsx — Homepage now includes Hero, Services, Portfolio, Testimonials, CTA")
print("   ✅ footer.tsx — 4-column editorial footer with social links")
print("\n🚀 All done! Run: npm run dev")
print("   Open http://localhost:3000 to see the redesigned homepage.")

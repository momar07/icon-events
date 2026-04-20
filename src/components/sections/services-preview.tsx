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

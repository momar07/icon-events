'use client';

import { useLocale } from 'next-intl';
import { AnimateOnScroll } from '@/components/ui/animate-on-scroll';
import { Pencil, Hammer, Sparkles } from 'lucide-react';

const steps = [
  {
    num: '01',
    icon: Pencil,
    titleEn: 'Design',
    titleAr: 'التصميم',
    descEn: 'We start by understanding your vision, brand identity, and goals. Our creative team develops innovative concepts and detailed 3D renderings.',
    descAr: 'نبدأ بفهم رؤيتك وهوية علامتك التجارية وأهدافك. يطوّر فريقنا الإبداعي مفاهيم مبتكرة وتصاميم ثلاثية الأبعاد مفصّلة.',
  },
  {
    num: '02',
    icon: Hammer,
    titleEn: 'Build',
    titleAr: 'البناء',
    descEn: 'Our skilled craftsmen bring designs to life with precision and quality. We handle fabrication, logistics, and on-site installation seamlessly.',
    descAr: 'يُحوّل حرفيّونا المهرة التصاميم إلى واقع بدقة وجودة. نتولى التصنيع والخدمات اللوجستية والتركيب في الموقع بسلاسة.',
  },
  {
    num: '03',
    icon: Sparkles,
    titleEn: 'Execute',
    titleAr: 'التنفيذ',
    descEn: 'On event day, we ensure flawless execution. Our team manages every detail, from setup to breakdown, so you can focus on engaging your audience.',
    descAr: 'في يوم الفعالية، نضمن تنفيذاً لا تشوبه شائبة. يدير فريقنا كل التفاصيل من التجهيز حتى الإنهاء، لتتفرّغ أنت لجمهورك.',
  },
];

export function ProcessSection() {
  const locale = useLocale();
  const isAr = locale === 'ar';

  return (
    <section className="py-20 lg:py-28 relative overflow-hidden">
      {/* Top border */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#252B4A] to-transparent" />

      <div className="container-custom">
        {/* Header */}
        <AnimateOnScroll className="text-center mb-16 lg:mb-20">
          <span className="section-label mb-4 block">{isAr ? 'آلية العمل' : 'OUR PROCESS'}</span>
          <h2 className="heading-1 text-[#F5F7FA] mb-4">
            {isAr ? 'كيف' : 'How'} <span className="neon-text-pink">{isAr ? 'نعمل' : 'We Work'}</span>
          </h2>
          <p className="text-[#A0AEC0] max-w-xl mx-auto text-balance" style={{ fontSize: 'clamp(0.9rem, 1.2vw, 1.05rem)' }}>
            {isAr
              ? 'نهج مبسّط من ثلاث خطوات يضمن نتائج استثنائية في كل مرة.'
              : 'A streamlined three-step approach that ensures exceptional results every time.'}
          </p>
        </AnimateOnScroll>

        {/* Steps */}
        <div className="relative">
          {/* Connecting line (desktop) */}
          <div className="hidden lg:block absolute top-[52px] left-[16.67%] right-[16.67%] h-[2px]"
               style={{ background: 'linear-gradient(90deg, #FF006E, #FF006E 50%, #00D9FF)' }} />

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 lg:gap-8">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <AnimateOnScroll key={i} delay={i * 200} className="text-center relative">
                  {/* Icon circle */}
                  <div className="relative inline-flex flex-col items-center mb-8">
                    {/* Outer ring */}
                    <div className="w-[88px] h-[88px] rounded-full flex items-center justify-center"
                         style={{
                           border: '2px solid',
                           borderColor: i < 2 ? '#FF006E' : '#00D9FF',
                         }}>
                      {/* Inner icon */}
                      <div className="w-[60px] h-[60px] rounded-full flex items-center justify-center"
                           style={{
                             background: i < 2
                               ? 'radial-gradient(circle, rgba(255,0,110,0.15) 0%, transparent 70%)'
                               : 'radial-gradient(circle, rgba(0,217,255,0.15) 0%, transparent 70%)',
                           }}>
                        <Icon size={24} style={{ color: i < 2 ? '#FF006E' : '#00D9FF' }} />
                      </div>
                    </div>

                    {/* Step number badge */}
                    <div className="absolute -top-1 -right-1 w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white"
                         style={{
                           background: '#00D9FF',
                           boxShadow: '0 0 12px rgba(0,217,255,0.5)',
                         }}>
                      {step.num}
                    </div>
                  </div>

                  {/* Text */}
                  <h3 className="text-xl font-bold text-[#F5F7FA] mb-3" style={{ fontFamily: "'Inter', sans-serif" }}>
                    {isAr ? step.titleAr : step.titleEn}
                  </h3>
                  <p className="text-sm text-[#A0AEC0] leading-relaxed max-w-xs mx-auto">
                    {isAr ? step.descAr : step.descEn}
                  </p>
                </AnimateOnScroll>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}

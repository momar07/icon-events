'use client';

import { useEffect, useRef, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown, Play } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const stats = [
  { value: '350+', labelEn: 'Events Delivered', labelAr: 'فعالية تم تنفيذها' },
  { value: '120+', labelEn: 'Happy Clients', labelAr: 'عميل سعيد' },
  { value: '10+', labelEn: 'Years Experience', labelAr: 'سنوات خبرة' },
  { value: '8+', labelEn: 'Countries Served', labelAr: 'دول خدمناها' },
];

export function Hero() {
  const [isVisible, setIsVisible] = useState(false);
  const [activeWord, setActiveWord] = useState(0);
  const heroRef = useRef<HTMLElement>(null);

  const words = ['Spectacular', 'Unforgettable', 'Iconic'];
  const wordsAr = ['مذهلة', 'لا تُنسى', 'أيقونية'];

  useEffect(() => {
    setIsVisible(true);
    const interval = setInterval(() => {
      setActiveWord((prev) => (prev + 1) % words.length);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  const locale = useLocale();
  const currentWords = locale === 'ar' ? wordsAr : words;

  return (
    <section ref={heroRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image / Video placeholder */}
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-br from-[#0A0E27] via-[#111638] to-[#0A0E27]" />
        {/* Animated orbs */}
        <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] rounded-full bg-[#FF006E]/5 blur-[120px] animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-[500px] h-[500px] rounded-full bg-[#00D9FF]/5 blur-[120px] animate-float" style={{ animationDelay: '3s' }} />
        {/* Grid overlay */}
        <div className="absolute inset-0 opacity-[0.03]"
             style={{ backgroundImage: 'linear-gradient(rgba(0,217,255,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(0,217,255,0.3) 1px, transparent 1px)', backgroundSize: '60px 60px' }} />
        {/* Vignette */}
        <div className="absolute inset-0 hero-vignette" />
      </div>

      {/* Content */}
      <div className="relative z-10 container-custom text-center">
        {/* Label */}
        <div className={cn(
          'transition-all duration-1000 delay-200',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <span className="section-label inline-block mb-6 px-4 py-2 rounded-full border border-[#00D9FF]/20 bg-[#00D9FF]/5">
            {locale === 'ar' ? 'نصنع التجارب الاستثنائية' : 'CREATING EXTRAORDINARY EXPERIENCES'}
          </span>
        </div>

        {/* Main Heading */}
        <h1 className={cn(
          'heading-display text-[#F5F7FA] mb-6 transition-all duration-1000 delay-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {locale === 'ar' ? 'نحوّل رؤيتك إلى' : 'We Turn Your Vision Into'}
          <br />
          <span className="relative inline-block">
            <span key={activeWord} className="neon-text-pink inline-block animate-fade-in">
              {currentWords[activeWord]}
            </span>
          </span>
          <br />
          {locale === 'ar' ? 'تجارب' : 'Experiences'}
        </h1>

        {/* Subtitle */}
        <p className={cn(
          'body-large text-[#A0AEC0] max-w-2xl mx-auto mb-10 text-balance transition-all duration-1000 delay-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {locale === 'ar'
            ? 'من المعارض الكبرى إلى المؤتمرات العالمية، نحن نصمم وننفذ فعاليات تترك أثراً لا يُنسى'
            : 'From grand exhibitions to world-class conferences, we design and execute events that leave a lasting impression'}
        </p>

        {/* CTAs */}
        <div className={cn(
          'flex flex-col sm:flex-row items-center justify-center gap-4 mb-16 transition-all duration-1000 delay-900',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <Link href="/portfolio">
            <Button variant="primary" size="lg" className="group text-base px-8">
              {locale === 'ar' ? 'اكتشف أعمالنا' : 'Explore Our Work'}
              <ArrowRight size={18} className="ml-2 transition-transform group-hover:translate-x-1" />
            </Button>
          </Link>
          <Link href="/contact">
            <Button variant="outline" size="lg" className="text-base px-8">
              {locale === 'ar' ? 'تواصل معنا' : "Let's Connect"}
            </Button>
          </Link>
        </div>

        {/* Stats */}
        <div className={cn(
          'grid grid-cols-2 md:grid-cols-4 gap-6 max-w-3xl mx-auto transition-all duration-1000 delay-1100',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="heading-2 neon-text mb-1 transition-transform group-hover:scale-110">{stat.value}</div>
              <div className="text-xs text-[#A0AEC0] uppercase tracking-wider">
                {locale === 'ar' ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-[#A0AEC0]">
          <span className="text-xs uppercase tracking-widest">{locale === 'ar' ? 'اكتشف المزيد' : 'Scroll'}</span>
          <ChevronDown size={20} className="animate-scroll-hint" />
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E27] to-transparent z-[5]" />
    </section>
  );
}

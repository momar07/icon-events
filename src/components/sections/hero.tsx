'use client';

import { useEffect, useState } from 'react';
import { useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

const stats = [
  { value: '350+', labelEn: 'Events Delivered', labelAr: 'فعالية تم تنفيذها' },
  { value: '120+', labelEn: 'Happy Clients', labelAr: 'عميل سعيد' },
  { value: '10+', labelEn: 'Years Experience', labelAr: 'سنوات خبرة' },
  { value: '8+', labelEn: 'Countries Served', labelAr: 'دول خدمناها' },
];

export function Hero() {
  const locale = useLocale();
  const isAr = locale === 'ar';
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* ── Video Background ── */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          poster=""
        >
          <source src="https://api.ha.com.sa/wp-content/uploads/2025/12/banner-video.mp4" type="video/mp4" />
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
        {/* Bottom gradient fade */}
        <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27] via-[#0A0E27]/40 to-transparent" />
        {/* Vignette */}
        <div className="absolute inset-0" style={{ boxShadow: 'inset 0 0 200px 80px rgba(0,0,0,0.6)' }} />
      </div>

      {/* ── Content ── */}
      <div className="relative z-10 container-custom text-center px-4">
        {/* Tag */}
        <div className={cn(
          'transition-all duration-1000 delay-300',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <span className="inline-block mb-8 px-6 py-2.5 rounded-full text-xs font-semibold tracking-[0.2em] uppercase border border-[#00D9FF]/40 text-[#00D9FF] bg-[#00D9FF]/5 backdrop-blur-sm"
                style={{ textShadow: '0 0 20px rgba(0,217,255,0.5)' }}>
            {isAr ? 'حلول فعاليات متميزة' : 'Premium Event Solutions'}
          </span>
        </div>

        {/* Main Heading – line 1 white, line 2 neon red/pink */}
        <h1 className={cn(
          'mb-6 transition-all duration-1000 delay-500',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <span className="block text-white font-bold leading-[1.05] tracking-tight"
                style={{ fontSize: 'clamp(2.2rem, 6vw, 5.5rem)', fontFamily: "'Inter', sans-serif" }}>
            {isAr ? 'نصمم تجارب' : 'We Design Experiences'}
          </span>
          <span className="block font-bold leading-[1.05] tracking-tight mt-2"
                style={{
                  fontSize: 'clamp(2.2rem, 6vw, 5.5rem)',
                  fontFamily: "'Inter', sans-serif",
                  color: '#FF006E',
                  textShadow: '0 0 30px rgba(255,0,110,0.6), 0 0 60px rgba(255,0,110,0.3), 0 0 100px rgba(255,0,110,0.15)',
                }}>
            {isAr ? 'تُحيي علامتك التجارية' : 'That Bring Your Brand to Life'}
          </span>
        </h1>

        {/* Subtitle */}
        <p className={cn(
          'text-[#c0c8d8] max-w-2xl mx-auto mb-10 leading-relaxed transition-all duration-1000 delay-700',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}
           style={{ fontSize: 'clamp(0.95rem, 1.5vw, 1.2rem)' }}>
          {isAr
            ? 'من المفهوم إلى التنفيذ، نصنع معارض مذهلة وفعاليات لا تُنسى تأسر الجمهور وترتقي بحضور علامتك التجارية'
            : 'From concept to execution, we create stunning exhibition booths and memorable events that captivate audiences and elevate your brand presence.'}
        </p>

        {/* CTAs */}
        <div className={cn(
          'flex flex-col sm:flex-row items-center justify-center gap-4 mb-20 transition-all duration-1000 delay-900',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          <Link href="/portfolio">
            <button className="group inline-flex items-center gap-2 px-8 py-3.5 rounded-lg bg-[#FF006E] text-white text-base font-semibold transition-all duration-300 hover:shadow-[0_0_30px_rgba(255,0,110,0.5)] hover:scale-105">
              {isAr ? 'اكتشف أعمالنا' : 'View Our Projects'}
              <ArrowRight size={18} className="transition-transform group-hover:translate-x-1" />
            </button>
          </Link>
          <Link href="/contact">
            <button className="inline-flex items-center gap-2 px-8 py-3.5 rounded-lg text-base font-semibold border-2 border-[#00D9FF]/60 text-[#00D9FF] transition-all duration-300 hover:bg-[#00D9FF]/10 hover:border-[#00D9FF] hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]"
                    style={{ textShadow: '0 0 10px rgba(0,217,255,0.3)' }}>
              {isAr ? 'احصل على عرض سعر' : 'Get a Quote'}
            </button>
          </Link>
        </div>

        {/* Stats */}
        <div className={cn(
          'grid grid-cols-2 md:grid-cols-4 gap-8 max-w-3xl mx-auto transition-all duration-1000 delay-1100',
          isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
        )}>
          {stats.map((stat, i) => (
            <div key={i} className="text-center group">
              <div className="text-3xl md:text-4xl font-bold mb-1 transition-transform group-hover:scale-110"
                   style={{ color: '#00D9FF', textShadow: '0 0 20px rgba(0,217,255,0.4)' }}>
                {stat.value}
              </div>
              <div className="text-xs text-[#8892a8] uppercase tracking-wider">
                {isAr ? stat.labelAr : stat.labelEn}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10">
        <div className="flex flex-col items-center gap-2 text-[#8892a8]">
          <span className="text-[10px] uppercase tracking-[0.3em]">{isAr ? 'اكتشف المزيد' : 'Scroll'}</span>
          <ChevronDown size={18} className="animate-scroll-hint" />
        </div>
      </div>
    </section>
  );
}

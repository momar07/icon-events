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

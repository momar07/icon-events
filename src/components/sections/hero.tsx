'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';
import { ArrowRight, Sparkles } from 'lucide-react';

export function Hero() {
  const t = useTranslations('hero');

  return (
    <section className="relative flex min-h-screen items-center overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0">
        {/* Gradient orbs */}
        <div className="absolute left-1/4 top-1/4 h-96 w-96 rounded-full bg-[#FF006E]/10 blur-[120px]" />
        <div className="absolute bottom-1/4 right-1/4 h-96 w-96 rounded-full bg-[#00D9FF]/10 blur-[120px]" />

        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage: 'linear-gradient(#00D9FF 1px, transparent 1px), linear-gradient(90deg, #00D9FF 1px, transparent 1px)',
            backgroundSize: '60px 60px',
          }}
        />
      </div>

      <div className="container-custom relative z-10 py-32 md:py-40">
        <div className="mx-auto max-w-4xl text-center">
          {/* Tag */}
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-[#FF006E]/30 bg-[#FF006E]/10 px-4 py-1.5 text-sm text-[#FF006E]">
            <Sparkles size={16} />
            <span>Premier Event & Exhibition Design</span>
          </div>

          {/* Title */}
          <h1 className="heading-1 mb-6 text-balance">
            <span className="text-[#F5F7FA]">{t('title').split(' ').slice(0, -1).join(' ')} </span>
            <span className="neon-text-pink">{t('title').split(' ').pop()}</span>
          </h1>

          {/* Subtitle */}
          <p className="body-large mx-auto mb-10 max-w-2xl text-balance">
            {t('subtitle')}
          </p>

          {/* CTAs */}
          <div className="flex flex-col items-center justify-center gap-4 sm:flex-row">
            <Link href="/portfolio">
              <Button size="lg" variant="primary">
                {t('cta1')}
                <ArrowRight size={18} className="ml-2" />
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline">
                {t('cta2')}
              </Button>
            </Link>
          </div>

          {/* Stats bar */}
          <div className="mt-20 grid grid-cols-2 gap-8 border-t border-[#252B4A]/50 pt-10 md:grid-cols-4">
            {[
              { value: '350+', label: 'Events Completed' },
              { value: '120+', label: 'Happy Clients' },
              { value: '10+', label: 'Years Experience' },
              { value: '8+', label: 'Countries Served' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold neon-text-cyan">{stat.value}</div>
                <div className="mt-1 text-sm text-[#A0AEC0]">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom gradient fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-[#0A0E27] to-transparent" />
    </section>
  );
}

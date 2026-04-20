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

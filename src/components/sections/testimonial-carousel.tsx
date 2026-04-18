'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useTranslations } from 'next-intl';
import { TestimonialCard } from './testimonial-card';
import { SectionHeader } from '@/components/ui/section-header';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Testimonial {
  id: number;
  clientName: string;
  clientTitle: string | null;
  clientLogo: string | null;
  content: string;
  rating: number;
}

interface TestimonialCarouselProps {
  testimonials: Testimonial[];
}

export function TestimonialCarousel({ testimonials }: TestimonialCarouselProps) {
  const t = useTranslations('testimonials');
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<NodeJS.Timeout | null>(null);

  const count = testimonials.length;

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % count);
  }, [count]);

  const prev = useCallback(() => {
    setCurrent((prev) => (prev - 1 + count) % count);
  }, [count]);

  // Auto-rotate
  useEffect(() => {
    if (isPaused || count <= 1) return;
    timerRef.current = setInterval(next, 5000);
    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPaused, next, count]);

  if (count === 0) return null;

  // Show 3 at a time on desktop
  const getVisibleIndices = () => {
    if (count <= 3) return testimonials.map((_, i) => i);
    const indices = [];
    for (let i = 0; i < 3; i++) {
      indices.push((current + i) % count);
    }
    return indices;
  };

  const visibleIndices = getVisibleIndices();

  return (
    <section
      className="section-padding"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocus={() => setIsPaused(true)}
      onBlur={() => setIsPaused(false)}
    >
      <div className="container-custom">
        <SectionHeader title={t('title')} subtitle={t('subtitle')} />

        <div className="relative mt-12">
          {/* Cards */}
          <div className="grid gap-6 md:grid-cols-3">
            {visibleIndices.map((idx) => (
              <TestimonialCard
                key={testimonials[idx].id}
                {...testimonials[idx]}
              />
            ))}
          </div>

          {/* Navigation */}
          {count > 3 && (
            <div className="mt-8 flex items-center justify-center gap-4">
              <button
                onClick={prev}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#252B4A] text-[#A0AEC0] transition-all hover:border-[#00D9FF] hover:text-[#00D9FF]"
                aria-label="Previous testimonials"
              >
                <ChevronLeft size={20} />
              </button>

              {/* Dots */}
              <div className="flex gap-2">
                {Array.from({ length: count }, (_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={cn(
                      'h-2 rounded-full transition-all duration-300',
                      i === current ? 'w-8 bg-[#FF006E]' : 'w-2 bg-[#252B4A] hover:bg-[#A0AEC0]'
                    )}
                    aria-label={`Go to testimonial ${i + 1}`}
                  />
                ))}
              </div>

              <button
                onClick={next}
                className="flex h-10 w-10 items-center justify-center rounded-full border border-[#252B4A] text-[#A0AEC0] transition-all hover:border-[#00D9FF] hover:text-[#00D9FF]"
                aria-label="Next testimonials"
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

'use client';

import { useEffect, useRef, useState } from 'react';

interface Stat {
  label: string;
  value: number;
  suffix?: string;
}

interface StatsCounterProps {
  title: string;
  stats: Stat[];
}

function AnimatedCounter({ target, suffix = '+' }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const started = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !started.current) {
          started.current = true;
          const duration = 2000;
          const step = target / (duration / 16);
          let current = 0;

          const timer = setInterval(() => {
            current += step;
            if (current >= target) {
              setCount(target);
              clearInterval(timer);
            } else {
              setCount(Math.floor(current));
            }
          }, 16);
        }
      },
      { threshold: 0.5 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [target]);

  return (
    <div ref={ref} className="text-4xl font-bold neon-text-cyan md:text-5xl">
      {count}{suffix}
    </div>
  );
}

export function StatsCounter({ title, stats }: StatsCounterProps) {
  if (stats.length === 0) return null;

  return (
    <section className="section-padding bg-[#1A1F3A]/50">
      <div className="container-custom">
        <h2 className="heading-2 neon-text-pink mb-12 text-center">{title}</h2>

        <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <AnimatedCounter target={stat.value} suffix={stat.suffix || '+'} />
              <div className="mt-2 text-sm text-[#A0AEC0]">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

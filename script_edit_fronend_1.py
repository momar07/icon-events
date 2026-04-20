#!/usr/bin/env python3
"""ICON EVENTS – Redesign Script 1/3: Hero, Navbar, Global Styles"""

import os
from pathlib import Path

ROOT = Path.home() / "Desktop" / "websites" / "icon-events"
os.chdir(ROOT)

def write(path, content):
    p = Path(path)
    p.parent.mkdir(parents=True, exist_ok=True)
    p.write_text(content.strip() + "\n", encoding="utf-8")
    print(f"  ✅ {path} ({p.stat().st_size:,} bytes)")

# ─── 1. Updated global CSS with new animations ───
write("src/app/design-system.css", r"""
@import 'tailwindcss';

/* ── Brand tokens ── */
@theme {
  --color-neon-pink: #FF006E;
  --color-neon-pink-light: #FF3D8F;
  --color-neon-pink-dark: #CC0058;
  --color-electric-cyan: #00D9FF;
  --color-electric-cyan-light: #33E1FF;
  --color-electric-cyan-dark: #00ADCC;
  --color-bg-primary: #0A0E27;
  --color-bg-secondary: #1A1F3A;
  --color-bg-tertiary: #252B4A;
  --color-text-primary: #F5F7FA;
  --color-text-secondary: #A0AEC0;
  --color-text-muted: #6B7280;
  --color-success: #00E676;
  --color-warning: #FFD600;
  --color-error: #FF4D6D;
  --spacing-section: 5rem;
  --spacing-section-sm: 3rem;
  --radius-sm: 0.375rem;
  --radius-md: 0.5rem;
  --radius-lg: 0.75rem;
  --radius-xl: 1rem;
  --font-sans: 'Inter', ui-sans-serif, system-ui, sans-serif;
  --font-mono: 'Space Mono', ui-monospace, monospace;
  --shadow-neon-pink: 0 0 20px rgba(255, 0, 110, 0.5);
  --shadow-neon-cyan: 0 0 20px rgba(0, 217, 255, 0.5);
  --shadow-neon-glow: 0 0 40px rgba(0, 217, 255, 0.3);
  --animate-fade-in: fade-in 0.8s ease-out;
  --animate-slide-up: slide-up 0.8s ease-out;
  --animate-slide-in-right: slide-in-right 0.5s ease-out;
  --animate-glow-pulse: glow-pulse 3s ease-in-out infinite;
  --animate-float: float 6s ease-in-out infinite;
  --animate-scroll-hint: scroll-hint 2s ease-in-out infinite;
  --animate-reveal: reveal 1s ease-out;
  --animate-counter: counter 2s ease-out;
}

@keyframes fade-in {
  from { opacity: 0; }
  to { opacity: 1; }
}
@keyframes slide-up {
  from { opacity: 0; transform: translateY(40px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes slide-in-right {
  from { opacity: 0; transform: translateX(-30px); }
  to { opacity: 1; transform: translateX(0); }
}
@keyframes glow-pulse {
  0%, 100% { opacity: 0.4; }
  50% { opacity: 1; }
}
@keyframes float {
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-20px); }
}
@keyframes scroll-hint {
  0%, 100% { transform: translateY(0); opacity: 0.5; }
  50% { transform: translateY(12px); opacity: 1; }
}
@keyframes reveal {
  from { opacity: 0; transform: translateY(60px); }
  to { opacity: 1; transform: translateY(0); }
}
@keyframes counter {
  from { opacity: 0; transform: scale(0.5); }
  to { opacity: 1; transform: scale(1); }
}

/* ── Base ── */
html { scroll-behavior: smooth; -webkit-font-smoothing: antialiased; }
body {
  background-color: #0A0E27;
  color: #F5F7FA;
  font-family: 'Inter', ui-sans-serif, system-ui, sans-serif;
}
*:focus-visible { outline: 2px solid #00D9FF; outline-offset: 2px; }
::selection { background-color: #FF006E; color: white; }
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after { animation-duration: 0.01ms !important; transition-duration: 0.01ms !important; }
}

/* ── Scrollbar ── */
::-webkit-scrollbar { width: 6px; }
::-webkit-scrollbar-track { background: #0A0E27; }
::-webkit-scrollbar-thumb { background: #252B4A; border-radius: 3px; }
::-webkit-scrollbar-thumb:hover { background: #00D9FF; }

/* ── Utilities ── */
.container-custom {
  width: 100%;
  max-width: 1280px;
  margin-inline: auto;
  padding-inline: 1.5rem;
}
.section-padding { padding-block: var(--spacing-section); }
.section-padding-sm { padding-block: var(--spacing-section-sm); }

/* Neon effects */
.neon-glow { box-shadow: var(--shadow-neon-cyan); }
.neon-text {
  color: #00D9FF;
  text-shadow: 0 0 10px rgba(0, 217, 255, 0.5), 0 0 40px rgba(0, 217, 255, 0.2);
}
.neon-text-pink {
  color: #FF006E;
  text-shadow: 0 0 10px rgba(255, 0, 110, 0.5), 0 0 40px rgba(255, 0, 110, 0.2);
}

/* Glass */
.glass-card {
  background: rgba(26, 31, 58, 0.6);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(37, 43, 74, 0.5);
}

/* Gradient divider */
.gradient-divider {
  height: 1px;
  background: linear-gradient(90deg, transparent, #252B4A, #00D9FF, #252B4A, transparent);
}

/* Hero-specific */
.hero-gradient {
  background: linear-gradient(180deg, transparent 0%, rgba(10, 14, 39, 0.4) 40%, rgba(10, 14, 39, 0.95) 100%);
}
.hero-vignette {
  box-shadow: inset 0 0 150px 60px rgba(10, 14, 39, 0.8);
}

/* Horizontal scroll (portfolio) */
.horizontal-scroll {
  display: flex;
  overflow-x: auto;
  scroll-snap-type: x mandatory;
  -webkit-overflow-scrolling: touch;
  scrollbar-width: none;
}
.horizontal-scroll::-webkit-scrollbar { display: none; }
.horizontal-scroll > * { scroll-snap-align: start; flex-shrink: 0; }

/* Typography */
.heading-display { font-size: clamp(2.5rem, 6vw, 5rem); font-weight: 700; line-height: 1.05; letter-spacing: -0.02em; }
.heading-1 { font-size: clamp(2rem, 4vw, 3.5rem); font-weight: 700; line-height: 1.1; letter-spacing: -0.02em; }
.heading-2 { font-size: clamp(1.5rem, 3vw, 2.25rem); font-weight: 600; line-height: 1.2; }
.heading-3 { font-size: clamp(1.125rem, 2vw, 1.5rem); font-weight: 600; line-height: 1.3; }
.body-large { font-size: 1.125rem; line-height: 1.7; }
.text-balance { text-wrap: balance; }

/* Section label (like sela.sa "WHO WE ARE" etc.) */
.section-label {
  font-size: 0.75rem;
  font-weight: 600;
  letter-spacing: 0.2em;
  text-transform: uppercase;
  color: #00D9FF;
}
""")

# ─── 2. Cinematic Hero ───
write("src/components/sections/hero.tsx", r"""
'use client';

import { useEffect, useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
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
  const t = useTranslations('hero');
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

  const locale = t('cta_portfolio') === 'أعمالنا' ? 'ar' : 'en';
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
""")

# ─── 3. Upgraded Navbar ───
write("src/components/layout/navbar.tsx", r"""
'use client';

import { useState, useEffect } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/lib/i18n/navigation';
import { Menu, X, Zap } from 'lucide-react';
import { cn } from '@/lib/utils/cn';
import { LanguageSwitch } from './language-switch';
import { MobileMenu } from './mobile-menu';

const navLinks = [
  { href: '/', key: 'home' },
  { href: '/services', key: 'services' },
  { href: '/portfolio', key: 'portfolio' },
  { href: '/about', key: 'about' },
  { href: '/contact', key: 'contact' },
] as const;

export function Navbar() {
  const t = useTranslations('nav');
  const pathname = usePathname();
  const locale = useLocale();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileOpen, setIsMobileOpen] = useState(false);
  const [hidden, setHidden] = useState(false);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      setIsScrolled(y > 20);
      // Hide navbar on scroll down, show on scroll up
      if (y > lastY && y > 100) setHidden(true);
      else setHidden(false);
      setLastY(y);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, [lastY]);

  useEffect(() => {
    setIsMobileOpen(false);
  }, [pathname]);

  const isActive = (href: string) => {
    if (href === '/') return pathname === '/';
    return pathname.startsWith(href);
  };

  return (
    <header
      className={cn(
        'fixed top-0 z-50 w-full transition-all duration-500',
        isScrolled
          ? 'border-b border-[#252B4A]/30 bg-[#0A0E27]/80 backdrop-blur-2xl shadow-[0_4px_30px_rgba(0,0,0,0.3)]'
          : 'bg-transparent',
        hidden && !isMobileOpen ? '-translate-y-full' : 'translate-y-0'
      )}
    >
      <nav className="container-custom flex h-20 items-center justify-between lg:h-24">
        {/* Logo */}
        <Link href="/" className="flex items-center gap-3 transition-all duration-300 hover:scale-105">
          <div className="relative">
            <Zap size={32} className="text-[#FF006E]" />
            <div className="absolute inset-0 blur-lg bg-[#FF006E]/30 rounded-full" />
          </div>
          <span className="text-2xl font-bold tracking-tight text-[#F5F7FA]">
            ICON<span className="text-[#FF006E]">.</span>EVENTS
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-1 lg:flex">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              className={cn(
                'relative rounded-lg px-5 py-2.5 text-sm font-medium tracking-wide transition-all duration-300',
                isActive(link.href)
                  ? 'text-[#F5F7FA]'
                  : 'text-[#A0AEC0] hover:text-[#F5F7FA]'
              )}
            >
              {t(link.key)}
              {isActive(link.href) && (
                <span className="absolute bottom-0 left-1/2 h-[2px] w-8 -translate-x-1/2 rounded-full bg-gradient-to-r from-[#FF006E] to-[#00D9FF]" />
              )}
            </Link>
          ))}
        </div>

        {/* Right side */}
        <div className="flex items-center gap-4">
          <LanguageSwitch />

          <Link href="/contact" className="hidden lg:block">
            <button className="px-6 py-2.5 text-sm font-semibold rounded-full border border-[#FF006E]/50 text-[#FF006E] transition-all duration-300 hover:bg-[#FF006E] hover:text-white hover:shadow-[0_0_20px_rgba(255,0,110,0.4)]">
              {locale === 'ar' ? 'تواصل معنا' : "Let's Talk"}
            </button>
          </Link>

          <button
            onClick={() => setIsMobileOpen(!isMobileOpen)}
            className="rounded-lg p-2.5 text-[#A0AEC0] transition-colors hover:bg-[#1A1F3A] hover:text-[#F5F7FA] lg:hidden"
            aria-label={isMobileOpen ? 'Close menu' : 'Open menu'}
            aria-expanded={isMobileOpen}
          >
            {isMobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      <MobileMenu
        isOpen={isMobileOpen}
        onClose={() => setIsMobileOpen(false)}
        navLinks={navLinks}
        isActive={isActive}
      />
    </header>
  );
}
""")

# ─── 4. Scroll-animated section wrapper ───
write("src/components/ui/animate-on-scroll.tsx", r"""
'use client';

import { useEffect, useRef, useState, ReactNode } from 'react';
import { cn } from '@/lib/utils/cn';

interface Props {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: 'up' | 'left' | 'right' | 'none';
}

export function AnimateOnScroll({ children, className, delay = 0, direction = 'up' }: Props) {
  const ref = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.15 }
    );

    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  const directionClasses = {
    up: 'translate-y-12',
    left: '-translate-x-12',
    right: 'translate-x-12',
    none: '',
  };

  return (
    <div
      ref={ref}
      className={cn(
        'transition-all duration-[800ms] ease-out',
        isVisible ? 'opacity-100 translate-x-0 translate-y-0' : `opacity-0 ${directionClasses[direction]}`,
        className
      )}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}
""")

print("\n🎨 Script 1/3 Complete!")
print("   ✅ design-system.css — updated with new animations & utilities")
print("   ✅ hero.tsx — cinematic full-screen hero with rotating words")
print("   ✅ navbar.tsx — hide-on-scroll, gradient active indicator, CTA button")
print("   ✅ animate-on-scroll.tsx — reusable intersection observer component")
print("\n   Next → Run Script 2 for Home page sections (Services, Portfolio, Testimonials, CTA)")


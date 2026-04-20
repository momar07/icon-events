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

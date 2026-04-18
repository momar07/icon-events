'use client';

import { usePathname } from 'next/navigation';
import { Menu, Globe, User } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { cn } from '@/lib/utils/cn';

interface TopbarProps {
  locale: string;
  adminEmail: string;
  onMenuClick: () => void;
}

function getBreadcrumb(pathname: string, locale: string): string[] {
  const parts = pathname
    .replace(`/${locale}/admin`, '')
    .split('/')
    .filter(Boolean);
  if (parts.length === 0) return ['Dashboard'];
  return parts.map((p) => p.charAt(0).toUpperCase() + p.slice(1));
}

export function Topbar({ locale, adminEmail, onMenuClick }: TopbarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const crumbs = getBreadcrumb(pathname, locale);
  const otherLocale = locale === 'en' ? 'ar' : 'en';

  const switchLocale = () => {
    const newPath = pathname.replace(`/${locale}/`, `/${otherLocale}/`);
    router.push(newPath);
  };

  return (
    <header className="h-16 bg-[#0d1230]/80 backdrop-blur-md border-b border-electric-cyan/10 flex items-center justify-between px-4 md:px-6 sticky top-0 z-30">
      {/* Left: mobile menu + breadcrumb */}
      <div className="flex items-center gap-3">
        <button
          onClick={onMenuClick}
          className="lg:hidden text-steel-gray hover:text-white transition-colors"
        >
          <Menu className="w-6 h-6" />
        </button>
        <nav className="flex items-center gap-1.5 text-sm">
          <span className="text-steel-gray">Admin</span>
          {crumbs.map((crumb, i) => (
            <span key={i} className="flex items-center gap-1.5">
              <span className="text-electric-cyan/40">/</span>
              <span className={cn(i === crumbs.length - 1 ? 'text-white font-medium' : 'text-steel-gray')}>
                {crumb}
              </span>
            </span>
          ))}
        </nav>
      </div>

      {/* Right: locale switch + user */}
      <div className="flex items-center gap-3">
        <button
          onClick={switchLocale}
          className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-sm text-steel-gray hover:text-white hover:bg-white/5 transition-all"
        >
          <Globe className="w-4 h-4" />
          <span className="uppercase">{otherLocale}</span>
        </button>
        <div className="flex items-center gap-2 px-2.5 py-1.5 rounded-lg bg-white/5">
          <User className="w-4 h-4 text-electric-cyan" />
          <span className="text-sm text-steel-gray hidden sm:inline">{adminEmail}</span>
        </div>
      </div>
    </header>
  );
}

'use client';

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  LayoutDashboard,
  Wrench,
  FolderOpen,
  MessageSquareQuote,
  Mail,
  Settings,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X,
  Zap,
} from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface SidebarProps {
  locale: string;
  collapsed: boolean;
  onToggle: () => void;
  className?: string;
  mobile?: boolean;
}

const NAV_ITEMS = [
  { key: 'dashboard', icon: LayoutDashboard, href: '/admin/dashboard' },
  { key: 'services', icon: Wrench, href: '/admin/services' },
  { key: 'portfolio', icon: FolderOpen, href: '/admin/portfolio' },
  { key: 'testimonials', icon: MessageSquareQuote, href: '/admin/testimonials' },
  { key: 'inquiries', icon: Mail, href: '/admin/inquiries' },
  { key: 'settings', icon: Settings, href: '/admin/settings' },
];

const LABELS: Record<string, Record<string, string>> = {
  en: {
    dashboard: 'Dashboard',
    services: 'Services',
    portfolio: 'Portfolio',
    testimonials: 'Testimonials',
    inquiries: 'Inquiries',
    settings: 'Settings',
    logout: 'Logout',
    brand: 'Icon Events',
  },
  ar: {
    dashboard: 'لوحة التحكم',
    services: 'الخدمات',
    portfolio: 'الأعمال',
    testimonials: 'آراء العملاء',
    inquiries: 'الاستفسارات',
    settings: 'الإعدادات',
    logout: 'تسجيل الخروج',
    brand: 'أيقون إيفنتس',
  },
};

export function Sidebar({ locale, collapsed, onToggle, className, mobile }: SidebarProps) {
  const pathname = usePathname();
  const router = useRouter();
  const t = LABELS[locale] || LABELS.en;
  const isRTL = locale === 'ar';

  const handleLogout = async () => {
    await fetch('/api/auth/logout', { method: 'POST' });
    router.push(`/${locale}/admin/login`);
    router.refresh();
  };

  const isActive = (href: string) => {
    const full = `/${locale}${href}`;
    if (href === '/admin/dashboard') return pathname === full;
    return pathname.startsWith(full);
  };

  return (
    <aside
      className={cn(
        'flex flex-col h-screen bg-[#0d1230] border-r border-electric-cyan/10',
        'transition-all duration-300',
        collapsed && !mobile ? 'w-[72px]' : 'w-64',
        className
      )}
    >
      {/* Brand */}
      <div className="h-16 flex items-center justify-between px-4 border-b border-electric-cyan/10">
        {(!collapsed || mobile) && (
          <Link
            href={`/${locale}/admin/dashboard`}
            className="flex items-center gap-2 text-electric-cyan font-bold text-lg"
          >
            <Zap className="w-6 h-6 text-neon-pink" />
            <span>{t.brand}</span>
          </Link>
        )}
        {collapsed && !mobile && (
          <Link href={`/${locale}/admin/dashboard`} className="mx-auto">
            <Zap className="w-6 h-6 text-neon-pink" />
          </Link>
        )}
        {mobile ? (
          <button onClick={onToggle} className="text-steel-gray hover:text-white ml-auto">
            <X className="w-5 h-5" />
          </button>
        ) : (
          <button
            onClick={onToggle}
            className="hidden lg:block text-steel-gray hover:text-electric-cyan transition-colors"
          >
            {collapsed ? (
              isRTL ? <ChevronLeft className="w-5 h-5" /> : <ChevronRight className="w-5 h-5" />
            ) : (
              isRTL ? <ChevronRight className="w-5 h-5" /> : <ChevronLeft className="w-5 h-5" />
            )}
          </button>
        )}
      </div>

      {/* Navigation */}
      <nav className="flex-1 py-4 px-2 space-y-1 overflow-y-auto">
        {NAV_ITEMS.map((item) => {
          const active = isActive(item.href);
          return (
            <Link
              key={item.key}
              href={`/${locale}${item.href}`}
              onClick={mobile ? onToggle : undefined}
              className={cn(
                'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200',
                active
                  ? 'bg-electric-cyan/10 text-electric-cyan shadow-[0_0_12px_rgba(0,217,255,0.15)]'
                  : 'text-steel-gray hover:text-white hover:bg-white/5'
              )}
            >
              <item.icon className={cn('w-5 h-5 flex-shrink-0', active && 'drop-shadow-[0_0_6px_rgba(0,217,255,0.6)]')} />
              {(!collapsed || mobile) && <span>{t[item.key]}</span>}
            </Link>
          );
        })}
      </nav>

      {/* Logout */}
      <div className="p-2 border-t border-electric-cyan/10">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium text-steel-gray hover:text-neon-pink hover:bg-neon-pink/10 transition-all duration-200 w-full"
        >
          <LogOut className="w-5 h-5 flex-shrink-0" />
          {(!collapsed || mobile) && <span>{t.logout}</span>}
        </button>
      </div>
    </aside>
  );
}

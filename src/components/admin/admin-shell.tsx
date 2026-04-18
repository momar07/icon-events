'use client';

import { useState } from 'react';
import { Sidebar } from './sidebar';
import { Topbar } from './topbar';

interface AdminShellProps {
  children: React.ReactNode;
  locale: string;
  adminEmail: string;
}

export function AdminShell({ children, locale, adminEmail }: AdminShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  return (
    <div className="min-h-screen bg-deep-black flex" dir={locale === 'ar' ? 'rtl' : 'ltr'}>
      {/* Desktop sidebar */}
      <Sidebar
        locale={locale}
        collapsed={!sidebarOpen}
        onToggle={() => setSidebarOpen(!sidebarOpen)}
        className="hidden lg:flex"
      />

      {/* Mobile sidebar overlay */}
      {mobileSidebarOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMobileSidebarOpen(false)}
          />
          <Sidebar
            locale={locale}
            collapsed={false}
            onToggle={() => setMobileSidebarOpen(false)}
            className="relative z-10"
            mobile
          />
        </div>
      )}

      {/* Main area */}
      <div className="flex-1 flex flex-col min-h-screen overflow-hidden">
        <Topbar
          locale={locale}
          adminEmail={adminEmail}
          onMenuClick={() => setMobileSidebarOpen(true)}
        />
        <main className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8">
          {children}
        </main>
      </div>
    </div>
  );
}

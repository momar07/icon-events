import { cookies } from 'next/headers';
import { verifyToken, COOKIE_NAME_CONST } from '@/lib/auth';

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;

  // Try to get admin info (for AdminShell), but DON'T redirect here.
  // Auth redirects are handled by middleware.ts only.
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME_CONST)?.value;
  const payload = token ? verifyToken(token) : null;

  // If authenticated, wrap in AdminShell; otherwise just render children (login page)
  if (payload) {
    const { AdminShell } = await import('@/components/admin/admin-shell');
    return (
      <AdminShell locale={locale} adminEmail={payload.email}>
        {children}
      </AdminShell>
    );
  }

  // Not authenticated — render children directly (login page)
  return <>{children}</>;
}

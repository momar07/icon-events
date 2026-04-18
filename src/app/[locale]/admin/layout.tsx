import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';
import { verifyToken, COOKIE_NAME_CONST } from '@/lib/auth';
import { AdminShell } from '@/components/admin/admin-shell';

interface AdminLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}

export default async function AdminLayout({ children, params }: AdminLayoutProps) {
  const { locale } = await params;
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE_NAME_CONST)?.value;

  if (!token) {
    redirect(`/${locale}/admin/login`);
  }

  const payload = verifyToken(token);
  if (!payload) {
    redirect(`/${locale}/admin/login`);
  }

  return (
    <AdminShell locale={locale} adminEmail={payload.email}>
      {children}
    </AdminShell>
  );
}

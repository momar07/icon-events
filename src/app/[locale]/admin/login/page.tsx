'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Zap, Eye, EyeOff, Loader2 } from 'lucide-react';

interface LoginPageProps {
  params: Promise<{ locale: string }>;
}

export default function AdminLoginPage({ params }: LoginPageProps) {
  const [locale, setLocale] = useState('en');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  // Resolve locale from params
  useState(() => {
    params.then((p) => setLocale(p.locale));
  });

  const t = locale === 'ar'
    ? {
        title: 'تسجيل الدخول',
        subtitle: 'لوحة تحكم أيقون إيفنتس',
        email: 'البريد الإلكتروني',
        password: 'كلمة المرور',
        login: 'دخول',
        loggingIn: 'جاري الدخول...',
        invalidCredentials: 'بيانات الدخول غير صحيحة',
        networkError: 'خطأ في الاتصال، حاول مرة أخرى',
      }
    : {
        title: 'Sign In',
        subtitle: 'Icon Events Admin Panel',
        email: 'Email',
        password: 'Password',
        login: 'Sign In',
        loggingIn: 'Signing in...',
        invalidCredentials: 'Invalid credentials',
        networkError: 'Network error, please try again',
      };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.error || t.invalidCredentials);
        setLoading(false);
        return;
      }

      router.push(`/${locale}/admin/dashboard`);
      router.refresh();
    } catch {
      setError(t.networkError);
      setLoading(false);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-deep-black p-4"
      dir={locale === 'ar' ? 'rtl' : 'ltr'}
    >
      {/* Background grid effect */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,217,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,217,255,0.03)_1px,transparent_1px)] bg-[size:60px_60px]" />

      <div className="relative w-full max-w-md">
        {/* Glow effect behind card */}
        <div className="absolute -inset-1 bg-gradient-to-r from-neon-pink/20 via-electric-cyan/20 to-neon-pink/20 rounded-2xl blur-xl opacity-60" />

        <div className="relative bg-[#0d1230] border border-electric-cyan/20 rounded-2xl p-8 shadow-2xl">
          {/* Brand */}
          <div className="text-center mb-8">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-neon-pink to-electric-cyan mb-4">
              <Zap className="w-8 h-8 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-white mb-1">{t.title}</h1>
            <p className="text-steel-gray text-sm">{t.subtitle}</p>
          </div>

          {/* Error */}
          {error && (
            <div className="mb-6 p-3 rounded-lg bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-sm text-center">
              {error}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-steel-gray mb-1.5">
                {t.email}
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
                placeholder="admin@iconevents.com"
                disabled={loading}
              />
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-steel-gray mb-1.5">
                {t.password}
              </label>
              <div className="relative">
                <input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
                  placeholder="••••••••"
                  disabled={loading}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute top-1/2 -translate-y-1/2 right-3 text-steel-gray hover:text-white transition-colors"
                  tabIndex={-1}
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-lg bg-gradient-to-r from-neon-pink to-electric-cyan text-white font-semibold text-sm hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-electric-cyan/50 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  {t.loggingIn}
                </>
              ) : (
                t.login
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

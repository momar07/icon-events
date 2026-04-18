'use client';

import { useLocale, useTranslations } from 'next-intl';
import { useRouter, usePathname } from '@/lib/i18n/navigation';
import { Globe } from 'lucide-react';

export function LanguageSwitch() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const t = useTranslations('nav');

  const switchLocale = () => {
    const newLocale = locale === 'en' ? 'ar' : 'en';
    router.replace(pathname, { locale: newLocale });
  };

  return (
    <button
      onClick={switchLocale}
      className="flex items-center gap-1.5 rounded-lg border border-[#252B4A] px-3 py-1.5 text-sm font-medium text-[#A0AEC0] transition-all duration-200 hover:border-[#00D9FF]/30 hover:text-[#00D9FF]"
      aria-label={`Switch to ${locale === 'en' ? 'Arabic' : 'English'}`}
    >
      <Globe size={16} />
      <span>{t('switchLang')}</span>
    </button>
  );
}

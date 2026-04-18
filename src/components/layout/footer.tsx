import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { Zap, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const t = useTranslations('footer');
  const tNav = useTranslations('nav');
  const locale = useLocale();
  const year = new Date().getFullYear();

  return (
    <footer className="border-t border-[#252B4A]/50 bg-[#0A0E27]">
      {/* Gradient divider */}
      <div className="gradient-divider" />

      <div className="container-custom py-16">
        <div className="grid gap-12 md:grid-cols-3">
          {/* Brand column */}
          <div>
            <div className="mb-4 flex items-center gap-2">
              <Zap size={24} className="text-[#FF006E]" />
              <span className="text-lg font-bold text-[#F5F7FA]">
                ICON<span className="text-[#FF006E]">.</span>EVENTS
              </span>
            </div>
            <p className="mb-6 text-sm leading-relaxed text-[#A0AEC0]">
              {t('tagline')}
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#00D9FF]">
              {t('quickLinks')}
            </h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-[#A0AEC0] transition-colors hover:text-[#F5F7FA]">
                {tNav('home')}
              </Link>
              <Link href="/services" className="text-sm text-[#A0AEC0] transition-colors hover:text-[#F5F7FA]">
                {tNav('services')}
              </Link>
              <Link href="/portfolio" className="text-sm text-[#A0AEC0] transition-colors hover:text-[#F5F7FA]">
                {tNav('portfolio')}
              </Link>
              <Link href="/about" className="text-sm text-[#A0AEC0] transition-colors hover:text-[#F5F7FA]">
                {tNav('about')}
              </Link>
              <Link href="/contact" className="text-sm text-[#A0AEC0] transition-colors hover:text-[#F5F7FA]">
                {tNav('contact')}
              </Link>
            </nav>
          </div>

          {/* Contact Info */}
          <div>
            <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-[#00D9FF]">
              {t('contactInfo')}
            </h3>
            <div className="flex flex-col gap-3">
              <div className="flex items-center gap-2 text-sm text-[#A0AEC0]">
                <Mail size={16} className="text-[#FF006E]" />
                <span>info@iconevents.com</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#A0AEC0]">
                <Phone size={16} className="text-[#FF006E]" />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-[#A0AEC0]">
                <MapPin size={16} className="text-[#FF006E]" />
                <span>Dubai, UAE</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="gradient-divider mt-12" />
        <div className="mt-8 text-center text-sm text-[#6B7280]">
          {t('copyright', { year })}
        </div>
      </div>
    </footer>
  );
}

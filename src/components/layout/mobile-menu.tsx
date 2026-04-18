'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/lib/i18n/navigation';
import { cn } from '@/lib/utils/cn';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navLinks: readonly { href: string; key: string }[];
  isActive: (href: string) => boolean;
}

export function MobileMenu({ isOpen, onClose, navLinks, isActive }: MobileMenuProps) {
  const t = useTranslations('nav');

  if (!isOpen) return null;

  return (
    <div className="border-t border-[#252B4A]/50 bg-[#0A0E27]/95 backdrop-blur-xl md:hidden">
      <div className="container-custom py-4">
        <div className="flex flex-col gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.key}
              href={link.href}
              onClick={onClose}
              className={cn(
                'rounded-lg px-4 py-3 text-base font-medium transition-all duration-200',
                isActive(link.href)
                  ? 'bg-[#FF006E]/10 text-[#FF006E]'
                  : 'text-[#A0AEC0] hover:bg-[#1A1F3A] hover:text-[#F5F7FA]'
              )}
            >
              {t(link.key)}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}

'use client';

import { useTranslations } from 'next-intl';
import { cn } from '@/lib/utils/cn';

interface PortfolioFiltersProps {
  categories: string[];
  activeCategory: string | null;
  onCategoryChange: (category: string | null) => void;
}

export function PortfolioFilters({
  categories,
  activeCategory,
  onCategoryChange,
}: PortfolioFiltersProps) {
  const t = useTranslations('portfolio');

  return (
    <div className="flex flex-wrap justify-center gap-2">
      <button
        onClick={() => onCategoryChange(null)}
        className={cn(
          'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
          activeCategory === null
            ? 'bg-[#FF006E] text-white shadow-[0_0_20px_rgba(255,0,110,0.3)]'
            : 'border border-[#252B4A] text-[#A0AEC0] hover:border-[#FF006E]/30 hover:text-[#F5F7FA]'
        )}
      >
        {t('filterAll')}
      </button>
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => onCategoryChange(cat)}
          className={cn(
            'rounded-full px-5 py-2 text-sm font-medium transition-all duration-200',
            activeCategory === cat
              ? 'bg-[#FF006E] text-white shadow-[0_0_20px_rgba(255,0,110,0.3)]'
              : 'border border-[#252B4A] text-[#A0AEC0] hover:border-[#FF006E]/30 hover:text-[#F5F7FA]'
          )}
        >
          {cat}
        </button>
      ))}
    </div>
  );
}

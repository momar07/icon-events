'use client';

import { Link } from '@/lib/i18n/navigation';
import { useTranslations } from 'next-intl';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';
import { Calendar, Users, DollarSign, ArrowUpRight } from 'lucide-react';

interface PortfolioCardProps {
  id: number;
  title: string;
  description: string;
  category: string;
  clientName: string | null;
  year: number | null;
  teamSize: number | null;
  budgetDisplay: string | null;
  featured: boolean;
  images: any[] | null;
}

export function PortfolioCard({
  id,
  title,
  description,
  category,
  clientName,
  year,
  teamSize,
  budgetDisplay,
  featured,
  images,
}: PortfolioCardProps) {
  const t = useTranslations('portfolio');

  // Get cover image or first image
  const coverImage = images?.find((img: any) => img.isCover) || images?.[0];

  return (
    <Link href={`/portfolio/${id}`}>
      <Card hover className="group h-full overflow-hidden p-0 transition-all duration-300">
        {/* Image area */}
        <div className="relative aspect-[16/10] overflow-hidden bg-[#252B4A]">
          {coverImage ? (
            <img
              src={coverImage.url}
              alt={coverImage.alt || title}
              className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
              loading="lazy"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center">
              <div className="text-4xl font-bold text-[#252B4A]">
                {title.charAt(0)}
              </div>
            </div>
          )}

          {/* Overlay on hover */}
          <div className="absolute inset-0 bg-gradient-to-t from-[#0A0E27]/80 to-transparent opacity-60 transition-opacity group-hover:opacity-80" />

          {/* Featured badge */}
          {featured && (
            <div className="absolute left-3 top-3">
              <Badge variant="pink">{t('featured')}</Badge>
            </div>
          )}

          {/* Arrow icon */}
          <div className="absolute right-3 top-3 rounded-full bg-[#FF006E]/0 p-2 transition-all duration-300 group-hover:bg-[#FF006E]">
            <ArrowUpRight size={18} className="text-white opacity-0 transition-opacity group-hover:opacity-100" />
          </div>

          {/* Category badge */}
          <div className="absolute bottom-3 left-3">
            <Badge variant="cyan">{category}</Badge>
          </div>
        </div>

        {/* Content */}
        <div className="p-5">
          <h3 className="mb-2 text-lg font-semibold text-[#F5F7FA] transition-colors group-hover:text-[#FF006E]">
            {title}
          </h3>

          {clientName && (
            <p className="mb-3 text-sm text-[#A0AEC0]">{clientName}</p>
          )}

          <p className="mb-4 line-clamp-2 text-sm text-[#6B7280]">
            {description}
          </p>

          {/* Meta info */}
          <div className="flex flex-wrap gap-3 border-t border-[#252B4A] pt-3">
            {year && (
              <div className="flex items-center gap-1 text-xs text-[#A0AEC0]">
                <Calendar size={12} />
                <span>{year}</span>
              </div>
            )}
            {teamSize && (
              <div className="flex items-center gap-1 text-xs text-[#A0AEC0]">
                <Users size={12} />
                <span>{teamSize}</span>
              </div>
            )}
            {budgetDisplay && (
              <div className="flex items-center gap-1 text-xs text-[#A0AEC0]">
                <DollarSign size={12} />
                <span>{budgetDisplay}</span>
              </div>
            )}
          </div>
        </div>
      </Card>
    </Link>
  );
}

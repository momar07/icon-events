import { Card } from '@/components/ui/card';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface ServiceCardProps {
  title: string;
  description: string;
  icon: string | null;
  index: number;
}

export function ServiceCard({ title, description, icon, index }: ServiceCardProps) {
  const IconComponent = icon && (LucideIcons as any)[icon]
    ? (LucideIcons as any)[icon]
    : LucideIcons.Sparkles;

  return (
    <Card
      hover
      hud
      className={cn(
        'group relative overflow-hidden p-8 transition-all duration-500',
        'hover:border-[#FF006E]/30'
      )}
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {/* Glow effect on hover */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FF006E]/5 to-transparent opacity-0 transition-opacity duration-500 group-hover:opacity-100" />

      <div className="relative z-10">
        {/* Icon */}
        <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl border border-[#FF006E]/20 bg-[#FF006E]/10 transition-all duration-300 group-hover:border-[#FF006E]/40 group-hover:shadow-[0_0_20px_rgba(255,0,110,0.2)]">
          <IconComponent size={28} className="text-[#FF006E]" />
        </div>

        {/* Title */}
        <h3 className="mb-3 text-xl font-semibold text-[#F5F7FA] transition-colors group-hover:text-[#FF006E]">
          {title}
        </h3>

        {/* Description */}
        <p className="text-sm leading-relaxed text-[#A0AEC0]">
          {description}
        </p>
      </div>
    </Card>
  );
}

import { cn } from '@/lib/utils/cn';
import { type LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: number | string;
  icon: LucideIcon;
  trend?: string;
  color?: 'cyan' | 'pink' | 'green' | 'amber';
}

const colorMap = {
  cyan: {
    bg: 'bg-electric-cyan/10',
    text: 'text-electric-cyan',
    glow: 'shadow-[0_0_20px_rgba(0,217,255,0.1)]',
    border: 'border-electric-cyan/20',
  },
  pink: {
    bg: 'bg-neon-pink/10',
    text: 'text-neon-pink',
    glow: 'shadow-[0_0_20px_rgba(255,0,110,0.1)]',
    border: 'border-neon-pink/20',
  },
  green: {
    bg: 'bg-emerald-500/10',
    text: 'text-emerald-400',
    glow: 'shadow-[0_0_20px_rgba(52,211,153,0.1)]',
    border: 'border-emerald-500/20',
  },
  amber: {
    bg: 'bg-amber-500/10',
    text: 'text-amber-400',
    glow: 'shadow-[0_0_20px_rgba(245,158,11,0.1)]',
    border: 'border-amber-500/20',
  },
};

export function StatCard({ title, value, icon: Icon, trend, color = 'cyan' }: StatCardProps) {
  const c = colorMap[color];
  return (
    <div className={cn('rounded-xl border p-5 bg-[#0d1230] transition-all duration-300 hover:scale-[1.02]', c.border, c.glow)}>
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm text-steel-gray mb-1">{title}</p>
          <p className="text-3xl font-bold text-white">{value}</p>
          {trend && <p className={cn('text-xs mt-1', c.text)}>{trend}</p>}
        </div>
        <div className={cn('w-11 h-11 rounded-lg flex items-center justify-center', c.bg)}>
          <Icon className={cn('w-5 h-5', c.text)} />
        </div>
      </div>
    </div>
  );
}

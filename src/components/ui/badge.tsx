import { cn } from '@/lib/utils/cn';

type BadgeVariant = 'default' | 'pink' | 'cyan' | 'success' | 'warning' | 'error';

interface BadgeProps {
  children: React.ReactNode;
  variant?: BadgeVariant;
  className?: string;
}

const variantStyles: Record<BadgeVariant, string> = {
  default: 'bg-[#252B4A] text-[#A0AEC0]',
  pink: 'bg-[#FF006E]/20 text-[#FF006E] border border-[#FF006E]/30',
  cyan: 'bg-[#00D9FF]/20 text-[#00D9FF] border border-[#00D9FF]/30',
  success: 'bg-[#2EF2B1]/20 text-[#2EF2B1] border border-[#2EF2B1]/30',
  warning: 'bg-[#FFC857]/20 text-[#FFC857] border border-[#FFC857]/30',
  error: 'bg-[#FF4D6D]/20 text-[#FF4D6D] border border-[#FF4D6D]/30',
};

export function Badge({ children, variant = 'default', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium',
        variantStyles[variant],
        className
      )}
    >
      {children}
    </span>
  );
}

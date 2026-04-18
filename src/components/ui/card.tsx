import { cn } from '@/lib/utils/cn';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hud?: boolean;
  hover?: boolean;
}

export function Card({ children, className, hud = false, hover = false }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-lg border border-[#252B4A] bg-[#1A1F3A] p-6',
        hover && 'transition-all duration-300 hover:border-[#00D9FF]/30 hover:shadow-[0_0_20px_rgba(0,217,255,0.1)]',
        hud && 'hud-corners',
        className
      )}
    >
      {children}
    </div>
  );
}

export function CardHeader({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('mb-4', className)}>{children}</div>;
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn('text-lg font-semibold text-[#F5F7FA]', className)}>{children}</h3>;
}

export function CardDescription({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={cn('text-sm text-[#A0AEC0]', className)}>{children}</p>;
}

export function CardContent({ children, className }: { children: React.ReactNode; className?: string }) {
  return <div className={cn('', className)}>{children}</div>;
}

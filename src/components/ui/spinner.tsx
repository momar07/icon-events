import { cn } from '@/lib/utils/cn';

interface SpinnerProps {
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

const sizes = {
  sm: 'h-4 w-4',
  md: 'h-8 w-8',
  lg: 'h-12 w-12',
};

export function Spinner({ size = 'md', className }: SpinnerProps) {
  return (
    <div className={cn('animate-spin rounded-full border-2 border-[#252B4A] border-t-[#00D9FF]', sizes[size], className)} role="status">
      <span className="sr-only">Loading...</span>
    </div>
  );
}

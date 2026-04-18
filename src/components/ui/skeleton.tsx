import { cn } from '@/lib/utils/cn';

interface SkeletonProps {
  className?: string;
}

export function Skeleton({ className }: SkeletonProps) {
  return (
    <div className={cn('animate-pulse rounded-lg bg-[#252B4A]', className)} />
  );
}

export function SkeletonCard() {
  return (
    <div className="rounded-lg border border-[#252B4A] bg-[#1A1F3A] p-6">
      <Skeleton className="mb-4 h-48 w-full" />
      <Skeleton className="mb-2 h-6 w-3/4" />
      <Skeleton className="mb-4 h-4 w-full" />
      <Skeleton className="h-4 w-1/2" />
    </div>
  );
}

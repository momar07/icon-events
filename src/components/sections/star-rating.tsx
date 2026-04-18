import { Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface StarRatingProps {
  rating: number;
  size?: number;
  className?: string;
}

export function StarRating({ rating, size = 16, className }: StarRatingProps) {
  return (
    <div className={cn('flex gap-0.5', className)} aria-label={`${rating} out of 5 stars`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          size={size}
          className={cn(
            i < rating ? 'fill-[#FFC857] text-[#FFC857]' : 'fill-[#252B4A] text-[#252B4A]'
          )}
        />
      ))}
    </div>
  );
}

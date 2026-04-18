import { Card } from '@/components/ui/card';
import { StarRating } from './star-rating';
import { Quote, User } from 'lucide-react';

interface TestimonialCardProps {
  clientName: string;
  clientTitle: string | null;
  content: string;
  rating: number;
  clientLogo: string | null;
}

export function TestimonialCard({
  clientName,
  clientTitle,
  content,
  rating,
  clientLogo,
}: TestimonialCardProps) {
  return (
    <Card hover className="flex h-full flex-col p-8">
      {/* Quote icon */}
      <Quote size={32} className="mb-4 text-[#FF006E]/40" />

      {/* Rating */}
      <StarRating rating={rating} className="mb-4" />

      {/* Content */}
      <p className="mb-6 flex-1 text-sm leading-relaxed text-[#A0AEC0]">
        &ldquo;{content}&rdquo;
      </p>

      {/* Author */}
      <div className="flex items-center gap-3 border-t border-[#252B4A] pt-4">
        <div className="flex h-10 w-10 items-center justify-center overflow-hidden rounded-full border border-[#FF006E]/30 bg-[#252B4A]">
          {clientLogo ? (
            <img src={clientLogo} alt={clientName} className="h-full w-full object-cover" />
          ) : (
            <User size={20} className="text-[#A0AEC0]" />
          )}
        </div>
        <div>
          <p className="text-sm font-semibold text-[#F5F7FA]">{clientName}</p>
          {clientTitle && (
            <p className="text-xs text-[#6B7280]">{clientTitle}</p>
          )}
        </div>
      </div>
    </Card>
  );
}

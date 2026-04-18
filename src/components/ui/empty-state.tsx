import { Inbox } from 'lucide-react';
import { Button } from './button';

interface EmptyStateProps {
  title?: string;
  message?: string;
  icon?: React.ReactNode;
  actionLabel?: string;
  onAction?: () => void;
}

export function EmptyState({
  title = 'No results found',
  message = 'There is nothing to display at the moment.',
  icon,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#252B4A] bg-[#1A1F3A]">
        {icon || <Inbox size={32} className="text-[#A0AEC0]" />}
      </div>
      <h3 className="text-xl font-semibold text-[#F5F7FA]">{title}</h3>
      <p className="max-w-md text-[#A0AEC0]">{message}</p>
      {actionLabel && onAction && (
        <Button variant="outline" onClick={onAction}>
          {actionLabel}
        </Button>
      )}
    </div>
  );
}

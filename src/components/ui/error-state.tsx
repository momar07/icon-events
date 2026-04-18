'use client';

import { AlertTriangle } from 'lucide-react';
import { Button } from './button';

interface ErrorStateProps {
  title?: string;
  message?: string;
  onRetry?: () => void;
  fullPage?: boolean;
}

export function ErrorState({
  title = 'Something went wrong',
  message = 'An unexpected error occurred. Please try again.',
  onRetry,
  fullPage = false,
}: ErrorStateProps) {
  const content = (
    <div className="flex flex-col items-center justify-center gap-4 py-20 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#FF4D6D]/30 bg-[#FF4D6D]/10">
        <AlertTriangle size={32} className="text-[#FF4D6D]" />
      </div>
      <h3 className="text-xl font-semibold text-[#F5F7FA]">{title}</h3>
      <p className="max-w-md text-[#A0AEC0]">{message}</p>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Try Again
        </Button>
      )}
    </div>
  );

  if (fullPage) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#0A0E27]">
        {content}
      </div>
    );
  }

  return content;
}

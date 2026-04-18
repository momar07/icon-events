'use client';

import { forwardRef, TextareaHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
}

const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#A0AEC0]">
            {label}
          </label>
        )}
        <textarea
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg border bg-[#1A1F3A] px-4 py-2.5 text-[#F5F7FA] placeholder-[#6B7280] transition-all duration-200',
            'border-[#252B4A] focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] focus:outline-none',
            'min-h-[120px] resize-y',
            error && 'border-[#FF4D6D] focus:border-[#FF4D6D] focus:ring-[#FF4D6D]',
            className
          )}
          {...props}
        />
        {error && <p className="mt-1 text-sm text-[#FF4D6D]">{error}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
export { Textarea };

'use client';

import { forwardRef, SelectHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label?: string;
  error?: string;
  options: { value: string; label: string }[];
  placeholder?: string;
}

const Select = forwardRef<HTMLSelectElement, SelectProps>(
  ({ className, label, error, options, placeholder, id, ...props }, ref) => {
    return (
      <div className="w-full">
        {label && (
          <label htmlFor={id} className="mb-1.5 block text-sm font-medium text-[#A0AEC0]">
            {label}
          </label>
        )}
        <select
          ref={ref}
          id={id}
          className={cn(
            'w-full rounded-lg border bg-[#1A1F3A] px-4 py-2.5 text-[#F5F7FA] transition-all duration-200',
            'border-[#252B4A] focus:border-[#00D9FF] focus:ring-1 focus:ring-[#00D9FF] focus:outline-none',
            'min-h-[44px] appearance-none cursor-pointer',
            error && 'border-[#FF4D6D] focus:border-[#FF4D6D] focus:ring-[#FF4D6D]',
            className
          )}
          {...props}
        >
          {placeholder && (
            <option value="" className="text-[#6B7280]">{placeholder}</option>
          )}
          {options.map((opt) => (
            <option key={opt.value} value={opt.value}>{opt.label}</option>
          ))}
        </select>
        {error && <p className="mt-1 text-sm text-[#FF4D6D]">{error}</p>}
      </div>
    );
  }
);

Select.displayName = 'Select';
export { Select };

'use client';

import { forwardRef, ButtonHTMLAttributes } from 'react';
import { cn } from '@/lib/utils/cn';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
}

const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant = 'primary', size = 'md', isLoading, disabled, children, ...props }, ref) => {
    const baseStyles = 'inline-flex items-center justify-center font-semibold rounded-lg transition-all duration-200 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#00D9FF] disabled:opacity-50 disabled:cursor-not-allowed';

    const variants = {
      primary: 'bg-[#FF006E] text-white hover:shadow-[0_0_20px_rgba(255,0,110,0.5)] hover:bg-[#FF3D8F] active:bg-[#CC0058]',
      secondary: 'bg-[#00D9FF] text-[#0A0E27] hover:shadow-[0_0_20px_rgba(0,217,255,0.5)] hover:bg-[#33E1FF] active:bg-[#00ADCC]',
      outline: 'border-2 border-[#00D9FF] text-[#00D9FF] hover:bg-[#00D9FF]/10 hover:shadow-[0_0_20px_rgba(0,217,255,0.3)]',
      ghost: 'text-[#A0AEC0] hover:text-[#F5F7FA] hover:bg-[#1A1F3A]',
      danger: 'bg-[#FF4D6D] text-white hover:shadow-[0_0_20px_rgba(255,77,109,0.5)] hover:bg-[#FF6B85]',
    };

    const sizes = {
      sm: 'px-3 py-1.5 text-sm min-h-[36px]',
      md: 'px-5 py-2.5 text-sm min-h-[44px]',
      lg: 'px-8 py-3 text-base min-h-[48px]',
    };

    return (
      <button
        ref={ref}
        className={cn(baseStyles, variants[variant], sizes[size], className)}
        disabled={disabled || isLoading}
        {...props}
      >
        {isLoading ? (
          <>
            <svg className="mr-2 h-4 w-4 animate-spin" viewBox="0 0 24 24" fill="none">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Loading...
          </>
        ) : children}
      </button>
    );
  }
);

Button.displayName = 'Button';
export { Button };

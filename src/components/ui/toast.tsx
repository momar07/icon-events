'use client';

import { Toaster as SonnerToaster } from 'sonner';

export function Toaster() {
  return (
    <SonnerToaster
      position="top-right"
      toastOptions={{
        style: {
          background: '#1A1F3A',
          border: '1px solid #252B4A',
          color: '#F5F7FA',
        },
        classNames: {
          success: '[&>div>svg]:text-[#2EF2B1]',
          error: '[&>div>svg]:text-[#FF4D6D]',
          warning: '[&>div>svg]:text-[#FFC857]',
        },
      }}
    />
  );
}

'use client';

import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface GalleryImage {
  url: string;
  alt?: string;
}

interface ImageGalleryProps {
  images: GalleryImage[];
  title?: string;
}

export function ImageGallery({ images, title = '' }: ImageGalleryProps) {
  const [active, setActive] = useState(0);

  if (images.length === 0) return null;

  const goTo = (index: number) => {
    if (index < 0) setActive(images.length - 1);
    else if (index >= images.length) setActive(0);
    else setActive(index);
  };

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative group overflow-hidden rounded-xl border border-[#252B4A] bg-[#0d1230]">
        <div className="aspect-[16/9] w-full">
          <img
            src={images[active].url}
            alt={images[active].alt || title}
            className="h-full w-full object-contain transition-all duration-500"
          />
        </div>

        {/* Left Arrow */}
        {images.length > 1 && (
          <button
            onClick={() => goTo(active - 1)}
            className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-[#252B4A] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#00D9FF]/20 hover:border-[#00D9FF]/50"
          >
            <ChevronLeft size={20} />
          </button>
        )}

        {/* Right Arrow */}
        {images.length > 1 && (
          <button
            onClick={() => goTo(active + 1)}
            className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-black/50 backdrop-blur-sm border border-[#252B4A] flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all duration-300 hover:bg-[#00D9FF]/20 hover:border-[#00D9FF]/50"
          >
            <ChevronRight size={20} />
          </button>
        )}

        {/* Counter */}
        {images.length > 1 && (
          <div className="absolute bottom-3 right-3 px-3 py-1 rounded-full bg-black/50 backdrop-blur-sm text-xs text-white border border-[#252B4A]">
            {active + 1} / {images.length}
          </div>
        )}
      </div>

      {/* Thumbnails */}
      {images.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {images.map((img, index) => (
            <button
              key={index}
              onClick={() => setActive(index)}
              className={cn(
                'flex-shrink-0 w-20 h-14 rounded-lg overflow-hidden border-2 transition-all duration-300',
                index === active
                  ? 'border-[#00D9FF] shadow-[0_0_12px_rgba(0,217,255,0.3)]'
                  : 'border-[#252B4A] opacity-60 hover:opacity-100 hover:border-[#252B4A]/80'
              )}
            >
              <img
                src={img.url}
                alt={img.alt || `${title} ${index + 1}`}
                className="h-full w-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

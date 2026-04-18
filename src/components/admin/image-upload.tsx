'use client';

import { useState, useRef } from 'react';
import { Upload, X, Loader2, Star } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

export interface UploadedImage {
  id: number;
  url: string;
  alt: string;
  isCover?: boolean;
}

interface ImageUploadProps {
  images: UploadedImage[];
  onChange: (images: UploadedImage[]) => void;
  maxImages?: number;
  locale: string;
}

export function ImageUpload({ images, onChange, maxImages = 10, locale }: ImageUploadProps) {
  const [uploading, setUploading] = useState(false);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files || files.length === 0) return;

    setUploading(true);
    const newImages: UploadedImage[] = [...images];

    for (let i = 0; i < files.length; i++) {
      if (newImages.length >= maxImages) break;
      const file = files[i];

      const formData = new FormData();
      formData.append('file', file);
      formData.append('alt', file.name.replace(/\.[^.]+$/, ''));

      try {
        const res = await fetch('/api/upload', {
          method: 'POST',
          body: formData,
        });

        if (res.ok) {
          const data = await res.json();
          newImages.push({
            id: data.data.id,
            url: data.data.url,
            alt: data.data.alt || file.name,
            isCover: newImages.length === 0,
          });
        }
      } catch {
        // skip failed uploads
      }
    }

    onChange(newImages);
    setUploading(false);
    if (fileRef.current) fileRef.current.value = '';
  };

  const removeImage = (idx: number) => {
    const updated = images.filter((_, i) => i !== idx);
    if (updated.length > 0 && !updated.some((img) => img.isCover)) {
      updated[0].isCover = true;
    }
    onChange(updated);
  };

  const setCover = (idx: number) => {
    const updated = images.map((img, i) => ({
      ...img,
      isCover: i === idx,
    }));
    onChange(updated);
  };

  const updateAlt = (idx: number, alt: string) => {
    const updated = images.map((img, i) => (i === idx ? { ...img, alt } : img));
    onChange(updated);
  };

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-steel-gray">
        {locale === 'ar' ? 'الصور' : 'Images'} ({images.length}/{maxImages})
      </label>

      {/* Grid of uploaded images */}
      {images.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {images.map((img, idx) => (
            <div
              key={idx}
              className={cn(
                'relative group rounded-lg border overflow-hidden aspect-video bg-deep-black',
                img.isCover ? 'border-electric-cyan' : 'border-electric-cyan/10'
              )}
            >
              <img src={img.url} alt={img.alt} className="w-full h-full object-cover" />

              {/* Overlay controls */}
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                <button
                  type="button"
                  onClick={() => setCover(idx)}
                  className={cn(
                    'p-1.5 rounded-lg transition-all',
                    img.isCover
                      ? 'bg-electric-cyan/20 text-electric-cyan'
                      : 'bg-white/10 text-white hover:bg-electric-cyan/20'
                  )}
                  title="Set as cover"
                >
                  <Star className={cn('w-4 h-4', img.isCover && 'fill-current')} />
                </button>
                <button
                  type="button"
                  onClick={() => removeImage(idx)}
                  className="p-1.5 rounded-lg bg-white/10 text-white hover:bg-neon-pink/20 hover:text-neon-pink transition-all"
                  title="Remove"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {img.isCover && (
                <span className="absolute top-1.5 left-1.5 text-[10px] px-1.5 py-0.5 rounded bg-electric-cyan/90 text-white font-medium">
                  Cover
                </span>
              )}

              {/* Alt text */}
              <input
                type="text"
                value={img.alt}
                onChange={(e) => updateAlt(idx, e.target.value)}
                placeholder="Alt text"
                className="absolute bottom-0 inset-x-0 px-2 py-1 text-xs bg-black/70 text-white border-t border-electric-cyan/10 focus:outline-none"
              />
            </div>
          ))}
        </div>
      )}

      {/* Upload button */}
      {images.length < maxImages && (
        <div>
          <input
            ref={fileRef}
            type="file"
            accept="image/jpeg,image/png,image/webp"
            multiple
            onChange={handleUpload}
            className="hidden"
          />
          <button
            type="button"
            onClick={() => fileRef.current?.click()}
            disabled={uploading}
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg border border-dashed border-electric-cyan/30 text-steel-gray hover:text-white hover:border-electric-cyan/50 hover:bg-white/[0.02] transition-all text-sm"
          >
            {uploading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                {locale === 'ar' ? 'جاري الرفع...' : 'Uploading...'}
              </>
            ) : (
              <>
                <Upload className="w-4 h-4" />
                {locale === 'ar' ? 'رفع صور' : 'Upload Images'}
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
}

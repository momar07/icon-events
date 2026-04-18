'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

interface ServiceFormProps {
  locale: string;
  initialData?: {
    id: number;
    title: string;
    description: string;
    icon: string | null;
    displayOrder: number;
  };
}

const ICON_OPTIONS = [
  'Palette', 'PenTool', 'Layout', 'Monitor', 'Camera', 'Lightbulb',
  'Sparkles', 'Star', 'Megaphone', 'Mic', 'Music', 'Video',
  'Building', 'MapPin', 'Globe', 'Users', 'Award', 'Gift',
];

export function ServiceForm({ locale, initialData }: ServiceFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [icon, setIcon] = useState(initialData?.icon || 'Palette');
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit ? `/api/services/${initialData.id}` : '/api/services';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, description, icon, displayOrder }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      router.push(`/${locale}/admin/services`);
      router.refresh();
    } catch {
      setError('Network error');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl">
      <div className="mb-6">
        <Link
          href={`/${locale}/admin/services`}
          className="inline-flex items-center gap-2 text-sm text-steel-gray hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === 'ar' ? 'العودة للخدمات' : 'Back to Services'}
        </Link>
      </div>

      <div className="bg-[#0d1230] border border-electric-cyan/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {isEdit
            ? (locale === 'ar' ? 'تعديل الخدمة' : 'Edit Service')
            : (locale === 'ar' ? 'إضافة خدمة جديدة' : 'New Service')}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-steel-gray mb-1.5">
              {locale === 'ar' ? 'العنوان' : 'Title'} *
            </label>
            <input
              id="title"
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
              placeholder="Event Design & Planning"
            />
          </div>

          {/* Description */}
          <div>
            <label htmlFor="desc" className="block text-sm font-medium text-steel-gray mb-1.5">
              {locale === 'ar' ? 'الوصف' : 'Description'} *
            </label>
            <textarea
              id="desc"
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all resize-none"
              placeholder="Describe the service..."
            />
          </div>

          {/* Icon picker */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-1.5">
              {locale === 'ar' ? 'الأيقونة' : 'Icon'}
            </label>
            <div className="flex flex-wrap gap-2">
              {ICON_OPTIONS.map((opt) => (
                <button
                  key={opt}
                  type="button"
                  onClick={() => setIcon(opt)}
                  className={`px-3 py-1.5 rounded-lg text-xs font-medium border transition-all ${
                    icon === opt
                      ? 'bg-electric-cyan/10 border-electric-cyan text-electric-cyan'
                      : 'bg-deep-black border-electric-cyan/10 text-steel-gray hover:border-electric-cyan/30'
                  }`}
                >
                  {opt}
                </button>
              ))}
            </div>
          </div>

          {/* Display order */}
          <div>
            <label htmlFor="order" className="block text-sm font-medium text-steel-gray mb-1.5">
              {locale === 'ar' ? 'ترتيب العرض' : 'Display Order'}
            </label>
            <input
              id="order"
              type="number"
              min={0}
              value={displayOrder}
              onChange={(e) => setDisplayOrder(Number(e.target.value))}
              className="w-32 px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
            />
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-pink to-electric-cyan text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {loading
                ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...')
                : (locale === 'ar' ? 'حفظ' : 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

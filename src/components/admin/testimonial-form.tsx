'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft, Star } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/utils/cn';

interface TestimonialFormProps {
  locale: string;
  initialData?: {
    id: number;
    clientName: string;
    clientTitle: string | null;
    clientLogo: string | null;
    content: string;
    rating: number;
    featured: boolean;
    displayOrder: number;
  };
}

export function TestimonialForm({ locale, initialData }: TestimonialFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [clientName, setClientName] = useState(initialData?.clientName || '');
  const [clientTitle, setClientTitle] = useState(initialData?.clientTitle || '');
  const [content, setContent] = useState(initialData?.content || '');
  const [rating, setRating] = useState(initialData?.rating ?? 5);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 0);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit ? `/api/testimonials/${initialData.id}` : '/api/testimonials';
      const method = isEdit ? 'PUT' : 'POST';

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          clientName,
          clientTitle: clientTitle || null,
          clientLogo: null,
          content,
          rating,
          featured,
          displayOrder,
        }),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      router.push(`/${locale}/admin/testimonials`);
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
          href={`/${locale}/admin/testimonials`}
          className="inline-flex items-center gap-2 text-sm text-steel-gray hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === 'ar' ? 'العودة لآراء العملاء' : 'Back to Testimonials'}
        </Link>
      </div>

      <div className="bg-[#0d1230] border border-electric-cyan/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {isEdit
            ? (locale === 'ar' ? 'تعديل الشهادة' : 'Edit Testimonial')
            : (locale === 'ar' ? 'إضافة شهادة جديدة' : 'New Testimonial')}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Client Name + Title */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-steel-gray mb-1.5">
                {locale === 'ar' ? 'اسم العميل' : 'Client Name'} *
              </label>
              <input
                type="text"
                required
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
                placeholder="John Smith"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-gray mb-1.5">
                {locale === 'ar' ? 'المسمى الوظيفي' : 'Client Title'}
              </label>
              <input
                type="text"
                value={clientTitle}
                onChange={(e) => setClientTitle(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
                placeholder="CEO, Acme Corp"
              />
            </div>
          </div>

          {/* Content */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-1.5">
              {locale === 'ar' ? 'المحتوى' : 'Testimonial Content'} *
            </label>
            <textarea
              required
              rows={4}
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all resize-none"
              placeholder="What the client said..."
            />
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-1.5">
              {locale === 'ar' ? 'التقييم' : 'Rating'}
            </label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  className="p-1 transition-transform hover:scale-110"
                >
                  <Star
                    className={cn(
                      'w-6 h-6 transition-colors',
                      star <= rating
                        ? 'text-amber-400 fill-amber-400'
                        : 'text-steel-gray/30'
                    )}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Featured + Order */}
          <div className="flex items-center gap-6">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={featured}
                onChange={(e) => setFeatured(e.target.checked)}
                className="w-4 h-4 rounded border-electric-cyan/20 bg-deep-black text-electric-cyan focus:ring-electric-cyan/30"
              />
              <span className="text-sm text-steel-gray">
                {locale === 'ar' ? 'مميز' : 'Featured'}
              </span>
            </label>
            <div className="flex items-center gap-2">
              <label className="text-sm text-steel-gray">
                {locale === 'ar' ? 'الترتيب' : 'Order'}
              </label>
              <input
                type="number"
                min={0}
                value={displayOrder}
                onChange={(e) => setDisplayOrder(Number(e.target.value))}
                className="w-20 px-3 py-2 rounded-lg bg-deep-black border border-electric-cyan/20 text-white text-sm focus:outline-none focus:border-electric-cyan transition-all"
              />
            </div>
          </div>

          {/* Submit */}
          <div className="pt-2">
            <button
              type="submit"
              disabled={loading}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-lg bg-gradient-to-r from-neon-pink to-electric-cyan text-white font-semibold text-sm hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {loading ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {loading ? (locale === 'ar' ? 'جاري الحفظ...' : 'Saving...') : (locale === 'ar' ? 'حفظ' : 'Save')}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

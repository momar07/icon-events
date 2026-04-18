'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Save, Loader2, ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ImageUpload, type UploadedImage } from './image-upload';

interface PortfolioFormProps {
  locale: string;
  initialData?: {
    id: number;
    title: string;
    description: string;
    category: string;
    clientName: string | null;
    clientLogo: string | null;
    images: UploadedImage[] | null;
    year: number | null;
    budgetMin: number | null;
    budgetMax: number | null;
    budgetDisplay: string | null;
    teamSize: number | null;
    featured: boolean;
    displayOrder: number;
  };
}

const CATEGORIES = [
  'Exhibition', 'Corporate Event', 'Wedding', 'Conference',
  'Product Launch', 'Festival', 'Trade Show', 'Other',
];

export function PortfolioForm({ locale, initialData }: PortfolioFormProps) {
  const router = useRouter();
  const isEdit = !!initialData;

  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [category, setCategory] = useState(initialData?.category || 'Exhibition');
  const [clientName, setClientName] = useState(initialData?.clientName || '');
  const [year, setYear] = useState(initialData?.year || new Date().getFullYear());
  const [budgetDisplay, setBudgetDisplay] = useState(initialData?.budgetDisplay || '');
  const [teamSize, setTeamSize] = useState(initialData?.teamSize || 0);
  const [featured, setFeatured] = useState(initialData?.featured || false);
  const [displayOrder, setDisplayOrder] = useState(initialData?.displayOrder ?? 0);
  const [images, setImages] = useState<UploadedImage[]>(initialData?.images || []);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const url = isEdit ? `/api/portfolio/${initialData.id}` : '/api/portfolio';
      const method = isEdit ? 'PUT' : 'POST';

      const body = {
        title,
        description,
        category,
        clientName: clientName || null,
        clientLogo: null,
        images,
        year,
        budgetDisplay: budgetDisplay || null,
        teamSize: teamSize || null,
        featured,
        displayOrder,
      };

      const res = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });

      if (!res.ok) {
        const data = await res.json();
        setError(data.error || 'Something went wrong');
        setLoading(false);
        return;
      }

      router.push(`/${locale}/admin/portfolio`);
      router.refresh();
    } catch {
      setError('Network error');
      setLoading(false);
    }
  };

  return (
    <div className="max-w-3xl">
      <div className="mb-6">
        <Link
          href={`/${locale}/admin/portfolio`}
          className="inline-flex items-center gap-2 text-sm text-steel-gray hover:text-white transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          {locale === 'ar' ? 'العودة للأعمال' : 'Back to Portfolio'}
        </Link>
      </div>

      <div className="bg-[#0d1230] border border-electric-cyan/10 rounded-xl p-6">
        <h2 className="text-xl font-bold text-white mb-6">
          {isEdit
            ? (locale === 'ar' ? 'تعديل المشروع' : 'Edit Project')
            : (locale === 'ar' ? 'إضافة مشروع جديد' : 'New Project')}
        </h2>

        {error && (
          <div className="mb-4 p-3 rounded-lg bg-neon-pink/10 border border-neon-pink/30 text-neon-pink text-sm">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-5">
          {/* Title */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-1.5">
              {locale === 'ar' ? 'العنوان' : 'Title'} *
            </label>
            <input
              type="text"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-medium text-steel-gray mb-1.5">
              {locale === 'ar' ? 'الوصف' : 'Description'} *
            </label>
            <textarea
              required
              rows={4}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all resize-none"
            />
          </div>

          {/* Category + Client */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-steel-gray mb-1.5">
                {locale === 'ar' ? 'التصنيف' : 'Category'} *
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
              >
                {CATEGORIES.map((cat) => (
                  <option key={cat} value={cat}>{cat}</option>
                ))}
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-gray mb-1.5">
                {locale === 'ar' ? 'اسم العميل' : 'Client Name'}
              </label>
              <input
                type="text"
                value={clientName}
                onChange={(e) => setClientName(e.target.value)}
                className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
              />
            </div>
          </div>

          {/* Year + Budget + Team */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-steel-gray mb-1.5">
                {locale === 'ar' ? 'السنة' : 'Year'}
              </label>
              <input
                type="number"
                min={2000}
                max={2100}
                value={year}
                onChange={(e) => setYear(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-gray mb-1.5">
                {locale === 'ar' ? 'الميزانية' : 'Budget Display'}
              </label>
              <input
                type="text"
                value={budgetDisplay}
                onChange={(e) => setBudgetDisplay(e.target.value)}
                placeholder="$10K - $50K"
                className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white placeholder-steel-gray/50 focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-steel-gray mb-1.5">
                {locale === 'ar' ? 'حجم الفريق' : 'Team Size'}
              </label>
              <input
                type="number"
                min={0}
                value={teamSize}
                onChange={(e) => setTeamSize(Number(e.target.value))}
                className="w-full px-4 py-3 rounded-lg bg-deep-black border border-electric-cyan/20 text-white focus:outline-none focus:border-electric-cyan focus:ring-1 focus:ring-electric-cyan/30 transition-all"
              />
            </div>
          </div>

          {/* Images */}
          <ImageUpload images={images} onChange={setImages} locale={locale} />

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

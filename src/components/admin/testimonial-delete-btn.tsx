'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, RotateCcw, Loader2 } from 'lucide-react';

interface TestimonialDeleteBtnProps {
  id: number;
  action: 'delete' | 'restore';
  locale: string;
}

export function TestimonialDeleteBtn({ id, action, locale }: TestimonialDeleteBtnProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (action === 'delete') {
      if (!confirm(locale === 'ar' ? 'هل تريد حذف هذه الشهادة؟' : 'Delete this testimonial?')) return;
    }

    setLoading(true);
    try {
      if (action === 'delete') {
        await fetch(`/api/testimonials/${id}`, { method: 'DELETE' });
      } else {
        await fetch(`/api/testimonials/${id}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ restore: true }),
        });
      }
      router.refresh();
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="p-2"><Loader2 className="w-4 h-4 animate-spin text-steel-gray" /></div>;
  }

  return action === 'delete' ? (
    <button onClick={handleClick} className="p-2 rounded-lg text-steel-gray hover:text-neon-pink hover:bg-neon-pink/10 transition-all" title="Delete">
      <Trash2 className="w-4 h-4" />
    </button>
  ) : (
    <button onClick={handleClick} className="p-2 rounded-lg text-steel-gray hover:text-emerald-400 hover:bg-emerald-500/10 transition-all" title="Restore">
      <RotateCcw className="w-4 h-4" />
    </button>
  );
}

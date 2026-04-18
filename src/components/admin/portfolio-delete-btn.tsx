'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Trash2, RotateCcw, Loader2 } from 'lucide-react';

interface PortfolioDeleteBtnProps {
  id: number;
  action: 'delete' | 'restore';
  locale: string;
}

export function PortfolioDeleteBtn({ id, action, locale }: PortfolioDeleteBtnProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (action === 'delete') {
      const msg = locale === 'ar' ? 'هل تريد حذف هذا المشروع؟' : 'Delete this project?';
      if (!confirm(msg)) return;
    }

    setLoading(true);
    try {
      if (action === 'delete') {
        await fetch(`/api/portfolio/${id}`, { method: 'DELETE' });
      } else {
        await fetch(`/api/portfolio/${id}`, {
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
    return (
      <div className="p-2">
        <Loader2 className="w-4 h-4 animate-spin text-steel-gray" />
      </div>
    );
  }

  return action === 'delete' ? (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg text-steel-gray hover:text-neon-pink hover:bg-neon-pink/10 transition-all"
      title={locale === 'ar' ? 'حذف' : 'Delete'}
    >
      <Trash2 className="w-4 h-4" />
    </button>
  ) : (
    <button
      onClick={handleClick}
      className="p-2 rounded-lg text-steel-gray hover:text-emerald-400 hover:bg-emerald-500/10 transition-all"
      title={locale === 'ar' ? 'استعادة' : 'Restore'}
    >
      <RotateCcw className="w-4 h-4" />
    </button>
  );
}

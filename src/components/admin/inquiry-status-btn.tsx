'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Loader2 } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface InquiryStatusBtnProps {
  id: number;
  currentStatus: string;
  targetStatus: string;
  label: string;
  locale: string;
}

const statusColors: Record<string, string> = {
  new: 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30 hover:bg-electric-cyan/20',
  reviewed: 'bg-amber-500/10 text-amber-400 border-amber-500/30 hover:bg-amber-500/20',
  contacted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30 hover:bg-emerald-500/20',
};

export function InquiryStatusBtn({ id, currentStatus, targetStatus, label }: InquiryStatusBtnProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  if (currentStatus === targetStatus) return null;

  const handleClick = async () => {
    setLoading(true);
    try {
      await fetch(`/api/inquiries/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: targetStatus }),
      });
      router.refresh();
    } catch {
      // silent
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleClick}
      disabled={loading}
      className={cn(
        'px-3 py-1.5 rounded-lg text-xs font-medium border transition-all disabled:opacity-50',
        statusColors[targetStatus] || 'bg-white/5 text-steel-gray border-white/10'
      )}
    >
      {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : label}
    </button>
  );
}

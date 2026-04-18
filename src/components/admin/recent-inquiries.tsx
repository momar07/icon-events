import Link from 'next/link';
import { Mail, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils/cn';

interface Inquiry {
  id: number;
  name: string;
  email: string;
  eventType: string | null;
  status: 'new' | 'reviewed' | 'contacted';
  createdAt: Date;
}

interface RecentInquiriesProps {
  inquiries: Inquiry[];
  locale: string;
}

const statusStyles: Record<string, string> = {
  new: 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30',
  reviewed: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  contacted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
};

export function RecentInquiries({ inquiries, locale }: RecentInquiriesProps) {
  if (inquiries.length === 0) {
    return (
      <div className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] p-8 text-center">
        <Mail className="w-10 h-10 text-steel-gray/50 mx-auto mb-3" />
        <p className="text-steel-gray">No inquiries yet</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border border-electric-cyan/10 bg-[#0d1230] overflow-hidden">
      <div className="px-5 py-4 border-b border-electric-cyan/10 flex items-center justify-between">
        <h3 className="text-white font-semibold">Recent Inquiries</h3>
        <Link
          href={`/${locale}/admin/inquiries`}
          className="text-sm text-electric-cyan hover:text-white transition-colors flex items-center gap-1"
        >
          View All <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      <div className="divide-y divide-electric-cyan/5">
        {inquiries.map((inq) => (
          <Link
            key={inq.id}
            href={`/${locale}/admin/inquiries/${inq.id}`}
            className="flex items-center justify-between px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
          >
            <div className="min-w-0 flex-1">
              <p className="text-white text-sm font-medium truncate">{inq.name}</p>
              <p className="text-steel-gray text-xs truncate">{inq.email}</p>
            </div>
            <div className="flex items-center gap-3 ml-4 flex-shrink-0">
              {inq.eventType && (
                <span className="text-xs text-steel-gray hidden sm:inline">{inq.eventType}</span>
              )}
              <span className={cn('text-xs px-2 py-0.5 rounded-full border', statusStyles[inq.status])}>
                {inq.status}
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}

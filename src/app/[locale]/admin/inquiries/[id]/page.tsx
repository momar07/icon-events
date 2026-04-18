import { notFound } from 'next/navigation';
import Link from 'next/link';
import { ArrowLeft, Mail, Phone, Calendar, DollarSign } from 'lucide-react';
import { inquiriesRepo } from '@/lib/repositories';
import { InquiryStatusBtn } from '@/components/admin/inquiry-status-btn';
import { cn } from '@/lib/utils/cn';

interface Props {
  params: Promise<{ locale: string; id: string }>;
}

const statusStyles: Record<string, string> = {
  new: 'bg-electric-cyan/10 text-electric-cyan border-electric-cyan/30',
  reviewed: 'bg-amber-500/10 text-amber-400 border-amber-500/30',
  contacted: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30',
};

export default async function InquiryDetailPage({ params }: Props) {
  const { locale, id } = await params;
  const inq = await inquiriesRepo.findById(Number(id));
  if (!inq) notFound();

  return (
    <div className="max-w-3xl space-y-6">
      <Link
        href={`/${locale}/admin/inquiries`}
        className="inline-flex items-center gap-2 text-sm text-steel-gray hover:text-white transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        {locale === 'ar' ? 'العودة للاستفسارات' : 'Back to Inquiries'}
      </Link>

      <div className="bg-[#0d1230] border border-electric-cyan/10 rounded-xl p-6 space-y-6">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-xl font-bold text-white">{inq.name}</h1>
            <p className="text-steel-gray text-sm mt-0.5">
              {new Date(inq.createdAt).toLocaleDateString()} · {new Date(inq.createdAt).toLocaleTimeString()}
            </p>
          </div>
          <span className={cn('px-3 py-1 rounded-full text-xs border font-medium', statusStyles[inq.status])}>
            {inq.status}
          </span>
        </div>

        {/* Contact info */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="flex items-center gap-3 p-3 rounded-lg bg-deep-black border border-electric-cyan/10">
            <Mail className="w-5 h-5 text-electric-cyan flex-shrink-0" />
            <div>
              <p className="text-xs text-steel-gray">Email</p>
              <a href={`mailto:${inq.email}`} className="text-sm text-white hover:text-electric-cyan transition-colors">
                {inq.email}
              </a>
            </div>
          </div>
          {inq.phone && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-deep-black border border-electric-cyan/10">
              <Phone className="w-5 h-5 text-electric-cyan flex-shrink-0" />
              <div>
                <p className="text-xs text-steel-gray">Phone</p>
                <a href={`tel:${inq.phone}`} className="text-sm text-white hover:text-electric-cyan transition-colors">
                  {inq.phone}
                </a>
              </div>
            </div>
          )}
          {inq.eventType && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-deep-black border border-electric-cyan/10">
              <Calendar className="w-5 h-5 text-electric-cyan flex-shrink-0" />
              <div>
                <p className="text-xs text-steel-gray">Event Type</p>
                <p className="text-sm text-white">{inq.eventType}</p>
              </div>
            </div>
          )}
          {inq.budgetRange && (
            <div className="flex items-center gap-3 p-3 rounded-lg bg-deep-black border border-electric-cyan/10">
              <DollarSign className="w-5 h-5 text-electric-cyan flex-shrink-0" />
              <div>
                <p className="text-xs text-steel-gray">Budget</p>
                <p className="text-sm text-white">{inq.budgetRange}</p>
              </div>
            </div>
          )}
        </div>

        {inq.eventDate && (
          <div className="p-3 rounded-lg bg-deep-black border border-electric-cyan/10">
            <p className="text-xs text-steel-gray mb-1">Event Date</p>
            <p className="text-sm text-white">{new Date(inq.eventDate).toLocaleDateString()}</p>
          </div>
        )}

        {/* Message */}
        <div>
          <p className="text-xs text-steel-gray mb-2">Message</p>
          <div className="p-4 rounded-lg bg-deep-black border border-electric-cyan/10">
            <p className="text-white text-sm whitespace-pre-wrap leading-relaxed">{inq.message}</p>
          </div>
        </div>

        {/* Status actions */}
        <div className="flex items-center gap-3 pt-2 border-t border-electric-cyan/10">
          <span className="text-sm text-steel-gray">
            {locale === 'ar' ? 'تغيير الحالة:' : 'Change status:'}
          </span>
          <InquiryStatusBtn id={inq.id} currentStatus={inq.status} targetStatus="reviewed" label="Mark Reviewed" locale={locale} />
          <InquiryStatusBtn id={inq.id} currentStatus={inq.status} targetStatus="contacted" label="Mark Contacted" locale={locale} />
        </div>
      </div>
    </div>
  );
}

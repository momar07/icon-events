import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generateMeta } from '@/lib/utils/seo';
import { SectionHeader } from '@/components/ui/section-header';
import { ContactForm } from '@/components/sections/contact-form';
import { Mail, Phone, MapPin, Clock } from 'lucide-react';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMeta({
    title: 'Contact Us',
    description: 'Ready to create something extraordinary? Get in touch with our team.',
    path: '/contact',
    locale,
  });
}

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('contact');

  return (
    <div className="pt-20">
      <section className="section-padding">
        <div className="container-custom">
          <SectionHeader title={t('title')} subtitle={t('subtitle')} />

          <div className="mt-16 grid gap-12 lg:grid-cols-3">
            {/* Contact Info */}
            <div className="space-y-6">
              <div className="rounded-xl border border-[#252B4A] bg-[#1A1F3A] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FF006E]/10">
                  <Mail size={20} className="text-[#FF006E]" />
                </div>
                <h3 className="mb-1 font-semibold text-[#F5F7FA]">Email</h3>
                <p className="text-sm text-[#A0AEC0]">info@iconevents.com</p>
              </div>

              <div className="rounded-xl border border-[#252B4A] bg-[#1A1F3A] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#00D9FF]/10">
                  <Phone size={20} className="text-[#00D9FF]" />
                </div>
                <h3 className="mb-1 font-semibold text-[#F5F7FA]">Phone</h3>
                <p className="text-sm text-[#A0AEC0]">+1 (555) 123-4567</p>
              </div>

              <div className="rounded-xl border border-[#252B4A] bg-[#1A1F3A] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#2EF2B1]/10">
                  <MapPin size={20} className="text-[#2EF2B1]" />
                </div>
                <h3 className="mb-1 font-semibold text-[#F5F7FA]">Location</h3>
                <p className="text-sm text-[#A0AEC0]">Dubai, UAE</p>
              </div>

              <div className="rounded-xl border border-[#252B4A] bg-[#1A1F3A] p-6">
                <div className="mb-3 flex h-10 w-10 items-center justify-center rounded-lg bg-[#FFC857]/10">
                  <Clock size={20} className="text-[#FFC857]" />
                </div>
                <h3 className="mb-1 font-semibold text-[#F5F7FA]">Response Time</h3>
                <p className="text-sm text-[#A0AEC0]">Within 24 hours</p>
              </div>
            </div>

            {/* Contact Form */}
            <div className="lg:col-span-2">
              <div className="rounded-2xl border border-[#252B4A] bg-[#1A1F3A] p-8 md:p-10">
                <ContactForm />
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

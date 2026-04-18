import { setRequestLocale } from 'next-intl/server';
import { getTranslations } from 'next-intl/server';
import { generateMeta } from '@/lib/utils/seo';
import { listServices } from '@/lib/repositories/services.repo';
import { ServicesGrid } from '@/components/sections/services-grid';
import { Link } from '@/lib/i18n/navigation';
import { Button } from '@/components/ui/button';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMeta({
    title: 'Our Services',
    description: 'Comprehensive event and exhibition solutions tailored to elevate your brand.',
    path: '/services',
    locale,
  });
}

export default async function ServicesPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  const t = await getTranslations('services');
  const services = await listServices();

  return (
    <div className="pt-20">
      <ServicesGrid
        services={services}
        title={t('title')}
        subtitle={t('subtitle')}
      />

      {/* Bottom CTA */}
      <section className="section-padding">
        <div className="container-custom text-center">
          <div className="mx-auto max-w-2xl rounded-2xl border border-[#252B4A] bg-[#1A1F3A] p-12">
            <h3 className="heading-3 mb-4 text-[#F5F7FA]">{t('cta')}</h3>
            <p className="mb-8 text-[#A0AEC0]">
              Let us help you create an unforgettable event experience.
            </p>
            <Link href="/contact">
              <Button size="lg" variant="primary">
                Request a Quote
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

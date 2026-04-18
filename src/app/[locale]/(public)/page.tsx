import { setRequestLocale } from 'next-intl/server';
import { Hero } from '@/components/sections/hero';
import { generateMeta } from '@/lib/utils/seo';

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return generateMeta({ locale });
}

export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      {/* More sections will be added: Services preview, Featured portfolio, Testimonials, CTA */}
    </>
  );
}

import { Metadata } from 'next';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Icon Events';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

interface SeoParams {
  title?: string;
  description?: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  locale?: string;
}

export function generateMeta({
  title,
  description = 'We design and build stunning exhibitions, corporate events, and brand experiences that captivate audiences and deliver results.',
  path = '',
  image = '/og-image.jpg',
  noIndex = false,
  locale = 'en',
}: SeoParams = {}): Metadata {
  const fullTitle = title ? `${title} | ${APP_NAME}` : `${APP_NAME} — Premier Event & Exhibition Design`;
  const url = `${APP_URL}/${locale}${path}`;
  const imageUrl = image.startsWith('http') ? image : `${APP_URL}${image}`;

  return {
    title: fullTitle,
    description,
    metadataBase: new URL(APP_URL),
    alternates: {
      canonical: url,
      languages: {
        en: `${APP_URL}/en${path}`,
        ar: `${APP_URL}/ar${path}`,
      },
    },
    openGraph: {
      type: 'website',
      locale: locale === 'ar' ? 'ar_SA' : 'en_US',
      url,
      siteName: APP_NAME,
      title: fullTitle,
      description,
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
  };
}

export function generateJsonLd(locale: string = 'en') {
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    name: APP_NAME,
    url: APP_URL,
    logo: `${APP_URL}/logo.png`,
    description:
      locale === 'ar'
        ? 'نصمم ونبني معارض مذهلة وفعاليات مؤسسية وتجارب علامات تجارية'
        : 'We design and build stunning exhibitions, corporate events, and brand experiences',
    contactPoint: {
      '@type': 'ContactPoint',
      contactType: 'customer service',
      availableLanguage: ['English', 'Arabic'],
    },
  };
}

import type { Metadata } from 'next';
import './globals.css';

const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || 'Icon Events';
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: `${APP_NAME} — Premier Event & Exhibition Design`,
    template: `%s | ${APP_NAME}`,
  },
  description:
    'We design and build stunning exhibitions, corporate events, and brand experiences that captivate audiences and deliver results.',
  keywords: [
    'event design',
    'exhibition design',
    'trade show',
    'corporate events',
    'brand experience',
    'event management',
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}

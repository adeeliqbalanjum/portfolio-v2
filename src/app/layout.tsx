import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adeel Iqbal Anjum — Premium WordPress Portfolio',
  description:
    'Premium portfolio for WordPress, WooCommerce, booking websites, frontend motion, and polished responsive website builds.',
  openGraph: {
    title: 'Adeel Iqbal Anjum — Premium WordPress Portfolio',
    description:
      'Fast, polished, conversion-focused WordPress and WooCommerce websites for businesses, agencies, travel brands, and healthcare teams.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#fff7ef'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}

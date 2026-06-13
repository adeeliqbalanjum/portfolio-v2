import type { Metadata, Viewport } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'Adeel Iqbal — WordPress & WooCommerce Developer',
  description:
    'Premium WordPress, WooCommerce & frontend developer based in Lahore, Pakistan. 50+ projects delivered across tourism, healthcare, technology, and e-commerce.',
  keywords: [
    'WordPress developer',
    'WooCommerce developer',
    'Elementor Pro',
    'website design Pakistan',
    'freelance developer Lahore'
  ],
  authors: [{ name: 'Adeel Iqbal' }],
  openGraph: {
    title: 'Adeel Iqbal — WordPress & WooCommerce Developer',
    description: 'Premium WordPress & WooCommerce developer. 50+ projects. Fast delivery.',
    type: 'website'
  }
};

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  themeColor: '#0a0a0a'
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                try {
                  var theme = localStorage.getItem('theme') || 'dark';
                  document.documentElement.setAttribute('data-theme', theme);
                } catch(e) {}
              })();
            `
          }}
        />
      </head>
      <body>{children}</body>
    </html>
  );
}
